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

## Color Contrast

**Nothing in the theme editor checks contrast, and nothing warns you when a pair falls short.** Plan to test your theme yourself.

What Deckyard does do is derive a text color: pick a background or accent color and you get light or dark text against it automatically. That choice is made on brightness, not on a measured contrast ratio, so a color you pick can land below the WCAG AA threshold of 4.5:1 for body text without anything saying so.

The one place contrast is measured is a **slide background image**. The editor samples the region where the title sits, picks whichever of the theme's two text colors reads better over it, and adds a scrim when neither clears the 3:1 target for large text. That happens automatically and is stored on the slide, so exports and PDF renders make the same decision.

When you build a custom theme, check the color pairs against WCAG AA yourself: 4.5:1 for body text, 3:1 for large text. The [reading view](#reading-view) of a published presentation is the easiest surface to test against, because it is plain HTML in whatever contrast checker you already use.

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
