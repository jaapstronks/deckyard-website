# Homepage Component Brief

*Complete specification for the Deckyard homepage*
*Document version: January 2026*

---

## Page Narrative

The homepage tells a story in this order:

1. **Hook** → You can own this (sovereignty + ownership)
2. **Problem** → Why that matters (presentations are broken)
3. **Proof** → Look at what you get (slide types)
4. **Feature 1** → Built-in interactions (Mentimeter alternative)
5. **Feature 2** → AI that works (on your terms)
6. **Choice** → Your infrastructure or ours
7. **Open** → It's fully open source and extensible
8. **Trust** → Who built this
9. **Action** → Try it

---

## Section 1: Hero

### Purpose
Capture attention, establish positioning, qualify the right audience. This is the "foot in the door" — sovereignty and ownership hook.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: hero                                                  │
│  Container: wide (1280px)                                       │
│  Background: default                                            │
│  Padding: spacious                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│  │ HERO COPY               │  │ HERO PROOF                  │   │
│  │                         │  │                             │   │
│  │ [Eyebrow]               │  │ ┌─────────────────────────┐ │   │
│  │ EU-hosted · Open Source │  │ │                         │ │   │
│  │ · Self-hostable · MIT   │  │ │   Product Screenshot    │ │   │
│  │                         │  │ │   or Live Embed         │ │   │
│  │ [H1]                    │  │ │                         │ │   │
│  │ A presentation platform │  │ └─────────────────────────┘ │   │
│  │ that's actually yours   │  │                             │   │
│  │                         │  │ [Caption + try it link]     │   │
│  │ [Lead]                  │  │                             │   │
│  │ Built for how we work   │  └─────────────────────────────┘   │
│  │ now. Structured slides  │                                    │
│  │ that AI can understand. │                                    │
│  │ ...                     │                                    │
│  │                         │                                    │
│  │ [CTA: Try sandbox]      │                                    │
│  │ [CTA: View on GitHub]   │                                    │
│  │                         │                                    │
│  │ [Trust badges]          │                                    │
│  │ 🇫🇷 Hosted in France    │                                    │
│  │ 🔒 GDPR-native          │                                    │
│  │ 🏠 Self-hostable        │                                    │
│  │ 📖 MIT licensed         │                                    │
│  └─────────────────────────┘                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.hero.eyebrow` | "EU-hosted · Open Source · Self-hostable · MIT Licensed" |
| `home.hero.title` | "A presentation platform that's actually yours" |
| `home.hero.lead` | "Built for how we work now. Structured slides that AI can understand. Open formats your tools can talk to. EU-hosted or on your servers. No lock-in, no platform risk." |
| `home.hero.trySandbox` | "Try the sandbox" |
| `home.hero.viewOnGithub` | "View on GitHub" |
| `home.hero.badges.*` | Hosted in France, GDPR-native, Self-hostable, MIT licensed |

### Components Used
- `Section` (hero variant, wide container)
- `SplitLayout` (60/40, visual right)
- `BadgeRow` (trust signals)
- `Button` (primary + secondary)
- `MediaBlock` (screenshot/embed with caption)

### Implementation Notes
- Eyebrow leads with "EU-hosted" — this is intentional positioning
- Screenshot should show real editor content, not empty state
- Consider replacing static image with live Deckyard embed (self-referential demo)
- Trust badges use icons, not emoji (map-pin, lock, house, book-open)

---

## Section 2: Problem/Solution

### Purpose
Explain why Deckyard exists. Name the pain (presentations are broken), introduce the solution (structured templates + AI). Video/visual proves it works.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: problem                                               │
│  Container: wide, with nested widths                            │
│  Background: default                                            │
│  Padding: standard                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │ [H2] Presentations are still broken │               │
│           │                                     │  ← narrow     │
│           │ [Pain statement]                    │    centered   │
│           │ Every presentation tool hands you   │               │
│           │ a blank canvas...                   │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │  ┌─────────────────────┐  ┌───────────────────────────┐ │    │
│  │  │                     │  │ [H3] Deckyard works       │ │    │
│  │  │   Demo Visual       │  │ differently               │ │    │
│  │  │   (static image or  │  │                           │ │    │
│  │  │    video)           │  │ [Solution paragraph]      │ │    │
│  │  │                     │  │ Deckyard works like a     │ │    │
│  │  │                     │  │ website, not a canvas...  │ │    │
│  │  │                     │  │                           │ │    │
│  │  │                     │  │ [Caption]                 │ │    │
│  │  └─────────────────────┘  └───────────────────────────┘ │    │
│  │                                                         │    │
│  │  SplitLayout (tour-item)                                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐        │
│  │ 👥 Roles that │  │ 🗄️ Always-    │  │ ✨ AI that    │        │
│  │ make sense    │  │ current data  │  │ actually helps│        │
│  │               │  │               │  │               │        │
│  │ Designers     │  │ Connect to    │  │ Generate from │        │
│  │ control...    │  │ Notion...     │  │ prompts...    │        │
│  └───────────────┘  └───────────────┘  └───────────────┘        │
│                                                                 │
│  CardGrid (3 columns, compact)                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.problem.title` | "Presentations are still broken" |
| `home.problem.pain` | "Every presentation tool hands you a blank canvas and says \"design whatever you want.\" That's the problem. People spend hours wrestling with layouts. Brand guidelines get ignored. Data goes stale in old decks. And AI can't help—there's nothing structured for it to work with." |
| `home.problem.solutionTitle` | "Deckyard works differently" |
| `home.problem.solution` | "Deckyard works like a website, not a canvas. Designers create templates. Everyone else fills in content. The system enforces consistency. And because slides are structured, AI can generate, update, and translate them automatically." |
| `home.problem.video.alt` | "Demo: creating a presentation from a Notion page using AI" |
| `home.problem.video.caption` | "From prompt to presentation in 30 seconds" |
| `home.problem.roles.title` | "Roles that make sense" |
| `home.problem.roles.description` | "Designers control templates and styling. Editors fill in content. No one drags text boxes around. Your brand stays intact." |
| `home.problem.liveData.title` | "Always-current data" |
| `home.problem.liveData.description` | "Connect slides to Notion, Google Sheets, or your APIs. Numbers update automatically. No more stale quarterly decks." |
| `home.problem.generation.title` | "AI that actually helps" |
| `home.problem.generation.description` | "Generate decks from prompts or documents. Structured templates mean reliable output—not random layouts you have to fix." |

