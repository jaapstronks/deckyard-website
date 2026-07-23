---
title: "Structure Slides"
description: "Organize your presentation with title slides, section breaks, and navigation elements"
---

Create clear presentation flow with organizational slides that define structure and navigation.

![Slide type picker showing Basic category with Title slide, Section title, Text slide, Quote, and List types](/images/screenshots/slide-type-picker-categories.png)

## Title Slide

The opening slide of your presentation with prominent branding.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Main title (max 120 chars) |
| `subheading` | No | Subtitle (max 160 chars) |
| `byline` | No | Presenter name or date |
| `attribution` | No | Additional credit line |
| `bgImage` | No | Background image |
| `bgAlt` | No | Background image alt text |
| `background` | No | Background color |
| `logoCorner` | No | Logo position (`left` or `right`) |

### Features

- **Logo Integration** - Automatically displays theme logo
- **Title Logo** - Can use a separate smaller logo variant
- **Background Image** - Optional full-bleed background
- **Overlay** - Automatic text protection when using background images

### Use Cases

- Presentation opener
- Course or workshop titles
- Event introductions
- Report covers

---

## Chapter Title Slide

Section dividers that break your presentation into logical parts.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Chapter title |
| `subtitle` | No | Chapter description |
| `chapterNumber` | No | Section number |
| `background` | No | Background color |

### Features

- Large, prominent title
- Optional chapter numbering
- Clear visual break from content slides

### Use Cases

- Section breaks
- Topic transitions
- Module introductions
- Agenda items

---

## Split Partner Title Slide

Co-branded title slides displaying two organization logos.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Presentation title |
| `subtitle` | No | Subtitle |
| `logo1` | No | First organization logo |
| `logo2` | No | Second organization logo |
| `background` | No | Background color |

### Use Cases

- Joint presentations
- Partnership announcements
- Collaborative projects
- Co-authored reports

---

## Agenda Timeline Slide

Display meeting agendas with time slots.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Agenda title |
| `items` | No | Array of agenda items |

### Item Fields

Each agenda item includes:
- `time` - Time slot (e.g., "09:00")
- `title` - Item title
- `description` - Additional details
- `duration` - Length in minutes

### Features

- Visual timeline layout
- Time-based organization
- Progress indication during presentation

### Use Cases

- Meeting agendas
- Workshop schedules
- Event programs
- Day planners

---

## Process Slide

Display step-by-step processes or workflows.

![Process slide editor with numbered steps](/images/screenshots/process-slide-editor.png)

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Process title |
| `steps` | No | Array of process steps |

### Step Fields

Each step includes:
- `number` - Step number
- `title` - Step name
- `description` - Step details

### Features

- Sequential numbering
- Visual connectors between steps
- Animation support for step-by-step reveal

### Use Cases

- Onboarding processes
- Implementation plans
- How-to guides
- Workflow documentation

---

## Timeline Slide

Present chronological information.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Timeline title |
| `events` | No | Array of timeline events |

### Event Fields

Each event includes:
- `date` - Date or period
- `title` - Event title
- `description` - Event details

### Features

- Horizontal or vertical orientation
- Milestone markers
- Date/period labeling

### Use Cases

- Project timelines
- Company history
- Product roadmaps
- Historical overviews

---

## Text Slide (Content Slide)

The workhorse slide for presenting text content.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Slide title (max 120 chars) |
| `subheading` | No | Subtitle |
| `layout` | No | `one-column` or `two-column` |
| `body` | Yes | Body text (Markdown supported) |
| `background` | No | Background color |
| `actions` | No | Call-to-action buttons |

### Markdown Support

The body field supports:
- **Bold** and *italic* text
- Bulleted and numbered lists
- [Links](url)
- `inline code`
- > Blockquotes

### Layout Options

- **One Column** - Single column, centered text
- **Two Column** - Text flows into two columns (for dense content)

### Actions

Add call-to-action buttons with:
- Button label
- URL or action
- Button style (primary/secondary)

---

## List Slide (Lijstje)

Structured list presentation with optional icons.

### Features

- Bulleted or numbered lists
- Icon support per item
- Multi-column layouts
- Step-through animation

### Use Cases

- Agenda items
- Key takeaways
- Feature lists
- Action items

---

## Text Blocks Slide

Multiple text sections in a grid layout.

### Features

- 2-4 text blocks
- Consistent sizing
- Good for comparing concepts

### Use Cases

- Concept comparisons
- Pillar presentations
- Value propositions
- Feature categories

---

## Content Columns Slide

Side-by-side content with independent sections.

### Features

- 2-3 columns
- Each with title and body
- Flexible for various content types

### Use Cases

- Pro/con analysis
- Category comparisons
- Parallel concepts
- Multi-topic overviews

---

## Best Practices

### Title Slides

- Keep titles concise and impactful
- Use consistent branding
- Consider background images carefully (ensure text readability)

### Section Breaks

- Use chapter titles consistently
- Number sections if presenting sequentially
- Keep section titles short

### Content Organization

- Limit content per slide (6x6 rule: max 6 bullets, 6 words each)
- Use structure slides to create breathing room
- Preview upcoming content with agenda slides

---

## Related

- [Slide Types Overview](/docs/slide-types/)
- [Themes](/docs/themes/)
- [Basic Editing](/docs/editing/basic-editing/)
