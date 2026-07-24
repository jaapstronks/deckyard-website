---
title: "Slide Rendering"
description: "Server-side slide rendering and export APIs"
---

Deckyard can render slides server-side for exports and previews.

## Overview

Server-side rendering enables high-quality exports and previews without requiring a browser on the client. Deckyard uses Puppeteer (headless Chromium) to render slides as images.

## PNG Rendering

### How It Works

1. **HTML Generation** - Slide content + CSS + fonts assembled into HTML
2. **Browser Rendering** - Puppeteer opens the HTML
3. **Screenshot** - Viewport captured as PNG buffer
4. **Return** - Buffer returned for saving or streaming

### Render Process

```javascript
// Internal rendering flow
const buffer = await renderSlideToPngBuffer(repoRoot, slide, {
  scale: 2,  // 2x for retina quality
  theme: themeObject
});
```

### Dimensions

| Setting | Value |
|---------|-------|
| Native viewport | 1600 x 900 |
| Aspect ratio | 16:9 |
| Scale options | 1x, 2x, 3x |
| Output (2x) | 3200 x 1800 |

### Scale Options

| Scale | Output Size | Use Case |
|-------|-------------|----------|
| 1x | 1600 x 900 | Preview, thumbnails |
| 2x | 3200 x 1800 | Standard export |
| 3x | 4800 x 2700 | High-res print |

## OG Image Generation

### Purpose

Generate social media preview images for shared presentations.

### Dimensions

| Property | Value |
|----------|-------|
| Canvas | 1200 x 630 |
| Slide area | Max 1120 x 630 |
| Background | #121212 (dark gray) |

### Process

1. Render first meaningful slide at 1600x900
2. Resize to fit within OG dimensions
3. Center on dark canvas
4. Optionally add author overlay
5. Return 1200x630 PNG

### Author Overlay

Optional branding in top-right corner:

```javascript
await generateOgPreview(repoRoot, slide, theme, {
  showAuthor: true,
  authorInfo: {
    name: 'John Doe',
    imageUrl: 'https://...'
  }
});
```

## Print Rendering

### PDF Export

For PDF exports, slides are rendered and assembled into a document:

1. Each slide rendered as PNG
2. PNGs combined into PDF
3. Optional speaker notes added
4. Multiple layouts supported (1, 2, 4, 6 per page)

### Print Optimizations

- Gradients rendered as static (deterministic output)
- Animations frozen at default state
- High resolution (2x scale)
- Embedded fonts

## HTML Assembly

### Components

Each rendered page includes:

```html
<!doctype html>
<html lang="...">
  <head>
    <meta charset="utf-8" />
    <style>
      /* Embedded fonts as base64 */
      /* App CSS */
      /* Theme variables */
      /* Slide styles */
    </style>
  </head>
  <body>
    <div class="ps-theme">
      <!-- Slide HTML -->
    </div>
    <script>/* Prism/KaTeX init */</script>
  </body>
</html>
```

### CSS Handling

Stylesheets are:
- Inlined (no external requests)
- Font-faces embedded as data URLs
- Theme variables applied
- Imports resolved recursively

### Image Handling

Images are converted to data URLs:

```javascript
// Local images become base64
/uploads/image.jpg → data:image/jpeg;base64,...
```

This ensures all resources are available during render.

## Rendering API

### Internal Use

The rendering system is used by:

- **Export endpoints** - PDF, PNG export
- **Publish** - OG image generation
- **Thumbnails** - Slide library previews

### Endpoint Example

There is one public rendering endpoint, used to render a single slide's HTML (primarily for custom slide types). It returns HTML, not an image:

```
POST /api/presentations/:id/render-slide
Content-Type: application/json

{
  "slide": { /* slide object */ },
  "mode": "preview"
}

Response: { "html": "<div class=\"ps-theme\">…</div>" }
```

PNG and PDF output are produced by the export endpoints, not here - see [PNG Export](/docs/export/images/) and [PDF Export](/docs/export/pdf/). The functions below (`renderSlideToPngBuffer`, `generateOgPreview`) are the internal building blocks those endpoints call.

## Puppeteer Configuration

### Environment Variables

```bash
# Path to the Chrome/Chromium binary. Falls back to CHROME_BIN, then to
# auto-detection of a system browser.
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# The sandbox is OFF by default (it runs with --no-sandbox). Set this to true
# to ENABLE the Chromium sandbox for defense-in-depth where your host supports it.
PUPPETEER_SANDBOX=true
```

### Docker Setup

The Dockerfile includes Chromium:

```dockerfile
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont
```

### Browser Pool

A single browser instance is shared, launched via `puppeteer-core` (Deckyard does not bundle its own Chromium) and cached in a promise:

```javascript
let browserPromise = null;

async function getPuppeteerBrowser({ featureName }) {
  if (!browserPromise) {
    const puppeteer = await import('puppeteer-core');
    browserPromise = puppeteer.launch({
      executablePath, // PUPPETEER_EXECUTABLE_PATH || CHROME_BIN || auto-detected
      headless: true,
      args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox']
      // ('--no-sandbox' is dropped when PUPPETEER_SANDBOX=true)
    });
  }
  return browserPromise;
}
```

## Font Handling

### Embedded Fonts

Fonts are embedded for consistent rendering:

1. Font files read from disk
2. Converted to base64
3. Injected as @font-face with data URLs
4. Original @font-face rules stripped

### Custom Theme Fonts

If a theme specifies custom fonts:
- Google Fonts are downloaded
- Local fonts are embedded
- Fallback fonts applied if unavailable

## Special Cases

### Video Slides

Video slides render a static preview:
- First frame or poster image
- Play button overlay
- Caption/title text

### Interactive Slides

Polls, Q&A, and other interactive elements:
- Render in default/empty state
- No live data included
- Placeholder text where appropriate

### Follow Invite Slides

These are skipped for OG images (first meaningful slide used instead).

## Performance

### Caching

- Browser instance reused
- Page created per render (cleaned up after)
- No result caching (renders are cheap)

### Memory

Each render temporarily uses:
- ~100-200MB for page
- Buffer size varies by scale
- Cleaned up after each render

### Timeout

Each render waits for slide resources (images, fonts) to settle before capturing. Long renders may indicate:
- Large/complex slides
- Missing resources
- Network issues

## Troubleshooting

### Blank Output

- Check Chromium is installed
- Verify PUPPETEER_EXECUTABLE_PATH
- Check for JavaScript errors in console

### Missing Fonts

- Ensure fonts are accessible
- Check theme configuration
- Verify font embedding worked

### Out of Memory

- Reduce scale factor
- Process fewer slides at once
- Increase container memory limits

### Slow Rendering

- Check image sizes
- Reduce complex animations
- Verify network for external resources

## Related

- [PDF Export](/docs/export/pdf/)
- [PNG Export](/docs/export/images/)
- [OpenGraph Images](/docs/publishing/og-images/)
- [Presentation Sessions](/docs/developer/sessions/)
