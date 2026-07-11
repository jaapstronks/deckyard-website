---
title: "AI Translation"
description: "Translate presentations to other languages"
---

# AI Translation

Translate your presentations to reach international audiences.

## Overview

Deckyard's AI-powered translation converts your presentation content to other languages while preserving formatting, structure, and meaning.

![Editor showing Translate buttons on each field and the NL/EN language toggle in the toolbar](/images/screenshots/ai-translation-prompt.png)

## Full Presentation Translation

Translate all slides to an alternate language with a single action.

### How to Translate

1. Open your presentation
2. Click **AI** > **Translate Presentation**
3. Select the target language
4. Choose translation mode (see below)
5. Click **Translate**

### Translation Progress

- Progress bar shows overall completion
- Each slide is translated sequentially
- You can cancel mid-translation
- Already translated slides are preserved

### What Gets Translated

- Slide titles
- Body text and bullet points
- Speaker notes
- Image captions
- Alt text

### What Doesn't Change

- Layout and design
- Images and media
- Charts and data
- Theme settings

## Safe Mode

Translate only missing fields, preserving manually-edited translations.

### When to Use Safe Mode

Use safe mode when:
- You have some manual translations
- You want to fill gaps without overwriting
- Updating a partially translated presentation

### How Safe Mode Works

1. AI checks each field for existing translations
2. Fields with content in the target language are skipped
3. Only empty fields are translated
4. Your manual work is preserved

### Enabling Safe Mode

1. Open the translation dialog
2. Check **Safe Mode** (or "Preserve existing translations")
3. Proceed with translation

## Field-Level Preview

Preview translations before applying them.

### Preview Mode

1. Start a translation
2. Enable **Preview Mode**
3. See proposed translations side-by-side
4. Accept or reject each translation
5. Apply approved translations

### Preview Features

- Original text on the left
- Proposed translation on the right
- Accept/reject buttons per field
- Edit translations before accepting
- Bulk accept all

### When to Use Preview

- For important presentations
- When translation accuracy is critical
- When you know the target language
- For quality assurance

## Supported Languages

AI translation supports all Deckyard interface languages:

| Language | Code | Quality |
|----------|------|---------|
| English | en-GB | Native |
| Dutch | nl | Excellent |
| German | de | Excellent |
| French | fr | Excellent |
| Spanish | es | Excellent |
| Italian | it | Excellent |
| Portuguese | pt | Excellent |
| Swedish | sv | Good |
| Norwegian | no | Good |
| Danish | da | Good |
| Finnish | fi | Good |
| Polish | pl | Good |

**Quality Notes:**
- Major European languages have excellent quality
- Less common languages may need more review
- Always review translations for accuracy

## Translation Settings

### Source Language Detection

By default, AI auto-detects the source language. You can also specify it:
1. Open translation settings
2. Select **Source Language**
3. Choose the primary language

### Terminology Consistency

AI maintains consistency for:
- Technical terms
- Brand names
- Product names
- Repeated phrases

### Formal vs. Informal

Some languages distinguish formal/informal address. Currently, translations default to formal style. Future updates may add tone selection.

## Multi-Language Presentations

Create presentations available in multiple languages.

### Language Versions

Each presentation can have content in multiple languages:
- Primary language (default)
- One or more alternate languages
- Language switcher for viewers

### Workflow

1. Create presentation in primary language
2. Translate to additional languages
3. Review and refine translations
4. Viewers choose their language

### Keeping Languages in Sync

When you update the primary language:
1. Changes are flagged for translation review
2. Use **Sync Translations** to update
3. Safe mode preserves manual edits

## Best Practices

### Before Translation

- Finalize your primary content first
- Review for ambiguous phrases
- Remove idioms that don't translate well
- Check character limits (translations may be longer)

### After Translation

- Have a native speaker review
- Check for awkward phrasing
- Verify technical terms
- Test the full presentation

### For Specific Languages

**German:** Words can be longer—check text fitting
**French:** Formal tone important for business
**Asian languages:** Layout may need adjustment (future support)

## Limitations

### Not Currently Supported

- Right-to-left languages (Arabic, Hebrew)
- Asian character languages (Chinese, Japanese, Korean)
- Image text translation
- Video subtitle translation

### Translation Accuracy

AI translation is good but not perfect:
- May miss nuanced meaning
- Technical jargon may be incorrect
- Cultural context may be lost
- Always review important presentations

## Related

- [Deck Generation](/docs/ai/deck-generation/)
- [Setup & API Keys](/docs/ai/getting-started/)
- [Internationalization](/docs/configuration/i18n/)
