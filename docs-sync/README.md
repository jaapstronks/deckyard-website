# docs-sync — keeping the docs in step with deckyard core

The docs in `docs/` describe features that live in the **deckyard core** repo
(`../deckyard`). When core changes, the docs — text *and* screenshots — drift
out of date. This folder is the mechanism that makes drift **visible and
mechanical** instead of something you notice months later.

## The idea in one line

Every doc artifact (a page, a screenshot, later a video) declares which core
**source paths** it depends on. We store a content hash of those paths. When the
hash changes, the artifact is flagged `stale`. Same registry, three artifact
types.

## Files

| File | What it is |
|------|-----------|
| `registry.json` | The manifest: every artifact → its core source paths + a baseline hash. Hand-maintained. |
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

# Tripwire: what drifted since the last baseline (exits 1 if anything is stale)
node docs-sync/check-staleness.mjs

# After you've reviewed/updated the affected docs, re-baseline the hashes
node docs-sync/check-staleness.mjs --update
```

Tripwire statuses:

- `stale` — the source hash changed since baseline. The doc/screenshot probably
  needs a review or a re-capture.
- `source-gone` — every source path for this artifact has disappeared from core.
  Strong signal the feature was removed or renamed; the doc may need deleting.
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

`sources` accepts files *or* directories. Directories are hashed recursively
(skipping `node_modules`, `.git`, `dist`, …). Keep the paths as specific as
possible — a whole-directory dependency flags stale on every unrelated change
inside it, a single-file dependency only when that file moves.

## How this connects to the screenshot / video factory

`recipe` is the seam. Today it's `null` and screenshots/videos are captured by
hand. The capture factory (built in **deckyard**, output landing here — see the
`_meta` briefing to deckyard) will fill `recipe` with a state-setup + Playwright
action so a `stale` artifact can be **regenerated automatically**, not just
flagged. The registry data model already carries `type`, `sources`, `lang` and
`recipe` so screenshots and videos share one pipeline.

## Suggested cadence

1. `check-staleness.mjs` runs in CI (or a pre-push hook) and fails when anything
   is `stale`/`source-gone`.
2. You review the flagged pages, update text / re-capture screenshots.
3. `--update` to re-baseline, commit.
