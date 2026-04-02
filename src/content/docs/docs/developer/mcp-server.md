---
title: "MCP Server"
description: "Connect AI agents to Deckyard via the Model Context Protocol"
---

# MCP Server

Deckyard includes a native [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that lets AI agents create, edit, and manage presentations through natural language.

22 tools. 6 guided prompts. Two transports (stdio + SSE). Zero external dependencies.

## Quick Start

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "deckyard": {
      "command": "node",
      "args": ["server/mcp/index.js"],
      "cwd": "/path/to/your/deckyard",
      "env": {
        "DECKYARD_MCP_OWNER_EMAIL": "you@example.com"
      }
    }
  }
}
```

### Cursor / Windsurf

Add to your MCP settings:

```json
{
  "deckyard": {
    "command": "node",
    "args": ["server/mcp/index.js"],
    "cwd": "/path/to/deckyard"
  }
}
```

### Remote access (SSE transport)

For remote agents, CI/CD pipelines, or [OpenClaw](https://openclaw.ai):

```bash
# Create an API key
node scripts/create-api-key.js --email you@example.com --name "Agent" --scopes read,write,ai

# Connect via HTTP
curl -X POST https://your-deckyard.com/mcp \
  -H "Authorization: Bearer dk_live_..." \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Available Tools (22)

### Creating

| Tool | Description |
|------|-------------|
| `create_presentation` | Generate a full deck from text content |
| `generate_from_url` | Fetch a web page and generate a presentation from its content |
| `add_slide` | Insert a new slide at any position |
| `append_slides` | Generate and add slides from new content (smart positioning) |
| `duplicate_presentation` | Copy an existing presentation |

### Modifying

| Tool | Description |
|------|-------------|
| `update_slide` | Update a slide's content |
| `remove_slide` | Remove a slide by index |
| `reorder_slides` | Move a slide between positions |
| `convert_slide` | AI-powered type conversion (e.g., list → icon cards) |
| `iterate_presentation` | Modify with natural language ("make slide 3 punchier") |

### Reading

| Tool | Description |
|------|-------------|
| `get_slide_types` | List all 38 slide types with schemas |
| `list_presentations` | Browse presentations |
| `get_presentation` | Get full deck data |
| `get_presentation_url` | Get edit and present URLs |
| `list_themes` | Available themes with brand colors |

### Analyzing

| Tool | Description |
|------|-------------|
| `validate_presentation` | Check for density, repetition, readability issues |
| `analyze_presentation` | AI-powered improvement suggestions |
| `compress_presentation` | Find merge/removal opportunities |

### Exporting

| Tool | Description |
|------|-------------|
| `export_pdf` | Export as PDF (requires Chromium) |
| `preview_slide` | Self-contained HTML preview of a slide |
| `preview_presentation` | Self-contained HTML preview of the full deck |

### Managing

| Tool | Description |
|------|-------------|
| `delete_presentation` | Move to trash (requires `confirm: true`) |

## Guided Prompts (6)

These appear as `/` menu shortcuts in Claude Desktop:

| Prompt | Description |
|--------|-------------|
| `create-presentation` | Guided deck creation from content |
| `improve-presentation` | Analyze and improve an existing deck |
| `refine-slide` | Deep-dive refinement of a single slide |
| `compress-presentation` | Distill a long deck into fewer slides |
| `add-content` | Extend a deck with new material |
| `deck-overview` | Structural overview of any presentation |

## AI Generation Pipeline

When you call `create_presentation` or `generate_from_url`, the content goes through a three-phase pipeline:

```
Raw content
    ↓
Phase 1: Outline
  → Structure into slides, identify patterns
  → Returns: intent, rough content, hints
    ↓
Phase 2: Refinement
  → Choose from 38 slide types per slide
  → Generate schema-compliant content
  → Returns: type, content, reasoning, alternatives
    ↓
Phase 3: Validation
  → Check density, readability, repetition
  → Fix common issues, truncate overlength
  → Returns: warnings, fixed content
```

The AI sees your theme's brand colors and available backgrounds, and adapts its choices accordingly.

## Natural Language Iteration

The `iterate_presentation` tool understands commands like:

- "Make slide 3 punchier"
- "Split the KPI slide into two"
- "Convert the list to an icon card grid"
- "Add a timeline slide after slide 4"
- "Make the whole deck shorter"
- "More visual variety"

It auto-detects the target slide (by index or type reference) and the command pattern (compress, split, diversify, expand, retype, or general edit).

## SSE Transport

The SSE transport enables remote MCP access over HTTP:

1. **Create session:** `POST /mcp` with Bearer auth → returns session ID
2. **Open stream:** `GET /mcp?sessionId=X` → SSE event stream
3. **Send messages:** `POST /mcp?sessionId=X` → JSON-RPC requests
4. **Close session:** `DELETE /mcp?sessionId=X`

Sessions have a 30-minute idle timeout. Authentication uses Deckyard API keys (`dk_live_*`).

Usage is tracked per API key — view stats in **Settings > API Keys**.

## Vendor Override

All AI-powered tools accept an optional `vendor` parameter to override the default LLM provider per call:

```json
{
  "name": "create_presentation",
  "arguments": {
    "content": "...",
    "vendor": "anthropic"
  }
}
```

Supported vendors: `openai`, `anthropic`, `mistral`, `deepseek`, and any OpenAI-compatible endpoint.

## Architecture

The MCP server is built without the official SDK — a lightweight JSON-RPC 2.0 implementation in ~250 lines:

```
server/mcp/
├── index.js        Entry point, stdio bootstrap
├── protocol.js     JSON-RPC 2.0 + MCP protocol (~250 lines)
├── tools.js        22 tool definitions (~700 lines)
├── prompts.js      6 prompt templates (~260 lines)
├── preview.js      HTML preview generator
├── sse.js          SSE transport handler
└── sse-mount.js    Lazy mount for main server
```

No external dependencies. The entire MCP server adds zero npm packages to Deckyard.

## OpenClaw Integration

An installable [OpenClaw](https://openclaw.ai) skill is included in the repository at `skills/openclaw-skill/`. Drop it into your OpenClaw workspace and your agent can build presentations via the SSE transport.