### Components Used
- `Section` (default, wide container)
- `CenteredBlock` (narrow, for headline + pain statement)
- `SplitLayout` (tour-item, visual left)
- `MediaBlock` (image or video with caption)
- `CardGrid` (3 columns, compact variant)
- `Card` (compact variant with icon)

### Implementation Notes
- Pain statement and headline should be narrow (700-800px) for readability
- Demo visual is currently static image; replace with video when ready
- Video storyboard: prompt input → AI processing → deck appears → quick editor tour → present mode
- Three cards use icons: users, database, sparkle

---

## Section 3: Showcase (Slide Types)

### Purpose
Visual proof of the "44 slide types" claim. Let people see the variety and quality. Builds confidence that this is a real, complete product.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: showcase                                              │
│  Container: wide (1280px)                                       │
│  Background: alt (light gray)                                   │
│  Padding: standard                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │ [H2] Everything you need,           │               │
│           │ nothing you don't                   │  ← centered   │
│           │                                     │               │
│           │ [Lead] 44 slide types covering...   │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐│
│  │Chart│ │ KPI │ │Time │ │Comp.│ │Funn.│ │Proc.│ │Poll │ │Feed.││
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘│
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐│
│  │Img+ │ │Gall.│ │Table│ │Icon │ │Quote│ │Matrx│ │Pyram│ │Cycle││
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘│
│                                              ┌─────────────────┐│
│                                              │ +28 more types  ││
│                                              │ → View all      ││
│                                              └─────────────────┘│
│  ThumbnailGrid                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.showcase.title` | "Everything you need, nothing you don't" |
| `home.showcase.lead` | "44 slide types covering data, comparisons, narratives, and interactions. Each one encodes design best practices so your presentations always look professional." |

### Slide Types Shown (16 + "more" card)
1. Charts
2. KPI Metrics
3. Timeline
4. Comparison
5. Funnel
6. Process
7. Live Poll
8. Feedback
9. Image + Text
10. Gallery
11. Data Table
12. Icon Cards
13. Quote
14. Matrix
15. Pyramid
16. Cycle
17. [+28 more types → link to /features]

### Components Used
- `Section` (alt background, wide container)
- `CenteredBlock` (for headline + lead)
- `ThumbnailGrid` (responsive, 4-6 columns depending on viewport)
- `ThumbnailCard` (image + label, linked to features page)

### Implementation Notes
- Grid should be wide—this is visual proof, needs presence
- Each thumbnail is a real slide type screenshot (16:9 or 4:3)
- "+28 more types" card links to /features/slide-types
- Labels are simple (e.g., "Charts" not "Data Visualization Charts")
- On mobile: 2 columns, horizontal scroll optional

---

## Section 4: Interactions

### Purpose
Highlight the built-in audience interaction features. Position as Mentimeter alternative without naming competitors. "No more juggling separate tools."

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: interactions                                          │
│  Container: default (1100px)                                    │
│  Background: default                                            │
│  Padding: standard                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │  ┌─────────────────────┐  ┌───────────────────────────┐ │    │
│  │  │                     │  │                           │ │    │
│  │  │  Screenshot:        │  │ [H2] Engage your audience │ │    │
│  │  │  Live poll with     │  │ without switching tools   │ │    │
│  │  │  real-time results  │  │                           │ │    │
│  │  │                     │  │ [Lead] Polls, Q&A, Likert │ │    │
│  │  │                     │  │ scales, and feedback...   │ │    │
│  │  │                     │  │                           │ │    │
│  │  │                     │  │ [Body] Your audience      │ │    │
│  │  │                     │  │ joins via QR code...      │ │    │
│  │  │                     │  │                           │ │    │
│  │  │                     │  │ [Feature pills]           │ │    │
│  │  │                     │  │ Live polls · Q&A ·        │ │    │
│  │  │                     │  │ Feedback · Likert ·       │ │    │
│  │  │                     │  │ Follow-along              │ │    │
│  │  └─────────────────────┘  └───────────────────────────┘ │    │
│  │                                                         │    │
│  │  SplitLayout (tour-item, visual left)                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.interactions.title` | "Engage your audience without switching tools" |
| `home.interactions.lead` | "Polls, Q&A, Likert scales, and feedback forms—built directly into your slides. No more juggling a separate tool alongside your presentation." |
| `home.interactions.description` | "Your audience joins via QR code or short link. No app download required—it works in any browser. Results appear on your slides in real-time." |
| `home.interactions.polls` | "Live polls" |
| `home.interactions.qna` | "Q&A" |
| `home.interactions.feedback` | "Open feedback" |
| `home.interactions.likert` | "Likert scales" |
| `home.interactions.quizzes` | "Follow-along" |

