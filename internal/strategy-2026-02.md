# Deckyard Strategic Analysis — February 2026

**Date:** 2026-02-12
**Context:** Layers 1-3 complete (Type System → Intelligence → MCP Server)

---

## Current State

Deckyard is a 173K-line pure ESM presentation platform with:
- **36+ typed slide types** with bilingual support (nl/en-GB)
- **AI-powered generation pipeline**: Phase 1 (outline) → Phase 2 (refinement) → Validation
- **MCP Server**: 20 tools, 6 prompts, Claude Desktop ready (stdio transport)
- **Audience interaction**: polls, Likert scales, Q&A, lead capture, follow-along
- **Infrastructure**: Postgres + file-based storage, Scaleway deploy, Docker, multi-workspace, custom themes, embed SDK, API keys
- **No framework debt**: vanilla JS, no bundler, no React/Vue/Svelte

## Strategic Direction: Presentation Infrastructure (B)

**Decision (2026-02-12):** Deckyard's primary direction is **presentation infrastructure** — the engine that other tools and AI agents use — rather than competing as a consumer AI presentation tool.

### Why B over A ("Best AI presentation tool"):
- **First-mover advantage**: One of the first presentation systems with a full MCP interface
- **Defensible moat**: Self-hosted + BYO LLM + type-aware AI + MCP is a unique combination no competitor offers
- **Audience interaction is brittle**: Polls/Q&A/lead capture are harder to test and maintain; better as a secondary capability
- **Higher ceiling**: Platform play compounds (each integration multiplies value) vs. consumer play competes on features
- **Alignment with market**: AI agent ecosystem is exploding — being infrastructure for agents is higher-leverage than being another AI tool

### Competitive position:
| Feature | Gamma/Tome/Beautiful.ai | Google Slides + Gemini | Deckyard |
|---------|------------------------|----------------------|----------|
| AI generation | ✅ | ✅ | ✅ |
| Self-hosted | ❌ | ❌ | ✅ |
| BYO LLM | ❌ | ❌ | ✅ |
| MCP interface | ❌ | ❌ | ✅ |
| Custom themes | Limited | Limited | ✅ Full |
| Embed SDK | ❌ | Limited | ✅ |
| White-label | ❌ | ❌ | ✅ |
| Type-aware AI | Basic | Basic | ✅ 36+ types |
| Open source | ❌ | ❌ | ✅ |

## Prioritized Next Steps

### Tier 1: Ship now (high impact, enables everything else)

1. **SSE Transport + API Key Auth** — Remote MCP access. Unlocks: Cursor, Windsurf, remote agents, webhooks. Without this, MCP is local-only.
2. **Run migration script on production** — Layer 1 work isn't "real" until existing decks use the new schemas.
3. **Documentation & DX** — README "Why Deckyard + AI" section, Claude Desktop quick start, 3-4 workflow examples. Adoption blocker.

### Tier 2: Near-term (solidify the platform)

4. **Preview tool polish** — 236KB CSS bundle is too heavy. Selective CSS inlining per slide type. Makes Claude Desktop experience dramatically better.
5. **Constraint calibration** — Analyze real decks to fine-tune maxLength values. Better constraints → better AI output.
6. **MCP rate limiting + usage tracking** — Essential for any remote/multi-tenant use.

### Tier 3: Medium-term (expand the platform)

7. **Webhook/event system** — "Deck created", "Deck updated" events. Enables agent workflows without polling.
8. **generate_from_url tool** — Fetch URL content, generate deck. High-value MCP tool for agents.
9. **export_pdf tool** — Puppeteer-based PDF export via MCP. Common agent workflow need.
10. **SDK/client libraries** — JavaScript/Python clients for the MCP/API. Lower integration friction.

### Deliberately deferred:

- **content-columns items[] migration** — Most complex type, lowest AI value. Do when there's demand.
- **Editor UI for iterate** — Works via MCP/API already. Editor button is nice-to-have.
- **Advanced MCP tools** (compare_versions, batch_operations) — Features searching for a problem.
- **Audience interaction improvements** — Secondary to infrastructure play. Maintain, don't invest.

## Architecture Notes

### MCP Transport Evolution
```
Current:    stdio (local only, Claude Desktop)
Next:       SSE (remote, API key auth, any MCP client)
Future:     WebSocket (bidirectional, real-time events)
```

### Key Files
```
server/mcp/
├── index.js        Entry point, stdio bootstrap
├── protocol.js     JSON-RPC 2.0 + MCP protocol (~250 lines, no deps)
├── tools.js        20 tool definitions (~600 lines)
├── prompts.js      6 prompt templates (~260 lines)
├── preview.js      HTML preview generator (~200 lines)
└── [future] sse.js SSE transport handler
```

---

*This document reflects the strategic decision made on 2026-02-12. Update as the product evolves.*
