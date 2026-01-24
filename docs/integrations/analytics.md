## Analytics integrations

This project is designed for “light plumbing” analytics:

- The server injects provider tags into the HTML `<head>`
- You configure it via `.env` (no client build step, no SDK sprawl)

Implementation lives in `server/utils/analytics-head.js`.

### Quick start

1) Copy `env.example` → `.env`
2) Pick **one** option below (GTM, Matomo, Plausible, or custom snippet)
3) Restart the server

### Option A: Google Tag Manager (GTM)

Set:

- `GTM_CONTAINER_ID=GTM-XXXXXXX`

Notes:

- This injects the standard GTM `<script>` in `<head>`.
- If you also want the GTM `<noscript>` fallback, use the custom snippet escape hatch.

### Option B: Matomo (self-hosted analytics)

Set:

- `MATOMO_URL=https://matomo.example.org`
- `MATOMO_SITE_ID=1`

Optional:

- `MATOMO_DISABLE_COOKIES=1` (default)
- `MATOMO_REQUIRE_CONSENT=0`
- `MATOMO_TRACK_LINKS=1` (default)

### Option C: Plausible (cloud or self-hosted)

Set:

- `PLAUSIBLE_DOMAIN=slides.example.org`

Optional (self-hosted plausible):

- `PLAUSIBLE_URL=https://plausible.example.org`

### Option D: Custom snippet (escape hatch)

If your provider isn’t listed (or you want full control), inject your own `<head>` HTML.

Prefer base64 to avoid quoting issues:

- `ANALYTICS_HEAD_HTML_B64=...`

Or a single-line raw string:

- `ANALYTICS_HEAD_HTML=<script>...</script>`

Security note: this is **operator-controlled** HTML injection. Do not allow untrusted people to set these env vars.

### Common toggles

- `DISABLE_ANALYTICS=1` disables all analytics injection
- `ANALYTICS_ALLOW_IN_SANDBOX=1` allows analytics even when sandbox mode is enabled
- `ANALYTICS_INCLUDE_EMBEDS=1` injects analytics into `/embed/...` documents
- `ANALYTICS_INCLUDE_EXPORTS=1` injects analytics into exported HTML documents








