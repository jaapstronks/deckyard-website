---
title: "MCP Server"
description: "Model Context Protocol server for AI agent integration"
---

# MCP Server

Deckyard includes a full [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that lets AI agents create, edit, and manage presentations through a standardized interface. The server exposes 20 tools and 6 prompts, all type-aware and schema-validated.

## Overview

The MCP server is the primary interface for AI agent integration with Deckyard. It provides:

- **20 tools** for presentation management, slide editing, theming, and export
- **6 prompts** for common generation workflows
- **Two transports**: stdio (local) and SSE (remote with API key auth)
- **Type-aware operations**: all slide operations validate against the 36+ slide type schemas

## Quick Start

### Stdio Transport (Local)

For local AI clients like Claude Desktop or Cursor:

```json
{
  "mcpServers": {
    "deckyard": {
      "command": "node",
      "args": ["path/to/deckyard/mcp-server/index.js"],
      "env": {
        "DECKYARD_URL": "http://localhost:3000",
        "DECKYARD_API_KEY": "dk_live_your_key_here"
      }
    }
  }
}
```

### SSE Transport (Remote)

For remote agents and CI/CD pipelines:

```
SSE Endpoint: https://your-instance.com/mcp/sse
API Key Header: Authorization: Bearer dk_live_your_key_here
```

Connect any MCP-compatible client to the SSE endpoint with your API key for remote access.

## Tools

### Presentation Management

| Tool | Description |
|------|-------------|
| `list_presentations` | List all presentations with pagination |
| `get_presentation` | Get full presentation including all slides |
| `create_presentation` | Create a new presentation with title, theme, and language |
| `update_presentation` | Update presentation metadata |
| `delete_presentation` | Move a presentation to trash |
| `duplicate_presentation` | Create a copy of an existing presentation |

### Slide Operations

| Tool | Description |
|------|-------------|
| `add_slide` | Add a typed slide to a presentation (validates against schema) |
| `update_slide` | Update slide content (validates against type schema) |
| `remove_slide` | Remove a slide from a presentation |
| `reorder_slides` | Change slide order within a presentation |
| `get_slide_types` | List all available slide types with their schemas |

### AI Generation

| Tool | Description |
|------|-------------|
| `generate_presentation` | Generate a full presentation from a text prompt |
| `generate_slides` | Generate and append slides to an existing presentation |
| `improve_slide` | Get AI suggestions for improving a specific slide |
| `validate_slide` | Validate a slide against its type schema |

### Themes & Export

| Tool | Description |
|------|-------------|
| `list_themes` | List available themes |
| `apply_theme` | Apply a theme to a presentation |
| `export_presentation` | Export to PDF, PPTX, HTML, or JSON |
| `export_slide_image` | Export a single slide as an image |
| `get_export_status` | Check status of async export jobs |

## Prompts

The MCP server includes 6 built-in prompt templates:

| Prompt | Description |
|--------|-------------|
| `generate_deck` | Generate a full presentation from a topic description |
| `improve_presentation` | Analyze and improve an existing presentation |
| `convert_document` | Convert document content into presentation slides |
| `translate_presentation` | Translate a presentation to another language |
| `add_interaction` | Add interactive slides (polls, Q&A) to a presentation |
| `create_theme_slides` | Generate sample slides showcasing a theme |

### Using Prompts

Prompts are invoked through the MCP protocol's prompt interface. They return structured messages that guide the AI model to use the appropriate tools:

```
Prompt: generate_deck
Arguments:
  topic: "Q4 2025 Business Review for the board"
  slide_count: 15
  language: "en-GB"
  theme: "corporate"
```

## Type System

Every slide operation in the MCP server is type-aware. When creating or updating slides, the server validates content against the slide type's schema.

### Example: Creating a Chart Slide

```json
{
  "tool": "add_slide",
  "arguments": {
    "presentationId": "abc123",
    "type": "chart",
    "content": {
      "title": "Revenue Growth",
      "chartType": "bar",
      "data": {
        "labels": ["Q1", "Q2", "Q3", "Q4"],
        "datasets": [{
          "label": "Revenue (€M)",
          "values": [2.1, 2.8, 3.2, 4.1]
        }]
      },
      "caption": "25% YoY growth in Q4"
    }
  }
}
```

The server validates that `chartType` is valid, `data` has the correct structure, and all required fields are present—before the slide is created.

### Example: Creating a Timeline Slide

```json
{
  "tool": "add_slide",
  "arguments": {
    "presentationId": "abc123",
    "type": "timeline",
    "content": {
      "title": "Product Roadmap",
      "entries": [
        { "date": "Q1 2026", "title": "MCP Server", "description": "Full agent integration" },
        { "date": "Q2 2026", "title": "SSO", "description": "Enterprise identity providers" },
        { "date": "Q3 2026", "title": "Real-time collab", "description": "Live multi-user editing" }
      ]
    }
  }
}
```

## Authentication

### API Key Authentication

Both transports use Deckyard API keys for authentication:

```
Authorization: Bearer dk_live_your_key_here
```

API keys need the appropriate scopes:
- `read` — List and view presentations
- `write` — Create, update, delete presentations and slides
- `ai` — Use AI generation tools
- `export` — Export presentations

### Creating API Keys

Create keys in **Settings > API Keys** or via the REST API:

```bash
curl -X POST "https://your-instance.com/api/api-keys" \
  -H "Cookie: your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{"name": "MCP Agent Key", "scopes": ["read", "write", "ai", "export"]}'
```

## SSE Transport Details

The SSE (Server-Sent Events) transport enables remote MCP connections:

- **Endpoint**: `https://your-instance.com/mcp/sse`
- **Protocol**: Standard MCP over SSE
- **Authentication**: API key in Authorization header
- **Reconnection**: Automatic with exponential backoff

This transport is ideal for:
- CI/CD pipelines generating presentations
- Remote AI orchestrators
- Custom agent frameworks
- Cloud-based AI tools

## Self-Hosting Considerations

When self-hosting, the MCP server runs alongside your Deckyard instance:

- **No additional deployment** — MCP server is built into Deckyard
- **No external dependencies** — All processing happens on your infrastructure
- **Local LLM support** — AI generation tools work with self-hosted models (Ollama, vLLM)
- **Network isolation** — Stdio transport requires no network access at all

### Environment Variables

```bash
# MCP server is enabled by default
MCP_ENABLED=true

# SSE transport (for remote access)
MCP_SSE_ENABLED=true
MCP_SSE_PORT=3001  # Default: same as main app

# Rate limiting for MCP connections
MCP_RATE_LIMIT=100  # requests per minute per key
```

## Examples

### Claude Desktop Integration

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "deckyard": {
      "command": "node",
      "args": ["/path/to/deckyard/mcp-server/index.js"],
      "env": {
        "DECKYARD_URL": "http://localhost:3000",
        "DECKYARD_API_KEY": "dk_live_your_key"
      }
    }
  }
}
```

Then ask Claude: *"Create a 10-slide pitch deck about renewable energy"* — it will use the MCP tools to create a real presentation in your Deckyard instance.

### Cursor Integration

Add the same config to Cursor's MCP settings. The AI assistant can then create and edit presentations as part of your development workflow.

### Python Agent Example

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

server_params = StdioServerParameters(
    command="node",
    args=["/path/to/deckyard/mcp-server/index.js"],
    env={
        "DECKYARD_URL": "http://localhost:3000",
        "DECKYARD_API_KEY": "dk_live_your_key"
    }
)

async with stdio_client(server_params) as (read, write):
    async with ClientSession(read, write) as session:
        await session.initialize()
        
        # List available tools
        tools = await session.list_tools()
        
        # Create a presentation
        result = await session.call_tool(
            "create_presentation",
            arguments={
                "title": "Automated Report",
                "theme": "corporate",
                "language": "en-GB"
            }
        )
```
