---
title: "Publishing & Embedding"
description: "Share and embed your presentations"
---

Share your presentations with the world.

## Overview

Deckyard offers multiple ways to publish and share your presentations. From public links for wide distribution to private share links with access controls, you can control exactly who sees your content.

![Published dialog showing public links and embed URLs for each language, with Copy and Open buttons](/images/screenshots/published-links-dialog.png)

## Publishing Options

### Public Links

Generate a public link that anyone can access:

1. Open your presentation
2. Click **Share** > **Publish**
3. Get your public link in the format `/p/[id]-[slug]`

The slug is auto-generated from your presentation title for SEO-friendly URLs.

**Customize the URL slug:**
1. Publish your presentation
2. Click **Edit Slug** in the share menu
3. Enter a custom URL-friendly slug

### Private Share Links

Create share links with access controls:

- **Password protection** - Require a password to view
- **Email verification** - Require guest email before access
- **Expiration dates** - Links automatically expire
- **View/edit permissions** - Control what recipients can do

See [Sharing & Permissions](/docs/collaboration/sharing-permissions/) for details.

### Embedding

Embed presentations in external websites using the Deckyard SDK:

```html
<script src="https://your-instance.com/embed-sdk.js"></script>
<div id="presentation"></div>
<script>
  PresentationSystemEmbed.createDeckEmbed({
    el: document.getElementById('presentation'),
    publishId: 'ABC123'
  });
</script>
```

See [Embedding (SDK)](/docs/publishing/embedding/) for complete documentation.

### PDF Export

Download your presentation as a static PDF for offline sharing:

1. Open your presentation
2. Click **Export** > **PDF**
3. Configure options (slides per page, include notes)
4. Download the PDF file

See [PDF Export](/docs/export/pdf/) for details.

## URL Structure

### Publish URLs

```
/p/[publishId]-[slug]
```

Example: `/p/ABC123-quarterly-review`

- `publishId` - Unique identifier (6 characters)
- `slug` - URL-friendly version of title

### Embed URLs

```
/embed/[publishId]-[slug]
```

Used internally by the embed SDK.

### Follow URLs

```
/f/[code]
```

Short codes for audience follow mode. See [Follow Mode](/docs/presenter/follow-mode/).

## Depublishing

To remove a published presentation from public access:

1. Open your presentation
2. Go to **Share**
3. Click **Unpublish**

The public URL will immediately stop working. Existing embeds will show an error message.

## OpenGraph Previews

When you publish, Deckyard automatically generates OpenGraph preview images for social media sharing. These are created from your first slide and optimized for platforms like Twitter, LinkedIn, and Slack.

See [OpenGraph Images](/docs/publishing/og-images/) for customization options.

## Webhooks

Trigger external actions when presentations are published:

```json
{
  "event": "presentation.published",
  "pres": {
    "id": "...",
    "title": "..."
  },
  "extra": {
    "publishId": "ABC123",
    "slug": "quarterly-review",
    "path": "/p/ABC123-quarterly-review",
    "ogImageUrl": "..."
  }
}
```

See [Webhooks](/docs/admin/settings/#webhook-configuration) for configuration.

## RSS Feeds

Syndicate your published presentations via RSS, Atom, or JSON Feed. When enabled, feed readers, Slack channels, and automation tools can subscribe to your workspace's feed and receive updates whenever presentations are published or updated.

Enable RSS feeds in **Settings** > **Integrations**. Individual presentations can opt out via the **Exclude from RSS feed** checkbox in Deck Settings.

See [RSS Feeds](/docs/publishing/rss-feeds/) for setup and configuration.

## Best Practices

### Before Publishing

- Review all slides for accuracy
- Check that speaker notes are appropriate (if exporting with notes)
- Verify translations are complete (if multi-language)
- Test interactive elements

### URL Management

- Use descriptive slugs for SEO
- Keep URLs stable (changing slugs breaks links)
- Track which links are shared where

### Security

- Use share links for sensitive content (not public URLs)
- Set expiration dates for time-limited access
- Enable password protection for confidential presentations

## Related

- [Embedding (SDK)](/docs/publishing/embedding/)
- [OpenGraph Images](/docs/publishing/og-images/)
- [RSS Feeds](/docs/publishing/rss-feeds/)
- [Sharing & Permissions](/docs/collaboration/sharing-permissions/)
- [Follow Mode](/docs/presenter/follow-mode/)
