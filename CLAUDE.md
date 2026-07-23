# Deckyard Website

Marketing website and user documentation for Deckyard.

## This Repository

**Purpose:** Static marketing site + comprehensive docs (100+ pages)

**Stack:** Astro 5, Starlight (docs theme)

**i18n:** Marketing pages are bilingual (EN default at root, NL under `/nl/`). Docs are English-only.

**Output:** Static HTML deployed to a Hetzner box via rsync + Cloudflare CDN

## Related Repositories

| Repo | Path | Purpose |
|------|------|---------|
| **deckyard** | `../deckyard` | Core OSS - source of truth for features |
| **deckyard-cloud** | `../deckyard-cloud` | Paid hosted version |
| **ciiic-slides** | `../ciiic-slides` | Production fork for CIIIC client |

## Key Directories

- `src/pages/` - Marketing pages (Astro components)
  - EN pages live at the root (`index.astro`, `blog/`)
  - `src/pages/nl/` - NL versions, thin wrappers around shared components
- `src/components/pages/` - Shared page bodies (`HomePage`, `BlogIndexPage`, `BlogPostPage`) driven by a `lang` prop, so markup lives once
- `src/i18n/ui.ts` - Translation dictionary (EN/NL) + routing helpers (`getLangFromUrl`, `localizePath`, `stripLangFromPath`)
- `src/components/LanguageSwitcher.astro` - EN/NL toggle in the header
- `docs/` - Source documentation (markdown)
- `src/content/docs/` - Docs copied here by sync script
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

- Marketing site is bilingual: **EN** (default, no prefix) and **NL** (`/nl/`).
- Copy lives in `src/i18n/ui.ts` (`ui.en` / `ui.nl`); shared page components read it via a `lang` prop. Add a string to both locales, then use it in the component.
- Routing is file-based (NOT Astro's global `i18n` config). Do **not** add an `i18n` block to `astro.config.mjs`: Starlight would inherit the `nl` locale and generate duplicate English-content `/nl/docs` pages.
- Language switcher: `LanguageSwitcher.astro` maps the current path to its counterpart locale.
- Blog posts carry a `lang` field (`en` default) in frontmatter; each locale's blog routes filter on it. `/rss.xml` is the EN feed only.
- Docs (Starlight) are English-only, no switcher.
- Dutch copy is outgoing editorial text: no em dashes (use ` - ` or `;`).

## Key Files

- `astro.config.mjs` - Starlight config, sidebar structure
- `src/i18n/index.ts` - Translation helpers
- `scripts/sync-docs.js` - Doc sync script
