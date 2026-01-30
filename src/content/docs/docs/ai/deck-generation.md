---
title: "AI Deck Generation"
description: "Transform your content into presentations with AI"
---

# AI Deck Generation

Transform your notes, documents, and outlines into structured presentations using AI.

## Overview

Deckyard's AI transforms your existing content—notes, documents, outlines, or articles—into structured presentations. Rather than generating content from scratch, AI analyzes what you provide and organizes it into logical slides with appropriate formatting.

## Features

- **Content Transformation** - Turn notes, documents, or articles into slides
- **Smart Structuring** - AI identifies logical sections and key points
- **Outline Expansion** - Convert bullet points into properly formatted slides
- **Slide Type Selection** - AI chooses appropriate slide types for your content

## Getting Started

### Quick Start

1. Click **New Presentation**
2. Select **Create with AI**
3. Paste your content (notes, outline, or document text)
4. Review the generated outline
5. Click **Generate** to create slides

### The AI Wizard

The AI wizard guides you through generation:

![AI slide generation wizard with LLM selection](/images/screenshots/ai-slide-wizard.png)

**Step 1: Provide Your Content**
- Paste your notes, article, or document text
- The more complete your content, the better the result
- Optionally mention your audience and desired structure

**Step 2: Review the Outline**
- AI generates a suggested structure
- Each slide shows title and type
- Reorder, add, or remove slides

**Step 3: Generate Content**
- AI creates content for each slide
- Progress shows as slides are generated
- Generation can be cancelled

**Step 4: Review and Edit**
- Full presentation is created
- Edit any slide as needed
- Regenerate individual slides if desired

## Prompts and Best Practices

### Understanding AI's Role

Deckyard's AI is designed to **reorganize, structure, and format** your existing content into slides—not to generate content from scratch. Think of it as a skilled assistant that takes your notes, drafts, or documents and transforms them into a well-organized presentation.

**What AI does:**
- Separates your content into logical sections
- Identifies key points and structures them as slides
- Selects appropriate slide types for different content
- Formats text for presentation (bullet points, headers, etc.)

**What AI should NOT do:**
- Invent information you didn't provide
- Add facts, statistics, or claims not in your source material
- Fill in gaps with generic content

### Why This Matters

When you give an AI a vague topic instead of actual content, it will generate generic, potentially inaccurate information. LLMs are prone to "filling in the blanks" when given insufficient input. By providing your actual content, you ensure the presentation reflects your knowledge, your data, and your message.

### Ineffective Prompts (Avoid These)

These prompts ask AI to generate content, which leads to generic or fabricated information:

> "A 10-slide presentation about sustainable energy"

> "A professional presentation for executives about Q4 financial results. Include revenue highlights, key achievements, challenges faced, and 2025 outlook."

> "An educational presentation for high school students explaining how machine learning works."

The problem: you're asking the AI to make things up. It doesn't know your Q4 results, your company's achievements, or what specific examples you want to use.

### Effective Prompts (Do This Instead)

Provide your actual content and let AI structure it:

**From meeting notes:**
> "Turn these notes into a presentation:
>
> Q4 revenue was €2.3M, up 15% from Q3. Main drivers were the enterprise segment (+40%) and new APAC clients. We closed 12 new accounts including Acme Corp and GlobalTech. Challenges: supply chain delays cost us €200K, and we lost two key engineers. For 2025 we're targeting €10M revenue, launching the mobile app in Q2, and expanding the sales team to 8 people."

**From a blog post or article:**
> "Convert this article into slides for a conference talk:
>
> [paste your full article text here]"

**From research notes:**
> "Structure these research findings as a presentation:
>
> Study conducted Jan-March 2025 with 500 participants. Key finding: users who received personalized onboarding completed 3x more tasks in the first week. Secondary findings: email reminders increased retention by 22%, but push notifications had no significant effect. Methodology: A/B test across three cohorts..."

**From bullet points:**
> "Organize these points into a cohesive presentation:
>
> - Our product reduces energy costs by 30%
> - Case study: Factory X saved €50K annually
> - Three-step implementation process
> - ROI typically seen within 6 months
> - Currently used by 200+ companies
> - Integration with existing systems takes 2 weeks"

### Tips for Best Results

- **Provide complete content** - The more information you give, the better the result
- **Include your data** - Actual numbers, names, and facts you want in the presentation
- **Specify structure preferences** - "Start with the problem, then solution, then results"
- **Mention your audience** - "This is for technical stakeholders" helps with tone and detail level
- **Review carefully** - Always verify that AI hasn't added information you didn't provide

## Outline Editing

After AI generates an outline, you can customize it:

### Reordering Slides

Drag slides to change their order before generation.

### Adding Slides

Click **Add Slide** to insert a new slide:
- Enter a title
- AI suggests an appropriate type
- Or select a type manually

### Removing Slides

Click the X on any slide to remove it from the outline.

### Changing Slide Types

Click the slide type badge to change it:
- Title slide
- Content slide
- Chart slide
- Image slide
- And more...

## Generation Options

### Theme Selection

Choose a theme before generation:
- AI adapts content to the theme's style
- Colors and fonts are applied automatically

### Language

Select the language for generated content:
- All supported languages available
- Content is generated natively (not translated)

### Content Style

Some wizards offer style options:
- **Concise** - Brief bullet points
- **Detailed** - Fuller explanations
- **Data-driven** - Emphasis on metrics

## Regenerating Content

After generation, you can regenerate individual slides:

1. Select a slide
2. Click **Regenerate with AI**
3. Optionally adjust the prompt
4. New content replaces the old

The rest of your presentation is preserved.

## Import and Convert

### From Notion

Import content from Notion and let AI structure it:

1. Connect your Notion workspace
2. Select a page
3. AI converts content to slides

See [Notion Integration](/docs/integrations/notion/) for details.

### From Documents

Upload a document and convert to slides:
- PowerPoint files
- PDF files
- Word documents

AI extracts content and creates appropriate slides.

## Limitations

### What AI Does Well

- Identifying logical structure in your content
- Breaking content into appropriate slide-sized chunks
- Selecting the right slide type for different content
- Formatting text for presentation clarity
- Maintaining consistent tone throughout

### What AI May Struggle With

- Very technical or specialized content may need manual adjustment
- Complex hierarchical information might need restructuring
- Content with many interconnected references
- Highly visual concepts that need specific imagery

### Always Review

Even when working from your own content, AI output should be reviewed:
- Verify AI hasn't added information you didn't provide
- Check that key points weren't omitted
- Ensure the structure matches your intended flow
- Adjust slide types if AI made suboptimal choices

## Related

- [AI Setup & API Keys](/docs/ai/getting-started/)
- [Translation](/docs/ai/translation/)
- [DreamBot Analysis](/docs/ai/analysis/)
- [Notion Integration](/docs/integrations/notion/)
