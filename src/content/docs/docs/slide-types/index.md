---
title: "Slide Types Overview"
description: "Complete guide to all slide types available in Deckyard"
---

# Slide Types

Deckyard includes 36 built-in slide types organized into categories. Each slide type has specific fields, default values, and rendering behavior.

![Slide type picker showing available categories](/images/screenshots/slide-type-picker-new.png)

## Categories

### Structure Slides
Organizational slides that define presentation flow:
- **Title Slide** - Opening slide with title, subheading, byline, and optional background image
- **Chapter Title Slide** - Section dividers with large titles
- **Split Partner Title Slide** - Co-branded title slides with two logos

### Content Slides
Text-focused slides for presenting information:
- **Text Slide** - Title with markdown body, one or two-column layouts
- **List Slide** (Lijstje) - Bulleted or numbered lists with icons
- **Text Blocks** - Multiple text sections in a grid
- **Content Columns** - Side-by-side content columns

### Data & Visualization
Slides for presenting data and metrics:
- **Chart** - Bar, line, and pie charts from CSV/TSV data
- **Table** - Structured data tables with header rows
- **KPI Metrics** - Key performance indicators with values, units, and deltas
- **Matrix** - 2x2 or larger matrix layouts
- **Funnel** - Funnel/conversion visualizations
- **Pyramid** - Hierarchical pyramid diagrams
- **Cycle** - Circular process diagrams

### Interactive Slides
Audience engagement during live presentations:
- **Poll** - Multiple choice questions (A/B/C/D)
- **Likert Scale** - Agreement scale (strongly disagree to strongly agree)
- **Likert Slider** - Continuous slider scale
- **Feedback** - Open-ended audience feedback
- **Lead Capture** - Collect audience contact information
- **Follow Invite** - QR code to join the presentation

### Media Slides
Rich media content:
- **Image Slide** - Full-screen images with fill, fit, or bleed layouts
- **Video Slide** - Embedded YouTube, Vimeo, or Bunny videos
- **Embed Slide** - External content via iframe
- **Gallery** - Multiple images in a grid

### Card-Based Layouts
Structured content in card formats:
- **Team Cards** (Image Blocks) - People with photos and titles
- **Card Stack** - Stacked content cards
- **Icon Card Grid** - Cards with icons and descriptions
- **Logo Wall** - Partner or client logos

### Special Purpose
Specialized slide types:
- **Quote Slide** - Highlighted quotations with attribution
- **Payoff Slide** - Tagline or slogan slides
- **Comparison** - Side-by-side comparisons
- **Process** - Step-by-step process flows
- **Timeline** - Chronological timelines
- **Agenda Timeline** - Meeting agendas with time slots
- **Stock Team Overview** - Team photos with stock image placeholders

## Common Fields

Most slide types share these optional fields:

| Field | Description |
|-------|-------------|
| `background` | Background color theme (lime, mist, etc.) |
| `a11yTitle` | Accessibility title for screen readers |
| `a11ySummary` | Additional context for screen readers |

## Accessibility Features

Every slide type automatically includes accessibility fields:

- **Accessibility Title** - Announced by screen readers when the slide becomes active
- **Accessibility Summary** - Additional context for screen readers
- **RTL Support** - All text elements include `dir="auto"` for right-to-left languages

## Custom Slide Types

Organizations can create custom slide types by adding files to the `custom-slide-types/` directory. Custom types can override core types or add entirely new slide types. See [Custom Slide Types](/docs/customization/custom-slide-types/) for details.

## Related

- [Data & Visualization Slides](/docs/slide-types/data/)
- [Interactive Slides](/docs/slide-types/interactive/)
- [Content Cards](/docs/slide-types/cards/)
- [Media Slides](/docs/slide-types/media/)
- [Structure Slides](/docs/slide-types/structure/)
