---
title: "Deck format"
description: "The portable deck envelope, field by field: slides, the identity manifest, asset refs, round-trip and versioning."
---

The deck format is Deckyard's **portable, versioned deck interchange format** — the
durable envelope a presentation serializes to, so a second implementation can
read, render and round-trip it without Deckyard's server or storage. It is what
`GET /api/presentations/:id/export/json` returns, and what the
[deck package](/docs/reference/deck-bundle/) carries as its `deck.json`.

A deck is **data, not a rendering.** The format is intentionally readable and
stable: no server-internal UUIDs or timestamps are required, and slides are a
flat array of `{ type, content }`.

The canonical example lives at `tests/fixtures/example-deck.json` in the core
repository and is exercised by `tests/deck-format-spec.test.js`, the CI gate
behind this format.

:::note
This page is the field-level reference. For why the format exists, what it
guarantees and what is still open, see [the format spec](/spec/deck-format/).
:::

## Envelope

<!--gen:example-envelope-->

```json
{
  "format": "deckyard.deck",
  "version": 1,
  "title": "My deck",
  "theme": "default",
  "slideTypes": { "title-slide": "core/title-slide" },
  "slides": [
    { "type": "title-slide", "content": { "title": "Hello", "background": "lime" } }
  ]
}
```

<!--/gen:example-envelope-->

| Field        | Type    | Notes                                                                                                                                                          |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`     | string  | Always <!--gen:magic-->`deckyard.deck`<!--/gen:magic-->. The magic sentinel that identifies the format. A conforming reader also accepts the historical `slidecreator.deck` (see [Legacy sentinel](#legacy-sentinel)). |
| `version`    | integer | Format version. <!--gen:envelope-version-->1<!--/gen:envelope-version--> today. Bumped only on a breaking envelope change (see [Versioning](#versioning)).      |
| `title`      | string  | Human title of the deck.                                                                                                                                       |
| `theme`      | string  | Theme id the deck was authored against (e.g. `"default"`). A reader that lacks the theme falls back to its own default; content is unaffected.                  |
| `slideTypes` | object  | Identity manifest: bare type key → `namespace/name[@version]` (see below).                                                                                      |
| `slides`     | array   | Ordered list of slides, each `{ type, content }`.                                                                                                              |

The envelope is **lenient**: unknown top-level keys are ignored by the importer,
not rejected. This keeps forward-compatibility — a newer producer can add fields
an older reader simply skips.

## `slideTypes` — the identity manifest

`slideTypes` records which slide-type **definitions** a deck was written against,
as a map of the bare type key to its qualified identity:

```json
"slideTypes": {
  "title-slide": "core/title-slide",
  "quote-slide": "core/quote-slide"
}
```

- The value is `namespace/name[@version]`. Core types resolve to the `core/`
  namespace; a custom type carries its own namespace (e.g. `acme/hero`).
- It is **recomputed from the registry on every export** (never hand-maintained),
  so it cannot drift from the slides it describes. The CI fixture test asserts
  the committed example's manifest equals the recomputed one.
- `slides[].type` stays the **bare key** for back-compat; the manifest is the
  place a reader learns which definition/version each key needs. A qualified ref
  in `slides[].type` (e.g. `core/title-slide`) also imports — it resolves by
  identity, and storage keeps the bare local name.

See [custom slide types](/docs/customization/custom-slide-types/) for how a
namespace of your own enters the registry.

## Slides

Each slide is:

```json
{ "type": "content-slide", "content": { "title": "Why", "body": "..." } }
```

- **`type`** — the slide-type key (bare, or a qualified `namespace/name` ref).
- **`content`** — an object whose shape is defined by that slide type's field
  registry. Absent or `""` fields mean "unset"; the importer fills type defaults
  and never blanks a required field.

Every type's fields are listed in the [slide-type reference](/docs/reference/slide-types/).

Portable slides carry **no `id`** — ids are a storage concern and are
(re)generated on import. A reader must not depend on slide identity across a
round-trip.

### Content schema (the single source)

Each slide type's `content` shape is described by a generated JSON Schema derived
from the same `fields[]` registry that drives validation and the editor — one
source, no hand-synced copy. The schemas are served live and are versioned by
`$id`:

- Per-type: <!--gen:schema-url-type-->`https://deckyard.app/schema/v3/slide-types/<type>.schema.json`<!--/gen:schema-url-type-->
- Whole deck (discriminated by `type`): <!--gen:schema-url-deck-->`https://deckyard.app/schema/v3/deck.schema.json`<!--/gen:schema-url-deck-->
- Reflected at runtime alongside `GET /api/v1/slide-types`.