### Components Used
- `Section` (default background, default container)
- `SplitLayout` (tour-item, 50/50, visual left)
- `MediaBlock` (screenshot)
- `ChipRow` (feature pills)

### Implementation Notes
- Screenshot should show a live poll with visible audience responses
- Feature pills are clickable? Or just labels? (Currently just labels)
- Consider animated screenshot/GIF showing results appearing in real-time
- "Follow-along" label may need clarification (is it quizzes or follow-along mode?)

---

## Section 5: AI

### Purpose
Explain the AI capabilities with the "on your terms" framing. 65% enthusiasm about what AI can do, 35% reassurance about control. BYO API keys is the key differentiator.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: ai                                                    │
│  Container: default (1100px)                                    │
│  Background: alt                                                │
│  Padding: standard                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │ [H2] AI that actually works—        │               │
│           │ on your terms                       │  ← centered   │
│           │                                     │               │
│           │ [Lead] Generate entire...           │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ [✨ Generate] [📄 Convert] [🌐 Translate]                 │  │
│  │                                                           │  │
│  │ Capability strip (3 badges with icons)                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │  ┌─────────────────────┐  ┌───────────────────────────┐ │    │
│  │  │                     │  │                           │ │    │
│  │  │  Screenshot:        │  │ [H3] 🔑 Bring your own   │ │    │
│  │  │  AI slide wizard    │  │ keys                      │ │    │
│  │  │                     │  │                           │ │    │
│  │  │                     │  │ [Description] Connect     │ │    │
│  │  │                     │  │ OpenAI, Anthropic...      │ │    │
│  │  │                     │  │                           │ │    │
│  │  │                     │  │ [H3] 🛡️ Structured       │ │    │
│  │  │                     │  │ slides = reliable output  │ │    │
│  │  │                     │  │                           │ │    │
│  │  │                     │  │ [Description] AI tools    │ │    │
│  │  │                     │  │ struggle with freeform... │ │    │
│  │  └─────────────────────┘  └───────────────────────────┘ │    │
│  │                                                         │    │
│  │  SplitLayout (tour-item, visual left)                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 💡 You're in control: Choose your provider. Self-host to │  │
│  │ keep prompts on your infrastructure. Or disable AI       │  │
│  │ entirely—Deckyard works great without it.                │  │
│  │                                                           │  │
│  │ Callout box                                               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.ai.title` | "AI that actually works—on your terms" |
| `home.ai.lead` | "Generate entire presentations from a prompt. Convert documents into structured decks. Translate slides into any language. Deckyard's AI works reliably because the slide system was designed for it." |
| `home.ai.capabilities.generate` | "Generate from prompt" |
| `home.ai.capabilities.convert` | "Convert documents" |
| `home.ai.capabilities.translate` | "Translate slides" |
| `home.ai.byoKeys.title` | "Bring your own keys" |
| `home.ai.byoKeys.description` | "Connect OpenAI, Anthropic, Mistral, DeepSeek, or run local models. Pay your provider directly at their rates—no credits, no markup, no limits." |
| `home.ai.reliable.title` | "Structured slides = reliable output" |
| `home.ai.reliable.description` | "AI tools struggle with freeform canvases. Deckyard's opinionated slide types give AI clear targets. The result: consistent, usable decks—not random layouts." |
| `home.ai.control.title` | "You're in control" |
| `home.ai.control.description` | "Choose your provider. Self-host to keep prompts on your infrastructure. Or disable AI entirely—Deckyard works great without it." |

### Components Used
- `Section` (alt background, default container)
- `CenteredBlock` (headline + lead)
- `BadgeRow` (capability strip, 3 items with icons)
- `SplitLayout` (tour-item, visual left)
- `Callout` (control reassurance)

### Implementation Notes
- Capability strip reduced from 4 to 3 items (removed "Analyze")
- Screenshot shows AI slide wizard interface
- H3 headings in tour-copy have icons (lock, shield-check)
- Callout at bottom provides the 35% "control/reassurance" message
- Balance is 65% "what AI can do" / 35% "you're in control"

---

## Section 6: Sovereignty

### Purpose
Present the infrastructure choice: EU cloud vs self-hosted. Reinforce the sovereignty positioning. Dark background for emphasis and visual break.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: sovereignty                                           │
│  Container: wide (1200px)                                       │
│  Background: dark                                               │
│  Padding: standard                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │ [H2] Your infrastructure, or ours   │               │
│           │                                     │  ← centered   │
│           │ [Lead] Self-host on your own        │    light text │
│           │ servers for complete control...     │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│  ┌──────────────────────────┐  ┌──────────────────────────┐     │
│  │ 🌐 EU Managed Cloud      │  │ 🗄️ Self-hosted          │     │
│  │ ═══════════════════════  │  │                          │     │
│  │ (highlighted)            │  │ • Run on your servers    │     │
│  │                          │  │ • Full control           │     │
│  │ • Hosted on Scaleway,    │  │ • Docker Compose         │     │
│  │   France                 │  │ • Always free, MIT       │     │
│  │ • We handle updates,     │  │                          │     │
│  │   backups, scaling       │  │ ┌──────────────────────┐ │     │
│  │ • Free tier available    │  │ │ docker compose up -d │ │     │
│  │ • GDPR compliant         │  │ └──────────────────────┘ │     │
│  │                          │  │                          │     │
│  │ [View pricing]           │  │ [Self-hosting guide]     │     │
│  └──────────────────────────┘  └──────────────────────────┘     │
│                                                                 │
│  TwoPath layout                                                 │
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │ 📍 Netherlands company. French      │               │
│           │ infrastructure. No US in the data   │  ← trust line │
│           │ chain.                              │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.sovereignty.title` | "Your infrastructure, or ours" |
| `home.sovereignty.lead` | "Self-host on your own servers for complete control, or use our EU cloud managed on French infrastructure. Either way—your data, your rules." |
| `home.sovereignty.cloud.title` | "EU Managed Cloud" |
| `home.sovereignty.cloud.hosted` | "Hosted on Scaleway, France" |
| `home.sovereignty.cloud.managed` | "We handle updates, backups, scaling" |
| `home.sovereignty.cloud.free` | "Free tier available" |
| `home.sovereignty.cloud.gdpr` | "GDPR compliant by design" |
| `home.sovereignty.cloud.cta` | "View pricing" |
| `home.sovereignty.selfHost.title` | "Self-hosted" |
| `home.sovereignty.selfHost.servers` | "Run on your own servers" |
| `home.sovereignty.selfHost.control` | "Full control over data and infrastructure" |
| `home.sovereignty.selfHost.docker` | "Docker Compose in minutes" |
| `home.sovereignty.selfHost.free` | "Always free, MIT licensed" |
| `home.sovereignty.selfHost.command` | "docker compose up -d" |
| `home.sovereignty.selfHost.cta` | "Self-hosting guide" |
| `home.sovereignty.trust` | "Netherlands company. French infrastructure. No US in the data chain." |

