---
title: "RSS Feeds"
description: "Publish an RSS, Atom, or JSON Feed of your presentations"
---

Automatically syndicate your published presentations via RSS 2.0, Atom 1.0, and JSON Feed 1.1. Feed readers, Slack channels, Zapier workflows, and other tools can subscribe to stay updated whenever you publish or update a presentation.

## Overview

When RSS feeds are enabled, Deckyard serves three public feed URLs:

| Format | URL | Content-Type |
|--------|-----|--------------|
| RSS 2.0 | `/feed/rss.xml` | `application/rss+xml` |
| Atom 1.0 | `/feed/atom.xml` | `application/atom+xml` |
| JSON Feed 1.1 | `/feed/feed.json` | `application/feed+json` |

All three formats contain the same data. Most feed readers support RSS 2.0. Atom is preferred by some aggregators. JSON Feed is useful for programmatic integrations.

![Integrations settings showing RSS feed configuration with title, description, language, max items, and feed URLs for RSS, Atom, and JSON](/images/screenshots/integrations-webhooks-rss.png)

Feeds only include **published** presentations. Draft, workspace-only, and trashed presentations never appear.

## Enabling RSS Feeds

RSS feeds are disabled by default. An admin enables them per-workspace:

1. Go to **Settings** > **Integrations**
2. Scroll to the **RSS Feed** card
3. Check **Enable RSS feed**

![Integrations settings showing webhook configuration and RSS feed toggle](/images/screenshots/integrations-webhooks.png)
4. Fill in the optional fields (title, description, author, etc.)
5. Click **Save**

After saving, the feed URLs section appears with copy buttons for each format.

### Configuration Fields

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| **Enable RSS feed** | Yes | Off | Master toggle for all feed endpoints |
| **Title** | No | `{Org name} — Presentations` | Feed title shown in readers |
| **Description** | No | Auto-generated | Short description of the feed |
| **Language** | No | `en` | Feed language tag (en, nl, de, fr, etc.) |
| **Max items** | No | 50 | Number of presentations in the feed (1-100) |
| **Copyright** | No | Empty | Copyright notice included in the feed |
| **Author name** | No | Empty | Default author name for feed items |

## Feed Content

Each feed item maps to a published presentation:

| Feed field | Source |
|------------|--------|
| Title | Presentation title |
| Link | Public URL (`/p/{id}-{slug}`) |
| Description | Presentation description |
| Date | Last modified timestamp |
| Published | First publish timestamp |
| Author | Presentation owner (name derived from email) |
| Image | OpenGraph preview image (if available) |

Items are sorted by last modified date, most recent first.

## Per-Deck Opt-Out

Individual presentations can be excluded from the feed:

1. Open the presentation in the editor
2. Click **Deck Settings** (gear icon)
3. Check **Exclude from RSS feed**
4. Save

The checkbox only appears when RSS feeds are enabled for your workspace.

Excluded presentations are filtered out on every feed request. They reappear if you uncheck the option.

## Publish-Time Notice

When you publish a presentation for the first time and RSS feeds are active, an info toast appears:

> This presentation will appear in your public RSS feed. You can exclude it in Deck Settings.

This is informational only and does not block publishing. Re-publishing an existing presentation does not show the notice.

## Feed Auto-Discovery

When RSS feeds are enabled, Deckyard injects standard `<link rel="alternate">` tags into the app HTML:

```html
<link rel="alternate" type="application/rss+xml"
      title="Presentations (RSS)" href="/feed/rss.xml">
<link rel="alternate" type="application/atom+xml"
      title="Presentations (Atom)" href="/feed/atom.xml">
<link rel="alternate" type="application/feed+json"
      title="Presentations (JSON)" href="/feed/feed.json">
```

Browsers and feed readers use these tags to detect available feeds automatically.

## Caching

Feed responses include caching headers:

- `Cache-Control: public, max-age=300` (5 minutes)
- `ETag` based on the latest modified timestamp

Feed readers that send `If-None-Match` receive a `304 Not Modified` response when nothing has changed, reducing bandwidth.

## Feature Flag

RSS feeds have a two-level gate:

1. **Environment variable** `RSS_FEED_ENABLED` — instance-wide kill switch. Defaults to `true` (enabled). Set to `false` to disable feed routes entirely, regardless of workspace settings.
2. **Workspace setting** `rss.enabled` — the user-facing toggle in Settings > Integrations. Defaults to `false` (off).

Both must be active for feeds to be served. If the environment variable is `false`, all feed URLs return 404 and the RSS section is hidden in settings.

```bash
# Disable RSS feeds for the entire instance
RSS_FEED_ENABLED=false
```

## Custom Domains

Feed URLs automatically use the request's `Host` header. If your instance runs behind a custom domain, the feed links within the XML/JSON reference that domain. No additional configuration is needed.

For instances behind a reverse proxy where the public URL differs, use the **Custom feed URL** field or set `APP_URL` in your environment.

## Use Cases

- **Slack integration** — Add `/feed/rss.xml` as an RSS app source in a Slack channel to post new presentations automatically
- **Zapier / Make** — Trigger workflows when new presentations appear in the feed
- **Internal portals** — Embed the feed in an intranet or wiki to surface the latest presentations
- **Newsletter tools** — Use the feed as a content source for automated email campaigns
- **Monitoring** — Track publishing activity across your workspace

## Troubleshooting

### Feed returns 404

- Check that RSS is enabled in **Settings** > **Integrations**
- Verify `RSS_FEED_ENABLED` is not set to `false` in your environment
- Confirm you're accessing the correct URL (`/feed/rss.xml`, not `/rss.xml`)

### Feed is empty but presentations are published

- Published presentations must exist in the `published_presentations` index
- Presentations with **Exclude from RSS feed** checked are filtered out
- The **Max items** setting limits the total number of entries

### Feed shows stale data

- Feeds are cached for 5 minutes. Wait and refresh, or use a cache-busting query parameter for testing

### Auto-discovery tags not appearing

- Auto-discovery requires both `RSS_FEED_ENABLED=true` (or unset) and the workspace RSS toggle enabled
- Tags only appear on app shell pages, not on published presentation pages

## Related

- [Publishing & Sharing](/docs/publishing/)
- [Webhooks](/docs/integrations/webhooks/)
- [Instance Settings](/docs/admin/settings/)
- [Environment Variables](/docs/configuration/environment/)
