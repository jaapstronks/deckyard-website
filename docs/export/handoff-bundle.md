---
title: "Handoff Bundle"
description: "Export a complete bundle for design handoff"
---

Export a comprehensive ZIP bundle containing all formats for design handoff.

## Overview

The Handoff Bundle is a complete export package perfect for sharing presentations with stakeholders who may not have Deckyard access. It includes multiple formats so recipients can choose what works best for them.

![Export dropdown showing all formats including PDF, PNG, PPTX, HTML, JSON, Notes, and Handoff ZIP for both languages](/images/screenshots/export-full-dropdown.png)

## What's Included

### HTML Presentation

- Standalone, offline-capable presentation
- Full interactivity preserved
- Works in any modern browser
- No internet connection required

### PDF Document

- Print-optimized document
- High-quality rendering
- Professional format for archiving

### PowerPoint (PPTX)

- Editable PowerPoint file
- Slides as high-quality images
- Compatible with Microsoft Office

### PNG Images

- Individual slide images
- Multiple resolution options
- Perfect for documentation

### README File

- Instructions for using the bundle
- Description of contents
- Viewing recommendations

## Creating a Handoff Bundle

### From the Editor

1. Open your presentation
2. Click **File** > **Export** > **Handoff Bundle**
3. Configure options (see below)
4. Click **Create Bundle**
5. Download the ZIP file

### From the Presentation List

1. Right-click on a presentation
2. Select **Export** > **Handoff Bundle**
3. Configure and download

## Bundle Options

### PNG Scale Options

Configure image resolution for the PNG exports:

| Scale | Resolution (16:9) | Use Case |
|-------|-------------------|----------|
| **1x** | 1920 x 1080 | Standard screens, web |
| **2x** | 3840 x 2160 | High-DPI screens, print |
| **3x** | 5760 x 3240 | Ultra-high resolution, large prints |

Higher scales produce larger files but better quality.

### Include Options

Choose what to include in the bundle:

- **HTML** - Default on
- **PDF** - Default on
- **PPTX** - Default on
- **Images** - Default on
- **Notes** - Optional speaker notes document

### Language

For multi-language presentations:
- Select language for the bundle
- Or create bundles for each language

## Bundle Structure

The ZIP file is organized as follows:

```
presentation-handoff/
├── README.md
├── html/
│   └── presentation.html
├── pdf/
│   └── presentation.pdf
├── pptx/
│   └── presentation.pptx
├── images/
│   ├── slide-01.png
│   ├── slide-02.png
│   └── ...
└── notes/
    └── speaker-notes.docx (if included)
```

## Use Cases

### Client Handoff

Share with clients who:
- Don't have Deckyard access
- Need multiple format options
- Want offline access
- Require archival copies

### Team Distribution

Distribute to team members for:
- Review without accounts
- Offline access during travel
- Backup copies
- Documentation

### Archive

Create permanent archives:
- Project completion snapshots
- Compliance documentation
- Historical records

### Design Review

Share with designers for:
- Visual review
- Asset extraction
- Brand consistency checks

## File Size

Bundle size depends on:
- Number of slides
- PNG scale setting
- Image complexity
- Included formats

Typical sizes:
- Small presentation (10 slides, 1x): ~5-15 MB
- Medium presentation (25 slides, 2x): ~30-80 MB
- Large presentation (50 slides, 3x): ~100-300 MB

## Tips

### For Smaller Bundles

- Use 1x PNG scale
- Exclude formats you don't need
- Optimize images in presentation

### For Best Quality

- Use 2x or 3x PNG scale
- Include all formats
- Ensure source images are high resolution

### For Recipients

Include in your handoff communication:
- Which format to use for what purpose
- Any viewing requirements
- Contact for questions

## Related

- [Export Formats](/docs/export/)
- [PDF Export](/docs/export/pdf/)
- [Image Export](/docs/export/images/)
- [Publishing](/docs/publishing/)
