# Slide Customization Strategy

> How to enable theme and slide type customization for both cloud users and self-hosters.

## Problem Statement

Users need to customize slides beyond what the current system easily allows:

1. **Theme tweaks**: Different colors, fonts, logo placement
2. **Layout variations**: Same content, different arrangement (title sizes, column ratios)
3. **Net-new slide types**: Completely custom designs from Figma or requirements

Current state requires JavaScript knowledge for slide types and JSON editing for themes. This works for developers but creates friction for:
- Cloud users who want brand customization
- Self-hosters without dedicated frontend developers
- Designers who have Figma mockups but can't translate them to code

---

## Current Architecture

### Themes (JSON-based)
- Location: `/themes/*.json` and `/custom/themes/*.json`
- Contains: CSS variables (`--t-*`), logos, fonts, brand colors
- Applied via: `applyThemeVarsToElement()` in `client/lib/theme.js`

### Slide Types (JavaScript-based)
- Location: `/shared/slide-types/types/*.js` and `/custom/slide-types/*.js`
- Contains: Field definitions, defaults, `renderHtml()` function
- 35+ built-in types with common patterns

### Identified Patterns Across Slide Types

| Pattern | Usage | Current Implementation |
|---------|-------|------------------------|
| Title + Subheading + Bottom Subheading | ~25 types | `renderSubheadingHtml()`, `renderBottomSubheadingHtml()` |
| Background selection (lime/mist/dark) | All types | `BACKGROUND_FIELD`, `bgClass()` |
| Image + Alt + Focus | ~10 types | `pickAltText()`, `objectPositionStyleAttrFromFocus()` |
| Items array (cards, steps, rows) | ~15 types | `type: 'items'` with `itemFields` |
| Action buttons | 3 types | `ACTIONS_FIELD`, `renderActionsHtml()` |
| Accessibility fields | All types | `withGlobalA11yFields()` wrapper |

---

## Proposed Solution: Three-Tier Customization

### Tier 1: Theme Editor (All Users)

**Audience**: Everyone (cloud and self-hosted)

**Scope**: Visual customization without touching layouts

- Colors (background presets, accent, text)
- Typography (heading font, body font, sizes)
- Logos (main, title slide, payoff)
- Border radius, shadows
- Brand color palette

**Implementation**:
- UI for cloud users
- JSON editing for self-hosters (already works)
- No code changes needed, just better documentation and optional UI

---

### Tier 2: Style Variants (Power Users)

**Audience**: Marketing teams, brand managers, power users

**Scope**: Styling variations of existing slide types without new code

**Concept**: A "variant" inherits everything from a base slide type but overrides specific CSS variables or field constraints.

```javascript
// Example variant definition (in theme JSON or separate config)
{
  "variants": [
    {
      "id": "large-title-content",
      "baseType": "content-slide",
      "label": "Content (Large Title)",
      "styleOverrides": {
        "--slide-font-size-title": "72px",
        "--slide-title-weight": "800",
        "--slide-content-gap": "48px"
      },
      "fieldOverrides": {
        "title": { "maxLength": 60 }
      }
    },
    {
      "id": "compact-kpi",
      "baseType": "kpi-metrics-slide",
      "label": "KPI Metrics (Compact)",
      "styleOverrides": {
        "--kpi-value-size": "48px",
        "--kpi-gap": "16px"
      }
    }
  ]
}
```

**Benefits**:
- No JavaScript required
- Variants appear in slide type picker alongside base types
- 90% of "custom slide" requests are really just styling tweaks
- Self-hosters can define in theme JSON
- Cloud users get a variant builder UI

**Implementation**:
1. Add `variants` support to theme schema
2. Variant resolution in slide type registry
3. Apply `styleOverrides` as inline CSS variables during render
4. Optional: Variant builder UI for cloud

---

### Tier 3: Custom Slide Types (Developers)

**Audience**: Developers, agencies, enterprise self-hosters

**Scope**: Completely custom slide types with unique layouts and logic

**Current system works well** - keep `/custom/slide-types/*.js` approach.

**Improvements needed**:
1. Better documentation with examples
2. Primitive component library (see below)
3. AI assistance for code generation (see below)

