// The constants the spec pages are written against, and the examples they show.
//
// WHY ONE FILE
// Two of these are live questions rather than settled facts. The magic string is
// `slidecreator.deck` - an old project name the product no longer uses anywhere
// else - and the schema `$id` domain is deckyard.app, while the site is
// deckyard.eu. Both may change. Because every page reads them from here and no
// copy string spells either out, changing one is a one-line edit in core rather
// than a sweep through two languages of prose.
//
// WHY THEY ARE GENERATED
// They are not typed here either. src/data/deck-format.json is written out of
// the core repo by `npm run sync-slide-types`, because the obvious guesses are
// wrong: the schema `$id` carries the *content* schema version, not the envelope
// version, and the two are 3 and 1. A page about a format that gets the format's
// own version numbers wrong is worse than no page.
//
// Copy carries `{magic}`, `{mime}`, `{schemaBase}`, `{version}` and
// `{schemaVersion}` placeholders - the same trick lib/facts.ts uses for the
// slide-type count - and withSpec() substitutes them at render time.

import deckFormat from '@/data/deck-format.json';

const format = deckFormat as {
  magic: string;
  envelopeVersion: number;
  mime: string;
  bundleVersion: number;
  schemaBaseUri: string;
  schemaVersion: number;
};

/** The sentinel in a deck's `format` field, and in the package's mimetype entry. */
export const FORMAT_MAGIC = format.magic;

/** The media type a package declares. In the vendor tree; not IANA-registered. */
export const FORMAT_MIME = format.mime;

/** Envelope version. Bumped only for a breaking change to the envelope shape. */
export const ENVELOPE_VERSION = format.envelopeVersion;

/** Content-shape version. Moves independently of the envelope; it is at 3. */
export const SCHEMA_VERSION = format.schemaVersion;

/** Where generated JSON Schemas declare their `$id`, version segment included. */
export const SCHEMA_BASE = `${format.schemaBaseUri}/v${SCHEMA_VERSION}`;

/** The core repo, which is where all of this is implemented. */
export const CORE_REPO = 'https://github.com/jaapstronks/deckyard';

/**
 * A running instance to fetch live schemas from. The sandbox is the one anybody
 * can reach without installing anything, and the schema routes on it are open.
 */
export const LIVE_INSTANCE = 'https://sandbox.deckyard.eu';

/** The live, key-less schema URL for one slide type. */
export function liveSchemaUrl(typeName: string): string {
  return `${LIVE_INSTANCE}/api/v1/schema/slide-types/${typeName}.json`;
}

const TOKENS: Record<string, string> = {
  magic: FORMAT_MAGIC,
  mime: FORMAT_MIME,
  schemaBase: SCHEMA_BASE,
  version: String(ENVELOPE_VERSION),
  schemaVersion: String(SCHEMA_VERSION),
};

/** Substitute the spec constants into a copy string. */
export function withSpec(copy: string): string {
  return copy.replace(
    /\{(magic|mime|schemaBase|version|schemaVersion)\}/g,
    (_, key: string) => TOKENS[key]
  );
}

// ---------------------------------------------------------------------------
// Examples
//
// Not copy: the same JSON is shown in every language, so it lives beside the
// component rather than being duplicated per locale where the two could drift.
// ---------------------------------------------------------------------------

export const EXAMPLE_ENVELOPE = `{
  "format": "${FORMAT_MAGIC}",
  "version": ${ENVELOPE_VERSION},
  "title": "My deck",
  "theme": "default",
  "slideTypes": {
    "title-slide": "core/title-slide",
    "quote-slide": "core/quote-slide"
  },
  "slides": [
    { "type": "title-slide", "content": { "title": "Hello", "background": "lime" } },
    { "type": "quote-slide", "content": { "quote": "A deck is data.", "attribution": "Deckyard" } }
  ]
}`;

export const EXAMPLE_SLIDE = `{ "type": "content-slide", "content": { "title": "Why", "body": "..." } }`;

/**
 * The archive listing, and nothing else. The explanation of each entry lives in
 * the locale files below: an annotated listing meant commentary in English sat
 * inside the Dutch page, which is the one place a translated spec is allowed to
 * look untranslated and should not.
 */
export const EXAMPLE_BUNDLE_LAYOUT = `mimetype
manifest.json
deck.json
assets/<sha256>.<ext>`;

/** The four archive entries, in the order the ZIP holds them. */
export const BUNDLE_ENTRIES: { entry: string; key: string }[] = [
  { entry: 'mimetype', key: 'mimetype' },
  { entry: 'manifest.json', key: 'manifest' },
  { entry: 'deck.json', key: 'deck' },
  { entry: 'assets/<sha256>.<ext>', key: 'assets' },
];

export const EXAMPLE_MANIFEST = `{
  "format": "${FORMAT_MAGIC}",
  "bundleVersion": ${format.bundleVersion},
  "mimetype": "${FORMAT_MIME}",
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

export const EXAMPLE_SCHEMA_ID = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "${SCHEMA_BASE}/slide-types/quote-slide.schema.json",
  "title": "quote-slide slide content",
  "type": "object",
  "properties": {
    "quote": { "type": "string", "maxLength": 400 },
    "attribution": { "type": "string", "maxLength": 160 }
  },
  "required": ["quote"],
  "additionalProperties": true
}`;

/**
 * The endpoints that produce and consume a deck.
 *
 * `open` is load-bearing and was checked, not assumed: only the schema routes
 * answer without credentials. Saying "no API key needed" about the rest would be
 * the kind of claim a reader disproves with one curl.
 */
export const API_ENDPOINTS: {
  method: string;
  path: string;
  key: string;
  open: boolean;
}[] = [
  { method: 'GET', path: '/api/v1/schema/deck.json', key: 'deckSchema', open: true },
  {
    method: 'GET',
    path: '/api/v1/schema/slide-types/:name.json',
    key: 'typeSchema',
    open: true,
  },
  { method: 'GET', path: '/api/v1/slide-types', key: 'typeList', open: false },
  {
    method: 'GET',
    path: '/api/presentations/:id/export/json',
    key: 'exportJson',
    open: false,
  },
  {
    method: 'GET',
    path: '/api/presentations/:id/export/deck.zip',
    key: 'exportBundle',
    open: false,
  },
  { method: 'POST', path: '/api/presentations/import/json', key: 'importJson', open: false },
  { method: 'POST', path: '/api/presentations/import/deck', key: 'importBundle', open: false },
];

/** The envelope, field by field. Keys resolve to the per-locale note. */
export const ENVELOPE_FIELDS: { field: string; type: string; key: string }[] = [
  { field: 'format', type: 'string', key: 'format' },
  { field: 'version', type: 'integer', key: 'version' },
  { field: 'title', type: 'string', key: 'title' },
  { field: 'theme', type: 'string', key: 'theme' },
  { field: 'slideTypes', type: 'object', key: 'slideTypes' },
  { field: 'slides', type: 'array', key: 'slides' },
];

/** The package manifest's asset record, field by field. */
export const MANIFEST_FIELDS: { field: string; key: string }[] = [
  { field: 'ref', key: 'ref' },
  { field: 'id', key: 'id' },
  { field: 'hash', key: 'hash' },
  { field: 'mime', key: 'mime' },
  { field: 'bytes', key: 'bytes' },
  { field: 'sources', key: 'sources' },
  { field: 'missingAssets', key: 'missingAssets' },
];
