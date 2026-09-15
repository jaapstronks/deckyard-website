# The `/spec/` section and the generated format data

Read this before working on `/spec/`, `docs/reference/`, `src/lib/spec.ts`,
`src/lib/schematic.ts`, `public/schema/` or `npm run sync-slide-types`.

Four pages under `src/pages/[...locale]/spec/` that put the deck format on the
site as a **standard**, not as an implementation detail: `/spec/` (the
argument), `/spec/deck-format/` (the format, both layers and the schemas),
`/spec/slide-types/` (the catalogue) and `/spec/conformance/` (what a second
implementation must build). Marketing register, deliberately not Starlight - in
the docs a spec drowns between "how do I make a poll".

## Four pages is a ceiling

`redirects` in `astro.config.mjs` keeps two retired URLs (the archive layer and
the schemas had routes of their own) reachable. The rule that came out of
merging them:

> A section is worth a page when it answers a question the other pages do not.
> A justification for a decision this project made is not that question.

What that ruled out, so it does not come back: why the `runtime` facet was
measured rather than designed, why a tier beats removing a type, why the
evolution rule is preferable to migration freedom, the history of the type
count. All of it true, none of it a thing a reader deciding whether to build
against the format needs. Lookups (the three spellings of a type id, the
export/import endpoints, every field of the manifest) go into
`docs/reference/`, which is the half the site search indexes.

## Load-bearing rules

- **No fact about the format is typed into copy.** The magic string, the MIME
  type, the envelope version, the schema base URI and the content schema version
  live in `src/data/deck-format.json`, generated from core; `src/lib/spec.ts`
  reads them and exposes `withSpec()`, which substitutes `{magic}`, `{mime}`,
  `{schemaBase}`, `{version}` and `{schemaVersion}` into copy strings. A moved
  constant is then a one-liner instead of a sweep through two languages.
  **Beware two version numbers**: the schema `$id` carries the _content_ schema
  version (3), not the envelope version (1). Do not conflate them.
- **The schemas are served from this repo**, at the URL their own `$id` claims.
  `sync-slide-types` writes `public/schema/v<schemaVersion>/` - `deck.schema.json`,
  one file per core slide type, and an `index.json` directory document - so
  `https://deckyard.eu/schema/v3/deck.schema.json` resolves. Two rules: **core
  types only** (a fork checkout's `custom/slide-types/` must never be published
  on deckyard.eu), and **nothing under a published version path is ever deleted**,
  including the schema of a retired type. Only a schema-version bump opens a new
  directory.
- **Three URLs are permanent, and one of them is a schema path.** The media type
  `application/vnd.deckyard.deck` was registered with IANA in the vendor tree on
  2026-08-14, and the registration names `deckyard.eu/spec/deck-bundle/`,
  `deckyard.eu/spec/deck-format/` and `deckyard.eu/schema/v3/deck.schema.json` as
  where the format is specified. Those three may be **redirected, never removed** -
  including `/schema/v3/`, now that `public/schema/` also carries later versions.
  This binds harder than the site copy does: correcting a published registration
  means another Expert Review at IANA. The same note sits above `redirects` in
  `astro.config.mjs`.
- **The whole slide-type registry is generated.** `npm run sync-slide-types`
  imports `../deckyard`'s registry, schematic map, picker data and AI catalogue
  and writes `src/data/slide-types.json` + `src/data/deck-format.json`, and fills
  the type count into marker spans (`<!--gen:slide-type-count-->`) in `README.md`
  and `docs/slide-types/index.md`. `src/lib/slideTypes.ts` is the typed view;
  `src/lib/facts.ts` reads the count off it. Never type the count by hand.

It is **not** part of `npm run build`: the generated JSON is committed so CI (and
any checkout without core beside it) builds from the file. `npm run
check-slide-types` fails if the file is out of date, and four `docs-sync`
artifacts (`data-slide-type-registry`, `data-deck-format-constants`,
`spec-deck-format`, `spec-deck-bundle`) watch the same core paths so drift shows
up as drift.

Layout glyphs are a **port of core's schematic grammar, not of its code**:
`src/lib/schematic.ts` turns the same JSON-safe `{ kind, cells, align, ... }`
spec each slide type declares into SVG shapes, so the editor's picker and this
page draw the same picture from the same data. Shapes name a paint _role_
(`fill` / `line` / `strong` / `accent` / `sky` / `stroke`), never a colour, so a
dark surface is a token flip. A kind this file does not know renders the neutral
text-only glyph, which is also what a deprecated type gets - core withholds a
glyph from retired types on purpose.

Copy may use backticks for inline code and nothing else: `src/lib/inline.ts`
escapes the string first and lets exactly that one construct back in.

## `/spec/` and `docs/reference/` are two halves

The same format, two readers, split by **which question is being answered** and
not by how polished the prose is:

|                   | Question                              | Read                  | Language |
| ----------------- | ------------------------------------- | --------------------- | -------- |
| `/spec/`          | "May I build on this? Is it lock-in?" | once, start to end    | EN + NL  |
| `docs/reference/` | "What does field `X` do?"             | repeatedly, by search | EN only  |

The deciding argument is search: Starlight puts `data-pagefind-body` only on
`dist/docs`, so **`/spec/` is not indexed at all**. Somebody searching the
documentation for "deck format" or "slideTypes" has to land in `docs/reference/`.

So the exhaustive tables (envelope fields, manifest fields, endpoints, every
slide type's fields) live in `docs/reference/`, and each `/spec/` section ends in
one sentence plus a `SpecReference` link instead. Every **code block** stays on
`/spec/`: showing the envelope is a stronger claim than describing it, and
`/spec/slide-types/` keeps its whole card grid, glyphs included - a card with a
layout diagram is a different artifact from a naslag table.

`docs/reference/slide-types.md` is **generated** by the same
`npm run sync-slide-types`, and the other four reference pages carry the format
constants inside marker spans:

```md
Always <!--gen:magic-->`slidecreator.deck`<!--/gen:magic-->.
```

The marker is an HTML comment pair, invisible when rendered, and the generator
owns what is between them (`markerTokens()` in `scripts/generate-slide-types.js`;
the token value carries its own backticks or whole fenced block, because a marker
cannot live _inside_ a code span). `npm run check-slide-types` fails when any of
it drifts.

**A dirty `../deckyard` working tree will regenerate unreleased constants into
these pages.** The generator reads core's files, not its git HEAD. Check
`git -C ../deckyard status` before committing what `sync-slide-types` wrote.
