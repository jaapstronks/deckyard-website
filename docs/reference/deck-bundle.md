---
title: "Deck package"
description: "The .deck archive: layout, manifest fields, integrity guarantees and how import re-hydrates it."
---

A `.deck` package is a self-contained, portable archive of a presentation and
its assets. Where the JSON export (`/export/json`) carries only the deck and
still points at server-hosted `/uploads/…` images, the package **carries its own
pixels** — so it renders and round-trips on another machine without the server,
and it can enumerate exactly which assets it needs.

The layout is OCF/EPUB-inspired.

:::note
This page is the field-level reference. For why the package is shaped this way,
see [the package spec](/spec/deck-bundle/). For the deck it carries, see
[Deck format](/docs/reference/deck-format/).
:::

## Archive layout

<!--gen:example-bundle-layout-->

```
mimetype               First entry, STORED (uncompressed). Content:
                       "application/vnd.deckyard.deck". Lets the archive be
                       identified by magic number.
manifest.json          Package metadata + the asset inventory (see below).
deck.json              The portable deck (as from presentationToDeck), with
                       every asset ref rewritten to a bundle ref.
assets/<sha256>.<ext>  The asset bytes, content-addressed by SHA-256 of the
                       content. Identical bytes are stored once (dedup).
```

<!--/gen:example-bundle-layout-->

The media type is <!--gen:mime-->`application/vnd.deckyard.deck`<!--/gen:mime-->.
It sits in the vendor tree and is not IANA-registered. Packages written before
1.7.0 carry `application/vnd.slidecreator.deck`, which a reader keeps accepting
for good; see [Legacy sentinel](/docs/reference/deck-format/#legacy-sentinel).
The file extension is unaffected either way.

## `manifest.json`

<!--gen:example-manifest-->

```json
{
  "format": "deckyard.deck",
  "bundleVersion": 1,
  "mimetype": "application/vnd.deckyard.deck",
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
}
```

<!--/gen:example-manifest-->

| Field           | Type    | Notes                                                                                                                                                                                                                                            |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `format`        | string  | The same sentinel the deck carries.                                                                                                                                                                                                              |
| `bundleVersion` | integer | Package-layout version, <!--gen:bundle-version-->1<!--/gen:bundle-version--> today. Independent of the envelope version.                                                                                                                          |
| `mimetype`      | string  | Mirrors the `mimetype` entry.                                                                                                                                                                                                                    |
| `deck`          | string  | Path of the deck inside the archive. Always `deck.json`.                                                                                                                                                                                         |
| `assets[].ref`  | string  | Where the bytes live in the archive; also the value used inside `deck.json`.                                                                                                                                                                     |
| `assets[].id`   | string  | An SRI-shaped integrity id (`sha256-<base64>`), the stable, algorithm-tagged identity of the asset.                                                                                                                                              |
| `assets[].hash` | string  | The hex SHA-256 (the content address; matches the `ref` name).                                                                                                                                                                                   |
| `assets[].mime` | string  | The media type of the bytes.                                                                                                                                                                                                                     |
| `assets[].bytes`| integer | Size in bytes.                                                                                                                                                                                                                                   |
| `assets[].sources` | array | The original `/uploads/…` name(s) that mapped to this asset. This is the **separate name layer**: human names stay in the manifest so hash churn never leaks into the readable structure. Multiple sources means the same bytes were referenced from several places. |
| `missingAssets` | array   | Optional. Local refs whose bytes could not be read at export time; these keep their original ref in `deck.json`.                                                                                                                                  |

## `deck.json`

The portable deck (`presentationToDeck` output: `format`, `version`, `title`,
`theme`, the `slideTypes` identity manifest, and `slides` — see
[Deck format](/docs/reference/deck-format/)). Asset refs in slide content are
rewritten from `/uploads/x.png` to the bundle ref `assets/<hash>.<ext>`. External
(`http(s)://`) image URLs are left untouched — they are already portable and are
not fetched into the package.

## Guarantees

- **Self-contained:** all local assets are embedded; the package renders offline.
- **Content-addressed + verifiable:** each asset's bytes hash to its `ref`/`hash`;
  the reader (`readDeckBundle`) re-hashes every asset and rejects a mismatch.
- **Deduplicated:** identical bytes are stored once regardless of how many
  slides reference them.
- **Enumerable:** the manifest is a complete inventory of the deck's assets.

## Import (re-hydrating a package)

`POST /api/presentations/import/deck` takes a raw `.deck` body and creates a
presentation from it — the mirror of the export. The flow:

1. `readDeckBundle(buffer)` — verify the mimetype sentinel and re-hash every
   asset (integrity), yielding `{ manifest, deck, assets }`.
2. For each manifest asset, write its bytes back into `/uploads/` via
   `saveUploadedFile`, using the manifest `sources[0]` as the human basename.
   This builds an `assets/<hash>.<ext>` → `/uploads/<uuid>.<ext>` map.
3. `rewriteBundleRefs(deck, mapFn)` — rewrite the deck's bundle refs to the new
   upload URLs (the inverse of the export's `rewriteAssetRefs`).
4. `deckToPresentationParts` + `createPresentation`/`updatePresentation` —
   the same normalization + creation path as the JSON import.

**Round-trip:** for content-bearing slides, `export → import → export` is a
fixpoint (identical content-addressed refs, since identical bytes hash the same).

**Graceful degradation:**

- An asset whose mime is unsupported by `saveUploadedFile` (or that otherwise
  fails to write) is skipped — its ref is left in place and reported in a
  `failedAssets` field on the response, rather than crashing the import.
- Unknown slide types become a `content-slide` placeholder that names the missing
  type, says whether it was deliberately removed and what replaces it, and
  carries the original content across as markdown. Import persists rather than
  renders, so it applies the same archived-slide contract as every render
  surface.
- Local refs that were already missing at export time (`missingAssets`) keep
  their original `/uploads/…` ref and import as dangling (harmless) references.

## Not yet covered

- Theme assets (logos referenced on the theme, not on slides) and external image
  URLs are not embedded.

## Code

In the [core repository](https://github.com/jaapstronks/deckyard):

- Build: `server/export/deck-bundle.js` → `buildDeckBundle(repoRoot, pres)`.
- Read/validate: `readDeckBundle(buffer)` → `{ mimetype, manifest, deck, assets }`.
- Import: `server/routes/api/presentations/import-deck.js` →
  `handlePresentationsImportDeck` (route `POST /api/presentations/import/deck`).
- Pure ref layer: `shared/slide-types/deck-assets.js`
  (`collectAssetRefs`, `rewriteAssetRefs`, `rewriteBundleRefs`, `assetRefForHash`).
- Export route: `GET /api/presentations/:id/export/deck.zip` (downloads
  `<title>.deck`).
