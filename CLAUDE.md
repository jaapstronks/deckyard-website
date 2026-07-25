# Deckyard Website

Marketing website and user documentation for Deckyard.

## This Repository

**Purpose:** Static marketing site + comprehensive docs (100+ pages)

**Stack:** Astro 5, Starlight (docs theme)

**i18n:** Marketing pages are bilingual (EN default at root, NL under `/nl/`). Docs are English-only.

**Output:** Static HTML rsynced to a Hetzner box (Bolster) that serves
`deckyard.eu` via Caddy. No CDN in front of it. See `.github/workflows/deploy.yml`.

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
them in a global block. The same split applies to `forced-colors: active`: a
layer or a component repairs the states **it** paints, because a state told
apart only by a background colour disappears when the user supplies the palette.

Three accessibility tokens follow the same surface-flip rule as the rest:

- **`--brass-text`** is brass as a colour on a glyph. `--brass` / `--brass-bright`
  / `--brass-soft` are fills, rules and outlines; as small type on a light
  surface they reach 2.9:1 and 2.0:1, which is a 1.4.3 failure. Text gets
  `--brass-text`.
- **`--focus-ring`** is the `:focus-visible` outline, green on light and
  `--brass-bright` on dark. Any component that paints its own dark plate inside
  a light section - the install widget's terminal - re-points it, the same way
  `.section-dark` does.
- **`--error-fg`** likewise: the light-surface red is 2.2:1 on the dark section
  the waitlist usually sits on.

Never write `outline: none` on a `:focus` rule. Component styles are unlayered
and so outrank the layer the global focus ring lives in, which means one of
them silently cancels the ring site-wide for that element.

`src/lib/roving.ts` gives a `role="tablist"` / `role="radiogroup"` built out of
buttons the keyboard behaviour those roles promise (arrows, Home/End, one stop
in the tab order). Claim either role and you owe the reader those keys; call
`initRovingIn(root)` after wiring the clicks.

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
the site does not sell hosted seats. Managed hosting is offered on `/hosting`,
which is deliberately **not** a plan-and-price table: it presents self-hosting
and a managed instance as two doors onto the same software, states that hosting
revenue funds the development, and ends in an email rather than a checkout. No
tiers, no seat counts, no prices; the first step is a conversation.

## Social cards (og:image)

Every page carries its own share card, generated at build time. Nothing to
maintain per page: add a page, get a card.

```
src/lib/og/
  card.ts       the template - background, eyebrow, title, intro, logo lockup
  targets.ts    which pages get a card, and what copy goes on it
  render.ts     satori (layout -> SVG) + resvg (SVG -> PNG)
  fonts/        three static TTFs, vendored (satori cannot read woff2)
src/pages/og/[...path].png.ts   the endpoint: one PNG per target
```

The card route mirrors the page route, so `/nl/blog/de-code-staat-online` gets
`/og/nl/blog/de-code-staat-online.png`. `targets.ts` is read by both the
endpoint (to build the images) and the layouts (to point `og:image` at one), so
a page can never advertise a card that was not generated; a page missing from
the list silently falls back to the hand-made homepage card.

- **Marketing pages** are listed in `marketingPages` in `targets.ts`. A new
  route needs one entry there, taking the page's **hero** copy (the human
  sentence), not its meta title (which carries the SEO suffix).
- **Blog posts and docs pages** are picked up from their collections, so they
  need nothing. Docs get their section as a second eyebrow item
  (`DOCS · DEPLOYMENT`), derived from the path.
- **The homepage keeps its hand-made card** in `public/images/og/`: it sells
  the product rather than naming a page. Any page can do the same by passing
  `ogImage` to `SiteLayout`.
- **Docs get theirs through a Starlight component override**
  (`src/components/starlight/Head.astro`), because Starlight's `head` config
  only takes one static image for the whole docs section.

