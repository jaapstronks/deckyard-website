---
title: "Content Cards"
description: "Card-based layouts for team introductions, feature showcases, and structured content"
---

# Content Cards

Organize your content with card-based layouts. These slide types present information in visually distinct blocks.

![Slide type picker showing Layouts category with Content columns, Text blocks, 4 cards, Icon cards, and Freeform slide types](/images/screenshots/slide-types-layouts.png)

## Team Cards (Image Blocks)

Display people, products, or any content with images and captions. Supports up to 12 cards per slide.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Slide title |
| `subheading` | No | Subtitle |
| `bottomSubheading` | No | Bottom text |
| `background` | No | `mist` or `lime` |
| `textPosition` | No | `below` or `split` |
| `imageAspect` | No | `square` or `original` |
| `showPhotoFrame` | No | Add photo frame effect |
| `columnSplit` | No | Split into two groups |
| `cardCount` | No | Number of cards (1-12) |

### Per-Card Fields

Each card (1-12) has:
- `cardNImage` - Photo/image URL
- `cardNAlt` - Alt text for accessibility
- `cardNImageFocusX` - Horizontal focus point (0-100)
- `cardNImageFocusY` - Vertical focus point (0-100)
- `cardNName` - Name/title
- `cardNByline` - Role/caption

### Layout Options

**Text Position:**
- **Below** - Name and byline appear below the image
- **Split** - Name above image, byline below

**Image Aspect:**
- **Square** - Images cropped to square (focus point controls crop)
- **Original** - Images maintain their aspect ratio

**Column Split:**
- Groups cards into left and right sections
- Useful for "Current Team" vs "New Hires" layouts

### Use Cases

- Team introductions
- Product showcases
- Feature highlights
- Board members or advisors
- Client testimonials with photos

---

## Card Stack Slide

Present multiple content cards in a stacked arrangement.

### Features

- Multiple cards with title and body content
- Visual stacking effect
- Good for listing features or benefits

### Use Cases

- Feature lists
- Service offerings
- Benefit comparisons
- Agenda items

---

## Icon Card Grid Slide

Cards with icons and descriptions in a grid layout.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Slide title |
| `cards` | No | Array of icon cards |

### Card Fields

Each card includes:
- `icon` - Icon name from Phosphor icon set
- `title` - Card heading
- `description` - Card body text

### Use Cases

- Feature overviews
- Service descriptions
- Process steps with icons
- Value propositions

---

## Logo Wall Slide

Display partner, client, or sponsor logos in a grid.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Slide title |
| `subheading` | No | Description text |
| `logos` | No | Array of logo images |

### Features

- Automatic grid layout based on logo count
- Consistent sizing for visual harmony
- Grayscale option for neutral presentation

### Use Cases

- Client logos
- Partner showcases
- Integration lists
- Sponsor acknowledgments
- "As featured in" sections

---

## Quote Slide

Highlight a quotation with attribution.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `quote` | Yes | The quotation text |
| `attribution` | No | Who said it |
| `role` | No | Speaker's title/role |
| `image` | No | Speaker's photo |
| `background` | No | Background color |

### Design

- Large quotation marks
- Prominent quote text
- Attribution below with optional photo
- Clean, focused layout

### Use Cases

- Customer testimonials
- Expert endorsements
- Inspirational quotes
- Key statements to emphasize

---

## Payoff Slide

Display a tagline or slogan prominently.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `payoff` | Yes | The main tagline |
| `subtext` | No | Supporting text |
| `background` | No | Background color |

### Design

- Centered, large text
- Minimal distractions
- High impact for closing slides

### Use Cases

- Brand taglines
- Mission statements
- Call to action
- Closing statements

---

## Comparison Slide

Present side-by-side comparisons.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Slide title |
| `leftTitle` | No | Left column heading |
| `leftItems` | No | Left column content |
| `rightTitle` | No | Right column heading |
| `rightItems` | No | Right column content |

### Use Cases

- Before/After comparisons
- Feature comparisons
- Pro/Con lists
- Competitive analysis
- Old way vs New way

---

## Best Practices

### Card Layouts

- Keep card count reasonable (4-6 cards work best)
- Use consistent image aspect ratios
- Keep text concise
- Ensure sufficient contrast between text and images

### Images

- Use high-quality images
- Set focus points for cropped layouts
- Add alt text for accessibility
- Consider grayscale for logo walls

### Text

- Keep names short
- Use bylines for additional context
- Ensure text is readable at presentation size

---

## Related

- [Slide Types Overview](/docs/slide-types/)
- [Media Slides](/docs/slide-types/media/)
- [Image Library](/docs/libraries/image-library/)
