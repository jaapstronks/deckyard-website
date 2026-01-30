---
title: "Public API"
description: "Programmatic access to Deckyard presentations"
---

# Public API

The Deckyard Public API lets you programmatically create, manage, and export presentations. Use it to build integrations, automate workflows, or connect Deckyard with other tools.

## Quick Start

### 1. Create an API Key

Go to **Settings > API Keys** and create a new key. Choose the scopes you need:

| Scope | Access |
|-------|--------|
| `read` | List and view presentations, themes, slide types |
| `write` | Create, update, and delete presentations |
| `export` | Export presentations to various formats |
| `ai` | Use AI-powered generation features |

**Important:** Copy your API key immediately - it won't be shown again.

### 2. Make Your First Request

```bash
curl https://your-instance.com/api/v1/presentations \
  -H "Authorization: Bearer dk_live_your_api_key_here"
```

### 3. Explore the Documentation

Interactive API documentation is available at `/api/v1/docs` on your Deckyard instance.

## Authentication

All requests require an API key in the `Authorization` header:

```
Authorization: Bearer dk_live_your_api_key_here
```

### Key Format

API keys use the format `dk_live_` followed by a random token. The `dk_live_` prefix indicates a production key.

### Security

- Keys are stored securely (only the hash is saved)
- Revoke keys instantly from Settings if compromised
- Keys inherit the permissions of the user who created them

## Rate Limits

Requests are subject to rate limits based on your account tier:

| Tier | Requests/min | AI calls/day | Exports/day |
|------|-------------|--------------|-------------|
| Free | 60 | 10 | 50 |
| Pro | 300 | 100 | 500 |
| Enterprise | 1000 | Unlimited | Unlimited |

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1705344000
```

When rate limited, you'll receive a `429` status with a `Retry-After` header.

## Endpoints

### Presentations

#### List Presentations

```
GET /api/v1/presentations
```

Query parameters:
- `limit` (1-100, default 50) - Maximum results
- `offset` (default 0) - Skip this many results

```bash
curl "https://your-instance.com/api/v1/presentations?limit=10" \
  -H "Authorization: Bearer $API_KEY"
```

#### Get Presentation

```
GET /api/v1/presentations/{id}
```

Returns the full presentation including all slides.

#### Create Presentation

```
POST /api/v1/presentations
Content-Type: application/json

{
  "title": "My Presentation",
  "description": "Optional description",
  "theme": "deckyard",
  "language": "en-GB"
}
```

#### Update Presentation

```
PUT /api/v1/presentations/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "slides": [...]
}
```

#### Delete Presentation

```
DELETE /api/v1/presentations/{id}
```

Moves the presentation to trash (soft delete).

#### Duplicate Presentation

```
POST /api/v1/presentations/{id}/duplicate
```

Creates a copy of the presentation.

### Exports

Export presentations in various formats. Requires the `export` scope.

#### JSON Export

```
GET /api/v1/presentations/{id}/export/json
```

Returns a portable JSON format that can be imported elsewhere.

#### HTML Export

```
GET /api/v1/presentations/{id}/export/html
```

Returns a standalone HTML file with all assets embedded.

#### PowerPoint Export

```
GET /api/v1/presentations/{id}/export/pptx?scale=2
```

Query parameters:
- `scale` (1-3, default 2) - Image quality multiplier

#### PDF Export

```
GET /api/v1/presentations/{id}/export/pdf
```

Returns print-ready HTML optimized for PDF conversion.

### AI Features

Generate content using AI. Requires the `ai` scope.

#### List Vendors

```
GET /api/v1/ai/vendors
```

Returns available AI providers and which are configured.

#### Generate Presentation

```
POST /api/v1/ai/wizard
Content-Type: application/json

{
  "content": "Your raw content text here...",
  "vendor": "openai",
  "theme": "deckyard",
  "language": "en-GB"
}
```

Generates a complete presentation from text content.

#### Append Slides

```
POST /api/v1/ai/append-slides
Content-Type: application/json

{
  "presentationId": "abc123",
  "content": "Additional content...",
  "vendor": "openai"
}
```

Generates slides and appends them to an existing presentation.

### Resources

#### List Themes

```
GET /api/v1/themes
```

Returns available system and custom themes.

#### List Slide Types

```
GET /api/v1/slide-types
```

Returns slide type definitions with field schemas.

#### Search Image Library

```
GET /api/v1/image-library?q=nature&limit=20
```

Search the image library for assets.

## Error Handling

The API uses standard HTTP status codes:

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Invalid or missing API key |
| `403` | Forbidden - Valid key but insufficient scope |
| `404` | Not Found |
| `429` | Rate Limited - Slow down |
| `500` | Server Error |

Error responses include details:

```json
{
  "error": "Validation failed",
  "details": "Title is required"
}
```

## Examples

### Create and Export Workflow

```bash
# Create a presentation
RESPONSE=$(curl -s -X POST "https://your-instance.com/api/v1/presentations" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title": "Q4 Report", "theme": "deckyard"}')

# Extract the ID
PRES_ID=$(echo $RESPONSE | jq -r '.presentation.id')

# Export as PowerPoint
curl "https://your-instance.com/api/v1/presentations/$PRES_ID/export/pptx" \
  -H "Authorization: Bearer $API_KEY" \
  -o report.pptx
```

### Generate Presentation from Content

```bash
curl -X POST "https://your-instance.com/api/v1/ai/wizard" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Our company had a great Q4. Revenue grew 25% year over year...",
    "vendor": "openai",
    "theme": "deckyard"
  }'
```

### Python Example

```python
import requests

API_KEY = "dk_live_your_key_here"
BASE_URL = "https://your-instance.com/api/v1"

headers = {"Authorization": f"Bearer {API_KEY}"}

# List presentations
response = requests.get(f"{BASE_URL}/presentations", headers=headers)
presentations = response.json()["presentations"]

# Create a new presentation
new_pres = requests.post(
    f"{BASE_URL}/presentations",
    headers=headers,
    json={"title": "API Created", "theme": "deckyard"}
)
print(new_pres.json())
```

## OpenAPI Specification

The full OpenAPI 3.0 specification is available at:

```
GET /api/v1/openapi.yaml
```

Import this into tools like Postman or Insomnia for automatic client generation.

## Managing API Keys

### Via Settings UI

Go to **Settings > API Keys** to:
- Create new keys with specific scopes
- View key usage statistics
- Revoke compromised keys

### Via Internal API

If you need programmatic key management:

```bash
# List your keys
curl "https://your-instance.com/api/api-keys" \
  -H "Cookie: your-session-cookie"

# Create a key
curl -X POST "https://your-instance.com/api/api-keys" \
  -H "Cookie: your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{"name": "CI/CD Key", "scopes": ["read", "export"]}'

# Revoke a key
curl -X DELETE "https://your-instance.com/api/api-keys/{key-id}" \
  -H "Cookie: your-session-cookie"

# View usage
curl "https://your-instance.com/api/api-keys/{key-id}/usage?days=30" \
  -H "Cookie: your-session-cookie"
```
