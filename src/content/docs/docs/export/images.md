---
title: "Image Export"
description: "Export slides as PNG images"
---

# Image Export

Export individual slides or entire presentations as PNG images.

## How to Export

### Export All Slides

![Export dropdown menu showing PDF, PNG, PPTX, HTML, JSON, Print text, Notes, and Handoff ZIP options](/images/screenshots/export-dropdown-full.png)

1. Open your presentation
2. Click **Export** > **Images (PNG)**
3. Configure export options
4. Click **Export**
5. Download the ZIP file containing all images

### Export Single Slide

1. Navigate to the slide you want to export
2. Right-click on the slide
3. Select **Export as Image**
4. Download the PNG file

### Keyboard Shortcut

Press `Ctrl/Cmd + Shift + I` to export the current slide as an image.

## Export Options

### Resolution

Choose output resolution:

| Scale | Resolution (16:9) | Best For |
|-------|-------------------|----------|
| 1x | 1920 x 1080 | Standard screens |
| 2x | 3840 x 2160 | High-DPI screens, printing |
| 0.5x | 960 x 540 | Thumbnails, previews |

### Format

- **PNG** - Lossless quality, supports transparency
- **JPEG** - Smaller files, no transparency

### Background

- **Include background** - Full slide with background
- **Transparent** - PNG with transparent background (where applicable)

### Slides to Export

- **All slides** - Every slide in the presentation
- **Current slide** - Just the selected slide
- **Range** - Specify slide numbers (e.g., "1-5, 8, 10")

### Naming

File naming options:
- `slide-01.png`, `slide-02.png`, etc. (default)
- Include presentation title
- Include slide title

## Use Cases

### Social Media Sharing

Export slides for social platforms:
- LinkedIn posts
- Twitter/X threads
- Instagram carousels
- Facebook updates

**Tips:**
- Use 2x resolution for crisp images
- Square or 4:3 may work better for some platforms
- Export key slides, not the entire deck

### Thumbnails and Previews

Create preview images:
- Email previews
- Website thumbnails
- Document illustrations

**Tips:**
- Use 0.5x or 1x for thumbnails
- Export the title slide or key visual

### Print Materials

Export for physical prints:
- Posters
- Handouts
- Marketing materials

**Tips:**
- Use 2x or higher resolution
- Choose PNG for best quality
- Consider print dimensions

### Documentation

Include slides in other documents:
- Reports and proposals
- Wiki or knowledge base
- Training materials

### Presentations Elsewhere

When you can't use Deckyard:
- Convert to images for other tools
- Backup as image archive
- Share with non-Deckyard users

## Output Details

### File Size

Image size depends on:
- Resolution setting
- Slide complexity
- Image content on slides

Typical sizes:
- 1x PNG: 200KB - 1MB per slide
- 2x PNG: 500KB - 3MB per slide
- JPEG: 50-70% of PNG size

### Quality

PNG export preserves:
- Sharp text
- Precise colors
- Transparent elements

JPEG export:
- Smaller files
- Slight quality loss
- No transparency

## Batch Export

### ZIP Download

When exporting multiple slides:
- All images are packaged in a ZIP file
- Images are numbered in slide order
- Download completes when all slides are rendered

### Large Presentations

For presentations with many slides:
- Export may take longer
- Progress indicator shows status
- Consider exporting in batches

## API Access

### Export via API

```bash
POST /api/presentations/{id}/export/images
Content-Type: application/json

{
  "scale": 2,
  "format": "png",
  "slides": "all"
}
```

### Response

Returns a download URL for the ZIP file.

## Troubleshooting

### Export is Slow

For faster export:
- Use 1x resolution
- Export fewer slides
- Check your connection

### Images Look Blurry

- Increase resolution (2x)
- Ensure source images are high quality
- Check display scaling settings

### Colors Look Different

- PNG preserves colors best
- Monitor calibration affects perception
- sRGB color space is used

## Related

- [Export Formats](/docs/export/)
- [PDF Export](/docs/export/pdf/)
- [OG Images](/docs/publishing/og-images/)
