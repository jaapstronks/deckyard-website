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
// What makes the gate red (see README § What the gate blocks on):
//   regenerable (entry has a `recipe`) — both axes are gated: the fix is a
//     capture run, which is cheap, so "the artifact matches the code" is a
//     claim we can keep true.
//   hand-made (no `recipe`) — structure is gated (a source path that moved or
//     vanished, a missing baseline, a schema error), plain content drift is
//     reported: the fix is a docs review, and blocking CI does not make anyone
//     write it. This is a stated exception, not a second tolerance: once every
//     artifact carries a recipe, the report-only bucket is empty and the
//     exception can be deleted.
//
// Usage:
//   node docs-sync/check-staleness.mjs                      # report drift (exit 1 if anything is gated)
//   node docs-sync/check-staleness.mjs --json               # machine-readable report on stdout
//   node docs-sync/check-staleness.mjs --update --only a,b  # re-baseline these entries
//   node docs-sync/check-staleness.mjs --update --all       # re-baseline everything (asks for it explicitly)
//
// Exit codes: 0 clean, 1 something is gated, 2 the registry or the checkout is
// unusable (schema error, duplicate id, core missing, bad arguments).
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
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '..');
const REGISTRY_PATH = join(HERE, 'registry.json');
const SCHEMA_PATH = join(HERE, 'registry.schema.json');

const USAGE = `Usage:
  node docs-sync/check-staleness.mjs [--json]
  node docs-sync/check-staleness.mjs --update --only <id[,id…]>
  node docs-sync/check-staleness.mjs --update --all`;

function die(...lines) {
  for (const line of lines) console.error(line);
  process.exit(2);
}

// --- arguments -------------------------------------------------------------
// A baseline is a claim that someone looked. `--update` therefore refuses to
// guess how wide the claim is: name the entries, or say --all out loud.
const argv = process.argv.slice(2);
const flags = { update: false, json: false, all: false };
const only = [];
for (let i = 0; i < argv.length; i++) {
  const arg = argv[i];
  if (arg === '--update') flags.update = true;
  else if (arg === '--json') flags.json = true;
  else if (arg === '--all') flags.all = true;
  else if (arg === '--only' || arg.startsWith('--only=')) {
    const value = arg.startsWith('--only=') ? arg.slice('--only='.length) : argv[++i];
    if (!value || value.startsWith('--')) die('--only needs a comma-separated list of ids.', USAGE);
    only.push(...value.split(',').map((s) => s.trim()).filter(Boolean));
  } else die(`unknown argument: ${arg}`, USAGE);
}

const MODE_UPDATE = flags.update;
const MODE_JSON = flags.json;

if (!MODE_UPDATE && (flags.all || only.length)) {
  die('--only and --all only mean something with --update.', USAGE);
}
if (MODE_UPDATE && flags.all && only.length) {
  die('--all and --only contradict each other; pick one.', USAGE);
}
if (MODE_UPDATE && !flags.all && !only.length) {
  die(
    'Refusing a blanket re-baseline: --update needs a scope.',
    '',
    '  A baseline says "someone looked at this artifact against this code".',
    '  Name the entries you actually reviewed or re-captured:',
    '',
    '    --update --only shot-editor-full,shot-theme-editor-full',
    '',
    '  …or, if you really mean all of them, say so: --update --all',
  );
}

if (!existsSync(REGISTRY_PATH)) die(`registry not found: ${REGISTRY_PATH}`);
if (!existsSync(SCHEMA_PATH)) die(`registry schema not found: ${SCHEMA_PATH}`);

