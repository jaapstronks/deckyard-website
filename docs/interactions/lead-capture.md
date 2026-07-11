---
title: "Lead Capture"
description: "Collect contact information from your audience"
---

# Lead Capture

Capture leads and contact information from your presentation audience.

## Overview

The lead capture slide type lets you collect information from viewers, perfect for marketing presentations, webinars, and sales decks. Convert engaged viewers into actionable leads.

## Creating a Lead Capture Slide

### Add Lead Capture Slide

1. Click **Add Slide**
2. Select **Lead Capture** from slide types
3. Configure the form fields
4. Add your value proposition
5. Set up notifications

![Lead Capture slide editor showing title, description, form field labels, submit button text, thank-you message, and live preview](/images/screenshots/lead-capture-editor.png)

### Slide Layout

The lead capture slide includes:
- **Headline** - Why they should sign up
- **Description** - What they'll receive
- **Form** - Fields to collect
- **Submit button** - Customizable text
- **Privacy notice** - Required for compliance

### Value Proposition

Make it compelling:
- Offer something valuable (whitepaper, demo, etc.)
- Clear benefit statement
- Urgency if appropriate
- Social proof if available

## Form Fields Configuration

Configure which fields to collect:

### Standard Fields

| Field | Purpose | Required? |
|-------|---------|-----------|
| **Email** | Primary contact | Usually yes |
| **Name** | Personalization | Recommended |
| **Company** | Qualification | B2B recommended |
| **Job Title** | Qualification | Optional |
| **Phone** | Follow-up | Use sparingly |

### Custom Fields

Add custom fields:
1. Click **Add Field**
2. Select field type (text, dropdown, checkbox)
3. Enter field label
4. Set as required or optional

### Field Types

- **Text** - Free-form input
- **Email** - Validated email
- **Phone** - Phone number format
- **Dropdown** - Select from options
- **Checkbox** - Agreement or options
- **Hidden** - Pre-filled values

### GDPR Consent

For compliance, include:
- Consent checkbox (required)
- Link to privacy policy
- Clear explanation of data use
- Unsubscribe information

## Viewing Captured Leads

### In Presentation Dashboard

1. Open your presentation
2. Click **Analytics** or **Leads**
3. View all captured leads

### Lead List

For each lead, see:
- Submitted fields
- Timestamp
- Source (which slide/presentation)
- Consent status

### Filtering

Filter leads by:
- Date range
- Field values
- Consent status
- Exported/not exported

## Exporting Leads

### Export Options

**CSV:**
- Standard spreadsheet format
- Works with Excel, Google Sheets
- All fields as columns

**JSON:**
- Structured data format
- For integration with other systems
- Includes metadata

### Export Process

1. Go to lead list
2. Select leads (or all)
3. Click **Export**
4. Choose format
5. Download file

### Automated Export

Via webhooks:
- Send to CRM automatically
- Real-time delivery
- Configure in settings

## Email Notifications

Receive notifications when new leads are captured.

### Setup Notifications

1. Go to presentation **Settings**
2. Find **Lead Notifications**
3. Enter notification email(s)
4. Choose frequency

### Notification Options

- **Immediate** - Email per lead
- **Daily digest** - Summary once per day
- **Weekly digest** - Summary once per week
- **Off** - No notifications

### Notification Content

Each notification includes:
- Lead details (name, email, etc.)
- Presentation name
- Timestamp
- Link to view all leads

## Webhook Integration

Send leads to external systems automatically.

### Configure Webhook

1. Go to **Settings** > **Webhooks**
2. Enter webhook URL for leads
3. Test the connection

### Webhook Payload

```json
{
  "event": "lead.submitted",
  "lead": {
    "email": "contact@example.com",
    "name": "John Doe",
    "company": "Acme Inc",
    "customField": "value"
  },
  "presentation": {
    "id": "abc123",
    "title": "Product Demo"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### CRM Integration

Common integrations:
- Salesforce
- HubSpot
- Pipedrive
- Custom CRM via webhook

## Rate Limiting

Lead capture is protected from abuse:
- 10 submissions per minute per IP
- 100 submissions per minute globally
- Prevents spam submissions

## Privacy and Compliance

### GDPR Compliance

Required elements:
- Explicit consent checkbox
- Privacy policy link
- Clear data use statement
- Right to deletion

### Data Storage

Leads are stored:
- In your Deckyard instance
- Until manually deleted
- Subject to your data policies

### Anonymization

For compliance:
- Delete leads after follow-up
- Anonymize for statistics
- Honor deletion requests

## Best Practices

### Form Design

- Only ask for essential information
- Fewer fields = higher conversion
- Clear value proposition
- Mobile-friendly layout

### Timing

Place lead capture strategically:
- After demonstrating value
- Not too early
- Can use at multiple points
- End of presentation is common

### Follow-up

- Respond quickly to leads
- Personalize follow-up
- Deliver promised value
- Track conversion

## Related

- [Interactive Slide Types](/docs/slide-types/interactive/)
- [Email Templates](/docs/admin/email-templates/)
- [Webhooks](/docs/admin/settings/#webhook-configuration)
- [GDPR & Privacy](/docs/admin/gdpr-privacy/)
