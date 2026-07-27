# Blog figures

Components a blog post embeds in its body to _show_ something instead of
describing it. They are the reason `@astrojs/mdx` is installed: a post that
needs one is `.mdx`, every other post stays `.md`.

```mdx
---
title: 'Slides are data, not drawings'
...
---

import Figure from '@/components/figures/Figure.astro';
import XraySlide from '@/components/figures/XraySlide.astro';

<Figure caption="Drag the handle. Same slide, both sides.">
  <XraySlide title="..." ... />
</Figure>
```

## The contract

Every figure here follows the same five rules. They are not style preferences;
each one is a reader who would otherwise get nothing.

1. **Static first.** With the script blocked, the figure shows a meaningful
   state, never an empty frame. `XraySlide` keeps its handle where the server
   put it, `TypeSwap` leaves the first panel open, `ContrastLab` shows the
   photo and a dash instead of a number.
2. **The caption carries the argument alone.** It is what reaches RSS, print,
   and anyone who cannot operate the figure. `Figure` makes it required. If the
   caption does not make the point without the figure, the figure is
   decoration.
3. **Keyboard.** Anything a pointer can do, a key can do. A group of buttons
   claiming `role="tablist"` or `role="radiogroup"` gets its arrow keys from
   `src/lib/roving.ts`; a wipe is an `input[type=range]` rather than a pointer
   handler, so arrows, Home and End arrive for free.
4. **Reduced motion and forced colours are handled in the component**, not in a
   global block, because only the component knows which of its states it paints
   with a colour the reader is about to replace.
5. **Copy comes in as props.** The site is built for _n_ languages and a figure
   belongs to a post, so the labels live in the post's own `.mdx` file, one per
   language, and the component holds none. Structural data (which slide types
   exist, which fields a record has) is not copy and can live in the component.

## What is here

| Component           | Shows                                                             |
| ------------------- | ----------------------------------------------------------------- |
| `Figure.astro`      | The frame: width bleed out of the reading column, plus caption    |
| `XraySlide.astro`   | One slide wiped between what the room sees and what the file has  |
| `TypeSwap.astro`    | One record rendered by four slide types, each naming what it read |
| `ContrastLab.astro` | Title dragged over a photo, contrast measured live on both panels |
| `FieldMap.astro`    | Record and slide lighting each other up, in both directions       |

Shared chrome (the frame, the button row, the mono note, the dark plate) is in
`figures.css`. It is a plain co-located stylesheet rather than a component
`<style>` block because Astro can only scope a style to its own template, so
chrome used by siblings cannot be scoped - the same arrangement as
`components/marketing/anatomy/anatomy.css`.

`ContrastLab` measures real pixels: the photo is drawn into an offscreen canvas
and the region under the text block is averaged, then run through the WCAG
relative-luminance formula. It cannot drift out of step with the claim it is
making, but it does mean the image has to be same-origin (`public/`), or the
canvas is tainted and `getImageData` throws.
