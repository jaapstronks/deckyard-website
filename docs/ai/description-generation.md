---
title: "Description Generation"
description: "Auto-generate presentation descriptions with AI"
---

Let AI generate meta descriptions for your presentations.

## Overview

Deckyard can automatically generate descriptions by analyzing your presentation content. These descriptions improve discoverability, SEO, and help viewers understand what your presentation is about.

## How It Works

AI reviews your slides and creates a concise, informative description.

### What AI Analyzes

- Slide titles and headings
- Key content and bullet points
- Presentation structure
- Overall theme and topic

### What AI Produces

- Concise summary (1-3 sentences)
- Key topics covered
- Relevant keywords
- SEO-optimized text

## Generating Descriptions

![Deck settings showing Tags input and Description textarea where AI-generated descriptions appear, with character counter](/images/screenshots/deck-settings-tags-description.png)

### Automatic Generation

1. Open your presentation
2. Go to **Settings** > **Description**
3. Click **Generate with AI**
4. Review and edit the result
5. Save

### On Publish

When publishing, if no description exists:
- AI suggests a description
- Review before publishing
- Or write your own

![Publish dialog prompting for a two-sentence description with Generate with AI, Cancel, and Continue buttons](/images/screenshots/publish-description-dialog.png)

## Description Uses

### In the App

- Presentation list preview
- Search results
- Shared presentation cards

### For SEO

When published:
- Meta description tag
- Open Graph description
- Social media previews

### For Sharing

- Email invitation previews
- Link previews in chat apps
- Social media shares

## Language Support

Descriptions can be generated in multiple languages.

### Multi-Language Descriptions

For multi-language presentations:
1. Generate description for primary language
2. Click **Translate Description** for other languages
3. Or generate separately for each language

### Language Detection

AI detects the presentation language and generates descriptions in the same language by default.

### Specifying Language

To generate in a specific language:
1. Open description settings
2. Select target language
3. Click **Generate**

## Customization

### Length Options

Choose description length:
- **Short** - 1 sentence (~100 characters)
- **Medium** - 2-3 sentences (~200 characters)
- **Long** - Full paragraph (~400 characters)

### Tone Options

Select the appropriate tone:
- **Professional** - Formal business language
- **Casual** - Friendly and approachable
- **Educational** - Informative and clear

### Keywords

Include specific keywords:
1. Open generation settings
2. Add keywords to include
3. AI incorporates them naturally

## Editing Generated Descriptions

After generation, you can:
- Edit the text directly
- Regenerate with different settings
- Write your own instead

### Best Practices

- Keep descriptions under 160 characters for SEO
- Include the main topic early
- Make it enticing but accurate
- Include relevant keywords naturally

## API

### Generate via API

```bash
POST /api/presentations/{id}/generate-description
Content-Type: application/json

{
  "language": "en-GB",
  "length": "medium",
  "tone": "professional"
}
```

### Response

```json
{
  "description": "A comprehensive guide to sustainable energy solutions for businesses, covering solar, wind, and efficiency improvements with ROI analysis.",
  "keywords": ["sustainable energy", "business", "solar", "ROI"]
}
```

## Related

- [Deck Generation](/docs/ai/deck-generation/)
- [DreamBot Analysis](/docs/ai/analysis/)
- [Publishing](/docs/publishing/)
