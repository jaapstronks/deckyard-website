---
title: "GDPR & Privacy"
description: "Privacy controls and GDPR compliance features"
---

Deckyard includes features to help you comply with GDPR and privacy regulations.

## Overview

Manage user data, privacy settings, and comply with data protection regulations. Deckyard provides tools for:
- Data export (right of access)
- Data deletion (right to erasure)
- Analytics opt-out
- Lead data anonymization
- Cookie consent management

![Data Export settings page showing backup options for version history, image library, slide library, and custom themes with Start export button](/images/screenshots/data-export-settings.png)

## Data Export

Users can export their own data for GDPR compliance (right of access) using the [Data Backup](/docs/export/backup/) feature.

### What's Included

A data export contains:
- All presentations created by the user (as JSON)
- Referenced images (local uploads and remote URLs)
- Optionally: version history, image library, slide library, themes

### Requesting an Export

Users can request their data export:

1. Go to **Settings** > **Data Export**
2. Select which additional data to include
3. Click **Start export**
4. Download the ZIP when the export completes (in-app notification + optional email)

The download link is available for 2 hours. See [Data Backup](/docs/export/backup/) for full details.

### Export Format

Data is exported as:
- JSON format for presentations and structured data
- Original format for images and media files
- ZIP archive containing everything

### Admin Exports

Admins can export user data on behalf of users:

1. Go to **Admin** > **Users**
2. Select the user
3. Click **Export Data**

## Data Deletion

Users have the right to erasure under GDPR.

### User-Initiated Deletion

Users can request deletion of their analytics data:

1. Go to **Settings** > **Privacy**
2. Click **Delete My Analytics Data**
3. Confirm the deletion

This removes:
- View tracking data
- Interaction history
- Engagement metrics

**Note:** This doesn't delete presentations or account data. Account deletion must be requested from an admin.

### Admin Deletion

Admins can delete all user data:

1. Go to **Admin** > **Users**
2. Select the user
3. Click **Delete User**
4. Choose what to delete:
   - Account only
   - Account and all presentations
   - Account and all data (full erasure)

### Presentation Owner Transfer

Before deleting a user, consider transferring their presentations:

1. Go to the presentation
2. Click **Settings** > **Transfer Ownership**
3. Select the new owner
4. Confirm the transfer

## Analytics Opt-Out

Allow users to opt out of analytics tracking.

### How It Works

When a user opts out:
- No view tracking for their sessions
- No interaction logging
- No engagement metrics collected
- Still able to submit forms and votes (anonymous)

### Enabling Opt-Out

Users can opt out in their settings:

1. Go to **Settings** > **Privacy**
2. Toggle **Analytics Tracking** off

### Viewer Opt-Out

Public viewers can opt out via:
- Cookie consent banner
- Privacy settings link
- URL parameter: `?analytics=off`

### Respecting Do Not Track

Deckyard respects the browser's Do Not Track (DNT) header:
- When DNT is enabled, analytics are disabled
- This can be configured at the instance level

## Lead Anonymization

Anonymize captured lead data while retaining aggregate statistics.

### Why Anonymize

- Comply with data retention policies
- Keep statistical insights without personal data
- Reduce liability from stored personal information

### Anonymization Process

When leads are anonymized:
1. Personal identifiers are removed (name, email)
2. A hash is retained for deduplication
3. Aggregate statistics are preserved
4. Timestamps are retained for trend analysis

### Bulk Anonymization

Admins can anonymize old leads:

1. Go to **Admin** > **Leads**
2. Click **Anonymize Old Leads**
3. Set the age threshold (e.g., older than 90 days)
4. Confirm the action

### Automatic Anonymization

Configure automatic anonymization:

```bash
LEAD_RETENTION_DAYS=90
LEAD_AUTO_ANONYMIZE=true
```

After the retention period, leads are automatically anonymized.

## Cookie Consent

Manage cookie consent for GDPR compliance.

### Cookie Categories

Deckyard uses cookies in these categories:

| Category | Purpose | Required |
|----------|---------|----------|
| **Essential** | Session, authentication | Yes |
| **Functional** | Preferences, language | No |
| **Analytics** | Usage tracking | No |

### Consent Banner

Enable a cookie consent banner:

1. Go to **Admin** > **Settings**
2. Enable **Cookie Consent Banner**
3. Customize the message
4. Configure link to privacy policy

### Consent Storage

User consent is stored:
- In a cookie (`cookie_consent`)
- Valid for 1 year
- Recorded with timestamp

### Third-Party Cookies

Deckyard minimizes third-party cookies:
- Media embeds may set cookies (YouTube, etc.)
- External fonts may set cookies
- Configure via Content Security Policy

## Privacy Policy Link

Configure your privacy policy URL:

```bash
PRIVACY_POLICY_URL=https://yoursite.com/privacy
```

This link appears in:
- Cookie consent banner
- User settings
- Registration forms
- Lead capture forms

## Data Processing Agreements

For enterprise deployments:
- Deckyard can be self-hosted for full data control
- No data is sent to third parties (except configured integrations)
- Database remains under your control

## Compliance Checklist

Ensure GDPR compliance:

- [ ] Privacy policy published and linked
- [ ] Cookie consent banner enabled
- [ ] Data export functionality available
- [ ] Data deletion process documented
- [ ] Analytics opt-out available
- [ ] Lead retention policy configured
- [ ] Data processing agreement in place
- [ ] User rights documented

## Related

- [Analytics](/docs/integrations/analytics/)
- [Lead Capture](/docs/interactions/lead-capture/)
- [User Management](/docs/admin/user-management/)
- [Instance Settings](/docs/admin/settings/)