---

## Primitive Component Library ("Atoms")

Extract recurring elements into composable, accessible building blocks.

### Proposed Primitives

```
shared/slide-primitives/
├── SlideHeading.js        # Title with typography variants (h1-h4, centered/left)
├── SlideSubheading.js     # Upper or lower position subheading
├── SlideImageArea.js      # Image with alt, focus point, object-fit, role
├── SlideMarkdownBlock.js  # Prose text with proper typography
├── SlideActionButtons.js  # Primary/secondary/outline button row
├── SlideMetricCard.js     # KPI value + label + optional trend
├── SlideStepIndicator.js  # Numbered step with connector line
├── SlideCard.js           # Generic card (title, text, icon, image)
├── SlideQuote.js          # Quote text + attribution
└── SlideIcon.js           # Icon with accessible label
```

### Primitive API Example

```javascript
// shared/slide-primitives/SlideHeading.js
export function SlideHeading({
  text,
  level = 'h2',           // h1, h2, h3, h4
  align = 'left',         // left, center
  size = 'default',       // sm, default, lg, xl
  className = ''
}) {
  if (!text?.trim()) return '';

  const sizeClass = size !== 'default' ? `heading-${size}` : '';
  const alignClass = align === 'center' ? 'text-center' : '';

  return `<${level} class="slide-heading ${sizeClass} ${alignClass} ${className}">${esc(text)}</${level}>`;
}
```

### Benefits of Primitives

1. **Consistency**: All slide types use same heading, image, etc.
2. **Accessibility**: Built into primitives, not per-slide-type
3. **Easier custom types**: Compose primitives instead of writing raw HTML
4. **Foundation for visual builder**: Primitives can be the "blocks" in a drag-drop UI

### Migration Path

1. Create primitives based on existing helper functions
2. Refactor 3-4 slide types to use primitives (prove pattern)
3. Document primitive API
4. Gradually migrate remaining types
5. Custom type authors can use primitives

---

## Layout Composition System

For users who need custom layouts but don't want to write full slide types.

### Concept

A generic `layout-slide` type where users:
1. Choose a layout template
2. Assign content to named slots
3. Configure each slot's content type

### Layout Templates

```
Layouts:
├── single-column        # Full width, stacked content
├── two-column           # Configurable ratio (50/50, 60/40, 70/30)
├── two-column-image     # Image on left or right, content opposite
├── header-content       # Top header area + main content
├── content-footer       # Main content + bottom strip
├── grid-2x2             # Four equal quadrants
└── grid-3x2             # Six cells
```

### Slot Content Types

Each slot can contain:
- Heading (with size/alignment options)
- Text block (markdown)
- Image (with alt, focus, fit)
- Metric card
- Action buttons
- Empty (skip slot)

### Example Configuration

```javascript
{
  "type": "layout-slide",
  "content": {
    "layout": "two-column",
    "layoutOptions": {
      "ratio": "60/40",
      "gap": "lg"
    },
    "slots": {
      "left": {
        "type": "stack",
        "items": [
          { "primitive": "heading", "text": "Our Approach", "size": "lg" },
          { "primitive": "markdown", "content": "We believe in..." },
          { "primitive": "actions", "buttons": [...] }
        ]
      },
      "right": {
        "type": "image",
        "src": "/uploads/...",
        "alt": "Team collaboration",
        "fit": "cover"
      }
    },
    "background": "mist"
  }
}
```

### Implementation Considerations

- Could be a single flexible slide type or family of layout types
- Slots use primitive components internally
- UI: Slot assignment interface (not full drag-drop builder)
- Covers 80% of "custom layout" needs without code

---

## AI Assistance

### A. Figma → Slide Type Code

**Workflow**:
1. User uploads Figma frame screenshot or export
2. AI analyzes design, identifies:
   - Layout structure (columns, grid areas)
   - Content regions (heading, body, image, etc.)
   - Typography hierarchy (sizes, weights)
   - Color usage
3. AI generates slide type definition using primitives
4. User reviews, adjusts, saves to `/custom/slide-types/`

