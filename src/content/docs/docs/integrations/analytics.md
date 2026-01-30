---
title: "Analytics"
---

## Analytics integrations

This project supports external analytics providers for tracking visitor behavior across your published presentations.

- The server injects provider tags into the HTML `<head>`
- Configure via environment variables or the Admin Settings UI
- No client build step required

Implementation lives in `server/analytics/head.js`.

### Configuration methods

You can configure analytics providers in two ways:

1. **Environment variables** - Set in your `.env` file (traditional method)
2. **Admin Settings UI** - Configure at Settings → External Analytics (v2.x+)

Settings configured via the Admin UI take priority over environment variables.

### Quick start

1. Copy `env.example` → `.env`
2. Pick one or more providers below
3. Restart the server

Or use the Admin Settings UI at `/settings#analytics`.

---

## Privacy-friendly providers

These providers are designed with privacy in mind. They typically don't use cookies and are GDPR-compliant by default.

### Umami (self-hosted or cloud)

[Umami](https://umami.is/) is a simple, fast, privacy-focused analytics tool.

**Environment variables:**

- `UMAMI_WEBSITE_ID` - Website ID from your Umami dashboard
- `UMAMI_URL` - Server URL (optional, defaults to `https://cloud.umami.is`)

**Example:**

```bash
UMAMI_WEBSITE_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
UMAMI_URL=https://analytics.example.com
```

### Plausible (self-hosted or cloud)

[Plausible](https://plausible.io/) is lightweight, cookie-free analytics with EU-hosted cloud option.

**Environment variables:**

- `PLAUSIBLE_DOMAIN` - The domain you want to track
- `PLAUSIBLE_URL` - Server URL (optional, defaults to `https://plausible.io`)

**Example:**

```bash
PLAUSIBLE_DOMAIN=slides.example.org
PLAUSIBLE_URL=https://plausible.example.org
```

### Matomo (self-hosted)

[Matomo](https://matomo.org/) is a full-featured, self-hostable analytics platform with cookie-free tracking mode.

**Environment variables:**

- `MATOMO_URL` - Your Matomo server URL
- `MATOMO_SITE_ID` - Site ID from Matomo settings
- `MATOMO_DISABLE_COOKIES` - Disable cookies (default: `1`)
- `MATOMO_REQUIRE_CONSENT` - Require consent before tracking (default: `0`)
- `MATOMO_TRACK_LINKS` - Enable link tracking (default: `1`)

**Example:**

```bash
MATOMO_URL=https://matomo.example.org
MATOMO_SITE_ID=1
MATOMO_DISABLE_COOKIES=1
```

---

## Providers requiring consent

These providers set cookies and require a consent banner under GDPR/ePrivacy regulations.

### Google Analytics 4 (GA4)

**Environment variables:**

- `GA4_MEASUREMENT_ID` - Your GA4 measurement ID (format: `G-XXXXXXXXXX`)

**Example:**

```bash
GA4_MEASUREMENT_ID=G-ABC123XYZ
```

Note: GA4 sets cookies and shares data with Google. You should display a cookie consent banner and update your privacy policy when using this provider.

### Google Tag Manager (GTM)

For more complex setups with multiple tags managed through GTM.

**Environment variables:**

- `GTM_CONTAINER_ID` - Your GTM container ID (format: `GTM-XXXXXXX`)

**Example:**

```bash
GTM_CONTAINER_ID=GTM-ABCDEF1
```

Notes:

- This injects the standard GTM `<script>` in `<head>`
- For the GTM `<noscript>` fallback, use the custom snippet escape hatch

---

## Custom snippet (escape hatch)

If your provider isn't listed (or you need full control), inject your own `<head>` HTML.

Prefer base64 to avoid quoting issues:

- `ANALYTICS_HEAD_HTML_B64=...`

Or a single-line raw string:

- `ANALYTICS_HEAD_HTML=<script>...</script>`

**Security note:** This is **operator-controlled** HTML injection. Do not allow untrusted users to set these environment variables.

---

## Admin Settings UI

Administrators can configure external analytics providers through the web interface:

1. Go to **Settings** → **External Analytics**
2. Enable the providers you want to use
3. Enter the required configuration (Website ID, domain, etc.)
4. Click **Save**

The UI groups providers into two sections:

- **Privacy-Friendly Providers**: Umami, Plausible, Matomo
- **Requires Consent**: Google Analytics 4

Each provider shows its privacy characteristics and required fields. A warning appears if you enable a provider without completing required fields.

---

## Common toggles

| Variable | Description |
|----------|-------------|
| `DISABLE_ANALYTICS=1` | Disables all external analytics injection |
| `ANALYTICS_ALLOW_IN_SANDBOX=1` | Allows analytics in sandbox/demo mode |
| `ANALYTICS_INCLUDE_EMBEDS=1` | Injects analytics into `/embed/...` iframes |
| `ANALYTICS_INCLUDE_EXPORTS=1` | Injects analytics into exported HTML documents |

---

## Priority order

When both environment variables and Admin UI settings are configured for the same provider:

1. **Admin UI settings** take priority when the provider is enabled and has required fields filled
2. **Environment variables** are used as fallback
3. **Disabled** if neither is configured

This allows operators to set default analytics via environment variables while giving admins the ability to override through the UI.
