---
title: "Embedding (SDK)"
description: "Embed presentations in your website"
---

Embed Deckyard presentations in external websites and applications.

## Overview

The Deckyard SDK allows you to embed interactive presentations in your own website or application. Viewers can navigate slides, interact with polls and Q&A, and enjoy the full presentation experience.

![Published dialog with expanded Advanced section showing iframe embed code and SDK integration code for each language](/images/screenshots/published-embed-codes.png)

## Static embed (no instance needed)

The SDK below embeds a presentation served by a **running** Deckyard instance
(it resolves a `publishId` against an origin). If you just want to drop a deck
onto a static site with no server, use the **standalone HTML export** instead.

**Download → HTML** produces a single self-contained `.html` file: inline CSS,
curated/uploaded fonts as base64, local images as data-URLs, and the full
viewer runtime as an inline `<script>`. It runs from any static host, even
`file://` - so embedding is just an `<iframe>` pointing at the local file:

```html
<iframe
  src="/decks/my-deck.html"
  title="My deck"
  loading="lazy"
  allow="fullscreen"
  style="width:100%;aspect-ratio:16/9;border:0"
></iframe>
```

The viewer runtime in the export handles navigation, keyboard, fullscreen and
auto-advance itself; the iframe only needs a size and focus.

### Caveats

A deck is only 100% self-contained if you avoid the few things that reach back
to a server or CDN:

- **Avoid lead-capture slides.** They POST to `/api/leads` and are the only
  hard server dependency; a deck with one is not standalone.
- **Use uploaded images, not Unsplash/Giphy.** Remote stock images stay CDN
  links; uploaded images are inlined as data-URLs.
- **Externally managed fonts stay network-linked.** Adobe/Monotype/Google
  fonts remain remote; curated/uploaded fonts are inlined.

> On this site (deckyard.eu) the pattern is packaged as a reusable
> `DeckEmbed.astro` component: drop the export in `public/decks/` and write
> `<DeckEmbed src="/decks/my-deck.html" title="My deck" />`. See
> `public/decks/README.md` in the website repo.

## Basic Embed

### Include the SDK

Add the embed SDK script to your page:

```html
<script src="https://your-instance.com/embed-sdk.js"></script>
```

### Create the Embed

```html
<div id="presentation"></div>
<script>
  const embed = PresentationSystemEmbed.createDeckEmbed({
    el: document.getElementById('presentation'),
    publishId: 'ABC123'
  });
</script>
```

The `publishId` is the 6-character code from your published presentation URL.

## SDK Options

### Full Options Example

```javascript
const embed = PresentationSystemEmbed.createDeckEmbed({
  el: document.getElementById('presentation'),
  publishId: 'ABC123',
  options: {
    // Base URL (defaults to current origin)
    baseUrl: 'https://your-instance.com',

    // Slug for prettier URLs
    slug: 'quarterly-review',

    // Show navigation controls (default: true)
    controls: true,

    // Starting slide index (default: 0)
    start: 0,

    // Loop at the end (default: false)
    loop: false,

    // Allow fullscreen button (default: true)
    allowFullscreen: true,

    // UI mode: "default" or "min" (minimal)
    ui: 'default',

    // Aspect ratio (default: 16/9)
    aspectRatio: 16/9,

    // Language: 'nl' or 'en-GB'
    lang: 'en-GB',

    // Show language switcher in embed
    langSwitch: false,

    // Allowed origins for postMessage (default: current origin)
    allowedOrigins: ['https://your-site.com'],

    // Accessibility title for iframe
    title: 'Quarterly Review Presentation',

    // Event callbacks
    onReady: (payload) => console.log('Ready', payload),
    onSlideChange: (payload) => console.log('Slide changed', payload),
    onError: (payload) => console.log('Error', payload)
  }
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | string | Current origin | Instance URL |
| `slug` | string | - | URL slug for the presentation |
| `controls` | boolean | true | Show navigation controls |
| `start` | number | 0 | Starting slide index |
| `loop` | boolean | false | Loop back to start at end |
| `allowFullscreen` | boolean | true | Allow fullscreen mode |
| `ui` | string | "default" | UI mode ("default" or "min") |
| `aspectRatio` | number | 16/9 | Embed aspect ratio |
| `lang` | string | - | Force language ("nl" or "en-GB") |
| `langSwitch` | boolean | false | Show language switcher |
| `title` | string | "Embedded presentation" | Iframe title for accessibility |

## Responsive Embedding

The embed automatically maintains aspect ratio. Wrap it in a container to control width:

```html
<style>
  .embed-container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>

