# docs-sync — keeping the docs in step with deckyard core

The docs in `docs/` describe features that live in the **deckyard core** repo
(`../deckyard`). When core changes, the docs — text *and* screenshots — drift
out of date. This folder is the mechanism that makes drift **visible and
mechanical** instead of something you notice months later.

## The idea in one line

Every doc artifact (a page, a screenshot, a video) declares which core **source
paths** it depends on. We store a content hash of those paths. When the hash
changes, the artifact is flagged `stale`. Same registry, three artifact types.

Artifacts the capture factory produces carry a second hash, over the recipe's
module graph, so a changed recipe flags them too. Two ways to go out of date,
one status.

## Files

| File | What it is |
|------|-----------|
| `registry.json` | The manifest: every artifact → its core source paths + a baseline hash. Hand-maintained. |
| `registry.schema.json` | The shape `registry.json` must have. Validated on every run, before any hashing. |
| `audit-since-capture.mjs` | **Current backlog.** Uses git history in core to rank screenshots by how much source changed *since each was captured*. Owns `STALENESS.md`. |
| `check-staleness.mjs` | **Forward tripwire.** Hashes each artifact's sources and reports drift *since the last baseline*. For CI / pre-push. |
| `seed-registry.mjs` | One-shot bootstrapper that built `registry.json`. Keep for reference; don't re-run without intent (it overwrites). |
| `STALENESS.md` | Generated backlog report. The human-readable "what to re-capture / review next" list. |

Two questions, two tools:

- *"What is stale right now?"* → `audit-since-capture.mjs` (git since `capturedAt`).
- *"Did anything change since I last signed off?"* → `check-staleness.mjs` (hash vs baseline).

## Usage

```bash
# Rank the current backlog and (re)write STALENESS.md
node docs-sync/audit-since-capture.mjs --report

# Tripwire: what drifted since the last baseline (exits 1 if anything is gated)
node docs-sync/check-staleness.mjs

# After you've re-captured or reviewed specific artifacts, re-baseline those
node docs-sync/check-staleness.mjs --update --only shot-editor-full,shot-theme-editor-full

# Re-baseline everything. Rarely what you want; see "A baseline is a claim".
node docs-sync/check-staleness.mjs --update --all
```

Exit codes: `0` clean, `1` something gated needs attention, `2` the registry or
the checkout is unusable (schema error, duplicate id, core missing or not
installed, bad arguments).

### A baseline is a claim

`sourceHash` does not mean "this is what the code looked like once". It means
**someone looked at this artifact against this code and it was right**. So
`--update` will not take a blanket instruction: it needs `--only <ids>` (the
entries you actually re-captured or reviewed) or an explicit `--all`. A bare
`--update` exits 2 and says so. This matters because the registry was seeded
with hashes written at bootstrap time, not at review time — 116 of 118 entries
were `stale` on the day the gate was built, and one `--update` would have turned
that backlog into 118 claims nobody had made.

Tripwire statuses:

- `stale` — the source hash changed since baseline, **or** the recipe's module
  graph did. The report names which: `recipe changed: <id>` means re-record,
  a bare `STALE` means review the doc around it.
- `source-gone` — every source path for this artifact has disappeared from core.
  Strong signal the feature was removed or renamed; the doc may need deleting.
- `source-moved` — *some* source paths are gone and the rest are still there.
  Almost always a file that moved into a directory of its own; the fix is
  repointing `sources`, not deleting the doc.
- `recipe-gone` — the recipe module named in `recipe.module` is no longer in
  core. The artifact can no longer be regenerated; the entry needs repointing
  or deleting.
- `new` — artifact has no baseline hash yet. Run `--update` once you trust its
  current state.
- `ok` — source unchanged since baseline.

## Registry entry shape

```jsonc
{
  "id": "themes-editor",              // stable slug
  "type": "screenshot",              // "doc" | "screenshot" | "video"
  "path": "public/images/screenshots/theme-editor-full.png", // artifact on disk (screenshot/video)
  "docPages": ["docs/themes/index.md"],  // which page(s) surface this artifact
  "sources": [                        // core paths that, if changed, make it stale
    "client/lib/theme/theme-select.js",
    "client/views/settings/theme-editor/"
  ],
  "sourceHash": "…",                 // baseline; filled by --update
  "lang": "en",
  "capturedAt": "2026-07-23",         // when the screenshot/video was last made
  "recipe": null                      // later: how to regenerate (screenshot/video factory)
}
```

