---
title: "Email Templates"
description: "Customize the emails sent by Deckyard"
---

# Email Templates

Customize the emails that Deckyard sends to users.

## Overview

Deckyard uses templates for all outgoing emails. You can customize these to match your brand and communication style.

![Email settings page showing template editor with User Invitation selected, language tabs, and customizable Subject, Greeting, Body, Button Label, and Footer fields](/images/screenshots/email-templates-settings.png)

## Available Templates

### Authentication Templates

| Template | Purpose |
|----------|---------|
| **Password Reset** | Sent when users request a password reset |
| **Magic Link** | Passwordless login links |
| **User Invitation** | New user invitations from admin |
| **Activation Reminder** | Resent invitations for pending users |

### Collaboration Templates

| Template | Purpose |
|----------|---------|
| **Collaborator Invite** | Sharing invitations |
| **Comment Notification** | Alerts when someone comments |

### Notification Templates

| Template | Purpose |
|----------|---------|
| **Lead Notification** | Alerts for new lead captures |
| **Digest Email** | Weekly activity summaries |

## Customizing Templates

### Template Location

Email templates are organized by locale in the server:

```
server/integrations/email-templates/
├── auth.js          # Authentication emails
├── collaboration.js # Collaboration emails
├── digest.js        # Digest emails
├── notifications.js # Notification emails
├── helpers.js       # Shared helpers
└── index.js         # Template registry
```

### Database Templates

For production deployments, templates can be stored in the database:
- Editable via the admin panel
- Supports multiple languages
- Falls back to file-based templates

### Template Structure

Each template includes:
- **Subject** - Email subject line
- **HTML Content** - Formatted email body
- **Text Content** - Plain text fallback

## Template Variables

Templates support dynamic variables that are replaced when sending.

### Common Variables

| Variable | Description |
|----------|-------------|
| `{{recipientName}}` | Recipient's display name |
| `{{recipientEmail}}` | Recipient's email address |
| `{{senderName}}` | Sender's display name (for invites) |
| `{{appName}}` | Application name |
| `{{appUrl}}` | Application base URL |

### Password Reset Variables

| Variable | Description |
|----------|-------------|
| `{{resetUrl}}` | Password reset link |
| `{{expiresIn}}` | Link expiration time |

### Magic Link Variables

| Variable | Description |
|----------|-------------|
| `{{magicLinkUrl}}` | Login link |
| `{{expiresIn}}` | Link expiration time |

### Invitation Variables

| Variable | Description |
|----------|-------------|
| `{{setupUrl}}` | Account setup link |
| `{{invitedBy}}` | Name of person who invited |
| `{{expiresAt}}` | Invitation expiration date |

### Collaboration Variables

| Variable | Description |
|----------|-------------|
| `{{presentationTitle}}` | Name of the presentation |
| `{{presentationUrl}}` | Link to the presentation |
| `{{collaboratorName}}` | Name of the collaborator |
| `{{permissionLevel}}` | Permission granted (view/edit) |

### Comment Variables

| Variable | Description |
|----------|-------------|
| `{{commenterName}}` | Name of person who commented |
| `{{commentText}}` | The comment content |
| `{{slideTitle}}` | Title of the slide |
| `{{presentationUrl}}` | Link to the presentation |

### Lead Variables

| Variable | Description |
|----------|-------------|
| `{{leadName}}` | Name from lead form |
| `{{leadEmail}}` | Email from lead form |
| `{{presentationTitle}}` | Presentation name |
| `{{submittedAt}}` | Submission timestamp |

### Digest Variables

| Variable | Description |
|----------|-------------|
| `{{periodStart}}` | Start of digest period |
| `{{periodEnd}}` | End of digest period |
| `{{totalViews}}` | Total views in period |
| `{{presentations}}` | List of presentations with stats |
| `{{insights}}` | AI-generated insights |

## Localization

Templates support multiple languages:

### Supported Locales

- `en` / `en-GB` - English
- `nl` - Dutch
- `de` - German
- `fr` - French
- `es` - Spanish
- And more...

### Locale Selection

The email locale is determined by:
1. Recipient's language preference (if known)
2. Default email locale setting
3. Fallback to English

### Setting Default Locale

Configure the default email locale via app settings or environment:

```bash
EMAIL_DEFAULT_LOCALE=en
```

## Editing Templates via Admin Panel

![Email template editor with template selector, language tabs, and customizable subject, greeting, body, and button fields](/images/screenshots/email-settings.png)

1. Go to **Admin** > **Email Templates**
2. Select the template to edit
3. Choose the language
4. Edit the subject and body
5. Preview the changes
6. Save

### Template Preview

The admin panel includes a preview feature:
- See how the email will look
- Test with sample data
- Send a test email to yourself

## HTML Email Best Practices

When customizing templates:

### Use Inline Styles

Email clients have limited CSS support. Use inline styles:

```html
<p style="color: #333; font-size: 16px;">Hello {{recipientName}}</p>
```

### Keep It Simple

- Use table-based layouts for consistency
- Avoid complex CSS (flexbox, grid)
- Test in multiple email clients

### Responsive Design

Use a single-column layout that works on mobile:

```html
<table width="100%" style="max-width: 600px;">
  <tr>
    <td style="padding: 20px;">
      <!-- Content -->
    </td>
  </tr>
</table>
```

### Branding

Include your brand elements:
- Logo (as hosted image)
- Brand colors
- Consistent typography

## Related

- [Email Configuration](/docs/admin/email-configuration/)
- [Activity & Notifications](/docs/collaboration/activity-notifications/)
- [Internationalization](/docs/configuration/i18n/)
