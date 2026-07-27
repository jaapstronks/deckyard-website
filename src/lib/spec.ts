// The constants the spec pages are written against, and the examples they show.
//
// WHY ONE FILE
// Two of these are live questions rather than settled facts. The magic string
// still carries an old project name, and the schema `$id` domain is
// deckyard.app while the site is deckyard.eu. Both are being changed in core.
// Because every page reads them from here and no copy string spells either out,
// a rename is `npm run sync-slide-types` rather than a sweep through two
// languages of prose.
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

/**
 * The round trip, as four commands.
 *
 * This carries what the endpoint table's Access column used to carry, and more
 * plainly: three of these need a key and one does not. It is also the only claim
 * on the page a reader can check in ten seconds, which is worth more than a
 * tabulated list of paths.
 */
export const EXAMPLE_ROUNDTRIP = `# The portable envelope
curl -H "Authorization: Bearer $TOKEN" \\
  https://your-instance/api/presentations/42/export/json > deck.json

# The same deck with its images inside it
curl -H "Authorization: Bearer $TOKEN" \\
  https://your-instance/api/presentations/42/export/deck.zip > deck.deck

# Read either one back, on an instance that has never seen the first
curl -X POST -H "Authorization: Bearer $TOKEN" \\
  --data-binary @deck.deck \\
  https://other-instance/api/presentations/import/deck

# The content contract itself needs no credentials at all
curl ${LIVE_INSTANCE}/api/v1/schema/deck.json`;

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

// The envelope fields, the manifest fields and the endpoint list used to be
// tabulated here too. They moved to /docs/reference/, where the site's search
// can see them: a field table answers "what does field X do", which is a search
// rather than a page you read start to finish, and Pagefind only indexes the
// docs. The examples stay, because showing the envelope is a stronger claim
// than describing it.
