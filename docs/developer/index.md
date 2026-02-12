---
title: "Developer Guide"
description: "Technical documentation for developers building on Deckyard"
---

# Developer Guide

Deckyard is presentation infrastructure you can build on. REST API, MCP server, typed slide schemas—everything you need to integrate presentations into your tools, agents, and workflows.

## Integration Options

- **[MCP Server](/docs/developer/mcp-server)** — 20 tools + 6 prompts for AI agent integration (stdio & SSE transport)
- **[REST API](/docs/developer/api)** — Programmatic access to presentations, slides, themes, and export
- **[Sessions](/docs/developer/sessions)** — Presentation session management for live presenting
- **[Rendering](/docs/developer/rendering)** — Slide rendering and export APIs

## Architecture

Deckyard's architecture is built in three layers:

1. **Type System** — 36+ slide types, each with a schema defining required fields, data structures, and validation rules. Every slide is a typed, structured object—not freeform HTML.

2. **Intelligence Layer** — AI generation that understands slide types, validates output against schemas, and supports iterative refinement. Works with any LLM via BYO API keys.

3. **MCP Server** — Model Context Protocol interface with 20 tools and 6 prompts. Connect AI agents via stdio (local) or SSE (remote with API key auth).

## Quick Start for Agent Integration

The fastest way to connect an AI agent to Deckyard:

1. [Self-host Deckyard](/docs/deployment/quickstart) or use the managed cloud
2. Create an API key in **Settings > API Keys**
3. Configure your MCP client to connect to Deckyard
4. Start creating presentations programmatically

See the [MCP Server documentation](/docs/developer/mcp-server) for detailed setup instructions.
