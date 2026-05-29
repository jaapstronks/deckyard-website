# Deckyard Website

Marketing website and user documentation for Deckyard.

## This Repository

**Purpose:** Static marketing site + comprehensive docs (100+ pages)

**Stack:** Astro 5, Starlight (docs theme), 12-language i18n

**Output:** Static HTML deployed to Scaleway Object Storage + Cloudflare CDN

## Related Repositories

| Repo | Path | Purpose |
|------|------|---------|
| **deckyard** | `../deckyard` | Core OSS - source of truth for features |
| **deckyard-cloud** | `../deckyard-cloud` | Paid hosted version |
| **ciiic-slides** | `../ciiic-slides` | Production fork for CIIIC client |

## Key Directories

- `src/pages/` - Marketing pages (Astro components)
  - `[...locale]/` - i18n routing (en default, others prefixed)
  - `features/`, `compare/`, `use-cases/` - Landing pages
- `docs/` - Source documentation (markdown)
- `src/content/docs/` - Docs copied here by sync script
- `src/i18n/locales/` - Translation JSON files (12 languages)
- `scripts/sync-docs.js` - Copies docs from `./docs/` to Starlight content

## Documentation Structure

17 categories, 100+ pages:
- User: creating, editing, organizing, slide-types, ai, interactions, presenting, publishing, collaboration, libraries, themes, export
- Admin: admin, configuration, deployment, integrations, developer

## Common Cross-Repo Tasks

| Task | What to do |
|------|------------|
| New feature in core | Add/update docs in `./docs/` matching the feature |
| API change in core | Update `./docs/developer/` and API reference |
| New slide type | Add to `./docs/slide-types/` |
| Pricing change | Update `./src/pages/[...locale]/pricing.astro` |

## Keeping Docs in Sync

Docs describe deckyard core features. When core changes:
1. Check if docs need updating
2. Edit markdown in `./docs/` (not `src/content/docs/`)
3. `npm run dev` auto-syncs to Starlight

## Running Locally

```bash
npm install
npm run dev      # Syncs docs + starts dev server
npm run build    # Production build to ./dist/
```

## i18n

- Default: English (no prefix)
- Others: `/nl/`, `/de/`, `/fr/`, etc. (12 total)
- Marketing pages: translated via `src/i18n/locales/*.json`
- Docs: English only currently (in `./docs/`)

## Key Files

- `astro.config.mjs` - Starlight config, sidebar structure
- `src/i18n/index.ts` - Translation helpers
- `scripts/sync-docs.js` - Doc sync script
