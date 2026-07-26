# Static deck embeds

Self-contained Deckyard HTML exports live here. Drop a `.html` file in this
folder and embed it with the
[`DeckEmbed`](../../src/components/ui/DeckEmbed.astro) component, no running
Deckyard instance required.

## Workflow

1. Build your deck in Deckyard.
2. **Download -> HTML** — this produces a single self-contained `.html` file
   (inline CSS, curated/uploaded fonts as base64, local images as data-URLs,
   and the full viewer runtime as an inline `<script>`). It works from any
   static host, even `file://`.
3. Drop the file here: `public/decks/<slug>.html`.
4. Embed it on a page:

   ```astro
   ---
   import DeckEmbed from '@/components/ui/DeckEmbed.astro';
   ---

   <DeckEmbed src="/decks/<slug>.html" title="My deck" />
   ```

Because the file lives in `public/`, Astro serves it verbatim at
`/decks/<slug>.html` — no import, no build step.

## Sizing: the export brings its own chrome

An export is not a 16:9 box. It draws a 56px title bar above the slide and a
56px control bar below it, and those keep their height while the frame narrows,
so an aspect ratio on its own squeezes the slide into a thinner and thinner
strip. Pass that fixed height as `chrome` and the slide stays exactly 16:9 at
every width:

```astro
<DeckEmbed src="/decks/my-deck.html" chrome={DECK_CHROME_PX} />
```

`DECK_CHROME_PX` lives in `src/lib/decks.ts`. If a future export changes its
presenter shell, that is the one number to update.

## A deck above the fold: `poster`

A real export is around half a megabyte over the wire, which is too much to put
in front of a homepage. Pass a `poster` and the page ships a link wrapped
around a still of the first slide instead; the script upgrades it to an inline
frame once the browser is idle, or immediately when somebody presses play.

Two things follow from that, both deliberate:

- **The no-JS path is the link that was already there**, so nothing needs a
  `<noscript>` copy of the embed.
- **Below `inlineFrom` (700px by default) the link is left alone.** An export
  under about 400px wide wraps its own title bar and controls onto two lines
  each, which eats the frame and leaves the slide a strip. A phone is better
  served by the deck opening in a tab of its own.

Render a poster at 1320x854 — the frame's width, times 9/16, plus the 112px of
chrome:

```sh
chrome --headless --window-size=1320,854 --virtual-time-budget=4000 \
  --screenshot=poster.png "file://$PWD/public/decks/<slug>.html"
cwebp -q 74 -m 6 -sharp_yuv poster.png -o public/images/hero/deck-poster-<lang>.webp
```

Which locales get a deck in the homepage hero is listed in `src/lib/decks.ts`,
not in the copy files: a deck is written in one language, and a locale with no
export keeps the single-column hero rather than being handed a deck it cannot
read.

## Caveats (from the export)

A deck is only 100% self-contained if you avoid the few things that reach back
to a server or CDN:

- **Avoid lead-capture slides.** They POST to `/api/leads` and are the only
  hard server dependency — a deck with one is not standalone.
- **Use uploaded images, not Unsplash/Giphy.** Remote stock images stay CDN
  links; uploaded images are inlined as data-URLs.
- **Externally managed fonts stay network-linked.** Adobe/Monotype/Google
  fonts remain remote; curated/uploaded fonts are inlined.
- **Code slides pull Prism from a CDN.** The export links jsDelivr for syntax
  highlighting, so a deck with code on it is not offline-clean either.

The viewer runtime in the export handles navigation, keyboard, fullscreen and
auto-advance itself — the iframe only needs a sensible size and focus, which
`DeckEmbed.astro` provides.

## `example.html`

`example.html` is a tiny placeholder deck (not a real Deckyard export) so the
demo page and this pattern render out of the box. Replace it with a real
export when you have one.