Schemas are **lenient contracts, not gates**: `additionalProperties` is allowed
so legacy and forward-compatible keys still validate. They document the known
shape; they do not reject history. (Note the generated deck schema describes the
_stored_ deck, which additionally carries `id`/`schemaVersion`; the portable
envelope here is the interchange projection of that model.)

See [JSON Schemas](/docs/reference/schemas/) for how to fetch them.

## Asset references

Images are referenced by string:

- **Local uploads** — `"/uploads/<name>-<uuid>.<ext>"`. Server-hosted; portable
  only while that server is reachable.
- **External URLs** — `"https://…"`. Already portable; left untouched by every
  transform.

To make a deck **self-contained** (assets travel with it), use the
[deck package](/docs/reference/deck-bundle/): a ZIP that embeds each local
asset's bytes content-addressed as `assets/<hash>.<ext>` and rewrites the deck's
refs to those bundle refs. Import re-hydrates them back to `/uploads/`. Bundle
refs (`assets/…`) never appear in a portable (non-bundled) deck.

## Round-trip guarantee

For content-bearing slides, `export → import → export` is a **fixpoint**: after
one normalization pass (defaults filled, ids regenerated) the portable
projection is stable, and identical asset bytes hash to identical content
addresses. `tests/deck-format-spec.test.js` proves this on the example fixture;
`tests/import-deck.test.js` proves it end-to-end through the bundle importer.

Deliberate lossy edges (they degrade, they do not crash):

- An **unknown slide type** imports as a `content-slide` placeholder that names
  the type it could not resolve, says whether the type was deliberately retired
  and what replaces it, and carries the original content across as markdown.
- A **missing local asset** keeps its `/uploads/…` ref and imports as a dangling
  reference.

## Versioning

- `version` is the **envelope** version, bumped only for a breaking change to the
  envelope shape itself. It is <!--gen:envelope-version-->1<!--/gen:envelope-version--> today.
- Slide **content** shape is versioned independently by the schema `$id`
  (`/v<N>/…`), currently version <!--gen:schema-version-->3<!--/gen:schema-version-->,
  tied to the storage `schemaVersion` and its migration runner. A reader validates
  content against the schema version it understands; the lenient contract lets it
  tolerate newer keys.

The two numbers are different on purpose and have already drifted apart. Do not
read the `$id` version as the envelope version.

## Legacy sentinel

Until 1.7.0 the `format` field was written as `slidecreator.deck`, and the
package media type as `application/vnd.slidecreator.deck`. That name predates the
product: it was invented in the commit that first added JSON export, before this
was called Deckyard.

- **Producers** write only the current sentinel. Nothing emits the old value any
  more, and nothing needs to.
- **Readers** accept both, permanently. Decks and packages carrying the old
  sentinel exist and will keep turning up; a reader that rejects them has not
  implemented this format.
- **The file extension never changed.** A package downloads as `<title>.deck`
  either way, so nothing on disk needs renaming.

The only thing that has to change anywhere is tooling of your own that matches on
the `format` field: teach it both values.

## Producing and consuming a deck

| Method | Endpoint                                  | What it does                            | Access        |
| ------ | ----------------------------------------- | --------------------------------------- | ------------- |
| `GET`  | `/api/presentations/:id/export/json`      | The portable envelope for one deck.     | Authenticated |
| `GET`  | `/api/presentations/:id/export/deck.zip`  | The self-contained package.             | Authenticated |
| `POST` | `/api/presentations/import/json`          | The import side of the envelope.        | Authenticated |
| `POST` | `/api/presentations/import/deck`          | The import side of the package.         | Authenticated |

The schema routes are the open ones; see [JSON Schemas](/docs/reference/schemas/).

## Code

In the [core repository](https://github.com/jaapstronks/deckyard):

- Envelope build/parse: `shared/slide-types/deck.js`
  (`presentationToDeck`, `deckToPresentationParts`).
- Identity manifest: `collectSlideTypeManifest` (`shared/slide-types/registry.js`).
- Content schema generation: `shared/slide-types/json-schema.js`.
- Asset ref layer: `shared/slide-types/deck-assets.js`.
- Spec fixture + CI gate: `tests/fixtures/example-deck.json`,
  `tests/deck-format-spec.test.js`.
