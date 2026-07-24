#!/usr/bin/env node
// Docs staleness checker.
//
// Reads docs-sync/registry.json, hashes the deckyard-core source paths that
// each doc artifact (page / screenshot / video) depends on, and compares the
// hash against the baseline stored in the registry. When core changes a path,
// the artifact that documents it is flagged `stale` so it can be reviewed or
// regenerated.
//
// Usage:
//   node docs-sync/check-staleness.mjs            # report drift (exit 1 if any stale/missing)
//   node docs-sync/check-staleness.mjs --update   # write current hashes as the new baseline
//   node docs-sync/check-staleness.mjs --json      # machine-readable report on stdout
//
// This is the forward-looking tripwire (did anything change since the last
// baseline). For the current backlog ranking use audit-since-capture.mjs, which
// owns STALENESS.md.
//
// The core repo is resolved from registry.coreRepo (default ../deckyard),
// relative to this repo root. Reading it is read-only; nothing in core is touched.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, statSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '..');
const REGISTRY_PATH = join(HERE, 'registry.json');

const args = new Set(process.argv.slice(2));
const MODE_UPDATE = args.has('--update');
const MODE_JSON = args.has('--json');

if (!existsSync(REGISTRY_PATH)) {
  console.error(`registry not found: ${REGISTRY_PATH}`);
  process.exit(2);
}

const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
const CORE_ROOT = resolve(REPO_ROOT, registry.coreRepo || '../deckyard');

if (!existsSync(CORE_ROOT)) {
  console.error(`core repo not found at ${CORE_ROOT} (registry.coreRepo="${registry.coreRepo}")`);
  console.error('Clone/checkout deckyard core as a sibling, or fix registry.coreRepo.');
  process.exit(2);
}

// Walk a file or directory under core, returning a sorted list of file paths.
// Directories are walked recursively. Common noise dirs are skipped.
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.astro']);
function collectFiles(absPath) {
  if (!existsSync(absPath)) return null; // signal: source path is gone
  const st = statSync(absPath);
  if (st.isFile()) return [absPath];
  if (!st.isDirectory()) return [];
  const out = [];
  for (const entry of readdirSync(absPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const nested = collectFiles(join(absPath, entry.name));
      if (nested) out.push(...nested);
    } else if (entry.isFile()) {
      out.push(join(absPath, entry.name));
    }
  }
  return out.sort();
}

// Hash the concatenated content of every source path for one artifact.
// Returns { hash, fileCount, missing: [paths that don't exist] }.
function hashSources(sources) {
  const h = createHash('sha256');
  let fileCount = 0;
  const missing = [];
  for (const src of [...sources].sort()) {
    const abs = join(CORE_ROOT, src);
    const files = collectFiles(abs);
    if (files === null) {
      missing.push(src);
      h.update(`\0MISSING:${src}\0`); // missing path still changes the hash
      continue;
    }
    for (const f of files) {
      h.update(relative(CORE_ROOT, f));
      h.update(readFileSync(f));
      fileCount++;
    }
  }
  return { hash: h.digest('hex').slice(0, 16), fileCount, missing };
}

const results = [];
for (const art of registry.artifacts) {
  const { hash, fileCount, missing } = hashSources(art.sources || []);
  let status;
  if (missing.length && missing.length === (art.sources || []).length) {
    status = 'source-gone'; // every dependency path is gone: feature likely removed/renamed
  } else if (!art.sourceHash) {
    status = 'new'; // never baselined
  } else if (art.sourceHash !== hash) {
    status = 'stale';
  } else {
    status = 'ok';
  }
  results.push({ ...art, currentHash: hash, fileCount, missing, status });
  if (MODE_UPDATE) art.sourceHash = hash;
}

if (MODE_UPDATE) {
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');
}

const order = { 'source-gone': 0, stale: 1, new: 2, ok: 3 };
results.sort((a, b) => order[a.status] - order[b.status] || a.id.localeCompare(b.id));

const counts = results.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});

if (MODE_JSON) {
  console.log(JSON.stringify({ counts, results }, null, 2));
} else {
  const label = {
    'source-gone': 'SOURCE GONE',
    stale: 'STALE',
    new: 'NEW (no baseline)',
    ok: 'OK',
  };
  const icon = { 'source-gone': '✖', stale: '△', new: '+', ok: '·' };
  console.log(`\nDocs staleness — core: ${relative(REPO_ROOT, CORE_ROOT)}\n`);
  for (const r of results) {
    if (r.status === 'ok' && !MODE_UPDATE) continue; // hide OK noise in check mode
    console.log(`  ${icon[r.status]} ${label[r.status].padEnd(17)} ${r.id}`);
    if (r.missing.length) console.log(`      gone: ${r.missing.join(', ')}`);
  }
  console.log(
    `\n  ${counts['source-gone'] || 0} source-gone · ${counts.stale || 0} stale · ` +
      `${counts.new || 0} new · ${counts.ok || 0} ok  (of ${results.length})\n`
  );
  if (MODE_UPDATE) console.log('  baseline hashes written to registry.json\n');
}

// Exit non-zero when anything needs attention (useful in CI / pre-commit).
const needsAttention = (counts.stale || 0) + (counts['source-gone'] || 0) + (counts.new || 0);
process.exit(needsAttention > 0 && !MODE_UPDATE ? 1 : 0);
