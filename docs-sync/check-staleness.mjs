#!/usr/bin/env node
// Docs staleness checker.
//
// Reads docs-sync/registry.json, hashes the deckyard-core source paths that
// each doc artifact (page / screenshot / video) depends on, and compares the
// hash against the baseline stored in the registry. When core changes a path,
// the artifact that documents it is flagged `stale` so it can be reviewed or
// regenerated.
//
// An artifact that carries a `recipe` block is captured by core's capture
// factory, and then it has a second way to go out of date: the recipe itself
// (or a factory it builds on) changed, so a re-run would no longer produce the
// same framing. That is checked with core's own `hashRecipeGraph()`, imported
// from the core checkout rather than reimplemented here — one definition of
// what a recipe hash is, in the repo that owns recipes.
//
// Usage:
//   node docs-sync/check-staleness.mjs            # report drift (exit 1 if any stale/missing/gone)
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
import { fileURLToPath, pathToFileURL } from 'node:url';

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

// Core owns the definition of a recipe hash (`hashRecipeGraph()` walks the
// recipe's import graph within `capture/` with an ES module lexer). Import it
// instead of copying it: a second implementation here would drift from the one
// that `capture/run.js` prints, and then the registry would record a number
// neither side agrees on.
//
// This needs core's dependencies installed, not just checked out. When they are
// not, we stop rather than skip: a tripwire that silently checks half of what
// it claims to check is worse than one that says it cannot run.
async function loadRecipeHasher() {
  const modulePath = join(CORE_ROOT, 'capture/lib/recipe.js');
  if (!existsSync(modulePath)) {
    console.error(`core has no capture factory at ${modulePath}`);
    console.error('The registry has `recipe` blocks, so this check needs it.');
    process.exit(2);
  }
  try {
    const mod = await import(pathToFileURL(modulePath).href);
    return mod.hashRecipeGraph;
  } catch (e) {
    console.error(`could not load core's hashRecipeGraph(): ${e.message}`);
    console.error(`Run \`npm ci\` in ${relative(REPO_ROOT, CORE_ROOT)} and retry.`);
    process.exit(2);
  }
}

// Loaded once, and only when something in the registry actually needs it.
const hashRecipeGraph = registry.artifacts.some((a) => a.recipe)
  ? await loadRecipeHasher()
  : null;

// Recipe module paths in the registry are written relative to this repo root
// ("../deckyard/capture/recipes/x.js"), the same way `coreRepo` is.
async function hashRecipe(recipe) {
  const abs = resolve(REPO_ROOT, recipe.module);
  if (!existsSync(abs)) return { hash: null, gone: true };
  return { hash: await hashRecipeGraph(abs), gone: false };
}

const results = [];
for (const art of registry.artifacts) {
  const { hash, fileCount, missing } = hashSources(art.sources || []);

  // Second axis of drift, for artifacts the capture factory produces.
  let recipeHash = null;
  let recipeGone = false;
  if (art.recipe) {
    ({ hash: recipeHash, gone: recipeGone } = await hashRecipe(art.recipe));
  }
  const recipeDrift = Boolean(
    art.recipe && !recipeGone && art.recipe.hash && art.recipe.hash !== recipeHash,
  );

  let status;
  if (missing.length && missing.length === (art.sources || []).length) {
    status = 'source-gone'; // every dependency path is gone: feature likely removed/renamed
  } else if (recipeGone) {
    status = 'recipe-gone'; // the recipe that makes this artifact was removed or renamed
  } else if (!art.sourceHash || (art.recipe && !art.recipe.hash)) {
    status = 'new'; // never baselined (either axis)
  } else if (art.sourceHash !== hash || recipeDrift) {
    status = 'stale';
  } else {
    status = 'ok';
  }

  results.push({
    ...art,
    currentHash: hash,
    currentRecipeHash: recipeHash,
    recipeDrift,
    recipeGone,
    fileCount,
    missing,
    status,
  });
  if (MODE_UPDATE) {
    art.sourceHash = hash;
    if (art.recipe && recipeHash) art.recipe.hash = recipeHash;
  }
}

if (MODE_UPDATE) {
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');
}

const order = { 'source-gone': 0, 'recipe-gone': 1, stale: 2, new: 3, ok: 4 };
results.sort((a, b) => order[a.status] - order[b.status] || a.id.localeCompare(b.id));

const counts = results.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});

if (MODE_JSON) {
  console.log(JSON.stringify({ counts, results }, null, 2));
} else {
  const label = {
    'source-gone': 'SOURCE GONE',
    'recipe-gone': 'RECIPE GONE',
    stale: 'STALE',
    new: 'NEW (no baseline)',
    ok: 'OK',
  };
  const icon = {
    'source-gone': '✖',
    'recipe-gone': '✖',
    stale: '△',
    new: '+',
    ok: '·',
  };
  console.log(`\nDocs staleness — core: ${relative(REPO_ROOT, CORE_ROOT)}\n`);
  for (const r of results) {
    if (r.status === 'ok' && !MODE_UPDATE) continue; // hide OK noise in check mode
    console.log(`  ${icon[r.status]} ${label[r.status].padEnd(17)} ${r.id}`);
    if (r.missing.length) console.log(`      gone: ${r.missing.join(', ')}`);
    if (r.recipeGone) console.log(`      recipe gone: ${r.recipe.module}`);
    // Name the axis: "the recipe changed" and "the source changed" call for
    // different work — re-record versus review the docs around it.
    else if (r.recipeDrift) console.log(`      recipe changed: ${r.recipe.id}`);
  }
  console.log(
    `\n  ${counts['source-gone'] || 0} source-gone · ` +
      `${counts['recipe-gone'] || 0} recipe-gone · ${counts.stale || 0} stale · ` +
      `${counts.new || 0} new · ${counts.ok || 0} ok  (of ${results.length})\n`
  );
  if (MODE_UPDATE) console.log('  baseline hashes written to registry.json\n');
}

// Exit non-zero when anything needs attention (useful in CI / pre-commit).
const needsAttention =
  (counts.stale || 0) +
  (counts['source-gone'] || 0) +
  (counts['recipe-gone'] || 0) +
  (counts.new || 0);
process.exit(needsAttention > 0 && !MODE_UPDATE ? 1 : 0);
