---
title: "Theme Editor"
description: "Create and customize themes through the visual interface"
---

# Theme Editor

The Theme Editor provides a visual interface for creating and customizing themes without directly editing JSON files.

## Overview

The Theme Editor allows you to:
- Modify colors and typography
- Upload logos and assets
- Preview changes in real-time
- Export theme configurations

## Accessing the Theme Editor

### From Admin Panel

1. Navigate to **Admin** > **Themes**
2. Click **Edit** on an existing theme, or
3. Click **Create New Theme**

### Permissions

Theme editing requires admin access. Regular users can select themes but cannot modify them.

## Color Configuration

### Primary Colors

| Variable | Usage |
|----------|-------|
| Accent Color | Buttons, links, highlights |
| Text Dark | Primary text on light backgrounds |
| Text Light | Primary text on dark backgrounds |

### Background Colors

Configure the predefined background options:

| Background | Default | Usage |
|------------|---------|-------|
| Lime | Brand primary | High-energy slides |
| Mist | Light neutral | Content-heavy slides |
| Night | Dark | Low-light presentations |

### Color Picker

1. Click any color swatch
2. Use the color picker or enter a hex code
3. Preview updates automatically
4. Click **Apply** to confirm

## Typography

### Font Families

Configure fonts for different text elements:

| Element | Usage |
|---------|-------|
| Heading Font | Titles, headers, emphasis |
| Body Font | Paragraphs, lists, content |

### Custom Fonts

To use custom fonts:

1. Click **Add Font**
2. Upload your font files (.woff2 recommended)
3. Specify font family name, weight, and style
4. Assign to heading or body usage

### Font Recommendations

- Use `.woff2` format for best compression
- Include regular (400) and bold (700) weights at minimum
- Test readability at various sizes

## Logo and Assets

### Primary Logo

The main logo appears on title slides and headers:

1. Click **Upload Logo**
2. Select your logo file (SVG recommended)
3. Enter alt text for accessibility
4. Preview on sample slides

### Logo Variants

| Variant | Purpose |
|---------|---------|
| Primary Logo | Default for most slides |
| Title Logo | Smaller version for title slides |
| Payoff Logo | Used on payoff/tagline slides |

### Background Images

Add preset background images:

1. Click **Add Background**
2. Upload high-resolution images (1920x1080+)
3. Preview on title slide
4. Reorder by dragging

## Live Preview

### Preview Panel

The right side shows a live preview that updates as you make changes:

- Sample title slide with logo
- Content slide with colors
- Chart slide with palette

### Preview Modes

- **Light mode** - Preview on light backgrounds
- **Dark mode** - Preview on dark backgrounds
- **All slides** - Cycle through all sample types

## Saving and Publishing

### Draft Mode

Changes are saved as drafts until published:
- Only you can see draft changes
- Preview without affecting live presentations

### Publishing

1. Review all changes in preview
2. Click **Publish Theme**
3. Confirm the update
4. Changes apply to all presentations using this theme

### Version History

View previous versions of the theme:
1. Click **Version History**
2. Compare versions
3. Restore a previous version if needed

## Exporting Themes

### Export to JSON

Download the theme configuration:

1. Click **Export**
2. Choose **JSON Format**
3. Save the file

Use for:
- Backup
- Sharing with other instances
- Version control

### Import Theme

Import a theme from JSON:

1. Click **Import Theme**
2. Select the JSON file
3. Review the configuration
4. Click **Import**

## CSS Variables Reference

### Color Variables

```css
--t-color-accent       /* Primary accent color */
--t-slide-bg-lime      /* Lime background */
--t-slide-bg-mist      /* Mist background */
--t-slide-bg-night     /* Night/dark background */
--t-text-color-light   /* Text on dark backgrounds */
--t-text-color-dark    /* Text on light backgrounds */
```

### Chart Colors

```css
--t-chart-1  /* First series/slice color */
--t-chart-2  /* Second series/slice color */
--t-chart-3  /* Third series/slice color */
/* ... up to --t-chart-8 */
```

### Advanced Variables

For fine-grained control:

```css
--t-heading-font       /* Font family for headings */
--t-body-font          /* Font family for body text */
--t-border-radius      /* Border radius for elements */
--t-shadow             /* Box shadow for cards */
```

## Best Practices

### Colors

- Ensure sufficient contrast (WCAG AA minimum)
- Test colors in both light and dark modes
- Consider colorblind accessibility

### Typography

- Limit to 2 font families maximum
- Test at various sizes (headings to captions)
- Ensure fonts work in exports

### Logos

- Use SVG for best quality at any size
- Ensure logos work on all backgrounds
- Provide appropriate alt text

### Testing

- Preview all slide types
- Test exports (PDF, PNG)
- View on different devices

## Related

- [Themes Overview](/docs/themes/)
- [Custom Slide Types](/docs/customization/custom-slide-types/)
- [Export Formats](/docs/export/)
