---
title: "Interactive Slides"
description: "Engage your audience with polls, Likert scales, and feedback during live presentations"
---

# Interactive Slides

Create engaging presentations with real-time audience participation. Interactive slides work during [Presenter Mode](/docs/presenter/) when audiences join via [Follow Mode](/docs/presenter/follow-mode/).

## Poll Slide

Collect audience votes on multiple choice questions with real-time results.

![Poll slide editor with question and answer options](/images/screenshots/poll-slide-editor.png)

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `question` | Yes | The poll question (max 200 chars) |
| `option1` | Yes | Answer A |
| `option2` | Yes | Answer B |
| `option3` | No | Answer C (optional) |
| `option4` | No | Answer D (optional) |
| `background` | No | Background color |
| `onClose` | No | Action when poll closes |
| `onCloseTarget` | No | Target slide ID for "goto" action |

### Features

- **Real-time Results** - Bar chart updates as votes come in
- **Vote Counts** - Shows total votes and percentages
- **Letter Labels** - Options labeled A, B, C, D for easy reference
- **Join Codes** - Displays NL/EN follow codes for audience participation

### Closing Behavior

When the poll is closed, you can configure:
- **Stay** - Remain on the poll slide showing final results
- **Next** - Automatically advance to the next slide
- **Goto** - Jump to a specific slide by ID

---

## Likert Scale Slide

Measure agreement/disagreement on a scale (typically 5 points).

![Likert scale editor with 5-point agreement scale](/images/screenshots/likert-slide-editor.png)

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `question` | Yes | The statement to rate |
| `option1` | Yes | First scale point (e.g., "Strongly disagree") |
| `option2` | Yes | Second scale point |
| `option3`-`option10` | No | Additional scale points |
| `background` | No | Background color |
| `onClose` | No | Action when closed |
| `onCloseTarget` | No | Target slide for "goto" |

### Default 5-Point Scale

The default configuration provides a standard agreement scale:
1. Strongly disagree
2. Disagree
3. Neutral
4. Agree
5. Strongly agree

### Results Visualization

Results are displayed as a "hill chart" distribution showing where responses cluster on the scale.

---

## Likert Slider Slide

A continuous slider alternative to discrete Likert points.

### Use Cases

- Rating satisfaction (0-100)
- Confidence levels
- Priority rankings
- Sentiment measurement

---

## Feedback Slide

Collect open-ended text responses from the audience.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `question` | Yes | The feedback prompt |
| `placeholder` | No | Input placeholder text |
| `background` | No | Background color |

### Features

- Text input for audience responses
- Responses collected in real-time
- Presenter can review feedback during or after the session

---

## Lead Capture Slide

Collect audience contact information for follow-up.

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Slide title |
| `description` | No | Explanation of what they're signing up for |
| `fields` | No | Which fields to collect |
| `background` | No | Background color |

### Collectable Fields

- Email address
- Name
- Company/Organization
- Phone number
- Custom fields

### GDPR Compliance

Lead capture slides should include clear consent language. Collected data is stored with the presentation and can be exported or deleted as needed. See [GDPR & Privacy](/docs/admin/gdpr-privacy/) for compliance details.

---

## Follow Invite Slide

Display a QR code and join instructions for audience members.

### Purpose

This slide helps audience members join your presentation for interactive participation. It displays:

- QR code linking to the follow URL
- Short join codes (e.g., "ABCD")
- Instructions in both NL and EN

### When to Use

Insert a Follow Invite slide:
- At the beginning of interactive presentations
- Before a series of polls or feedback slides
- When you want maximum audience participation

---

## How Interactive Slides Work

### During Presentation

1. **Presenter** opens Presenter Mode
2. **Audience** joins via Follow Mode using the displayed code or QR
3. **Interactive slides** enable voting/feedback on audience devices
4. **Results** update in real-time on the presenter's screen
5. **Presenter** can open/close interactions manually

### Technical Flow

```
Presenter Mode → SSE connection → Server
                                    ↓
Audience devices ← SSE broadcast ← Server
```

All communication happens via Server-Sent Events (SSE), ensuring real-time updates without page refreshes.

---

## Best Practices

### Poll Design

- Keep questions clear and concise
- Limit to 4 options maximum for quick decisions
- Use neutral option ordering to avoid bias

### Likert Scales

- Use consistent scale direction throughout
- 5-point scales work well for most purposes
- Label all points clearly

### Timing

- Allow enough time for audience to respond
- Watch the vote count to know when most have responded
- Consider showing a countdown timer verbally

---

## Related

- [Presenter Mode](/docs/presenter/)
- [Follow Mode](/docs/presenter/follow-mode/)
- [Polls Documentation](/docs/interactions/polls/)
- [Slide Types Overview](/docs/slide-types/)
