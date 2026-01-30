---
title: "Instance Settings"
description: "Configure your Deckyard instance"
---

# Instance Settings

Configure global settings for your Deckyard instance.

## Overview

Instance settings control behavior across your entire Deckyard installation. Settings are divided into:
- **App settings** - Global configuration accessible to admins
- **User settings** - Per-user preferences like display name and language

## Settings Panel

Access the settings panel from the admin menu. Here you can configure:

### General Settings

- **Organization name** - Your organization's display name
- **Default language** - Language for new users
- **Default theme** - Theme applied to new presentations

### Email Sender Identity

Configure the sender information for outgoing emails:

```json
{
  "email": "presentations@yourcompany.com",
  "name": "Your Company Presentations"
}
```

This overrides the default sender configured via `BREVO_SENDER_EMAIL` and `BREVO_SENDER_NAME` environment variables.

### Supported Languages

Define which languages are available for presentation content:

```json
{
  "supportedLanguages": ["en-GB", "nl", "de", "fr"]
}
```

Users can create multi-language content only in these configured languages.

## Webhook Configuration

Configure webhooks to integrate with external services. Webhooks send HTTP POST requests when specific events occur.

### Available Webhook Events

| Event | Description |
|-------|-------------|
| `presentation.published` | A presentation was published |
| `presentation.moved_to_workspace` | A presentation was moved to a workspace |
| `slide.added_to_team_library` | A slide was added to the team library |
| `comment.created` | A comment was added to a presentation |
| `lead.submitted` | A lead capture form was submitted |
| `interaction.poll_closed` | A poll was closed |
| `interaction.feedback_submitted` | Feedback was submitted |
| `interaction.likert_closed` | A Likert survey was closed |

### Configuring Webhooks

In the settings panel, enter the URL for each webhook you want to enable:

```json
{
  "webhooks": {
    "presentationPublishedUrl": "https://your-service.com/webhook/published",
    "leadSubmittedUrl": "https://your-service.com/webhook/lead",
    "commentCreatedUrl": "https://your-service.com/webhook/comment"
  }
}
```

### Webhook Payload

Webhooks receive a JSON payload with event details:

```json
{
  "event": "presentation.published",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "actor": {
    "id": "user@example.com",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "presentation": {
    "id": "abc123",
    "title": "Quarterly Review",
    "description": "Q4 2024 results",
    "theme": "corporate",
    "scope": "private",
    "published": {
      "id": "xyz789",
      "slug": "quarterly-review",
      "path": "/p/xyz789-quarterly-review",
      "url": "https://your-instance.com/p/xyz789-quarterly-review"
    }
  },
  "links": {
    "editPath": "/app/abc123",
    "editUrl": "https://your-instance.com/app/abc123",
    "publicPath": "/p/xyz789-quarterly-review",
    "publicUrl": "https://your-instance.com/p/xyz789-quarterly-review"
  }
}
```

### Webhook Headers

Each webhook request includes:
- `Content-Type: application/json; charset=utf-8`
- `User-Agent: presentation-system-webhook/1`
- `X-SB-Event: [event-name]`

### Webhook Behavior

- Webhooks are sent asynchronously and don't block the API response
- Failed webhooks are logged but not retried
- Webhook timeout is 4.5 seconds

## Feature Toggles

Enable or disable specific features via environment variables.

### Available Toggles

| Variable | Default | Description |
|----------|---------|-------------|
| `DEMO_MODE` | `false` | Enable demo mode (restricted features) |
| `SANDBOX_MODE` | `false` | Enable sandbox mode for public demos |
| `DISABLE_UPLOADS` | `false` | Disable file uploads |
| `DISABLE_IMAGE_LIBRARY` | `false` | Disable the image library |
| `IMAGEKIT_ONLY` | `false` | Only use ImageKit for images |
| `DISABLE_NOTION` | `false` | Disable Notion integration |

### Demo Mode

When `DEMO_MODE=true`:
- Some admin features are restricted
- Data modifications may be limited
- Useful for public product demonstrations

### Feature Detection

The client automatically detects available features based on:
- Environment configuration
- API key availability (AI features, media services)
- Database mode

## API Access

Settings are available via the API:

### Get App Settings

```bash
GET /api/settings/app
```

Returns global settings (webhooks excluded for non-admins).

### Update App Settings (Admin only)

```bash
PUT /api/settings/app
Content-Type: application/json

{
  "supportedLanguages": ["en-GB", "nl"]
}
```

### Get User Settings

```bash
GET /api/settings/me
```

### Update User Settings

```bash
PUT /api/settings/me
Content-Type: application/json

{
  "profile": { "name": "John Doe" },
  "language": "nl"
}
```

## Related

- [Webhooks](/docs/integrations/webhooks/)
- [Environment Variables](/docs/configuration/environment/)
- [Email Configuration](/docs/admin/email-configuration/)
