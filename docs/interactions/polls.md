---
title: "Polls"
description: "Create and manage audience polls in Deckyard"
---

Engage your audience with real-time polling.

## Overview

Polls allow you to gather audience feedback and opinions during your presentation. Results update in real-time, creating an interactive experience that keeps your audience engaged.

## Poll Types

### Multiple Choice

Single selection from options:
- Best for choosing between alternatives
- One answer allowed
- Results show as bar chart or pie chart

### Multiple Select

Choose multiple options:
- Best for "select all that apply" questions
- Any number of answers allowed
- Results show selection counts

### Rating Scales

Numeric or star ratings:
- 1-5 or 1-10 scales
- Good for satisfaction or agreement
- Shows average and distribution

### Yes/No

Simple binary choices:
- Quick pulse checks
- Agreement/disagreement
- True/false questions

## Creating a Poll

### Add a Poll Slide

1. Click **Add Slide**
2. Select **Poll** from slide types
3. Enter your question
4. Add answer options
5. Configure settings

![Poll slide editor with question and answer options](/images/screenshots/poll-slide-editor.png)

### Poll Settings

**Question:**
- Clear, concise question text
- Supports basic formatting

**Options:**
- 2-8 answer options
- Each option has text
- Optional emoji/icon per option

**Display:**
- Show results live or after voting
- Bar chart, pie chart, or numbers
- Animate result reveals

### Multiple Choice Setup

```
Question: What's your biggest challenge?
Options:
[ ] Time management
[ ] Budget constraints
[ ] Team coordination
[ ] Technical skills
```

### Rating Scale Setup

```
Question: How would you rate this presentation?
Scale: 1-5 stars
Labels: Poor - Excellent
```

## Running Polls

### During Presentation

1. Navigate to the poll slide
2. Voting automatically opens
3. Audience votes via follow link or embed
4. Results update in real-time

### Controlling Results

**Hide results during voting:**
- Audience sees confirmation only
- Prevents bias from early results
- Reveal when ready

**Live results:**
- Results update as votes come in
- Creates excitement and engagement
- Good for non-sensitive topics

### Closing a Poll

Options to close voting:
- **Manual** - Click close when ready
- **Timer** - Automatically close after X seconds
- **Navigate away** - Close when leaving slide

## Viewing Results

### On Slide

Results display as:
- **Bar chart** - Horizontal bars
- **Pie chart** - Circular segments
- **Numbers** - Raw counts and percentages

### In Analytics

After the presentation:
1. Go to presentation analytics
2. Find the poll slide
3. View detailed results

### Export Results

Export poll data:
- CSV for spreadsheet analysis
- JSON for integration
- Included in analytics report

## Audience Experience

### Voting via Follow Mode

1. Audience joins via follow link
2. Poll appears on their device
3. Tap to select answer
4. See confirmation

### Anonymous Voting

By default, votes are anonymous:
- No tracking of who voted what
- Only aggregate results
- Encourages honest responses

### Identified Voting

If enabled:
- Links votes to user (if logged in)
- Useful for accountability
- Respects privacy settings

## Tips for Better Polls

### Question Design

- Keep questions short and clear
- Use neutral language
- Avoid leading questions
- Test with colleagues first

### Option Design

- 4-6 options work best
- Make options distinct
- Include "Other" if appropriate
- Randomize order option

### Timing

- Give enough time to read and vote
- 15-30 seconds for simple polls
- Longer for complex questions
- Watch for voting plateau

## Webhooks

Trigger actions on poll completion:
1. Configure webhook URL in settings
2. Receive POST when poll closes
3. Process results in external system

See [Webhooks](/docs/admin/settings/#webhook-configuration) for details.

## Related

- [Feedback](/docs/interactions/feedback/)
- [Q&A](/docs/interactions/qa/)
- [Follow Mode](/docs/presenter/follow-mode/)
