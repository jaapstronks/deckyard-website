# Static deck embeds

Self-contained Deckyard HTML exports live here. Drop a `.html` file in this
folder and embed it with the [`DeckEmbed`](../../src/components/DeckEmbed.astro)
component, no running Deckyard instance required.

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
   import DeckEmbed from '../components/DeckEmbed.astro';
   ---
   <DeckEmbed src="/decks/<slug>.html" title="My deck" />
   ```

Because the file lives in `public/`, Astro serves it verbatim at
`/decks/<slug>.html` — no import, no build step.

## Caveats (from the export)

A deck is only 100% self-contained if you avoid the few things that reach back
to a server or CDN:

- **Avoid lead-capture slides.** They POST to `/api/leads` and are the only
  hard server dependency — a deck with one is not standalone.
- **Use uploaded images, not Unsplash/Giphy.** Remote stock images stay CDN
  links; uploaded images are inlined as data-URLs.
- **Externally managed fonts stay network-linked.** Adobe/Monotype/Google
  fonts remain remote; curated/uploaded fonts are inlined.

The viewer runtime in the export handles navigation, keyboard, fullscreen and
auto-advance itself — the iframe only needs a sensible size and focus, which
`DeckEmbed.astro` provides.

## `example.html`

`example.html` is a tiny placeholder deck (not a real Deckyard export) so the
demo page and this pattern render out of the box. Replace it with a real
export when you have one.
