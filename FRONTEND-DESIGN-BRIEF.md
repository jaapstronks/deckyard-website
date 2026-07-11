# Frontend Design Brief: Component System

*For: Deckyard marketing website*
*Scope: Layout system, section components, reusable patterns*

---

## Overview

The current implementation uses ad-hoc styling with a single container width. This brief defines a **component-based system** that:

1. Creates visual rhythm through intentional width variation
2. Establishes reusable section and layout components
3. Works across homepage and subpages (features, pricing, docs, etc.)
4. Scales cleanly for future pages

**Principle:** Every layout pattern should be a component. No one-off inline styles for structural decisions.

---

## 1. Container System

### The Problem
Currently everything uses the same container width, creating visual monotony. Different content types have different optimal widths for readability and impact.

### The Solution
A container system with semantic width variants:

| Container | Max Width | Use Case |
|-----------|-----------|----------|
| `narrow` | 720-800px | Long-form text, focused CTAs, code snippets |
| `default` | 1000-1100px | Balanced layouts, tour sections, standard grids |
| `wide` | 1200-1280px | Visual content, hero sections, large grids |
| `full` | 1400px+ | Edge-to-edge with padding, maximum impact |

### Application Examples

```
Hero section           → wide or full
Text-heavy intro       → narrow (centered within wider section)
Video/demo             → default or wide
Card grids (3-4 col)   → wide
Tour layouts (50/50)   → default
Code snippets          → narrow
Final CTA              → narrow (focused)
```

### Nesting Pattern
Sections can use a wide container while specific content blocks use narrower widths:

```
┌─────────────────────────────────────────────────────────┐
│ Section (full-width background)                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Container: wide                                   │  │
│  │  ┌─────────────────────────────────────┐          │  │
│  │  │ Text block: narrow (centered)       │          │  │
│  │  └─────────────────────────────────────┘          │  │
│  │  ┌───────────────────────────────────────────┐    │  │
│  │  │ Visual element: uses full container width │    │  │
│  │  └───────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Section Component

Every full-width horizontal band on the page is a **Section**. Sections handle:
- Background color/style
- Vertical padding
- Container width selection

### Section Variants

| Variant | Background | Use Case |
|---------|------------|----------|
| `default` | White/light | Standard content |
| `alt` | Light gray/subtle | Visual separation |
| `dark` | Dark background, light text | Emphasis, sovereignty section |
| `cta` | Brand color or gradient | Final call-to-action |
| `hero` | Can be any, often with special treatment | Page heroes only |

### Section Props (Conceptual)

```
Section
├── variant: default | alt | dark | cta | hero
├── container: narrow | default | wide | full
├── padding: standard | compact | spacious
└── children: content
```

### Vertical Rhythm
Consistent vertical padding creates rhythm. Suggest three levels:

| Padding | Value (example) | Use Case |
|---------|-----------------|----------|
| `compact` | 3rem / 48px | Dense sections, card-heavy |
| `standard` | 5rem / 80px | Most sections |
| `spacious` | 7rem / 112px | Hero, major transitions |

---

## 3. Layout Components

These are the structural patterns that appear inside sections.

### 3.1 Split Layout (Tour)

A two-column layout with visual on one side, content on the other.

```
┌─────────────────────────────────────────────────────┐
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │                  │  │  Headline                │ │
│  │     Visual       │  │  Lead text               │ │
│  │   (screenshot,   │  │  Body text               │ │
│  │     video,       │  │  • Feature pills         │ │
│  │     embed)       │  │  • Or bullet points      │ │
│  │                  │  │  [CTA button]            │ │
│  └──────────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Props:**
- `visualPosition`: left | right
- `visualWidth`: 50% | 40% | 60%
- `visualType`: image | video | embed
- `alignment`: top | center

**Used in:**
- Homepage: Interactions section, AI section
- Features pages: Feature deep-dives
- Use case pages: Problem/solution layouts

### 3.2 Card Grid

A responsive grid of cards.

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  Card   │  │  Card   │  │  Card   │  │  Card   │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

**Props:**
- `columns`: 2 | 3 | 4 (at max width; responsive)
- `gap`: compact | standard | spacious
- `cardVariant`: default | visual | highlight

**Used in:**
- Homepage: Vision cards, Open Platform cards
- Features: Feature grids
- Pricing: Plan comparison

### 3.3 Thumbnail Grid

A dense grid for visual items (slide types, templates, etc.)

```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
```

**Props:**
- `minItemWidth`: determines responsive column count
- `aspectRatio`: 16:9 | 4:3 | 1:1
- `showLabels`: boolean

**Used in:**
- Homepage: Slide type showcase
- Features/Slide Types: Full catalog
- Templates page (future)

### 3.4 Two-Path Layout

Side-by-side options (e.g., Cloud vs Self-host)

