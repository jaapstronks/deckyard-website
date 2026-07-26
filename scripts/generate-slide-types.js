#!/usr/bin/env node
// Generate src/data/slide-types.json from the deckyard core registry.
//
// WHY THIS EXISTS
// "How many slide types are there, and what are they?" was answered by hand in
// three places on this site and disagreed with itself three ways (36 / 38 / 44).
// A number typed into prose is a number that goes stale the moment a type is
// added, and this site's whole argument is that its claims are checkable. So the
// list and the count come out of the code that defines them.
//
// Core has the same script for its own inventory doc
// (deckyard/scripts/generate-slide-type-docs.js); this is that idea aimed at the
// website, carrying the extra per-type detail the /spec/slide-types/ page shows.
//
// NOT part of `npm run build`. The generated JSON is committed so CI (and any
// checkout without ../deckyard beside it) builds from the file. Drift between
// the file and core is caught by docs-sync/check-staleness.mjs, which watches
// the same source paths this script reads.
//
//   node scripts/generate-slide-types.js            # regenerate
//   node scripts/generate-slide-types.js --check    # exit 1 if it would change
//
// The count is of CORE types, via CORE_SLIDE_TYPE_NAMES — never
// Object.keys(SLIDE_TYPES), which on a fork checkout also carries whatever sits
// in deckyard/custom/slide-types/ and would put somebody's own title slide on
// deckyard.eu.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('../', import.meta.url));
const CORE_ROOT = path.resolve(REPO_ROOT, '..', 'deckyard');

const OUT_FILE = 'src/data/slide-types.json';
const FORMAT_FILE = 'src/data/deck-format.json';

/** Files carrying a slide-type count inside marker spans (see applyCountMarkers). */
const COUNT_MARKER_FILES = ['README.md', 'docs/slide-types/index.md'];
const MARKER_OPEN = '<!--gen:slide-type-count-->';
const MARKER_CLOSE = '<!--/gen:slide-type-count-->';

/** Core modules this script reads. Mirrored in docs-sync/registry.json. */
const CORE_SOURCES = {
  registry: 'shared/slide-types/registry.js',
  schematics: 'client/views/editor/slide-type-schematics.js',
  picker: 'client/views/editor/slide-type-picker/data.js',
  catalog: 'server/utils/ai/slide-catalog/definitions.js',
  deck: 'shared/slide-types/deck.js',
  bundle: 'server/export/deck-bundle.js',
  jsonSchema: 'shared/slide-types/json-schema.js',
  schemaVersion: 'shared/slide-types/schema-version.js',
};

function coreImport(rel) {
  return import(pathToFileURL(path.join(CORE_ROOT, rel)).href);
}

