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

/** The exhaustive slide-type reference in the docs, written whole (see buildSlideTypeDoc). */
export const DOC_TYPES_FILE = 'docs/reference/slide-types.md';

/** Hand-written files carrying generated facts inside marker spans (see applyMarkers). */
export const MARKER_FILES = [
  'README.md',
  'docs/slide-types/index.md',
  'docs/reference/index.md',
  'docs/reference/deck-format.md',
  'docs/reference/deck-bundle.md',
  'docs/reference/schemas.md',
];

/** Core modules this script reads. Mirrored in docs-sync/registry.json. */
const CORE_SOURCES = {
  registry: 'shared/slide-types/registry.js',
  structure: 'shared/slide-types/structure.js',
  runtime: 'shared/slide-types/runtime.js',
  tiers: 'shared/slide-types/tiers.js',
  schematics: 'client/views/editor/slide-type-schematics.js',
  picker: 'client/views/editor/slide-type-picker/data.js',
  companions: 'shared/slide-types/authoring-companions.js',
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

/**
 * The named exports this script destructures out of core, per module.
 *
 * Checked up front so a missing one is a sentence instead of a TypeError forty
 * lines later. Core's dead-export sweep (deckyard#536) un-exported three of
 * these at once - `SLIDE_STRUCTURES`, `SLIDE_RUNTIMES`, `LIVE_INTERACTIONS` -
 * because the grep that found them ran inside core, and this script is their
 * only consumer, in another repo. Without a preflight that surfaces as one
 * crash per constant: fix one, run again, crash on the next.
 */
const REQUIRED_EXPORTS = {
  registry: ['SLIDE_TYPES', 'CORE_SLIDE_TYPE_NAMES', 'SLIDE_TYPE_IDS', 'GLOBAL_SLIDE_FIELD_KEYS'],
  structure: ['SLIDE_STRUCTURES', 'SLIDE_STRUCTURE_NAMES', 'slideStructure'],
  runtime: [
    'SLIDE_RUNTIMES',
    'SLIDE_RUNTIME_NAMES',
    'LIVE_INTERACTIONS',
    'LIVE_INTERACTION_NAMES',
    'slideRuntime',
    'slideLiveInteraction',
  ],
  tiers: ['SLIDE_TIERS', 'CORE_PROFILE', 'slideTypeTier', 'slideFallback'],
  schematics: ['SLIDE_TYPE_SCHEMATIC'],
  picker: ['PICKER_GROUP_ORDER', 'PICKER_GROUP_KEYS'],
  companions: ['SLIDE_TYPE_DESCRIPTION'],
  catalog: ['getCoreSlideCatalog'],
};

/** Report every export core is missing at once, then stop. */
function requireExports(modules) {
  const missing = [];
  for (const [key, names] of Object.entries(REQUIRED_EXPORTS)) {
    for (const name of names) {
      if (modules[key][name] === undefined) missing.push(`${CORE_SOURCES[key]}: ${name}`);
    }
  }
  if (!missing.length) return;
  console.error(
    `Core no longer exports ${missing.length} thing(s) this script reads:\n` +
      missing.map((m) => `  ${m}`).join('\n') +
      '\n\nThe committed src/data/slide-types.json is what the build uses, so the site is\n' +
      'not broken - it is just frozen at the last successful run. Re-exporting these in\n' +
      '../deckyard is the fix; deleting them there is not, because this repo is the\n' +
      'consumer core greps for and does not find.'
  );
  process.exit(1);
}

async function buildData() {
  const registry = await coreImport(CORE_SOURCES.registry);
  const structureModule = await coreImport(CORE_SOURCES.structure);
  const runtimeModule = await coreImport(CORE_SOURCES.runtime);
  const tiersModule = await coreImport(CORE_SOURCES.tiers);
  const schematics = await coreImport(CORE_SOURCES.schematics);
  const picker = await coreImport(CORE_SOURCES.picker);
  const companions = await coreImport(CORE_SOURCES.companions);
  const catalog = await coreImport(CORE_SOURCES.catalog);

  requireExports({
    registry,
    structure: structureModule,
    runtime: runtimeModule,
    tiers: tiersModule,
    schematics,
    picker,
    companions,
    catalog,
  });

  const { SLIDE_TYPES, CORE_SLIDE_TYPE_NAMES, SLIDE_TYPE_IDS, GLOBAL_SLIDE_FIELD_KEYS } = registry;
  const { SLIDE_STRUCTURES, SLIDE_STRUCTURE_NAMES, slideStructure } = structureModule;
  const {
    SLIDE_RUNTIMES,
    SLIDE_RUNTIME_NAMES,
    LIVE_INTERACTIONS,
    LIVE_INTERACTION_NAMES,
    slideRuntime,
    slideLiveInteraction,
  } = runtimeModule;
  const { SLIDE_TIERS, CORE_PROFILE, slideTypeTier, slideFallback } = tiersModule;
  const { SLIDE_TYPE_SCHEMATIC } = schematics;
  // The picker declares its shelves; the one-line description of a type moved to
  // the authoring companions, which is where core keeps the prose it puts on the
  // wire. Both are core's own vocabulary, so neither is restated here.
  const { PICKER_GROUP_ORDER, PICKER_GROUP_KEYS } = picker;
  const { SLIDE_TYPE_DESCRIPTION } = companions;
  const aiCatalog = catalog.getCoreSlideCatalog();

  const globalKeys = new Set(GLOBAL_SLIDE_FIELD_KEYS);

  // Which curated group a type sits in. The picker's groups are the editor's own
  // shelving; anything it leaves out is a long tail, not a gap, so it lands in
  // 'other' rather than being forced somewhere.
  const groupOf = new Map();
  for (const [group, names] of Object.entries(PICKER_GROUP_ORDER)) {
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
      // The `structure` facet: the shape of the type's primary content, read
      // straight off its definition. `slideStructure()` returns '' for a type
      // that declares none, which is core's own answer and not a default this
      // side invents - a type missing from the facet has to look missing.
      structure: slideStructure(def) || null,
      // The `runtime` facet: what the presenting session has to do for the type
      // beyond serving it. Same rule as `structure` - core's '' becomes null
      // rather than a default, so a type outside the facet reads as outside it.
      runtime: slideRuntime(def) || null,
      // Only a `live` type carries one, and core asserts that in both
      // directions, so this is null on everything else by construction.
      interaction: slideLiveInteraction(def) || null,
      // Which of the three promises covers this name. Resolved off the *name*,
      // the way core resolves it: the tier is what we promise about a name, so a
      // fork answering a core name inherits that promise rather than escaping
      // it. Everything this file publishes is core, hence 1 or 2 only.
      tier: slideTypeTier(name),
      // The tier-1 contract a reader that implements only the core profile
      // should degrade this type to. Empty on a tier-1 type, which *is* the
      // floor, so null here says "nothing to degrade to" rather than "missing".
      fallback: slideFallback(def) || null,
      // "Does the audience take part?" - the filter that separates Deckyard from
      // a slide editor. Derived, not asserted: a type counts when the editor
      // shelves it under interaction or the agent catalog files it as
      // interactive. Both live in core, so this cannot drift on its own.
      audience: group === 'interaction' || ai.category === 'interactive',
      description: SLIDE_TYPE_DESCRIPTION[name] ?? null,
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
    groups: [...PICKER_GROUP_KEYS, 'other'],
    // The `structure` vocabulary, in core's own order, each with the one-line
    // meaning core states. The site groups by this rather than by `groups`
    // above: the picker's shelving mixes four axes (familiarity, payload,
    // rhetorical function, runtime behaviour) and is the editor's furniture,
    // while `structure` is a claim about the content shape that an implementor
    // can build against.
    structures: SLIDE_STRUCTURE_NAMES.map((name) => ({
      name,
      meaning: SLIDE_STRUCTURES[name],
    })),
    // The `runtime` vocabulary, same shape and same reason. Three values, and
    // unlike `structure` they are wildly unbalanced - which is the useful part:
    // the large majority of the catalogue asks nothing of a session at all.
    runtimes: SLIDE_RUNTIME_NAMES.map((name) => ({
      name,
      meaning: SLIDE_RUNTIMES[name],
    })),
    // The sub-declaration a `live` type carries. Not a third facet: these are
    // the values the follow API already puts on the wire as `interaction.type`.
    interactions: LIVE_INTERACTION_NAMES.map((name) => ({
      name,
      meaning: LIVE_INTERACTIONS[name],
    })),
    // The tier ladder. Core keys it by number because "tier 1" is how everyone
    // says it; the site needs the same numbers to sort by, so the key stays a
    // number here too rather than being renamed into a slug.
    tiers: Object.entries(SLIDE_TIERS).map(([tier, meaning]) => ({
      tier: Number(tier),
      meaning,
    })),
    // The nine normative types, in core's own order. Order is the argument -
    // title, section break, prose, enumeration, quotation, image, image-text,
    // table, closing is a presentation read start to end - so it is not sorted.
    coreProfile: [...CORE_PROFILE],
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
// Markers
//
// A hand-written page can still carry a generated fact. The marker is an HTML
// comment pair, invisible in rendered markdown, so the prose keeps reading as
// prose and the value inside it is owned by this script:
//
//   Deckyard ships <!--gen:slide-type-count-->38<!--/gen:slide-type-count--> types
//
// The token value is the *rendered snippet*, backticks and fenced blocks
// included, because a marker cannot live inside a code span or a fence: an HTML
// comment there would show up as text. So the marker wraps the whole snippet and
// the value carries its own formatting.
// ---------------------------------------------------------------------------

/** Every fact a hand-written page may claim, keyed by marker name. */
export function markerTokens(data, format) {
  const schemaBase = `${format.schemaBaseUri}/v${format.schemaVersion}`;
  const code = (s) => `\`${s}\``;
  // A fenced block sits on its own lines, so the marker pair needs blank lines
  // around it or the fence glues itself to the surrounding paragraph.
  const fence = (lang, body) => `\n\n\`\`\`${lang}\n${body}\n\`\`\`\n\n`;

  return {
    'slide-type-count': String(data.count),
    'slide-type-active-count': String(data.activeCount),
    magic: code(format.magic),
    mime: code(format.mime),
    'envelope-version': String(format.envelopeVersion),
    'bundle-version': String(format.bundleVersion),
    'schema-version': String(format.schemaVersion),
    'schema-url-type': code(`${schemaBase}/slide-types/<type>.schema.json`),
    'schema-url-deck': code(`${schemaBase}/deck.schema.json`),
    'example-envelope': fence('json', exampleEnvelope(format)),
    'example-manifest': fence('json', exampleManifest(format)),
    'example-bundle-layout': fence('', exampleBundleLayout(format)),
    'example-schema': fence('json', exampleSchema(format)),
  };
}

/**
 * Replace the content of every marker span this script knows about. Markers it
 * does not know are left alone; a page may carry a marker for a fact that is
 * introduced later, and silently blanking it would be worse than ignoring it.
 */
export function applyMarkers(text, tokens) {
  let out = text;
  for (const [name, value] of Object.entries(tokens)) {
    const open = `<!--gen:${name}-->`;
    const close = `<!--/gen:${name}-->`;
    const re = new RegExp(`${escapeRe(open)}[\\s\\S]*?${escapeRe(close)}`, 'g');
    out = out.replace(re, `${open}${value}${close}`);
  }
  return out;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Examples
//
// The same JSON the /spec/ pages show (src/lib/spec.ts), built from the same
// generated constants. A magic string typed into an example beside a table that
// says something else is worse than a stale page: it is a page arguing with
// itself.
// ---------------------------------------------------------------------------

function exampleEnvelope(format) {
  return `{
  "format": "${format.magic}",
  "version": ${format.envelopeVersion},
  "title": "My deck",
  "theme": "default",
  "slides": [
    { "type": "eu.deckyard.slide.title", "content": { "title": "Hello", "background": "lime" } }
  ]
}`;
}

function exampleBundleLayout(format) {
  return `mimetype               First entry, STORED (uncompressed). Content:
                       "${format.mime}". Lets the archive be
                       identified by magic number.
manifest.json          Package metadata + the asset inventory (see below).
deck.json              The portable deck (as from presentationToDeck), with
                       every asset ref rewritten to a bundle ref.
assets/<sha256>.<ext>  The asset bytes, content-addressed by SHA-256 of the
                       content. Identical bytes are stored once (dedup).`;
}

function exampleManifest(format) {
  return `{
  "format": "${format.magic}",
  "bundleVersion": ${format.bundleVersion},
  "mimetype": "${format.mime}",
  "deck": "deck.json",
  "assets": [
    {
      "ref": "assets/e2e9…445a.png",
      "id": "sha256-4unkYiBMX+HF…",
      "hash": "e2e9…445a",
      "mime": "image/png",
      "bytes": 1265204,
      "sources": ["/uploads/photo-1a2b.png"]
    }
  ],
  "missingAssets": ["/uploads/gone.png"]
}`;
}

function exampleSchema(format) {
  const schemaBase = `${format.schemaBaseUri}/v${format.schemaVersion}`;
  return `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "${schemaBase}/slide-types/quote-slide.schema.json",
  "title": "quote-slide slide content",
  "type": "object",
  "properties": {
    "quote": { "type": "string", "maxLength": 400 },
    "attribution": { "type": "string", "maxLength": 160 }
  },
  "required": ["quote"],
  "additionalProperties": true
}`;
}

// ---------------------------------------------------------------------------
// The docs reference page
//
// /spec/slide-types/ shows the same registry as a set of cards with layout
// glyphs: an argument, read once. This is the other half of that - a flat table
// per type, read by somebody who is holding a `content` object and wants to know
// what may go in it. It exists in the docs rather than beside the spec because
// only the docs are indexed by the site's search, and "what does field X do" is
// a search, not a page you browse to.
// ---------------------------------------------------------------------------

/** Picker groups in the order the reference walks them. */
const GROUP_LABELS = {
  basic: 'Basics',
  media: 'Media',
  layouts: 'Layouts',
  data: 'Data',
  interaction: 'Interaction',
  other: 'Other',
};

/** A markdown table cell: pipes break the row, newlines break the table. */
function cell(value) {
  return String(value ?? '')
    .replace(/\r?\n/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

function fieldRow(field) {
  const limit = Number.isFinite(field.maxLength) ? String(field.maxLength) : '—';
  const options = field.options?.length
    ? field.options.map((o) => `\`${o.value}\``).join(', ')
    : '—';
  return `| \`${cell(field.key)}\` | ${cell(field.label)} | \`${cell(field.type)}\` | ${
    field.required ? 'Yes' : 'No'
  } | ${limit} | ${options} |`;
}

function fieldTable(fields) {
  const lines = [
    '| Key | Label | Type | Required | Limit | Options |',
    '| --- | --- | --- | --- | --- | --- |',
    ...fields.map(fieldRow),
  ];
  // A repeater's shape matters more than the fact that it repeats, so each one
  // gets its item fields spelled out under the table rather than an "items" row
  // that tells the reader nothing.
  for (const field of fields) {
    if (!field.itemFields?.length) continue;
    lines.push('', `Each item in \`${field.key}\`:`, '', ...fieldTable(field.itemFields));
  }
  return lines;
}

function typeSection(type) {
  const lines = [`### ${type.label} — \`${type.name}\``, ''];

  // The declared facets belong on the searchable half too: somebody holding a
  // `content` object and asking "does my renderer need a session for this?", or
  // "what do I degrade this to?", is searching, not browsing /spec/slide-types/.
  const meta = [`Identity \`${type.id}\``, `tier ${type.tier}`];
  if (type.structure) meta.push(`structure \`${type.structure}\``);
  if (type.runtime) {
    meta.push(`runtime \`${type.runtime}\`${type.interaction ? ` (\`${type.interaction}\`)` : ''}`);
  }
  if (type.fallback) meta.push(`falls back to \`${type.fallback}\``);
  if (type.audience) meta.push('the audience takes part');
  if (type.deprecated) meta.push('**retired**');
  lines.push(`${meta.join(' · ')}.`, '');

  // The picker's one-liner, not the AI catalogue's. The catalogue's prose is
  // written at a model ("USE THIS AS A LAST RESORT") and reads as prompt
  // engineering on a page a person is reading; /spec/slide-types/ is where the
  // "reach for it when" material belongs.
  if (type.description) lines.push(`${type.description}.`, '');

  if (type.fields.length) {
    lines.push(...fieldTable(type.fields), '');
  } else {
    lines.push('No type-specific fields; it carries the global fields only.', '');
  }

  if (type.layoutVariants.length) {
    const variants = type.layoutVariants.map((v) => `\`${v.id}\` (${v.label})`).join(', ');
    lines.push(`Layout variants: ${variants}.`, '');
  }

  return lines;
}

export function buildSlideTypeDoc(data, format) {
  const schemaBase = `${format.schemaBaseUri}/v${format.schemaVersion}`;
  const active = data.types.filter((t) => !t.deprecated);
  const retired = data.types.filter((t) => t.deprecated);

  const lines = [
    '---',
    'title: "Slide types"',
    'description: "Every built-in slide type with its fields, types, limits and options. Generated from the core registry."',
    '---',
    '',
    '<!-- GENERATED by scripts/generate-slide-types.js from ../deckyard. Do not edit by hand. -->',
    '',
    `Deckyard ships ${data.count} built-in slide types: ${data.activeCount} offered when you add a slide,`,
    `and ${data.deprecatedCount} retired ones that still render, because a deck that stops opening`,
    'is a deck you have lost.',
    '',
    'This page is the exhaustive field list, generated from the same registry that',
    'builds the editor form, runs validation and generates the JSON Schemas. For the',
    'same types as a visual catalogue with layout diagrams, see',
    '[the slide-type spec](/spec/slide-types/); for a guided tour of what each one is',
    'for, see [Slide Types](/docs/slide-types/).',
    '',
    '## Reading the tables',
    '',
    "- **Key** is the property name inside a slide's `content` object.",
    '- **Required** means the importer will not blank it; an absent or empty value',
    '  falls back to the type default.',
    '- **Limit** is the maximum length in characters, where the type declares one.',
    '- **Options** lists the accepted values of an enumerated field.',
    '- Every type also accepts the [global fields](#fields-every-type-carries) below.',
    '',
    'The line under each heading carries what the type declares about itself, none',
    "of which is part of its JSON Schema - the schema describes a slide's content,",
    'and these are statements about the type:',
    '',
    '- **Tier** is how far our promise goes. Tier 1 is the normative core profile a',
    '  conforming implementation renders; tier 2 we ship and publish, but it versions',
    '  with the app.',
    '- **Structure** is the shape of the primary content, and it is the axis worth',
    '  building a reader against: six values cover every type.',
    '- **Runtime** is what the presenting session has to do beyond serving the slide',
    '  (`static` - nothing, `timed` - a presenter-driven clock, `live` - the audience',
    '  answers and the session aggregates), with the kind of answer a `live` type',
    '  collects in brackets.',
    '- **Falls back to** is the tier-1 contract to degrade to when you have not',
    '  implemented the type. Every tier-2 type declares one, which is why a reader',
    '  that knows only the nine still renders every deck without dropping content.',
    '',
    'All four are readable from `GET /api/slide-types` on any instance, and the',
    'argument behind them is on [the conformance page](/spec/conformance/).',
    '',
    `Each type's JSON Schema is served at`,
    `\`${schemaBase}/slide-types/<type>.schema.json\` — see`,
    '[JSON Schemas](/docs/reference/schemas/) for how to fetch it.',
    '',
    '## Fields every type carries',
    '',
    `The ${data.globalFields.length} accessibility, background and logo fields below are added to every slide`,
    `type rather than declared on each one. They are listed here once instead of ${data.count} times.`,
    '',
    ...fieldTable(data.globalFields),
    '',
  ];

  for (const group of data.groups) {
    const inGroup = active.filter((t) => t.group === group);
    if (!inGroup.length) continue;
    lines.push(`## ${GROUP_LABELS[group] ?? group}`, '');
    for (const type of inGroup) lines.push(...typeSection(type));
  }

  if (retired.length) {
    lines.push(
      '## Retired types',
      '',
      'These are no longer offered when you add a slide, but they still render and',
      'still import. An unknown type degrades to a placeholder; a retired one does',
      'not have to.',
      ''
    );
    for (const type of retired) lines.push(...typeSection(type));
  }

  return `${lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()}\n`;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

/**
 * The JSON Schemas themselves, written into public/ so the site serves them at
 * the exact URL their own `$id` claims.
 *
 * This is the half that makes the `$id` mean something. A JSON Schema `$id` is
 * an identifier and is not formally required to be fetchable, but a format
 * offered to other people as a standard should resolve, and until this existed
 * the site had to say so on /spec/schemas/ as a known gap.
 *
 * Two rules worth knowing:
 *
 * - CORE types only, via CORE_SLIDE_TYPE_NAMES, never Object.keys(SLIDE_TYPES).
 *   On a fork checkout the latter also carries whatever sits in
 *   deckyard/custom/slide-types/, and this writes files that get published on
 *   deckyard.eu. Same rule, and much sharper teeth, than for slide-types.json.
 * - Nothing is ever deleted here. The directory is versioned (v3), and a
 *   published schema URL is a promise: a type that is retired keeps the schema
 *   it was published with, because somebody's deck out there still names it.
 *   Only a schema-version bump opens a new directory.
 */
async function buildSchemaFiles(format) {
  const registry = await coreImport(CORE_SOURCES.registry);
  const jsonSchema = await coreImport(CORE_SOURCES.jsonSchema);
  const { SLIDE_TYPES, CORE_SLIDE_TYPE_NAMES } = registry;

  const core = {};
  for (const name of [...CORE_SLIDE_TYPE_NAMES].sort()) {
    if (SLIDE_TYPES[name]) core[name] = SLIDE_TYPES[name];
  }

  const dir = `public/schema/v${format.schemaVersion}`;
  const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
  const out = new Map();

  out.set(`${dir}/deck.schema.json`, json(jsonSchema.deckJsonSchema(core)));
  for (const name of Object.keys(core)) {
    out.set(
      `${dir}/slide-types/${name}.schema.json`,
      json(jsonSchema.slideTypeContentSchema(name, core[name], { withMeta: true }))
    );
  }

  // A directory document, because the version root is otherwise a set of files
  // with no way to discover them. Not a substitute for /spec/schemas/, which is
  // where a person should land; this one is for whatever is reading.
  const base = `${format.schemaBaseUri}/v${format.schemaVersion}`;
  out.set(
    `${dir}/index.json`,
    json({
      $comment: 'GENERATED by scripts/generate-slide-types.js from ../deckyard.',
      schemaVersion: format.schemaVersion,
      deck: `${base}/deck.schema.json`,
      slideTypes: Object.fromEntries(
        Object.keys(core).map((name) => [name, `${base}/slide-types/${name}.schema.json`])
      ),
    })
  );

  return out;
}

/** Every file this script owns -> the content it should have. */
async function buildAllFiles() {
  const data = await buildData();
  const format = await buildFormatData();
  const out = new Map();
  // Two-space indent plus a trailing newline is what prettier writes for JSON,
  // so `npm run format:check` stays green on a freshly generated file.
  out.set(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`);
  out.set(FORMAT_FILE, `${JSON.stringify(format, null, 2)}\n`);
  out.set(DOC_TYPES_FILE, buildSlideTypeDoc(data, format));

  for (const [rel, content] of await buildSchemaFiles(format)) out.set(rel, content);

  const tokens = markerTokens(data, format);
  for (const rel of MARKER_FILES) {
    const abs = path.join(REPO_ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    out.set(rel, applyMarkers(fs.readFileSync(abs, 'utf8'), tokens));
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
