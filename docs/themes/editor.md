---
title: "Theme Editor"
description: "Create and customize themes through the visual interface"
---

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

![Theme Editor with name, logo, color pickers, font selectors, and live preview](/images/screenshots/theme-editor-full.png)

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

### Font Picker

The Theme Editor provides font picker dropdowns for heading and body fonts. Each picker shows:

- **Curated fonts** — 40 pre-selected Google Fonts, grouped by category (sans-serif, serif, display, monospace). Available to all organizations.
- **Custom fonts** — Organization-specific fonts added through [Font Management](/docs/themes/font-management/). Shown in a separate group at the top of the picker.

Font previews load automatically so you can see each typeface before selecting it.

### Heading and Body Fonts

| Element | CSS Variable | Usage |
|---------|-------------|-------|
| Heading Font | `--t-font-heading` | Titles, section headers, emphasis text |
| Body Font | `--t-font-body` | Paragraphs, lists, slide content |

### Body Font Requirements

Body fonts need both Regular (400) and Bold (700) weights to properly render slide content. The body font picker only shows fonts that meet this requirement:

- **Uploaded custom fonts** must have both weight 400 and 700 variants
- **Adobe, Monotype, and Google fonts** are always available (variants managed externally)
- **Curated fonts** always qualify (pre-selected with appropriate weights)

Heading fonts have no weight restriction — a single weight works fine for titles.

### Heading Weight

Use the heading weight setting to control how bold headings appear. This maps to `--t-heading-weight` in the theme configuration. Common values:

| Weight | Style |
|--------|-------|
| 400 | Regular |
| 600 | Semi-bold |
| 700 | Bold |

### Font Recommendations

- Limit to 2 font families (one heading, one body) for visual consistency
- Pair a distinctive heading font with a readable body font
- Test at various sizes — headings, body text, and captions
- Verify fonts render correctly in exports (PDF, PNG, HTML)

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
--t-color-accent          /* Primary accent color */
--t-color-background      /* Default slide background */
--t-color-text            /* Primary text color */
--t-color-text-muted      /* Secondary/muted text */
--t-slide-bg-lime         /* Lime background variant */
--t-slide-bg-mist         /* Mist background variant */
--t-slide-bg-dark         /* Dark background variant */
--t-quote-author-color    /* Quote attribution text */
--t-quote-text-color      /* Quote body text */
```

### Chart Colors

```css
--t-chart-0 through --t-chart-7  /* 8 chart series colors */
```

### Typography Variables

```css
--t-font-heading       /* Font family for headings */
--t-font-body          /* Font family for body text */
--t-font-caption       /* Font family for captions (defaults to body) */
--t-font-mono          /* Font family for code blocks */
--t-heading-weight     /* Font weight for headings (e.g. 600, 700) */
--t-heading-transform  /* Text transform for headings (e.g. none, uppercase) */
```

### Layout Variables

```css
--t-radius             /* Default border radius */
--t-radius-sm          /* Small border radius */
--t-radius-lg          /* Large border radius */
```

### Asset Variables

```css
--t-logo-url           /* Logo as CSS url() for background-image use */
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
- [Font Management](/docs/themes/font-management/)
- [Custom Slide Types](/docs/customization/custom-slide-types/)
- [Export Formats](/docs/export/)
