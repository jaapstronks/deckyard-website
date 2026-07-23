---
title: "Digest Emails"
description: "Weekly engagement summaries for your presentations"
---

Receive weekly summaries of engagement across your presentations.

## Overview

Deckyard can send weekly digest emails summarizing activity and engagement. These emails help you stay informed about how your presentations are performing without checking the dashboard daily.

![Engagement Insights dashboard showing total views, unique viewers, average duration, completion rate, views over time chart, and top performing presentations](/images/screenshots/insights-dashboard.png)

## What's Included

Each digest email contains:

### Engagement Insights

- AI-generated summary of key trends
- Notable changes in engagement
- Recommendations for improvement

### View Statistics

- Total views across all presentations
- Views per presentation
- Comparison to previous period
- Top-performing presentations

### Interaction Summaries

- Poll responses collected
- Lead captures
- Q&A questions received
- Feedback submissions

### Team Activity Highlights

For team accounts:
- New presentations created
- Presentations published
- Collaboration activity
- Comments and suggestions

## Configuration

### Enable Digest Emails

Digest emails require:
1. Email configuration (Brevo API key)
2. User email addresses
3. AI service (optional, for insights)

### User Preferences

Users can enable/disable digest emails:

1. Go to **Settings** > **Notifications**
2. Toggle **Weekly Digest** on/off

### Send Day Preference

Users can choose which day of the week to receive their digest:

1. Go to **Settings** > **Notifications**
2. Select preferred **Digest Day**

Available options:
- Monday (default)
- Friday
- Sunday

### Digest Timing

Digests are sent:
- Once per week on the configured day
- Around 9:00 AM in the user's timezone (or server timezone)
- Only if there's activity to report

## Team Digests

Configure digest emails for your entire team.

### Admin Configuration

Admins can configure team-wide digests:

1. Go to **Admin** > **Settings**
2. Navigate to **Digest Emails**
3. Configure team digest options

### Team Digest Options

| Option | Description |
|--------|-------------|
| **Enable for all users** | Auto-enable for new users |
| **Default send day** | Default day for new users |
| **Include team stats** | Add team-wide statistics |
| **Admin summary** | Send admin-only summary |

### Admin Summary Digest

Admins can receive a special digest with:
- All team activity
- User engagement metrics
- System health indicators
- Storage usage

## Digest Content

### Presentation Performance

Each presentation in the digest shows:
- View count (total and new)
- Average view duration
- Interaction completion rate
- Lead conversions

### AI-Generated Insights

With AI enabled, digests include:
- Natural language summary
- Trend analysis
- Actionable recommendations
- Comparison to benchmarks

Example insight:
> "Your 'Product Demo' presentation saw a 45% increase in views this week. The new interactive poll on slide 3 has an 87% completion rate, suggesting strong audience engagement."

### Visual Charts

Digests include visual representations:
- View trend graph
- Engagement bar chart
- Top 5 presentations list

## Customization

### Email Template

The digest email template can be customized:

1. Go to **Admin** > **Email Templates**
2. Select **Weekly Digest**
3. Customize content and styling

### Branding

Add your brand to digest emails:
- Company logo
- Brand colors
- Custom footer

### Content Sections

Choose which sections to include:
- Engagement summary (always included)
- AI insights (optional)
- Team activity (optional)
- Detailed statistics (optional)

## Troubleshooting

### Digests Not Sending

If users aren't receiving digests:

1. Verify email configuration is correct
2. Check user has digest enabled in settings
3. Confirm there's activity to report
4. Check server logs for email errors

### Empty Digests

If digests have no content:
- User may have no presentations
- No views in the digest period
- Check presentation visibility settings

### AI Insights Missing

If AI insights aren't appearing:
- Verify AI service is configured (OpenAI, Claude, etc.)
- Check API key is valid
- Ensure sufficient data for analysis

## API

### Trigger Test Digest

Admins can send test digests:

```bash
POST /api/admin/digests/test
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Get Digest Preview

Preview what a digest would contain:

```bash
GET /api/me/digest/preview
```

## Related

- [Email Templates](/docs/admin/email-templates/)
- [Email Configuration](/docs/admin/email-configuration/)
- [Analytics](/docs/integrations/analytics/)
