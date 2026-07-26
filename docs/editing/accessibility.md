---
title: "Accessibility"
description: "Make your presentations accessible"
---

Deckyard includes features to make presentations accessible to all audiences.

![Editor showing the expanded Accessibility section at the bottom of the slide form with title and summary fields](/images/screenshots/accessibility-fields.png)

## A11y Title

Each slide can have an **accessibility title** that's announced by screen readers when the slide becomes active.

- Set via the **A11y Title** field on each slide
- Keep it descriptive but concise
- Example: "Quarterly revenue chart showing 15% growth"

## A11y Summary

For complex slides, add an **accessibility summary** providing additional context:

- Describes what the slide contains
- Useful for data visualizations, charts, and images
- Read by assistive technology

## Image Alt-Text

Every image should have alt-text:

1. When adding an image, fill in the **Alt Text** field
2. Provide both NL and EN versions for bilingual presentations
3. Describe what the image shows, not just "image of..."

### AI Alt-Text

Use AI to generate alt-text automatically:

1. Click **Generate Alt-Text** on an image
2. AI creates descriptions in both languages
3. Review and refine as needed

See [AI Alt-Text](/docs/ai/alt-text) for details.

## Keyboard Navigation

The presenter mode supports full keyboard navigation:

| Key | Action |
|-----|--------|
| Arrow keys | Navigate slides |
| Home/End | First/last slide |
| F | Fullscreen |
| Escape | Exit |

## High Contrast

Themes are designed with sufficient color contrast. When creating custom themes, ensure text remains readable against backgrounds.

## Reading View

Every published presentation also has a **reading view**: the same content projected as a document rather than a fixed 16:9 canvas.

- Reachable at `/reader` after the presentation's public URL (`/p/<id>-<slug>/reader`), and linked from the presentation itself
- On the open web with no login, like the presentation it belongs to
- Readable with JavaScript disabled, and with the page's own stylesheet disabled

What it produces:

| Content | Becomes |
|---------|---------|
| The presentation | One `<h1>`, plus a table of contents and `<header>` / `<nav>` / `<main>` landmarks |
| Each slide | An `<h2>`, from the slide's title field or its accessibility title |
| A collection whose order carries meaning (timeline, process) | An ordered list, `<ol>` |
| A collection whose order is incidental (cards, columns) | An unordered list, `<ul>` |
| A table field | A `<table>` with `<thead>` and `<th scope="col">` |
| An image marked as content | A `<figure>` with its alt text, plus `<figcaption>` when there is a caption |
| An image marked as decorative | Empty `alt` and `aria-hidden`, so assistive technology skips it |
| Appearance-only fields (colors, sizes, layout choices) | Nothing: they are not content |

The projection is generated from the declared field vocabulary rather than written per slide type, so a custom slide type appears in the reading view without extra work, and the output cannot drift from the type definitions.

The layout uses relative units and a single column, so it reflows on a narrow screen instead of scaling down. The canvas view is unchanged and remains the presentation surface: these are two projections of the same slide records, not an original and a copy that has to be kept in sync.

## Related

- [AI Alt-Text](/docs/ai/alt-text)
- [Themes](/docs/themes/)
- [Keyboard Shortcuts](/docs/editing/keyboard-shortcuts)
- [Publishing](/docs/publishing/)