### Components Used
- `Section` (dark background, wide container)
- `CenteredBlock` (headline + lead, light text)
- `TwoPath` (deploy-options, left highlighted)
- `Card` (deploy-card variant)
- `CodeBlock` (inline, for docker command)
- `TrustLine` (with map pin icon)

### Implementation Notes
- Dark section provides visual break and emphasis
- Cloud option is highlighted (deploy-card-highlight class)
- Docker command shown inline, not full code block
- Trust line at bottom with map pin SVG icon
- Bullet lists in cards, not paragraphs

---

## Section 7: Open Platform

### Purpose
Establish credibility with developers. Show that this is genuinely open source, has a real API, supports MCP, uses open formats. GitHub CTA prominent.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: open-platform                                         │
│  Container: wide (1200px)                                       │
│  Background: default                                            │
│  Padding: standard                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │ [H2] Open source and built to       │               │
│           │ extend                              │  ← centered   │
│           │                                     │               │
│           │ [Lead] MIT licensed. Every line on  │               │
│           │ GitHub. Full API. MCP-ready...      │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │ 🛡️ Fully    │ │ 💻 Full     │ │ ✨ MCP-     │ │ 📄 Open     ││
│  │ open source │ │ REST API    │ │ ready       │ │ formats     ││
│  │             │ │             │ │             │ │             ││
│  │ Every line  │ │ Programmatic│ │ Let AI tools│ │ Markdown in,││
│  │ of code on  │ │ access to   │ │ interact... │ │ JSON storage││
│  │ GitHub...   │ │ everything..│ │             │ │ ...         ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
│                                                                 │
│  CardGrid (4 columns)                                           │
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │ // Create a presentation via API    │               │
│           │ const deck = await deckyard...      │  ← code block │
│           │   title: "Q4 Report",               │    narrow     │
│           │   ...                               │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│           ┌───────────────────────────────────────┐             │
│           │  [View on GitHub]  [API docs]         │             │
│           └───────────────────────────────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.openPlatform.title` | "Open source and built to extend" |
| `home.openPlatform.lead` | "MIT licensed. Every line on GitHub. Full API. MCP-ready. Your presentations live in open formats, accessible through code." |
| `home.openPlatform.opensource.title` | "Fully open source" |
| `home.openPlatform.opensource.description` | "Every line of code on GitHub. MIT licensed—fork it, extend it, audit it. No hidden modules, no source-available tricks." |
| `home.openPlatform.api.title` | "Full REST API" |
| `home.openPlatform.api.description` | "Programmatic access to everything. Automate workflows, build integrations, connect your tools." |
| `home.openPlatform.mcp.title` | "MCP-ready" |
| `home.openPlatform.mcp.description` | "Let AI tools interact with your presentations via Model Context Protocol. Your decks become part of your AI workflow." |
| `home.openPlatform.formats.title` | "Open formats" |
| `home.openPlatform.formats.description` | "Markdown in, JSON storage, PDF and PowerPoint out. No proprietary formats. Your content stays portable." |
| `home.openPlatform.viewOnGithub` | "View on GitHub" |
| `home.openPlatform.apiDocs` | "API docs" |

### API Snippet (hardcoded in Astro)
```javascript
// Create a presentation via API
const deck = await deckyard.presentations.create({
  title: "Q4 Report",
  template: "corporate",
  slides: [{ type: "kpi", data: metrics }]
});
```

### Components Used
- `Section` (default background, wide container)
- `CenteredBlock` (headline + lead)
- `CardGrid` (4 columns)
- `Card` (default variant with icons)
- `CodeBlock` (narrow, with syntax highlighting)
- `CTARow` (centered, primary + secondary buttons)

### Implementation Notes
- Code snippet uses manual syntax highlighting spans (code-comment, code-keyword, code-fn, code-string)
- API snippet wrapper has header with "JavaScript" label
- GitHub button is primary; API docs is secondary
- Cards use icons: shield-check, code, sparkle, file-text

---

## Section 8: Social Proof

### Purpose
Build trust through founder credibility. Early-stage: founder story. Later: add logos, testimonials, GitHub stats.

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: proof                                                 │
│  Container: narrow (800px)                                      │
│  Background: alt                                                │
│  Padding: compact                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │                                     │               │
│           │ [Origin story]                      │               │
│           │ Built for real use at the founder's │               │
│           │ organization. Now open source and   │  ← centered   │
│           │ available to everyone.              │               │
│           │                                     │               │
│           │ [Founder name]                      │               │
│           │ Built by Jaap Stronks               │               │
│           │ Solo founder, Rotterdam,            │               │
│           │ Netherlands                         │               │
│           │                                     │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│           ┌───────────────────────────────────────┐             │
│           │  [🛡️ MIT licensed]  [📍 Made in EU]  │             │
│           └───────────────────────────────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.proof.origin` | "Built for real use at the founder's organization. Now open source and available to everyone." |
| `home.proof.builtBy` | "Built by" |
| `home.proof.founderName` | "Jaap Stronks" |
| `home.proof.founderRole` | "Solo founder, Rotterdam, Netherlands" |
| `home.proof.mitLicense` | "MIT licensed" |
| `home.proof.madeIn` | "Made in Europe" |

