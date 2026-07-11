---
title: "Email Configuration"
description: "Set up email delivery for your instance"
---

# Email Configuration

Configure how Deckyard sends emails.

## Overview

Deckyard needs email configuration to send:
- User invitations
- Password reset links
- Magic login links
- Collaborator invitations
- Comment notifications
- Lead capture notifications
- Weekly digest emails

## Brevo Integration

Deckyard uses [Brevo](https://www.brevo.com/) (formerly Sendinblue) for email delivery.

### Getting an API Key

1. Create a Brevo account at [brevo.com](https://www.brevo.com/)
2. Go to **SMTP & API** in your Brevo dashboard
3. Click **API Keys**
4. Create a new API key
5. Copy the key

### Configuration

Set the following environment variables:

```bash
# Required
BREVO_API_KEY=your-api-key-here

# Optional - Sender identity
BREVO_SENDER_EMAIL=noreply@yourcompany.com
BREVO_SENDER_NAME=Your Company Presentations
```

### Sender Identity

Emails are sent from the configured sender identity. You can configure this via:

1. **Environment variables** (default):
   ```bash
   BREVO_SENDER_EMAIL=noreply@yourcompany.com
   BREVO_SENDER_NAME=Your Company
   ```

2. **App settings** (overrides env vars):
   In the admin settings panel, configure the email sender identity.

**Important:** The sender email must be verified in your Brevo account.

### Verifying Your Sender

In Brevo:
1. Go to **Senders & IP**
2. Click **Add a sender**
3. Enter your sender email
4. Verify via the confirmation email

For better deliverability, also configure:
- SPF records
- DKIM signing
- DMARC policy

## SMTP Setup

Currently, Deckyard only supports the Brevo API for email delivery. Direct SMTP configuration is not available.

If you need to use a different email provider:
1. Use a transactional email service that provides a Brevo-compatible API
2. Or modify the email integration code to support your provider

## Testing Email Delivery

### Verify Configuration

Check that email is configured correctly:

```bash
# Your server logs will show warnings if email is not configured
[email] BREVO_API_KEY not configured - emails will not be sent
```

### Test Email Flow

1. Create a new user in the admin panel
2. Check that the invitation email is sent
3. Verify the email arrives in the recipient's inbox

### Common Issues

**Emails not sending:**
- Verify `BREVO_API_KEY` is set correctly
- Check server logs for error messages
- Ensure sender email is verified in Brevo

**Emails going to spam:**
- Configure SPF, DKIM, and DMARC for your domain
- Use a verified sender domain
- Ensure email content doesn't trigger spam filters

**Wrong sender:**
- Check environment variables
- Check app settings (they override env vars)

![Email settings showing notification configuration and template editor with subject, greeting, body, and button fields](/images/screenshots/email-settings.png)

## Email Types

### Authentication Emails

| Email | Purpose |
|-------|---------|
| **User Invitation** | Sent when admin creates new user |
| **Activation Reminder** | Resent invitation for pending users |
| **Password Reset** | Sent when user requests password reset |
| **Magic Link** | Passwordless login link |

### Collaboration Emails

| Email | Purpose |
|-------|---------|
| **Collaborator Invite** | Invitation to collaborate on a presentation |
| **Comment Notification** | Alert when someone comments |

### Notification Emails

| Email | Purpose |
|-------|---------|
| **Lead Notification** | Alert when a lead is captured |
| **Export Ready** | Sent when a [data backup](/docs/export/backup/) finishes |
| **Weekly Digest** | Summary of engagement activity |

## Email Templates

Deckyard uses customizable HTML templates for all emails. See [Email Templates](/docs/admin/email-templates/) for customization options.

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `BREVO_API_KEY` | Yes | Brevo API key for sending emails |
| `BREVO_SENDER_EMAIL` | No | Sender email address |
| `BREVO_SENDER_NAME` | No | Sender display name |
| `APP_URL` | No | Public base URL for links in emails (e.g. `https://slides.yourcompany.com`) |

## Rate Limits

Brevo has sending limits based on your plan:
- Free tier: 300 emails/day
- Starter: Based on your plan
- Business: Higher limits

Deckyard doesn't implement additional email rate limiting, so ensure your Brevo plan supports your expected volume.

## Related

- [Email Templates](/docs/admin/email-templates/)
- [Environment Variables](/docs/configuration/environment/)
- [User Management](/docs/admin/user-management/)
