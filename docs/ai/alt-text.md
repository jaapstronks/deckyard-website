---
title: "Alt Text Generation"
description: "AI-generated alt text for accessibility"
---

# Alt Text Generation

Automatically generate alt text for images to improve accessibility.

## Overview

Deckyard can use AI vision capabilities to generate descriptive alt text for images in your presentations. This improves accessibility for screen reader users and helps meet compliance requirements.

## How It Works

![Slide editor showing Image role toggle between Meaningful and Decorative, Alt text field with guidance, and expanded Accessibility section with title and summary fields](/images/screenshots/accessibility-alt-text-fields.png)

AI analyzes images and generates appropriate descriptions for screen readers.

### The Process

1. Image is sent to the AI vision model
2. AI analyzes visual content
3. Descriptive text is generated
4. Alt text is attached to the image

### What AI Describes

- Main subject of the image
- Important visual elements
- Text visible in the image
- Context relevant to the slide

## Requirements

Alt text generation requires:
- **OpenAI API key** - Only OpenAI supports vision capabilities
- **Image access** - Images must be accessible URLs or uploaded files

Other AI providers (Claude, Mistral) do not currently support image analysis.

## Generating Alt Text

### For Individual Images

1. Select an image in your slide
2. Click **AI** > **Generate Alt Text**
3. Review the generated text
4. Edit if needed
5. Save

### Bulk Generation

Generate alt text for all images at once:

1. Click **AI** > **Generate All Alt Text**
2. AI processes each image
3. Review generated text in the image settings
4. Edit any that need adjustment

### On Upload

Configure automatic generation:
1. Go to **Settings** > **AI**
2. Enable **Auto-generate alt text**
3. New images automatically get alt text

## Reviewing Alt Text

### Image Settings

View and edit alt text:
1. Select the image
2. Open image settings
3. Find the **Alt Text** field
4. Edit as needed

### Quality Check

Review AI-generated alt text for:
- Accuracy (does it describe the image correctly?)
- Relevance (does it help in the slide context?)
- Conciseness (is it appropriately brief?)
- Completeness (are important details included?)

## Accessibility Benefits

Proper alt text helps:

### Screen Reader Users

- Understand image content without seeing it
- Navigate presentations effectively
- Get full context of your message

### SEO Improvements

- Search engines index alt text
- Improves discoverability
- Better image search results

### Compliance

Meets requirements for:
- WCAG 2.1 accessibility guidelines
- Section 508 compliance
- ADA digital accessibility

## Best Practices

### What Makes Good Alt Text

**Do:**
- Describe the image content clearly
- Keep it concise (125 characters is ideal)
- Include relevant context
- Describe text shown in images

**Don't:**
- Start with "Image of" or "Picture of"
- Include irrelevant details
- Describe decorative elements
- Leave important images without alt text

### When to Edit AI Alt Text

Edit the generated text when:
- It misses the main point
- Context from the slide is needed
- Technical terms need clarification
- The image has specific meaning in your presentation

### Decorative Images

For purely decorative images:
- Set alt text to empty (`""`)
- Screen readers will skip them
- Mark as decorative in image settings

## Examples

### Before and After

**AI Generated:**
> "A bar chart showing four colored bars of different heights"

**Improved:**
> "Q4 revenue by region: North America $4.2M, Europe $3.1M, Asia $2.8M, Other $1.2M"

**AI Generated:**
> "A group of people sitting around a table in an office"

**Improved:**
> "The leadership team reviewing quarterly results in the boardroom"

## Language Support

Alt text can be generated in your presentation's language:
- AI generates in detected language
- Multi-language presentations get localized alt text
- Translate existing alt text with AI translation

## Privacy

### What's Sent to AI

- Image data (for analysis)
- Presentation context (optional, improves relevance)

### Data Handling

- Images are processed but not stored
- OpenAI's data policies apply
- See your privacy settings

## Limitations

### Not Currently Supported

- Complex diagrams (AI may not capture all details)
- Charts with many data points
- Images with dense text
- Very abstract images

### When Manual Alt Text is Better

- Charts and graphs (describe the data/trend)
- Screenshots (describe what's shown)
- Branded images (include brand context)
- Images with specific meaning to your audience

## Related

- [Media Slide Types](/docs/slide-types/media/)
- [Setup & API Keys](/docs/ai/getting-started/)
- [Image Library](/docs/editing/image-library/)