### Components Used
- `Section` (alt background, narrow container, compact padding)
- `CenteredBlock` (founder-block)
- `BadgeRow` (founder-badges)

### Implementation Notes
- This section is minimal by design—no customers yet
- Consider adding founder photo for trust
- Consider adding more specific origin ("Built for daily use at a European communications agency")
- Consider adding credibility point ("15 years in web development")
- Future: Add GitHub stars count, early adopter quotes

---

## Section 9: Final CTA

### Purpose
Convert interest into action. Three clear paths: sandbox (primary), GitHub (secondary), self-hosting (tertiary).

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Section: cta                                                   │
│  Container: narrow (900px)                                      │
│  Background: cta (brand color or gradient)                      │
│  Padding: spacious                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           ┌─────────────────────────────────────┐               │
│           │                                     │               │
│           │ [H2] Ready to try it?               │               │
│           │                                     │  ← centered   │
│           │ [Lead] Start building presentations │               │
│           │ that are actually yours.            │               │
│           │                                     │               │
│           └─────────────────────────────────────┘               │
│                                                                 │
│           ┌───────────────────────────────────────┐             │
│           │                                       │             │
│           │  [Try the sandbox]  (primary, large)  │             │
│           │  [View on GitHub]   (secondary)       │             │
│           │  [Self-hosting guide] (secondary)     │             │
│           │                                       │             │
│           └───────────────────────────────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Copy (en.json keys)

