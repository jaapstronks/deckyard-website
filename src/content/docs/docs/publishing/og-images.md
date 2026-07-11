---
title: "OpenGraph Images"
description: "Social media preview images for shared presentations"
---

# OpenGraph Images

Customize how your presentations appear when shared on social media.

## Overview

Deckyard automatically generates OpenGraph (OG) preview images when you publish a presentation. These images appear when your presentation link is shared on social platforms like Twitter, LinkedIn, Facebook, and Slack.

## Automatic Generation

### How It Works

When you publish a presentation:

1. Deckyard finds the first meaningful slide (skipping internal slides like follow invites)
2. Renders the slide at 1600x900 (16:9 aspect ratio)
3. Composes it onto a 1200x630 OG canvas (optimized for social platforms)
4. Saves the image to your media storage
5. Links it to your published presentation

### Image Dimensions

| Purpose | Dimensions | Aspect Ratio |
|---------|------------|--------------|
| Slide render | 1600 x 900 | 16:9 |
| OG image | 1200 x 630 | ~1.9:1 |
| Slide in OG | Max 1120 x 630 | Letterboxed |

The slide is centered on a dark background (#121212) to ensure it looks good on any platform.

## Author Overlay

Add author information to your preview images for branding.

### Enable Author Overlay

![Deck settings showing Show author on preview checkbox that displays your name and photo on the social media preview image](/images/screenshots/deck-settings-full.png)

1. Open your presentation
2. Go to **Settings** (gear icon)
3. Enable **Show author on preview**
4. Save settings
5. Republish the presentation

### What's Displayed

The overlay appears in the top-right corner and includes:

- **Author name** - From your profile settings, or derived from email
- **Profile image** - If you've uploaded one in user settings

### Set Your Profile

To customize how you appear on previews:

1. Go to **Settings** > **Profile**
2. Upload a profile image
3. Set your display name
4. Save changes

## Regenerating Previews

Preview images are generated at publish time. To update them:

### Manual Regeneration

1. Open your presentation
2. Go to **Share**
3. Click **Regenerate Preview**

This is useful when:
- You've changed the first slide
- You've updated your profile
- You've toggled the author overlay

### Automatic Regeneration

Preview images are automatically regenerated when you republish. If you make changes to your presentation, click **Publish** again to update both the content and the preview.

## Caching

### Platform Caching

Social platforms cache preview images. After updating your preview:

- **Twitter** - Use their [Card Validator](https://cards-dev.twitter.com/validator) to refresh
- **LinkedIn** - Use their [Post Inspector](https://www.linkedin.com/post-inspector/)
- **Facebook** - Use their [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Slack** - Clear the cache by resharing the link

### CDN Caching

If you're using a media provider (ImageKit, S3, etc.), images may be cached at the CDN level. The regeneration endpoint creates new files with unique names to bypass this.

## Image Selection Logic

When generating previews, Deckyard uses this priority:

1. **Server-side render** - If Puppeteer is available and media provider is configured
2. **Image from slide** - First image field from the slide content
3. **Fallback image** - Default Deckyard preview image

### Slides That Work Best

These slide types generate the best previews:

- **Title slides** - Clean, focused, with clear typography
- **Image slides** - Hero images display well
- **Quote slides** - Memorable text with visual appeal

### Slides to Avoid as First

- **Video slides** - Show static placeholder instead
- **Interactive slides** - Polls, Q&A don't preview well
- **Follow invite slides** - Automatically skipped

## Technical Requirements

### Server-Side Rendering

Full preview generation requires:

- **Puppeteer** - For rendering slides as images
- **Chromium** - Browser runtime (`PUPPETEER_EXECUTABLE_PATH`)
- **Media Provider** - For storing generated images

Without Puppeteer, Deckyard falls back to extracting existing images from slide content.

### Media Storage

Generated previews are stored via your configured media provider:

- ImageKit
- Scaleway Object Storage
- S3-compatible storage
- Local uploads (development only)

## OpenGraph Tags

Published presentations include these OG tags:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Presentation Title" />
<meta property="og:image" content="https://your-cdn.com/og-ABC123.png" />
<meta property="og:url" content="https://your-instance.com/p/ABC123-slug" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Presentation Title" />
<meta name="twitter:image" content="https://your-cdn.com/og-ABC123.png" />
```

## Best Practices

### Design for Preview

- Put key content on your title slide
- Use high-contrast colors
- Include your logo or branding
- Keep text large and readable

### Test Before Sharing

1. Publish your presentation
2. Copy the public URL
3. Test in platform validators
4. Adjust and regenerate if needed

### Consistent Branding

- Use your organization's theme
- Enable author overlay for recognition
- Include visual brand elements on first slide

## Troubleshooting

### Preview Not Updating

1. Regenerate the preview
2. Clear platform caches (use validators)
3. Check that media provider is working
4. Verify Puppeteer is installed

### Preview Shows Wrong Slide

1. Ensure follow-invite is not your first slide
2. Check that first slide has renderable content
3. Regenerate after reordering slides

### Low Quality Preview

1. Check source slide resolution
2. Verify images are high-quality
3. Ensure fonts are loading correctly

## Related

- [Publishing & Sharing](/docs/publishing/)
- [Embedding (SDK)](/docs/publishing/embedding/)
- [Themes](/docs/themes/)
