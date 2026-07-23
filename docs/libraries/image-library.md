---
title: "Image Library"
description: "Manage and reuse uploaded images across presentations"
---

Organize and reuse your uploaded images across all presentations. The Image Library provides a central repository for your media assets.

![Image picker with library, search, and upload options](/images/screenshots/image-picker.png)

## Overview

Every image you upload to Deckyard is stored in your Image Library. This makes it easy to reuse images across presentations without uploading them again.

## Uploading Images

### From the Editor

1. Click any image field in a slide
2. Click **Upload** in the image picker
3. Select an image from your computer
4. The image uploads and is added to your library

### Supported Formats

| Format | Best For |
|--------|----------|
| JPEG | Photos, complex images |
| PNG | Graphics, screenshots, transparency |
| GIF | Animated images |
| WebP | Modern format, smaller sizes |
| SVG | Logos, icons (vector) |

### Size Limits

- Maximum file size: 10 MB (configurable by admin)
- Recommended resolution: 1920x1080 for full-screen slides
- Images are not automatically resized on upload

## Browsing the Library

### Accessing Your Library

1. Click any image field in the editor
2. Switch to the **Library** tab
3. Browse your uploaded images

### Organization

Images are displayed with:
- Thumbnail preview
- Filename
- Upload date
- Dimensions

### Search

- Search by filename
- Filter by recent uploads
- Sort by date or name

## Selecting Images

### Quick Select

Click any image thumbnail to insert it into the current field.

### Preview

Hover over an image to see:
- Larger preview
- Full filename
- Dimensions
- File size

## Image Sources

The image picker provides multiple sources:

### Library Tab
Your uploaded images, organized by recency.

### Upload Tab
Upload new images from your computer.

### Unsplash Tab
Search stock photos from Unsplash (if configured). See [Unsplash Integration](/docs/integrations/unsplash/).

### Giphy Tab
Search GIFs from Giphy (if configured). See [Giphy Integration](/docs/integrations/giphy/).

### URL Tab
Paste any external image URL.

## Managing Images

### Storage

Uploaded images are stored on your server in the uploads directory:
```
server/uploads/
├── {user-id}/
│   ├── image1.jpg
│   ├── image2.png
│   └── ...
```

### Deleting Images

Currently, images must be deleted through the file system. A library management interface is planned for a future release.

### Image CDN

For production deployments, consider using an image CDN like ImageKit for:
- Automatic optimization
- Responsive sizing
- Global delivery
- Format conversion

See [Media Services](/docs/integrations/media-services/) for CDN configuration.

## Best Practices

### Before Uploading

- **Optimize images** - Compress files before uploading
- **Use descriptive names** - `team-photo-2024.jpg` vs `IMG_4532.jpg`
- **Check dimensions** - Match intended display size
- **Verify licensing** - Only upload images you have rights to use

### Organization

- Organize by project or purpose
- Use consistent naming conventions
- Remove unused images periodically

### Performance

- Use JPEG for photos (better compression)
- Use PNG only when transparency is needed
- Consider WebP for modern browsers
- Keep file sizes under 500KB when possible

## Image Usage in Slides

### Image Fields

Different slide types have different image handling:

| Slide Type | Image Handling |
|------------|----------------|
| Image Slide | Full-screen with layout options |
| Team Cards | Cropped to square or original |
| Title Slide | Background with overlay |
| Logo Wall | Uniform sizing |

### Focus Points

For cropped images, set focus points to control which part of the image is visible:
- `focusX`: Horizontal position (0-100)
- `focusY`: Vertical position (0-100)

### Alt Text

Always provide alt text for accessibility:
- Describe the image content
- Keep descriptions concise
- Mark decorative images appropriately

## Integration with External Services

### Unsplash

Search and insert free stock photos:
- High-quality images
- No attribution required (but appreciated)
- Requires API key configuration

### Giphy

Search and insert GIFs:
- Animated content
- Reactions and expressions
- Requires API key configuration

### ImageKit (CDN)

Automatic image optimization:
- Resize on-the-fly
- Format conversion
- Quality optimization
- Global CDN delivery

## Related

- [Asset Libraries Overview](/docs/libraries/)
- [Slide Library](/docs/libraries/slide-library/)
- [Unsplash Integration](/docs/integrations/unsplash/)
- [Giphy Integration](/docs/integrations/giphy/)
- [Media Services](/docs/integrations/media-services/)