// --- shape ------------------------------------------------------------------
// Validate before hashing: with three artifact types whose required fields
// differ, a typo in the shape shows up as a nonsense hash rather than as an
// error, and the report then quietly checks something other than it claims.
const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
{
  const Ajv = Ajv2020.default || Ajv2020;
  const withFormats = addFormats.default || addFormats;
  // strictRequired is off because the conditional branches deliberately require
  // properties that are declared once, on the parent artifact schema.
  const ajv = new Ajv({ allErrors: true, strict: true, strictRequired: false });
  withFormats(ajv);
  const validate = ajv.compile(JSON.parse(readFileSync(SCHEMA_PATH, 'utf8')));
  if (!validate(registry)) {
    const named = (path) => {
      const m = /^\/artifacts\/(\d+)/.exec(path);
      const art = m && registry.artifacts?.[Number(m[1])];
      return art?.id ? `${path} (${art.id})` : path;
    };
    // Drop the `if` wrappers ("must match \"then\" schema"): every one of them is
    // accompanied by the specific error underneath it, and naming the property
    // beats naming the branch.
    const errors = (validate.errors ?? []).filter((e) => e.keyword !== 'if');
    const explain = (e) =>
      e.keyword === 'false schema'
        ? 'is not allowed on this artifact type'
        : e.message;
    die(
      `registry.json does not match registry.schema.json (${errors.length} error(s)):`,
      ...errors.slice(0, 10).map((e) => `  ${named(e.instancePath || '/')} ${explain(e)}`),
      ...(errors.length > 10 ? [`  …and ${errors.length - 10} more`] : []),
    );
  }
}

// JSON Schema cannot express "unique by a key", and duplicate ids are exactly
// the mistake copy-pasting an entry produces.
{
  const seen = new Set();
  const dupes = new Set();
  for (const art of registry.artifacts) {
    if (seen.has(art.id)) dupes.add(art.id);
    seen.add(art.id);
  }
  if (dupes.size) die(`duplicate artifact ids in registry.json: ${[...dupes].sort().join(', ')}`);
}

const CORE_ROOT = resolve(REPO_ROOT, registry.coreRepo || '../deckyard');

if (!existsSync(CORE_ROOT)) {
  die(
    `core repo not found at ${CORE_ROOT} (registry.coreRepo="${registry.coreRepo}")`,
    'Clone/checkout deckyard core as a sibling, or fix registry.coreRepo.',
  );
}

if (only.length) {
  const known = new Set(registry.artifacts.map((a) => a.id));
  const unknown = only.filter((id) => !known.has(id));
  if (unknown.length) die(`--only names ids that are not in the registry: ${unknown.join(', ')}`);
}
const updateScope = flags.all ? null : new Set(only);
const inUpdateScope = (art) => MODE_UPDATE && (updateScope === null || updateScope.has(art.id));

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
    die(
      `core has no capture factory at ${modulePath}`,
      'The registry has `recipe` blocks, so this check needs it.',
    );
  }
  try {
    const mod = await import(pathToFileURL(modulePath).href);
    return mod.hashRecipeGraph;
  } catch (e) {
    die(
      `could not load core's hashRecipeGraph(): ${e.message}`,
      `Run \`npm ci\` in ${relative(REPO_ROOT, CORE_ROOT)} and retry.`,
    );
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
  } else if (missing.length) {
    // Some paths moved, the rest are still there. Distinct from source-gone:
    // the fix is repointing `sources`, not deleting the doc.
    status = 'source-moved';
  } else if (recipeGone) {
    status = 'recipe-gone'; // the recipe that makes this artifact was removed or renamed
  } else if (!art.sourceHash || (art.recipe && !art.recipe.hash)) {
    status = 'new'; // never baselined (either axis)
  } else if (art.sourceHash !== hash || recipeDrift) {
    status = 'stale';
  } else {
    status = 'ok';
  }

  // A stale hand-made artifact is reported, not gated (see the header comment).
  const gated = status === 'stale' ? Boolean(art.recipe) : status !== 'ok';

  results.push({
    ...art,
    currentHash: hash,
    currentRecipeHash: recipeHash,
    recipeDrift,
    recipeGone,
    fileCount,
    missing,
    status,
    gated,
    updated: inUpdateScope(art),
  });
  if (inUpdateScope(art)) {
    art.sourceHash = hash;
    if (art.recipe && recipeHash) art.recipe.hash = recipeHash;
  }
}