Which fields an entry carries depends on its `type`, and
`registry.schema.json` enforces exactly that:

| | `path` | `capturedAt` | `recipe` |
|---|---|---|---|
| `screenshot` | required | required | required (`null` when hand-made) |
| `video` | forbidden | required | required (`null` when hand-made) |
| `doc` | optional | forbidden | forbidden |

A **video** entry has no `path`: the MP4 is rendered in the private
`deckyard-video` repo and only lands in `public/videos/` once the launch video
ships, so until then the entry claims no file on disk. A **doc** entry is prose,
which is never *captured* and has no capture recipe — but it may still name a
path, because two entries (`data-deck-format-constants`,
`data-slide-type-registry`) track a generated data file under `src/data/` rather
than a set of pages. `path` means one thing throughout: **the file on disk this
entry is about**, when there is one.

`lang` is the
language of the *recorded UI*, not of the overlay text — one take is rendered
into every language from `copy/<lang>.json`, so it stays one registry entry.
`capturedAt` is when the take was last recorded.

```jsonc
{
  "id": "video-form-drives-slide",   // "video-" + the recipe id
  "type": "video",
  "docPages": [],                    // no page surfaces the clips yet
  "sources": ["client/views/editor/bulk-edit-modal.js", "…"],
  "sourceHash": "…",
  "lang": "nl",
  "capturedAt": "2026-08-28",
  "recipe": {
    "id": "form-drives-slide",
    "module": "../deckyard/capture/recipes/form-drives-slide.js",
    "hash": "…"                      // hashRecipeGraph(), printed by `node capture/run.js --list`
  }
}
```

`sources` accepts files *or* directories. Directories are hashed recursively
(skipping `node_modules`, `.git`, `dist`, …). Keep the paths as specific as
possible — a whole-directory dependency flags stale on every unrelated change
inside it, a single-file dependency only when that file moves.

## How this connects to the screenshot / video factory

`recipe` is the seam, and it is live: an entry that carries one names the core
recipe that regenerates the artifact, plus a hash of that recipe's whole module
graph. `node capture/run.js --list` in core prints both the id and the hash, and
after a capture run it prints the `recipe` block to paste here.

The hash is computed by core's own `hashRecipeGraph()`, imported from the core
checkout — one definition, in the repo that owns recipes. That is why this check
needs core's dependencies **installed**, not just checked out; it exits 2 with
that message rather than skipping the recipe half silently.

Entries still without a `recipe` are captured by hand and only the source axis
guards them.

## What the gate blocks on

`check-staleness.mjs` runs in CI (`.github/workflows/docs-sync.yml`: on PRs
touching docs, on pushes to `main`, and weekly — core moves without anyone
pushing here). What it *reports* is wider than what it *blocks* on, and one
property of the entry decides which:

| entry | `stale` (source or recipe drift) | `source-gone` · `source-moved` · `recipe-gone` · `new` · schema error |
|---|---|---|
| **has a `recipe`** | red | red |
| **no `recipe`** (hand-made) | reported in the job summary | red |

The reasoning is the cost of the fix. A regenerable artifact is repaired by a
capture run, so "this screenshot matches the code" is a claim we can keep true,
and anything less would let the factory's whole point rot. A hand-made artifact
is repaired by a docs review, and blocking every PR on a review nobody has
scheduled does not get it written — it gets the gate switched off. Structure is
gated in both rows: a source path that moved or vanished is a mechanical fix
(repoint `sources`), and a malformed entry means the check is measuring
something other than what it claims.

**This exception is temporary, and it is meant to be deleted.** The direction is
that every artifact gets a recipe; the day the report-only column is empty, the
row collapses and `stale` is red everywhere. That is one condition to remove in
`check-staleness.mjs`, not a design to maintain.

## Suggested cadence

1. `check-staleness.mjs` gates in CI (see above) and reports the hand-made
   backlog in the job summary.
2. Fix what it names: **re-capture** the recipe-driven artifacts
   (`node capture/run.js <id>` in core), **review** the hand-made ones — the
   ranked backlog lives in `STALENESS.md`.
3. `--update --only <the ids you just fixed>` to re-baseline, commit.
