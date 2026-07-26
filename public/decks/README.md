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

## Sizing: `?ui=min` makes the frame a 16:9 box

`DeckEmbed` appends `?ui=min` to the URL it puts in the iframe, so the export
drops its title bar and control row and their layout rows collapse to zero. The
scaled 1600x900 stage is then the whole frame, and the embed sizes on a plain
`aspect-ratio` with no constant to keep in sync.

This needs an export from **Deckyard 1.6.0 or later**; an older file ignores the
parameter and still draws 112px of chrome, which an aspect-ratio box will
squeeze. The runtime lives inside the file, so "we upgraded Deckyard" is not
enough - the deck has to be downloaded again.

Links out of the component keep the plain URL on purpose: a deck opening in a
tab of its own wants its controls back.

## A deck above the fold: `poster`

A real export is a megabyte and a half over the wire, which is too much to put
in front of a homepage. Pass a `poster` and the page ships a link wrapped
around a still of the first slide instead; the script upgrades it to an inline
frame once the browser is idle, or immediately when somebody presses play.

Two things follow from that, both deliberate:

- **The no-JS path is the link that was already there**, so nothing needs a
  `<noscript>` copy of the embed.
- **Below `inlineFrom` (700px by default) the link is left alone.** With
  `?ui=min` this is no longer a layout problem - the slide scales down cleanly -
  but a megabyte and a half of deck on a phone is worth an explicit tap, and the
  deck reads better with the screen to itself.

Render a poster at 1320x743, the frame's width times 9/16, with the same
`?ui=min` the embed uses so the still has no chrome the frame will not have:

```sh
chrome --headless --window-size=1320,743 --virtual-time-budget=4000 \
  --screenshot=poster.png "file://$PWD/public/decks/<slug>.html?ui=min"
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
- **Code, math and Bunny video pull their libraries from a CDN.** Since Deckyard
  1.6.0 those tags are conditional: a deck without any of the three makes zero
  third-party requests, and a deck with a code block links jsDelivr for Prism
  plus only the languages it uses. A deck that needs one of them is still not
  offline-clean.

The viewer runtime in the export handles navigation, keyboard, fullscreen and
auto-advance itself — the iframe only needs a sensible size and focus, which
`DeckEmbed.astro` provides.

## `example.html`

`example.html` is a tiny placeholder deck (not a real Deckyard export) so the
demo page and this pattern render out of the box. Replace it with a real
export when you have one.