**Why this works**:
- Slide type schema is well-defined
- Primitives provide building blocks
- Existing slide types serve as examples
- Output is code user can modify

**Prompt engineering approach**:
- Provide schema documentation in context
- Include 2-3 example slide types
- Ask AI to identify layout, then map to primitives, then generate

### B. Natural Language → Variant

**Workflow**:
1. User describes desired variation in plain language
2. AI generates variant configuration
3. User previews and adjusts
4. Variant saved to theme

**Example**:
```
User: "I want a content slide with a much bigger centered title,
       and the body text in two columns below"

AI generates:
{
  "id": "centered-hero-content",
  "baseType": "content-slide",
  "label": "Content (Centered Hero)",
  "styleOverrides": {
    "--slide-title-align": "center",
    "--slide-font-size-title": "64px",
    "--slide-content-columns": "2"
  }
}
```

### C. Content Analysis → Suggestions

When user creates/edits slides, AI can suggest:
- "This looks like a timeline - convert to Timeline Slide?"
- "You have 4 metrics - KPI Metrics Slide might display this better"
- "This quote could use the Quote Slide format"

Lower priority than A and B, but good UX enhancement.

---

## Implementation Phases

### Phase 1: Primitives Foundation
**Effort**: Medium | **Impact**: Enables future phases

- [ ] Create `shared/slide-primitives/` directory
- [ ] Extract primitives from existing helpers
- [ ] Implement: `SlideHeading`, `SlideSubheading`, `SlideImageArea`, `SlideMarkdownBlock`, `SlideActionButtons`
- [ ] Refactor 3 slide types to use primitives (content-slide, image-text-slide, quote-slide)
- [ ] Document primitive API in `/docs/developer/`
- [ ] Ensure accessibility is built into each primitive

### Phase 2: Style Variant System
**Effort**: Medium | **Impact**: High for non-developers

- [ ] Add `variants` array to theme schema
- [ ] Implement variant resolution in slide type registry
- [ ] Apply `styleOverrides` during render
- [ ] Document variant creation for self-hosters
- [ ] (Cloud) Build variant creation UI

### Phase 3: Layout Composition
**Effort**: High | **Impact**: Medium-high

- [ ] Design layout template schema
- [ ] Implement `layout-slide` type
- [ ] Build slot assignment UI
- [ ] Create 5-6 common layout templates
- [ ] Document for self-hosters

### Phase 4: AI Assistance
**Effort**: Medium | **Impact**: High for developers with designs

- [ ] Create Figma-to-code prompt template
- [ ] Build upload + generation flow
- [ ] Implement preview before save
- [ ] Natural language → variant (simpler, could do earlier)

---

## Comparison: Self-Hosters vs Cloud

| Feature | Self-Hosters | Cloud Users |
|---------|--------------|-------------|
| Theme JSON editing | Direct file access | Theme editor UI |
| Custom slide types (code) | `/custom/slide-types/` | Enterprise/support |
| Style variants | Theme JSON | Variant builder UI |
| Layout composition | Use layout-slide type | Visual slot assignment |
| AI code generation | Outputs code to save | Outputs saved config |

Self-hosters with developers always have the code escape hatch. Goal is to reduce how often they need it.

---

## Success Metrics

1. **Variant adoption**: % of workspaces using custom variants
2. **Custom type reduction**: Fewer requests for custom slide types (variants cover the need)
3. **Time to customize**: How long from "I want X" to working slide
4. **Self-hoster satisfaction**: Can they customize without our help?

---

## Open Questions

1. **Variant scoping**: Per-theme? Per-workspace? Per-presentation?
2. **Layout-slide complexity**: How many layout templates is enough? When does it become overwhelming?
3. **AI accuracy**: How reliable is Figma→code generation? Need to test with real designs.
4. **Primitive granularity**: How atomic? `SlideHeading` or also `SlideHeadingText` + `SlideHeadingIcon`?
5. **CSS variable explosion**: How to manage growing list of overrideable variables?

---

## Related Documents

- `/docs/developer/themes.md` - Current theme documentation
- `/docs/developer/slide-types.md` - Current slide type documentation
- `/docs/planning/slides-com-comparison.md` - Competitor analysis