if (MODE_UPDATE) {
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n');
}

const order = { 'source-gone': 0, 'source-moved': 1, 'recipe-gone': 2, stale: 3, new: 4, ok: 5 };
results.sort(
  (a, b) =>
    order[a.status] - order[b.status] ||
    Number(b.gated) - Number(a.gated) ||
    a.id.localeCompare(b.id),
);

const counts = results.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});
const staleGated = results.filter((r) => r.status === 'stale' && r.gated).length;
const staleReported = results.filter((r) => r.status === 'stale' && !r.gated).length;
const gatedCount = results.filter((r) => r.gated).length;

const summary = {
  'source-gone': counts['source-gone'] || 0,
  'source-moved': counts['source-moved'] || 0,
  'recipe-gone': counts['recipe-gone'] || 0,
  'stale-gated': staleGated,
  'stale-reported': staleReported,
  new: counts.new || 0,
  ok: counts.ok || 0,
  total: results.length,
  gated: gatedCount,
};

if (MODE_JSON) {
  console.log(JSON.stringify({ counts, summary, results }, null, 2));
} else {
  const label = {
    'source-gone': 'SOURCE GONE',
    'source-moved': 'SOURCE MOVED',
    'recipe-gone': 'RECIPE GONE',
    stale: 'STALE',
    'stale-reported': 'stale (report)',
    new: 'NEW (no baseline)',
    ok: 'OK',
  };
  const icon = {
    'source-gone': '✖',
    'source-moved': '↷',
    'recipe-gone': '✖',
    stale: '▲',
    'stale-reported': '△',
    new: '+',
    ok: '·',
  };
  const key = (r) => (r.status === 'stale' && !r.gated ? 'stale-reported' : r.status);
  console.log(`\nDocs staleness — core: ${relative(REPO_ROOT, CORE_ROOT)}\n`);
  for (const r of results) {
    if (r.status === 'ok' && !MODE_UPDATE) continue; // hide OK noise in check mode
    const k = key(r);
    console.log(`  ${icon[k]} ${label[k].padEnd(17)} ${r.id}`);
    if (r.missing.length) console.log(`      gone: ${r.missing.join(', ')}`);
    if (r.recipeGone) console.log(`      recipe gone: ${r.recipe.module}`);
    // Name the axis: "the recipe changed" and "the source changed" call for
    // different work — re-record versus review the docs around it.
    else if (r.recipeDrift) console.log(`      recipe changed: ${r.recipe.id}`);
  }
  console.log(
    `\n  ${summary['source-gone']} source-gone · ${summary['source-moved']} source-moved · ` +
      `${summary['recipe-gone']} recipe-gone · ${summary['stale-gated']} stale (gated) · ` +
      `${summary['stale-reported']} stale (report-only, no recipe) · ` +
      `${summary.new} new · ${summary.ok} ok  (of ${summary.total})\n`,
  );
  if (summary['stale-reported']) {
    console.log(
      `  ${summary['stale-reported']} hand-made artifact(s) drifted. Not a red check — the fix is a\n` +
        `  docs review; the backlog ranking lives in docs-sync/STALENESS.md.\n`,
    );
  }
  if (MODE_UPDATE) {
    const written = results.filter((r) => r.updated).length;
    if (flags.all) {
      console.log(`  ⚠ --all re-baselined every entry: ${written} claim(s) written in one go.\n`);
    } else {
      console.log(`  baseline written for ${written} entry(ies): ${only.sort().join(', ')}\n`);
    }
  }
}

// Exit non-zero when anything gated needs attention (useful in CI / pre-commit).
process.exit(gatedCount > 0 && !MODE_UPDATE ? 1 : 0);