<div class="embed-container">
  <div id="presentation"></div>
</div>
```

### Full-Width Embed

```css
.embed-container {
  width: 100%;
}
```

### Fixed Size

```css
.embed-container {
  width: 640px;
}
```

The height is automatically calculated based on the aspect ratio.

## Controller API

The `createDeckEmbed` function returns a controller object:

### Navigation Methods

```javascript
const embed = PresentationSystemEmbed.createDeckEmbed({ ... });

// Go to next slide
embed.next();

// Go to previous slide
embed.prev();

// Jump to specific slide (0-indexed)
embed.goToSlide(5);
```

### State Methods

```javascript
// Get current state
const state = embed.getState();
// Returns: { slideIndex, slideId, totalSlides, publishId }
```

### Cleanup

```javascript
// Remove the embed and clean up event listeners
embed.destroy();
```

## Event Handling

### Callback Options

Pass callbacks in the options object:

```javascript
PresentationSystemEmbed.createDeckEmbed({
  el: document.getElementById('presentation'),
  publishId: 'ABC123',
  options: {
    onReady: (payload) => {
      console.log('Total slides:', payload.totalSlides);
    },
    onSlideChange: (payload) => {
      console.log('Now on slide:', payload.slideIndex);
    },
    onError: (payload) => {
      console.error('Error:', payload);
    }
  }
});
```

### Event Listeners

Or use the event emitter pattern:

```javascript
const embed = PresentationSystemEmbed.createDeckEmbed({ ... });

// Subscribe to events
const unsubscribe = embed.on('slidechange', (payload) => {
  console.log('Slide changed:', payload);
});

// Unsubscribe when done
unsubscribe();

// Or use off()
embed.off('slidechange', handler);
```

### DOM Events

Events are also dispatched on the wrapper element:

```javascript
const wrapper = embed._wrapper;
wrapper.addEventListener('slidechange', (event) => {
  console.log('Slide:', event.detail.slideIndex);
});
```

### Available Events

| Event | Payload | Description |
|-------|---------|-------------|
| `ready` | `{ totalSlides }` | Embed loaded and ready |
| `slidechange` | `{ slideIndex, slideId }` | Slide navigation occurred |
| `state` | `{ slideIndex, slideId, totalSlides }` | State update |
| `error` | `{ message }` | Error occurred |

## Security Considerations

### Origin Validation

The embed iframe validates its parent origin using `allowedOrigins`:

```javascript
PresentationSystemEmbed.createDeckEmbed({
  el: document.getElementById('presentation'),
  publishId: 'ABC123',
  options: {
    allowedOrigins: [
      'https://your-site.com',
      'https://staging.your-site.com'
    ]
  }
});
```

By default, only the current origin is allowed.

### Iframe Sandbox

The embed uses standard iframe security:
- `referrerPolicy="strict-origin-when-cross-origin"`
- Fullscreen permission controlled via `allow` attribute
- No access to parent page DOM

### HTTPS

Always serve embeds over HTTPS in production for security.

## Troubleshooting

### Embed Not Loading

1. Check that the presentation is published
2. Verify the `publishId` is correct
3. Check browser console for errors
4. Ensure the SDK script is loaded

### Navigation Not Working

1. Verify `controls: true` in options
2. Check that `allowedOrigins` includes your domain
3. Look for JavaScript errors in console

### Responsive Issues

1. Ensure container has defined width
2. Check for CSS conflicts with `.ps-embed-wrap`
3. Verify `aspectRatio` option is set correctly

## Related

- [Publishing & Sharing](/docs/publishing/)
- [OpenGraph Images](/docs/publishing/og-images/)
- [Follow Mode](/docs/presenter/follow-mode/)
