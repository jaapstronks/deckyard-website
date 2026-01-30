---
title: "Environment (.env)"
---

## Environment variables (`.env`)

This project intentionally stays dependency-free, so the server loads `.env` itself (`server/config/env.js`).

### Core server

- **PORT**: HTTP port (default `4177`)
- **HOST**: bind address (default `127.0.0.1`)

### Auth (recommended in production)

Auth is disabled unless:

- **AUTH_SECRET** is set, and
- one of **AUTH_USERS_JSON** or **AUTH_USERS_B64** is set

Variables:

- **AUTH_ADMIN_EMAIL**: optional (used for UX defaults)
- **AUTH_SECRET**: required when enabling auth
- **AUTH_USERS_JSON**: JSON map of users (easiest locally; can be annoying to quote)
- **AUTH_USERS_B64**: base64-encoded JSON map (recommended for production)
- **SECURE_COOKIES**: `1` behind HTTPS, `0` for local HTTP
- **AUTH_DEV_BYPASS**: `1` enables a local-dev “bypass login” button on `/login`

### Feature flags / demo mode

- **DEMO_MODE**: `1` enables “demo guardrails”
- **DISABLE_AI**: `1` disables AI features
- **DISABLE_UPLOADS**: `1` disables uploads

### Sandbox mode (public demo instance)

- **SANDBOX_MODE**: `1` enables sandbox behavior (guest sessions, expiry, watermark, etc.)
- **SANDBOX_TTL_HOURS**: deck TTL in hours (default `24`)
- **SANDBOX_DEFAULT_THEME**: default theme id (e.g. `sandbox-minimal`)
- **SANDBOX_WATERMARK**: watermark text used in exports/publish

### AI vendors (optional)

- **LLM_VENDOR**: choose default when multiple are configured (`openai` / `claude` / `mistral` / `deepseek` / `openai-compat`)

OpenAI:

- **OPENAI_API**
- **OPENAI_MODEL**

Claude:

- **CLAUDE_API**
- **CLAUDE_MODEL**

Mistral:

- **MISTRAL_API**
- **MISTRAL_MODEL**

DeepSeek:

- **DEEPSEEK_API**
- **DEEPSEEK_MODEL** (default: `deepseek-chat`)

OpenAI-compatible endpoint (Ollama, Together AI, Fireworks, Groq, vLLM, etc.):

- **OPENAI_COMPAT_ENDPOINT**: full chat completions URL (e.g. `http://localhost:11434/v1/chat/completions`)
- **OPENAI_COMPAT_MODEL**: model identifier (required)
- **OPENAI_COMPAT_API**: API key (optional — not needed for local servers like Ollama)
- **OPENAI_COMPAT_LABEL**: display name in the UI (optional, default: `Custom LLM`)

### Notion (optional)

- **NOTION_SECRET**: Notion integration secret
- **NOTION_FEATURE**: `1` enables the Notion “suggestion” UI + API

### Analytics (optional)

The server can inject analytics tags into the app’s `<head>` (and optionally into embeds).
See `docs/product/integrations/analytics.md` for setup.

Common toggles:

- **DISABLE_ANALYTICS**: `1` disables all injection
- **ANALYTICS_ALLOW_IN_SANDBOX**: `1` allows analytics even when sandbox mode is enabled
- **ANALYTICS_INCLUDE_EMBEDS**: `1` inject into `/embed/...` documents
- **ANALYTICS_INCLUDE_EXPORTS**: `1` inject into exported HTML documents (off by default)

Providers:

- **GTM_CONTAINER_ID**
- **MATOMO_URL**, **MATOMO_SITE_ID**, optional **MATOMO_DISABLE_COOKIES**, **MATOMO_REQUIRE_CONSENT**, **MATOMO_TRACK_LINKS**
- **PLAUSIBLE_DOMAIN**, optional **PLAUSIBLE_URL**

Escape hatch:

- **ANALYTICS_HEAD_HTML**: raw HTML injected into `<head>`
- **ANALYTICS_HEAD_HTML_B64**: base64 version (recommended to avoid quoting issues)