| Key | Content |
|-----|---------|
| `home.cta.title` | "Ready to try it?" |
| `home.cta.lead` | "Start building presentations that are actually yours." |
| `home.cta.trySandbox` | "Try the sandbox" |
| `home.cta.viewOnGithub` | "View on GitHub" |
| `home.cta.selfHost` | "Self-hosting guide" |

### Components Used
- `Section` (cta variant, narrow container, spacious padding)
- `CenteredBlock` (headline + lead)
- `CTARow` (centered, 3 buttons)
- `Button` (primary large + secondary + secondary)

### Implementation Notes
- "Actually yours" callbacks to hero headline
- Sandbox is primary action (btn-primary btn-lg)
- GitHub and self-hosting are secondary options
- Consider: should all three be large? Or sandbox large, others regular?

---

## Component Summary

| Component | Used In Sections |
|-----------|------------------|
| `Section` | All |
| `CenteredBlock` | Problem, Showcase, AI, Sovereignty, Open Platform, Proof, CTA |
| `SplitLayout` | Hero, Problem, Interactions, AI |
| `CardGrid` | Problem (3-col), Open Platform (4-col) |
| `ThumbnailGrid` | Showcase |
| `TwoPath` | Sovereignty |
| `Card` | Problem, Open Platform |
| `MediaBlock` | Hero, Problem, Interactions, AI |
| `CodeBlock` | Sovereignty (inline), Open Platform |
| `BadgeRow` | Hero (trust), AI (capabilities), Proof |
| `ChipRow` | Interactions |
| `Callout` | AI |
| `CTARow` | Hero, Open Platform, CTA |
| `Button` | Multiple |

---

## Visual Rhythm Summary

| Section | Container | Background | Padding |
|---------|-----------|------------|---------|
| Hero | wide | default | spacious |
| Problem | wide (mixed) | default | standard |
| Showcase | wide | alt | standard |
| Interactions | default | default | standard |
| AI | default | alt | standard |
| Sovereignty | wide | **dark** | standard |
| Open Platform | wide | default | standard |
| Proof | narrow | alt | compact |
| CTA | narrow | cta | spacious |

Pattern: alternating default/alt backgrounds, dark section for emphasis, narrow bookends (proof + CTA).

---

*End of homepage component brief.*