Editing `card.ts` restyles all ~105 cards at once. They cost roughly 9s of the
build; iterate on the design by rebuilding and opening `dist/og/**.png`.

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
- **An editorial entry's language is its folder**, never a frontmatter field:
  `src/content/blog/en/`, `src/content/blog/nl/`, and the same for
  `src/content/releases/`. The location and the language then cannot disagree,
  and the two languages cannot collide in the id (the glob loader keys its
  store on the id and a duplicate is only a build _warning_ - the loser
  vanishes from the site silently). `src/lib/content.ts` holds the guard, which
  fails the build rather than guessing; `src/lib/blog.ts` adds the blog's own
  derivations: `postLang`, `postSlug`, `postUrl`. Each locale gets its own feed
  (`/rss.xml`, `/nl/rss.xml`, ...).
- A post belongs to one language and the filename is the URL, so a Dutch post is
  a separate file with its own **Dutch** slug, not `<english-slug>.nl.md`. Give
  the two files the same **`translationKey`** and they become each other's
  official version: `hreflang` gets a real pair and the language switcher lands
  on the translation instead of the blog index. Leave it off and the post is
  untranslated, which is a normal state, not a defect. Start from
  `src/content/blog/_template.md`; underscore-prefixed files are excluded from
  the collection glob, so the template never becomes a post. `draft: true` is
  visible in `npm run dev` and dropped from the production build - and a draft
  translation is not advertised as a translation.
- **The URL comes from the file path** - unless a post sets `slug:` in
  frontmatter, which the glob loader honours first and verbatim, before the
  schema runs. `content.config.ts` deliberately leaves it undeclared: a post
  that wants a different URL should get a different filename rather than a
  second place where the URL is decided.
- **Which pages exist in which language is a page's own claim.** `SiteLayout`
  takes `localeUrls` (a locale -> URL map); omit it and every locale gets the
  same path, which is right for everything under `[...locale]`. Pages that
  break that assumption - a blog post, the English-only `/embed-demo` - pass
  the map, and both `hreflang` and the switcher follow it. A page that exists
  in one language emits no alternates at all rather than a pair that 404s.
- Docs (Starlight) are English-only, no switcher.
- Dutch copy is outgoing editorial text: no em dashes (use `-` or `;`).
- Structural data (slide-type field vocabularies, theme tokens) is **not** copy:
  it lives beside the component, e.g. `components/marketing/anatomy/data.ts`.

## Release notes (`/changelog`)

The public changelog is **hand-written**, not a mirror of `deckyard/CHANGELOG.md`.
The generated changelog is a commit list; this one is written for someone who
runs Deckyard and is deciding whether to update. Nothing in the build reads the
core repo's tags, so a release only reaches the site when someone writes it.

- One file per language per version, named after the version:
  `src/content/releases/en/1.3.0.md` and `.../nl/1.3.0.md`. Start from
  `src/content/releases/_template.md` (underscore-prefixed, so the glob skips it).
- **`latest: true` moves.** Exactly one release carries it per language; take it
  off the previous version in the same commit.
- Order is date-first, version as the tiebreaker (`src/lib/releases.ts`), because
  two versions can share a date and the collection's own order is alphabetical.
- Source material is the core repo's `CHANGELOG.md` section for the tag plus the
  GitHub Release. `refactor`/`chore`/`docs`/`test` commits are not release-note
  material.
- These are outgoing editorial copy in **both** languages: no em dashes.

**How a release gets here.** `deckyard`'s `merge-housekeeping` skill (section C)
notices at re-arm that a tag was cut and files a briefing to this repo; a session
that starts here writes the notes and closes it. So the trigger lives with the
release, and the copy stays hand-written.

## Key Files

- `astro.config.mjs` - Starlight config, sidebar structure
- `src/i18n/index.ts` - Locale registry, EN fallback, routing helpers
- `src/styles/global.css` - The layer order, i.e. the CSS cascade contract
- `scripts/sync-docs.js` - Doc sync script