```
┌─────────────────────────┐  ┌─────────────────────────┐
│  Option A               │  │  Option B               │
│  (can be highlighted)   │  │                         │
│                         │  │                         │
│  • Bullet               │  │  • Bullet               │
│  • Bullet               │  │  • Bullet               │
│                         │  │                         │
│  [CTA]                  │  │  [CTA]                  │
└─────────────────────────┘  └─────────────────────────┘
```

**Props:**
- `highlightedSide`: left | right | none
- `equalHeight`: boolean

**Used in:**
- Homepage: Sovereignty section
- Pricing: Plan comparison (alternative layout)
- Self-hosting: Cloud vs Self-host comparison

### 3.5 Centered Block

Centered content with controlled width—for intros, CTAs, quotes.

```
         ┌─────────────────────────────┐
         │  Headline                   │
         │  Paragraph of text that     │
         │  wraps at a comfortable     │
         │  reading width.             │
         │                             │
         │       [CTA] [CTA]           │
         └─────────────────────────────┘
```

**Props:**
- `width`: narrow | default
- `alignment`: center | left

**Used in:**
- Section intros (problem statement, etc.)
- Final CTAs
- Quote/testimonial blocks

### 3.6 Media Block

A featured visual element (video, screenshot, embed) with optional caption.

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                   [Visual]                          │
│                                                     │
└─────────────────────────────────────────────────────┘
                    Caption text
```

**Props:**
- `type`: image | video | embed
- `aspectRatio`: 16:9 | 4:3 | auto
- `width`: narrow | default | wide
- `shadow`: boolean
- `rounded`: boolean
- `caption`: string (optional)

**Used in:**
- Homepage: Demo video, hero screenshot
- Features: Feature screenshots
- Docs: Instructional images

### 3.7 Code Block

Styled code snippet with optional header.

```
┌─────────────────────────────────────────┐
│ JavaScript                    [Copy]    │
├─────────────────────────────────────────┤
│ const deck = await deckyard.create({    │
│   title: "Q4 Report",                   │
│   template: "corporate"                 │
│ });                                     │
└─────────────────────────────────────────┘
```

**Props:**
- `language`: string (for syntax highlighting label)
- `showCopy`: boolean
- `width`: narrow | default

**Used in:**
- Homepage: API snippet in Open Platform
- Docs: All code examples
- Self-hosting: Docker commands

---

## 4. Card Component

Cards are used throughout. Define variants rather than one-off styles.

### Card Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Icon + title + description | Feature cards |
| `visual` | Thumbnail image + title + description | Slide type cards |
| `highlight` | Emphasized border/background | Recommended option |
| `compact` | Smaller padding, denser | Supporting points |
| `link` | Entire card is clickable | Navigation cards |

### Card Props (Conceptual)

```
Card
├── variant: default | visual | highlight | compact | link
├── icon: icon name (for default variant)
├── image: image src (for visual variant)
├── title: string
├── description: string
├── href: string (for link variant)
└── highlighted: boolean
```

---

## 5. Badge/Chip Components

Small inline elements for metadata, features, trust signals.

### Badge (Trust signals, metadata)
```
[🇫🇷 Hosted in France]  [MIT licensed]  [Self-hostable]
```

**Used in:** Hero trust strip, footer, pricing features

### Chip (Features, tags)
```
[Live polls]  [Q&A]  [Feedback]  [Likert scales]
```

**Used in:** Interactions section, feature lists

### Capability Badge (With icon)
```
[✨ Generate from prompt]  [📄 Convert documents]
```

**Used in:** AI section capability strip

---

## 6. Spacing & Typography

### Spacing Scale
Use a consistent scale (e.g., 4px base):

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Tight |
| `space-2` | 8px | Compact |
| `space-3` | 12px | Small gaps |
| `space-4` | 16px | Standard gap |
| `space-6` | 24px | Medium |
| `space-8` | 32px | Section internal |
| `space-12` | 48px | Section padding (compact) |
| `space-16` | 64px | Section padding (standard) |
| `space-20` | 80px | Section padding (spacious) |

### Typography Scale

| Element | Size (suggested) | Use |
|---------|------------------|-----|
| `h1` | 2.5-3rem | Page hero only |
| `h2` | 1.75-2rem | Section headlines |
| `h3` | 1.25-1.5rem | Card titles, sub-sections |
| `lead` | 1.25rem | Section intro text |
| `body` | 1rem | Standard text |
| `small` | 0.875rem | Captions, fine print |
| `caption` | 0.75rem | Labels, metadata |

### Line Length
- Body text: 65-75 characters (≈600-700px)
- Lead text: 75-85 characters (≈700-800px)
- Headlines: No max, but avoid orphans

---

## 7. Page Templates

Different page types use these components in consistent patterns.

### Homepage
```
Hero (wide, spacious)
Problem/Solution (wide container, narrow text, wide video)
Showcase (wide, thumbnail grid)
Interactions (default, split layout)
AI (default, split layout)
Sovereignty (wide, two-path layout)
Open Platform (wide cards, narrow code)
Social Proof (narrow, centered)
CTA (narrow, centered)
```

### Feature Page (e.g., /features/interactions)
```
Hero (compact variant)
Overview (centered block)
Feature Grid (card grid, 3 col)
Deep Dive 1 (split layout, visual left)
Deep Dive 2 (split layout, visual right)
Related Features (card grid, 3 col)
CTA
```

### Comparison Page (e.g., /compare/mentimeter)
```
Hero (compact)
Quick Comparison (table or two-path)
Feature Breakdown (alternating split layouts)
Pricing Comparison (table)
CTA
```

### Use Case Page (e.g., /use-cases/education)
```
Hero (with audience-specific messaging)
Pain Points (card grid)
Solution (split layout with screenshot)
Features for This Audience (card grid)
Social Proof (if available)
CTA
```

---

## 8. Responsive Behavior

### Breakpoints (suggested)

| Name | Width | Behavior |
|------|-------|----------|
| `mobile` | < 640px | Single column, stacked layouts |
| `tablet` | 640-1024px | 2-column grids, reduced padding |
| `desktop` | 1024-1280px | Full layouts, standard padding |
| `wide` | > 1280px | Max-width containers kick in |

### Component Responsive Rules

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Split layout | Stack (visual on top) | Stack or 50/50 | 50/50 or 60/40 |
| Card grid (3 col) | 1 column | 2 columns | 3 columns |
| Card grid (4 col) | 1 column | 2 columns | 4 columns |
| Thumbnail grid | 2 columns | 3-4 columns | 5-6 columns |
| Two-path layout | Stack | Stack or side-by-side | Side-by-side |

---

## 9. Implementation Notes

### For the Developer

1. **Build components, not pages.** Each layout pattern should be a reusable component that accepts props/slots.

2. **Container as a component.** The container width should be a prop, not a separate class added ad-hoc.

3. **Section as a component.** Background variant, padding, and container width should be section-level props.

4. **Avoid magic numbers.** Use the spacing and sizing tokens consistently.

5. **Test at all breakpoints.** Especially the thumbnail grid and split layouts.

### Suggested Component Structure (Astro/React)

```
components/
├── layout/
│   ├── Section.astro
│   ├── Container.astro
│   ├── SplitLayout.astro
│   ├── CardGrid.astro
│   ├── ThumbnailGrid.astro
│   ├── TwoPath.astro
│   ├── CenteredBlock.astro
│   └── MediaBlock.astro
├── ui/
│   ├── Card.astro
│   ├── Badge.astro
│   ├── Chip.astro
│   ├── CodeBlock.astro
│   ├── Button.astro
│   └── Icon.astro
└── sections/
    ├── Hero.astro
    ├── FeatureGrid.astro
    ├── ProblemSolution.astro
    ├── TourSection.astro
    ├── SovereigntySection.astro
    └── CTASection.astro
