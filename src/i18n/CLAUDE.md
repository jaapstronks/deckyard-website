# i18n

Read this before adding a language, a page, or a page that does not exist in
every language. Blog posts and release notes: `src/content/CLAUDE.md`.

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
route under `src/pages/[...locale]/`. A marketing route also needs an entry in
`marketingPages` (`src/lib/og/CLAUDE.md`).

Other rules:

- Routing is file-based (NOT Astro's global `i18n` config). Do **not** add an
  `i18n` block to `astro.config.mjs`: Starlight would inherit the extra locales
  and generate duplicate English-content `/<lang>/docs` pages.
- **Which pages exist in which language is a page's own claim.** `SiteLayout`
  takes `localeUrls` (a locale -> URL map); omit it and every locale gets the
  same path, which is right for everything under `[...locale]`. Pages that
  break that assumption - a blog post, the English-only `/embed-demo` - pass
  the map, and both `hreflang` and the switcher follow it. A page that exists
  in one language emits no alternates at all rather than a pair that 404s.
- Docs (Starlight) are English-only, no switcher.
- Structural data (slide-type field vocabularies, theme tokens) is **not** copy:
  it lives beside the component, e.g. `components/marketing/anatomy/data.ts`.
