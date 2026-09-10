## Deckyard Documentation

Dit is de bron van de **gebruikersdocumentatie**: `scripts/sync-docs.js` kopieert deze map bij elke build naar `src/content/docs/docs/`, waar Starlight haar op deckyard.eu publiceert. Alles wat hier staat is dus publiek. Werkdocumenten, todo's en briefs horen daarom niet hier maar in `planning/` (lokaal, gitignored; zie `planning/README.md`), en de interne strategie- en deploynotities staan in `internal/`.

Deze README wordt zelf niet meegekopieerd - `sync-docs.js` slaat elke `README.md` over.

### For Users

- **[Creating Presentations](/docs/creating/)** - Different ways to create presentations
- **[Editing](/docs/editing/)** - The slide editor
- **[Organizing](/docs/organizing/)** - Search, tags, and trash
- **[Slide Types](/docs/slide-types/)** - All available slide types
- **[Themes](/docs/themes/)** - Customizing appearance
- **[Presenter Mode](/docs/presenter/)** - Presenting and speaker notes
- **[Collaboration](/docs/collaboration/)** - Sharing, comments, and versions
- **[Publishing](/docs/publishing/)** - Public links and embedding
- **[Export](/docs/export/)** - PDF, PowerPoint, images, and more
- **[AI Features](/docs/ai/getting-started/)** - AI-powered tools
- **[Interactions](/docs/interactions/)** - Polls, Q&A, and feedback
- **[Libraries](/docs/libraries/)** - Image and slide libraries

### For Operators (Self-Hosted)

- **[Deployment](/docs/deployment/)** - Quickstart and Docker setup
- **[Configuration](/docs/configuration/environment/)** - Environment variables and settings
- **[Admin](/docs/admin/)** - User management and instance settings
- **[Integrations](/docs/integrations/)** - Analytics, webhooks, Notion, etc.

### For Developers

- **[Developer Docs](/docs/developer/)** - API and rendering
- **[Custom Slide Types](/docs/customization/)** - Building custom slides
