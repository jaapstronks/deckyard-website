# Deckyard Website

Marketing website and user documentation for Deckyard.

## This Repository

**Purpose:** Static marketing site + comprehensive docs (100+ pages)

**Stack:** Astro 5, Starlight (docs theme)

**i18n:** Marketing pages are bilingual (EN default at root, NL under `/nl/`). Docs are English-only.

**Output:** Static HTML deployed to a Hetzner box via rsync + Cloudflare CDN

## Related Repositories

| Repo               | Path                | Purpose                                 |
| ------------------ | ------------------- | --------------------------------------- |
| **deckyard**       | `../deckyard`       | Core OSS - source of truth for features |
| **deckyard-cloud** | `../deckyard-cloud` | Paid hosted version                     |
| **ciiic-slides**   | `../ciiic-slides`   | Production fork for CIIIC client        |

## Key Directories

- `src/pages/[...locale]/` - **One route file per page, all languages.** The rest
  parameter is `undefined` for EN (so it builds at the root) and the code for
  every other locale. Never add a `src/pages/nl/` copy of a page.
- `src/components/`
  - `layout/` - site frame + page structure: `SiteHeader`, `SiteFooter`,
    `LanguageSwitcher`, `Section`, `SectionHead`, `PageHero`
  - `ui/` - small reusable elements: `Button`, `DeckyardMark`, `DeckEmbed`,
    and `Slide` (the one 16:9 slide renderer - the explainer's big slide, the
    outcome under each route and the homepage figure are all this component,
    told apart only by a `variant`)
  - `marketing/` - page sections that sell, incl. `anatomy/` (the explainer)
  - `blog/` - `BlogCard`
  - `pages/` - the page bodies (`HomePage`, `StructuredPage`, ...), each driven
    by a `lang` prop so markup lives once
- `src/i18n/` - see the i18n section below
- `src/styles/` - see the CSS section below
- `docs/` - Source documentation (markdown)
- `src/content/docs/` - Docs copied here by sync script
- `scripts/sync-docs.js` - Copies docs from `./docs/` to Starlight content

Imports use the `@/*` alias (`@/components/ui/Button.astro`, `@/i18n`), never
deep relative paths, so moving a file does not break its importers.

## Before opening a PR

```bash
npm run verify     # format:check + astro check + build
npm run format     # fix formatting
```

CI runs the same three in `.github/workflows/verify.yml`. `astro check` is not
decoration: it caught two keys that existed in the copy but not in its
interface, which had gone unnoticed for as long as there was no type check.

## CSS architecture

Global CSS is layered; the order in `src/styles/global.css` **is** the cascade
contract, so overriding an earlier layer never needs a specificity hack:

| Layer        | File             | Holds                                                                                 |
| ------------ | ---------------- | ------------------------------------------------------------------------------------- |
| `tokens`     | `tokens.css`     | `:root` custom properties. No selectors.                                              |
| `base`       | `base.css`       | Bare element defaults. No classes.                                                    |
| `primitives` | `primitives.css` | Design-system classes reused across pages (`.section`, `.btn`, `.lead`, `.page-hero`) |
| `chrome`     | `chrome.css`     | The site frame: header, nav, language switcher, footer                                |

Component `<style>` blocks are deliberately **not** in a layer. Unlayered styles
outrank every layer, so a component always wins over the global system without
fighting specificity. The rule:

- **reused across pages** -> a layer in `src/styles/`
- **owned by one component** -> that component's `<style>` block
- **shared by sibling components** -> a co-located plain `.css` file next to
  them (Astro can only scope a style to its own template, so shared chrome
  cannot be scoped; see `components/marketing/anatomy/anatomy.css`)

Two hard conventions:

1. **Never write a bare `clamp()` for a size.** Use a `--space-*` / `--step-*`
   token, or add a step to the scale in `tokens.css`. The scales exist because
   there were 33 unique clamp values, 31 of them used exactly once.
2. **A dark section is a token flip, not a pile of overrides.** `.section-dark`
   re-points the semantic tokens (`--btn-primary-bg`, `--field-bg`, `--lead-fg`,
   ...). A new component that reads those tokens works on dark for free, and no
   rule in `primitives.css` has to know the component exists.

Component motion owns its own `prefers-reduced-motion` opt-out; don't collect
them in a global block.

## Documentation Structure

17 categories, 100+ pages:

- User: creating, editing, organizing, slide-types, ai, interactions, presenting, publishing, collaboration, libraries, themes, export
- Admin: admin, configuration, deployment, integrations, developer

## Common Cross-Repo Tasks

| Task                | What to do                                        |
| ------------------- | ------------------------------------------------- |
| New feature in core | Add/update docs in `./docs/` matching the feature |
| API change in core  | Update `./docs/developer/` and API reference      |
| New slide type      | Add to `./docs/slide-types/`                      |

There is no pricing page and there will not be one: Deckyard is not a SaaS and
the site does not sell hosted seats. "We can host it for you" is an aside on an
existing page, not a plan-and-price table.

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

Built for **n languages**, not two. EN is the default (served at the root, no
prefix); every other locale gets a `/<code>/` prefix.

```
src/i18n/
  index.ts            registry, Lang, routing helpers, EN fallback merge
  types.ts            one interface per namespace + Content + DeepPartial
  locales/en/         home.ts, nav.ts, anatomy.ts, ... one file per namespace
  locales/nl/         same shape
```

**Adding a language** (additive, never a refactor):

1. add the code to `languages` in `src/i18n/index.ts`,
2. create `src/i18n/locales/<code>/` with the namespaces you have translated -
   start with `meta.ts`, everything else is optional,
3. register it in `overrides`.

Anything you leave out falls back to EN, so a half-translated language still
builds and reads. Routes, `hreflang` alternates, the language switcher and the
per-locale RSS feed all derive from the registry, so no page file is touched.

**Adding a page**: add an interface to `types.ts`, one file per locale under
`locales/<lang>/`, wire it into each `locales/<lang>/index.ts`, and add a single
route under `src/pages/[...locale]/`.

Other rules:

- Routing is file-based (NOT Astro's global `i18n` config). Do **not** add an
  `i18n` block to `astro.config.mjs`: Starlight would inherit the extra locales
  and generate duplicate English-content `/<lang>/docs` pages.
- Blog posts carry a `lang` field (`en` default) in frontmatter; the
  `[...locale]/blog/[slug].astro` route filters the locale x post cross product
  down to the posts that exist per language. Each locale gets its own feed
  (`/rss.xml`, `/nl/rss.xml`, ...).
- Docs (Starlight) are English-only, no switcher.
- Dutch copy is outgoing editorial text: no em dashes (use `-` or `;`).
- Structural data (slide-type field vocabularies, theme tokens) is **not** copy:
  it lives beside the component, e.g. `components/marketing/anatomy/data.ts`.

## Key Files

- `astro.config.mjs` - Starlight config, sidebar structure
- `src/i18n/index.ts` - Locale registry, EN fallback, routing helpers
- `src/styles/global.css` - The layer order, i.e. the CSS cascade contract
- `scripts/sync-docs.js` - Doc sync script
