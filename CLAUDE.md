# Claude Code Briefing: Deckyard Website — Launch Sprint

## Context
Launching Deckyard tomorrow (13 Feb 2026). The website needs final polish.
Current branch: `feature/infrastructure-positioning` — has the infrastructure repositioning.

## What's already done
- ✅ Homepage fully repositioned: "Presentation infrastructure you own"
- ✅ MCP section on homepage (22 tools, 6 prompts, SSE transport)
- ✅ AI section (type-aware, BYO LLM, iterative refinement)
- ✅ i18n updated (en.json has correct tool counts: 22 tools, 38 types)
- ✅ MCP server docs page (`src/content/docs/docs/developer/mcp-server.md`)
- ✅ REST API docs page
- ✅ Full SEO (sitemap, JSON-LD, OG tags, favicons)
- ✅ 12 language translations
- ✅ Pricing page with FAQ schema
- ✅ 4 competitor comparison pages

## What needs doing

### 1. Merge to main and deploy
The `feature/infrastructure-positioning` branch has all the latest updates. Merge to main.

### 2. Screenshot for hero
The homepage hero references `/images/deckyard-editor-preview.png` — this needs to be an actual screenshot of the Deckyard editor. Take a screenshot of the editor with a nice presentation open, 1920x1080, and place it at that path.

### 3. Blog post page
Launch materials exist in the main deckyard repo at `launch-materials/blog-post-personal.md`. Create a blog post page at `src/pages/[...locale]/blog/launch.astro` (or add it as a content collection entry). The blog index page already exists.

### 4. Missing screenshots
The cards on the homepage reference images that may not exist:
- `/images/screenshots/chart-slide-editor.png` 
- `/images/screenshots/slides-panel.png`
- `/images/screenshots/image-picker.png`
- `/images/marketing/poll-slide-marketing.png`

Check which exist and take screenshots for missing ones. The cards will render without images but look better with them.

### 5. Verify all links work
- The sandbox link points to `https://sandbox.deckyard.eu` — verify this works
- The GitHub link points to `https://github.com/jaapstronks/deckyard` — this needs to be public first
- Internal doc links like `/docs/developer/mcp-server/` should work now

### 6. Dutch translation sync (optional)
The `nl.json` locale file may have stale content (still mentioning 20 tools). Low priority — English is the launch language.

## Build & test
```bash
npm install
npm run dev        # Astro dev server
npm run build      # Production build
```

## Key files
- `src/pages/[...locale]/index.astro` — Homepage template
- `src/i18n/locales/en.json` — All English copy
- `src/content/docs/docs/developer/` — Developer docs (Starlight)
- `astro.config.mjs` — Sidebar config, sitemap, site URL
- `public/images/` — All images/screenshots
- `src/layouts/BaseLayout.astro` — SEO meta, JSON-LD