function requireCore() {
  if (!fs.existsSync(path.join(CORE_ROOT, CORE_SOURCES.registry))) {
    console.error(
      `Cannot find the deckyard core repo at ${CORE_ROOT}.\n` +
        'This script reads the slide-type registry straight out of core, so core has to be\n' +
        'checked out beside this repo. The committed src/data/slide-types.json is what the\n' +
        'build uses, so nothing is broken - you just cannot regenerate it from here.'
    );
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Shaping
// ---------------------------------------------------------------------------

/**
 * Trim an enum option down to what a reader needs. The registry's options carry
 * i18n key bookkeeping (labelKey/titleKey/ariaLabelKey) that means nothing
 * outside the editor.
 */
function shapeOption(opt) {
  if (opt && typeof opt === 'object') {
    return { value: String(opt.value ?? ''), label: String(opt.label ?? opt.value ?? '') };
  }
  return { value: String(opt), label: String(opt) };
}

/** One row of a type's field table. */
function shapeField(field) {
  const out = {
    key: field.key,
    label: field.label ?? field.key,
    type: field.type ?? 'string',
    required: !!field.required,
  };
  if (Number.isFinite(field.maxLength)) out.maxLength = field.maxLength;
  if (Array.isArray(field.options) && field.options.length) {
    out.options = field.options.map(shapeOption);
  }
  if (field.itemFields) {
    // A repeater: the sub-shape matters more than the fact that it repeats.
    out.itemFields = field.itemFields.map(shapeField);
  }
  return out;
}

/** Collapse the AI catalog's indented template-literal prose into one line. */
function oneLine(text) {
  return String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function buildData() {
  const registry = await coreImport(CORE_SOURCES.registry);
  const schematics = await coreImport(CORE_SOURCES.schematics);
  const picker = await coreImport(CORE_SOURCES.picker);
  const catalog = await coreImport(CORE_SOURCES.catalog);

  const { SLIDE_TYPES, CORE_SLIDE_TYPE_NAMES, SLIDE_TYPE_IDS, GLOBAL_SLIDE_FIELD_KEYS } = registry;
  const { SLIDE_TYPE_SCHEMATIC } = schematics;
  const { SLIDE_TYPE_DESC, PICKER_GROUPS } = picker;
  const aiCatalog = catalog.getCoreSlideCatalog();

  const globalKeys = new Set(GLOBAL_SLIDE_FIELD_KEYS);

  // Which curated group a type sits in. The picker's groups are the editor's own
  // shelving; anything it leaves out is a long tail, not a gap, so it lands in
  // 'other' rather than being forced somewhere.
  const groupOf = new Map();
  for (const [group, names] of Object.entries(PICKER_GROUPS)) {
    for (const name of names) groupOf.set(name, group);
  }

  const types = CORE_SLIDE_TYPE_NAMES.map((name) => {
    const def = SLIDE_TYPES[name] ?? {};
    const ai = aiCatalog[name] ?? {};
    const group = groupOf.get(name) ?? 'other';
    const fields = Array.isArray(def.fields) ? def.fields : [];

    return {
      name,
      id: SLIDE_TYPE_IDS[name] ?? `core/${name}`,
      label: def.label ?? name,
      deprecated: !!def.deprecated,
      group,
      // "Does the audience take part?" - the filter that separates Deckyard from
      // a slide editor. Derived, not asserted: a type counts when the editor
      // shelves it under interaction or the agent catalog files it as
      // interactive. Both live in core, so this cannot drift on its own.
      audience: group === 'interaction' || ai.category === 'interactive',
      description: SLIDE_TYPE_DESC[name] ?? null,
      agentDescription: ai.description ? oneLine(ai.description) : null,
      bestFor: Array.isArray(ai.bestFor) ? ai.bestFor : [],
      notFor: Array.isArray(ai.notFor) ? ai.notFor : [],
      schematic: SLIDE_TYPE_SCHEMATIC[name] ?? def.schematic ?? null,
      layoutVariants: Array.isArray(def.layoutVariants)
        ? def.layoutVariants.map((v) => ({
            id: v.id,
            label: v.label ?? v.id,
            schematic: v.schematic ?? null,
          }))
        : [],
      // The nine accessibility/background/logo fields every type carries are
      // listed once at the top level instead of thirty-eight times here.
      fields: fields.filter((f) => !globalKeys.has(f.key)).map(shapeField),
    };
  });

  const globalFields = (SLIDE_TYPES['content-slide']?.fields ?? [])
    .filter((f) => globalKeys.has(f.key))
    .map(shapeField);

  const active = types.filter((t) => !t.deprecated);

  return {
    $comment: 'GENERATED by scripts/generate-slide-types.js from ../deckyard. Do not edit by hand.',
    count: types.length,
    activeCount: active.length,
    deprecatedCount: types.length - active.length,
    groups: Object.keys(PICKER_GROUPS).concat('other'),
    globalFields,
    types,
  };
}

/**
 * The format's own constants, taken out of core rather than retyped.
 *
 * Three of these have already been got wrong by hand somewhere: the schema `$id`
 * carries the *content* schema version (3), not the envelope version (1), and
 * the magic string is a project name the product no longer uses. Reading them
 * from the code that emits them is the only way a page about the format can be
 * trusted to describe the format.
 */
async function buildFormatData() {
  const deck = await coreImport(CORE_SOURCES.deck);
  const bundle = await coreImport(CORE_SOURCES.bundle);
  const jsonSchema = await coreImport(CORE_SOURCES.jsonSchema);
  const schemaVersion = await coreImport(CORE_SOURCES.schemaVersion);

  // The magic string and the envelope version are not exported as constants:
  // they are written into the envelope. So ask for an envelope and read them off
  // it, which also proves they are what an actual export carries.
  const sample = deck.presentationToDeck({ title: 'sample', theme: 'default', slides: [] });

  return {
    $comment: 'GENERATED by scripts/generate-slide-types.js from ../deckyard. Do not edit by hand.',
    magic: sample.format,
    envelopeVersion: sample.version,
    mime: bundle.DECK_MIMETYPE,
    bundleVersion: bundle.DECK_BUNDLE_VERSION,
    schemaBaseUri: jsonSchema.SCHEMA_BASE_URI,
    schemaVersion: schemaVersion.CURRENT_SCHEMA_VERSION,
  };
}

// ---------------------------------------------------------------------------
// Count markers
// ---------------------------------------------------------------------------

/**
 * Replace the number inside every count-marker span in `text`. The marker is an
 * HTML comment pair, so it is invisible in rendered markdown and the prose keeps
 * reading as prose:
 *
 *   Deckyard ships <!--gen:slide-type-count-->38<!--/gen:slide-type-count--> types
 */
function applyCountMarkers(text, count) {
  const re = new RegExp(`${escapeRe(MARKER_OPEN)}[\\s\\S]*?${escapeRe(MARKER_CLOSE)}`, 'g');
  return text.replace(re, `${MARKER_OPEN}${count}${MARKER_CLOSE}`);
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

/** Every file this script owns -> the content it should have. */
async function buildAllFiles() {
  const data = await buildData();
  const out = new Map();
  // Two-space indent plus a trailing newline is what prettier writes for JSON,
  // so `npm run format:check` stays green on a freshly generated file.
  out.set(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`);
  out.set(FORMAT_FILE, `${JSON.stringify(await buildFormatData(), null, 2)}\n`);
  for (const rel of COUNT_MARKER_FILES) {
    const abs = path.join(REPO_ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    out.set(rel, applyCountMarkers(fs.readFileSync(abs, 'utf8'), data.count));
  }
  return out;
}

async function main() {
  requireCore();
  const check = process.argv.includes('--check');
  const files = await buildAllFiles();
  let changed = 0;

  for (const [rel, content] of files) {
    const abs = path.join(REPO_ROOT, rel);
    const current = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
    if (current === content) continue;
    changed += 1;
    if (check) {
      console.error(`out of date: ${rel}`);
      continue;
    }
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
    console.log(`updated ${rel}`);
  }

  if (check && changed) {
    console.error('\nRun `npm run sync-slide-types` and commit the result.');
    process.exit(1);
  }
  console.log(changed ? `\n${changed} file(s) rewritten.` : 'Slide-type data already up to date.');
}

// pathToFileURL, not a template literal: this repo's path contains a space,
// which import.meta.url percent-encodes and a raw `file://${argv[1]}` does not.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
