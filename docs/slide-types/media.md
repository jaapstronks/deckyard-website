---
title: "Media Slides"
description: "Embed images, videos, and external content in your presentations"
---

Enhance your presentations with rich media content including images, videos, and external embeds.

![Image+text slide editor showing title, markdown body, image upload, caption, image role, and live preview](/images/screenshots/image-text-slide-editor.png)

## Image Slide

Display full-screen images with multiple layout options.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Optional image title |
| `subheading` | No | Subtitle |
| `bottomSubheading` | No | Bottom caption area |
| `image` | No | Image URL |
| `alt` | No | Alt text for accessibility |
| `imageRole` | No | `content` or `decorative` |
| `caption` | No | Image caption |
| `focusX` | No | Horizontal focus (0-100) |
| `focusY` | No | Vertical focus (0-100) |
| `layout` | No | Layout mode |
| `zoomSteps` | No | Zoom animation preset |
| `zoomLevel` | No | Zoom magnification (1.2-5) |
| `zoomPositions` | No | Custom zoom positions (JSON) |

### Layout Options

| Layout | Behavior |
|--------|----------|
| `full` (Fill) | Image fills the frame, may be cropped |
| `bleed` (Full-bleed) | Edge-to-edge, no margins |
| `centered` (Fit) | Shows full image without cropping |

### Focus Point

For cropped layouts (`full` and `bleed`), the focus point controls which part of the image remains visible:

- `focusX: 0` = left edge, `50` = center, `100` = right edge
- `focusY: 0` = top edge, `50` = center, `100` = bottom edge

### Zoom Steps (Presentation Mode)

Enable step-through zoom regions during presentation:

| Preset | Description |
|--------|-------------|
| `corners` | Zoom to 4 corners |
| `horizontal` | Left half, then right half |
| `vertical` | Top half, then bottom half |
| `quadrants` | Each quadrant in reading order |
| `custom` | Define your own positions |

Custom zoom positions are specified as JSON:
```json
[{"x":25,"y":25},{"x":75,"y":25},{"x":25,"y":75},{"x":75,"y":75}]
```

### Accessibility

- **Content images** should have meaningful alt text
- **Decorative images** can be marked as decorative (hidden from screen readers)
- Alt text falls back to caption, then title if not explicitly set

---

## Video Slide

Embed videos from YouTube, Vimeo, or Bunny Stream.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Video title |
| `source` | Yes | Video URL or Bunny ID |
| `background` | No | Background color |
| `autoplay` | No | `on` or `off` |
| `bunnyLibraryId` | No | Bunny Stream library ID |

### Supported Providers

**YouTube**
- Paste any YouTube URL
- Supports watch URLs, short URLs, and embed URLs

**Vimeo**
- Paste any Vimeo URL
- Works with standard and player URLs

**Bunny Stream**
- Paste embed URL or video UUID
- Requires library ID for UUID format

### Autoplay Behavior

- **Off** (default) - Video waits for user interaction
- **On** - Video starts when slide becomes active (muted)

Note: Videos are always muted when autoplay is enabled (browser requirement).

### Video in Thumbnails

Video thumbnails are rendered as static previews to avoid performance issues in the slide list.

---

## Embed Slide

Embed external web content via iframe.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Embed title |
| `url` | Yes | URL to embed |
| `aspectRatio` | No | Width/height ratio |

### Use Cases

- Interactive maps
- Data dashboards
- External tools
- Third-party widgets
- Live web content

### Security Considerations

- Only embed trusted sources
- Some sites block iframe embedding (X-Frame-Options)
- Content loads directly from the source, not proxied

---

## Gallery Slide

Display multiple images in a grid layout.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Gallery title |
| `images` | No | Array of images |
| `layout` | No | Grid arrangement |

### Features

- Automatic grid layout based on image count
- Consistent spacing and sizing
- Click to enlarge (in presenter mode)

### Use Cases

- Photo collections
- Product images
- Portfolio showcases
- Event highlights

---

## Image Sources

### Upload

Upload images directly through the editor. Uploaded images are stored on your server.

### Image Library

Select from previously uploaded images. See [Image Library](/docs/libraries/image-library/).

### Unsplash Integration

Search and insert stock photos from Unsplash. See [Unsplash Integration](/docs/integrations/unsplash/).

### Giphy Integration

Search and insert GIFs from Giphy. See [Giphy Integration](/docs/integrations/giphy/).

### External URLs

Paste any publicly accessible image URL.

---

## Best Practices

### Image Quality

- Use high-resolution images (1920x1080 minimum for full-screen)
- Consider file size for loading performance
- Use appropriate formats (JPEG for photos, PNG for graphics)

### Video

- Keep videos short for presentations
- Consider bandwidth when presenting remotely
- Have a backup plan if video doesn't load

### Accessibility

- Always add alt text for meaningful images
- Mark purely decorative images appropriately
- Provide captions for videos when possible

---

## Related

- [Slide Types Overview](/docs/slide-types/)
- [Image Library](/docs/libraries/image-library/)
- [Unsplash Integration](/docs/integrations/unsplash/)
- [Giphy Integration](/docs/integrations/giphy/)
