---
title: "AI Setup & API Keys"
description: "Configure AI features and API keys in Deckyard"
---

# AI Setup & API Keys

Get started with Deckyard's AI-powered features.

## Overview

Deckyard includes AI capabilities to help you create presentations faster and with better content. Features include:

- **Deck Generation** - Create presentations from prompts
- **Translation** - Translate content to other languages
- **Analysis** - Get feedback and suggestions
- **Description Generation** - Auto-generate metadata
- **Alt Text** - Generate image descriptions for accessibility

## Supported AI Providers

Deckyard supports multiple AI providers — both hosted API services and self-hosted models:

| Provider | Models | Best For |
|----------|--------|----------|
| **OpenAI** | GPT-4, GPT-4o | General use, image analysis |
| **Anthropic** | Claude 3 | Long-form content, analysis |
| **Mistral** | Mistral Large | European data residency |
| **DeepSeek** | DeepSeek Chat | Cost-effective generation |
| **Any OpenAI-compatible** | Varies | Self-hosted / custom models |

The **OpenAI-compatible** option works with any service that implements the OpenAI chat completions API, including **Ollama**, **Together AI**, **Fireworks**, **Groq**, and **vLLM**. This means you can run AI features with fully local models — no data leaves your server.

## API Key Configuration

Configure your AI provider by setting the appropriate environment variable.

### OpenAI

```bash
OPENAI_API=sk-your-api-key-here
```

Get an API key from [platform.openai.com](https://platform.openai.com/api-keys).

### Anthropic (Claude)

```bash
CLAUDE_API=sk-ant-your-api-key-here
```

Get an API key from [console.anthropic.com](https://console.anthropic.com/).

### Mistral

```bash
MISTRAL_API=your-api-key-here
```

Get an API key from [console.mistral.ai](https://console.mistral.ai/).

### DeepSeek

```bash
DEEPSEEK_API=sk-your-api-key-here
```

Get an API key from [platform.deepseek.com](https://platform.deepseek.com/).

### OpenAI-compatible endpoint (Ollama, Together AI, etc.)

For self-hosted models or third-party OpenAI-compatible services:

```bash
OPENAI_COMPAT_ENDPOINT=http://localhost:11434/v1/chat/completions
OPENAI_COMPAT_MODEL=qwen2.5:72b
# Optional — not needed for local servers like Ollama:
# OPENAI_COMPAT_API=your-api-key
# Optional — display name shown in the UI:
# OPENAI_COMPAT_LABEL=Ollama
```

The API key is optional — local servers like Ollama don't require authentication. The label controls how the provider appears in the UI dropdown (defaults to "Custom LLM").

## Multiple Providers

You can configure multiple providers simultaneously. Deckyard will:
- Automatically detect available providers
- Let users pick their preferred provider from a dropdown in the AI UI
- Auto-detect a default based on which keys are configured

### Default provider priority

When multiple providers are configured, Deckyard picks a default in this order:

1. Explicit `LLM_VENDOR` environment variable
2. OpenAI (if `OPENAI_API` is set)
3. Claude (if `CLAUDE_API` is set)
4. Mistral (if `MISTRAL_API` is set)
5. DeepSeek (if `DEEPSEEK_API` is set)
6. OpenAI-compatible (if `OPENAI_COMPAT_ENDPOINT` and `OPENAI_COMPAT_MODEL` are set)

Users can always switch between configured providers in the AI interface.

## Feature Availability

Different features require different providers:

| Feature | OpenAI | Claude | Mistral | DeepSeek | OpenAI-compat |
|---------|--------|--------|---------|----------|---------------|
| Deck Generation | Yes | Yes | Yes | Yes | Yes |
| Translation | Yes | Yes | Yes | Yes | Yes |
| Analysis | Yes | Yes | Yes | Yes | Yes |
| Description Gen | Yes | Yes | Yes | Yes | Yes |
| Alt Text (Images) | Yes | No | No | No | Depends on model |

**Note:** Alt text generation requires vision capabilities. Currently only OpenAI models support this. Some OpenAI-compatible endpoints may also support vision depending on the model.

## Checking Provider Status

The application automatically detects which AI providers are available.

### In the UI

When you access AI features:
- If no provider is configured, you'll see a setup prompt
- Available providers are shown in the AI settings
- Features requiring unavailable providers are disabled

### Via API

Check available providers:

```bash
GET /api/ai/status
```

Response:
```json
{
  "providers": {
    "openai": true,
    "claude": false,
    "mistral": true
  },
  "features": {
    "deckGeneration": true,
    "translation": true,
    "altText": true
  }
}
```

## Cost Considerations

AI features incur costs based on your provider's pricing:

- **OpenAI** — Per-token pricing
- **Claude** — Per-token pricing
- **Mistral** — Per-token pricing
- **DeepSeek** — Per-token pricing (typically lower cost)
- **OpenAI-compatible** — Depends on the service (free for local models like Ollama)

### Estimating Costs

Typical usage per feature:
- **Deck generation** - Varies based on length (1K-10K tokens)
- **Translation** - Based on content length
- **Analysis** - ~2K tokens per presentation
- **Description** - ~500 tokens

### Controlling Costs

- Limit access to AI features by user role
- Monitor usage in your provider dashboard
- Set spending limits in your provider account

## Disabling AI Features

To disable AI features entirely, don't configure any API keys.

To disable specific features:

```bash
# Disable all AI
DISABLE_AI=true

# Disable specific features (if supported)
DISABLE_AI_GENERATION=true
DISABLE_AI_TRANSLATION=true
```

## Security

### API Key Security

- Store API keys in environment variables, not code
- Never expose keys in client-side code
- Use provider-level restrictions when available

### Data Privacy

When using AI features:
- Presentation content is sent to the AI provider
- Check your provider's data retention policies
- Consider data residency requirements (Mistral for EU, or self-hosted models via the OpenAI-compatible endpoint for full local processing)

## Troubleshooting

### AI Features Not Appearing

1. Check that an API key is configured
2. Verify the key is valid (test in provider dashboard)
3. Check server logs for configuration errors

### Errors During AI Operations

Common issues:
- **Rate limits** - You've exceeded provider limits
- **Invalid key** - Key is incorrect or revoked
- **Quota exceeded** - You've used your monthly allowance

Check your provider dashboard for specific error details.

### Slow Responses

AI operations can take several seconds. If consistently slow:
- Check your provider's status page
- Consider using a faster model
- Reduce input size for generation

## Related

- [Deck Generation](/docs/ai/deck-generation/)
- [Translation](/docs/ai/translation/)
- [Analysis](/docs/ai/analysis/)
- [Environment Variables](/docs/configuration/environment/)
