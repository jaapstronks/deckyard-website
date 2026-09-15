# Social cards (og:image)

Read this before touching share cards or adding a page that should not get the
default card. Cross-project conventions (logo, fonts, pitfalls): global skill
`og-image`.

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