```

### CSS Architecture

Use CSS custom properties for tokens, component-scoped styles for layout:

```css
:root {
  /* Spacing */
  --space-4: 1rem;
  --space-8: 2rem;
  /* ... */

  /* Container widths */
  --container-narrow: 800px;
  --container-default: 1100px;
  --container-wide: 1280px;
  --container-full: 1400px;

  /* Section padding */
  --section-padding-compact: 3rem;
  --section-padding-standard: 5rem;
  --section-padding-spacious: 7rem;
}
```

---

## 10. Migration Path

### Phase 1: Foundation
- [ ] Define CSS custom properties (spacing, widths, colors)
- [ ] Create Container component with width variants
- [ ] Create Section component with background/padding variants

### Phase 2: Layout Components
- [ ] Create SplitLayout (tour sections)
- [ ] Create CardGrid
- [ ] Create ThumbnailGrid
- [ ] Create TwoPath
- [ ] Create CenteredBlock
- [ ] Create MediaBlock

### Phase 3: UI Components
- [ ] Standardize Card variants
- [ ] Create Badge/Chip components
- [ ] Create CodeBlock component

### Phase 4: Page Refactor
- [ ] Refactor homepage using new components
- [ ] Refactor feature pages
- [ ] Refactor other pages

---

## Appendix: Current Homepage Mapped to Components

| Current Section | Components Needed |
|-----------------|-------------------|
| Hero | Section(hero, wide) + custom hero layout |
| Problem/Solution | Section + CenteredBlock(narrow) + MediaBlock(wide) + CardGrid(3, compact) |
| Showcase | Section(alt, wide) + CenteredBlock + ThumbnailGrid |
| Interactions | Section + SplitLayout(visual-left) |
| AI | Section(alt) + CenteredBlock + BadgeStrip + SplitLayout |
| Sovereignty | Section(dark, wide) + CenteredBlock + TwoPath(highlight-left) |
| Open Platform | Section + CardGrid(4) + CodeBlock(narrow) + CTAButtons |
| Social Proof | Section(alt) + CenteredBlock(narrow) |
| CTA | Section(cta) + CenteredBlock(narrow) + CTAButtons |

---

*End of brief. Questions → discuss with design/dev team before implementation.*
