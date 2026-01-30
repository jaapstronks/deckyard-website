## Website (marketing + docs)

This folder contains the public website for the project:

- Marketing pages (Astro)
- Product + developer documentation (Starlight)

### Local dev

From repo root:

- `cd website`
- `npm install`
- `npm run dev`

Docs are sourced from the repo’s `docs/` folder and copied into `website/src/content/docs/` by:

- `npm run sync-docs`

### Build

- `npm run build`
- Output: `website/dist/`

# Deckyard Strategy Document

> **Open source presentations, made in Europe**

---

## Executive Summary

Deckyard is an open-source, EU-hosted presentation platform combining AI-powered slide generation with live audience interaction. It targets privacy-conscious organizations and individuals who want the power of tools like Slides.com and Mentimeter without vendor lock-in, credit systems, or US data residency concerns.

**Launch target**: 4 weeks
**Model**: Open core (MIT license)
**Positioning**: "Mentimeter + Beautiful.ai, open source, EU-hosted, no vendor lock-in"

---

## Brand Proposition

### Core Value Proposition

**"Your slides. Your AI. Your data."**

Deckyard gives you:

- Full presentation creation with 44 slide types
- AI-powered deck generation using your own API keys
- Live audience interaction (polls, Q&A) built in
- Self-hosting option or managed EU cloud
- No credits, no lock-in, no surveillance

### Brand Pillars

| Pillar          | Description                                        |
| --------------- | -------------------------------------------------- |
| **Sovereignty** | Own your data, your infrastructure, your AI costs  |
| **Openness**    | Open source, transparent, community-driven         |
| **European**    | EU-hosted, GDPR-native, privacy-first              |
| **Complete**    | Not just slides OR interactions — both, integrated |

### Tagline Options

- "Open source presentations, made in Europe"
- "Your slides. Your AI. Your data."
- "Presentations without vendor lock-in"
- "AI-powered slides, EU-hosted, open source"

### Brand Voice

- Professional but approachable
- Developer-friendly without being exclusionary
- Honest about limitations
- No corporate fluff or marketing speak

---

## Product Features

### Current Feature Set

#### Slide Editor (44 slide types)

- Data visualizations
- Progress visualizations
- Embeds (video, maps, forms, etc.)
- Zoom steps for images
- 5 types of slide transitions
- Speaker notes

#### AI Features

- Full deck generation from prompts
- Parallel chat sessions for section generation
- AI-assisted slide type transformation
- BYO API key (OpenAI, Anthropic, Mistral)
- No credit limits — pay your provider directly

#### Audience Interaction

- Live polls (multiple choice)
- Open Q&A
- Join via code/QR
- Results display in slides
- Real-time updates

#### Presentation & Analytics

- Fullscreen presentation view
- Presenter view with notes
- Analytics: view duration, % completion
- Open Graph image generation

#### Team & Collaboration

- Team management
- Fine-grained permissions
- Collaborative editing (different slides)
- Webhooks for event notifications
- Email templates for notifications

#### Infrastructure

- EU hosting ready
- Self-host via Docker
- 10 languages supported
- GDPR compliant

### Features Not Yet Implemented

| Feature                  | Priority | Effort | Timeline        |
| ------------------------ | -------- | ------ | --------------- |
| Syntax highlighting      | Low      | Low    | Post-launch     |
| Timer                    | Low      | Low    | Post-launch     |
| Generate speaker notes   | Low      | Low    | Post-launch     |
| Suggest images           | Low      | Low    | Post-launch     |
| Word cloud               | Medium   | Medium | v1.1            |
| Export responses         | Medium   | Low    | v1.1            |
| Same-slide collaboration | Low      | High   | v2+             |
| OAuth (GitHub, Google)   | Medium   | Medium | Launch or v1.1  |
| SSO/SAML                 | Low      | High   | Enterprise tier |
| Offline mode             | Low      | High   | v2+             |

---

## Competitive Analysis

### Market Landscape

The presentation software market splits into several categories:

1. **Traditional editors**: PowerPoint, Google Slides, Keynote
2. **Modern SaaS editors**: Slides.com, Canva, Beautiful.ai, Gamma
3. **Audience interaction**: Mentimeter, Slido, AhaSlides, Poll Everywhere
4. **Open source editors**: reveal.js, Slidev, LibreOffice Impress
5. **Open source interaction**: Claper, Particify

**No one combines all three: modern editor + AI + audience interaction + open source.**

### Direct Competitor Analysis

#### Slides.com

- **What they are**: Web-based presentation editor, commercial SaaS
- **Company**: Founded 2013 by Hakim El Hattab and Owen Bossola
- **Size**: 2-10 employees, <$5M revenue, 2M+ users
- **Pricing**: $5-28/month
- **Strengths**: Polish, reveal.js heritage, stable
- **Weaknesses**: No audience interaction, US-hosted, AI credits model, closed source

#### Mentimeter

- **What they are**: Audience engagement platform
- **Pricing**: €11.99+/month, enterprise pricing opaque
- **Strengths**: Market leader in interactions, brand recognition
- **Weaknesses**: Expensive, no self-hosting, limited slide creation, closed source

#### Claper (Open Source)

- **GitHub**: ~640 stars
- **What they do**: Upload PDF/PPT, add interactive elements (polls, Q&A)
- **Tech**: Elixir/Phoenix, AGPL-3.0
- **Strengths**: Open source, self-hostable, focused
- **Weaknesses**: No slide editor (upload only), no AI, small team

#### Presenton (Open Source)

- **GitHub**: ~1,500 stars
- **What they do**: AI-powered presentation generation, exports to PPTX/PDF
- **Tech**: Python, Apache 2.0
- **Strengths**: BYO API key, multiple providers, good docs
- **Weaknesses**: No audience interaction, export-focused (not live web), no editor

#### Particify/ARSnova (Open Source)

- **What they do**: Audience response system for education
- **Market**: German universities primarily
- **Strengths**: GDPR compliant, academic focus
- **Weaknesses**: No slide creation, dated UI, niche market

### Competitive Matrix

| Feature              | Deckyard    | Slides.com   | Mentimeter | Claper         | Presenton        |
| -------------------- | ----------- | ------------ | ---------- | -------------- | ---------------- |
| Slide editor         | ✅ 44 types | ✅ ~15 types | ❌ Limited | ❌ Upload only | ❌ Generate only |
| AI generation        | ✅ Parallel | ⚠️ Credits   | ❌         | ❌             | ✅               |
| BYO API key          | ✅          | ❌           | ❌         | N/A            | ✅               |
| Audience interaction | ✅          | ❌           | ✅         | ✅             | ❌               |
| Self-hostable        | ✅          | ❌           | ❌         | ✅             | ✅               |
| EU hosted            | ✅          | ❌           | ❌         | ❌             | ❌               |
| Open source          | ✅          | ❌           | ❌         | ✅             | ✅               |
| Team management      | ✅          | Basic        | Basic      | ❌             | ❌               |
| Analytics            | ✅          | Basic        | Basic      | Basic          | ❌               |
| Multi-language       | ✅ 10       | ❌           | Partial    | 6              | Limited          |

### Deckyard's Unique Position

**Nobody else combines:**

1. Full slide editor (not upload-only like Claper)
2. AI generation (not just interactions like Particify)
3. Live audience interaction (not export-only like Presenton)
4. EU hosting + sovereignty positioning
5. BYO API key (no credits)

**Claper** is interaction-only.
**Presenton** is generation-only.
**Deckyard is the complete package.**

---

## Target Audiences

### Primary: Privacy-Conscious Technical Users

- Developers who present at meetups/conferences
- DevRel professionals
- Technical trainers
- Startup founders with technical background

**Why they choose Deckyard:**

- Self-hosting appeals to them
- BYO API key makes sense
- Open source aligns with values
- EU/privacy positioning resonates

### Secondary: EU Organizations

- Universities (GDPR requirements)
- Government agencies
- Healthcare organizations
- European enterprises with data residency requirements

**Why they choose Deckyard:**

- GDPR compliance out of the box
- EU hosting / self-hosting options
- No US data transfer concerns
- Procurement-friendly open source

### Tertiary: Cost-Conscious Educators & Trainers

- Teachers who need Mentimeter-like features
- Corporate trainers
- Workshop facilitators

**Why they choose Deckyard:**

- Free tier more generous than competitors
- No per-seat pricing anxiety
- Self-host for institutions

---

## Pricing Strategy

### Open Core Model

#### Free / Open Source

- Unlimited presentations
- BYO API key for AI
- Self-host option
- Basic interactions (poll, Q&A)
- Community support
- Deckyard branding on shared presentations

#### Pro (€9-15/month)

- Managed EU hosting
- Custom domains
- Analytics (engagement, completion)
- All interaction types
- Priority support
- Remove branding

#### Team (€20-30/month base + per seat)

- Everything in Pro
- Team workspaces
- Admin controls
- Shared templates/assets
- Priority support

#### Enterprise (Custom)

- SSO/SAML
- On-premise support
- SLA
- Custom integrations
- Dedicated support

### Pricing Principles

1. **Free tier is genuinely useful** — not a teaser
2. **Self-hosting is always free** — no open core bait-and-switch
3. **Transparent pricing** — no "contact sales" for basic plans
4. **Fair to small teams** — no punitive per-seat for collaboration

---

## Go-to-Market Strategy

### Launch Timeline

| Week       | Focus                                 |
| ---------- | ------------------------------------- |
| **Week 1** | Marketing site + legal pages          |
| **Week 2** | Open source repo prep + Docker polish |
| **Week 3** | Soft launch (HN, Reddit, network)     |
| **Week 4** | Iterate based on feedback, fix bugs   |

### Launch Channels

#### Primary: Hacker News

- "Show HN" post is high-impact for technical audience
- Free, high-intent traffic
- Community feedback valuable for iteration

**Draft title:**

```
Show HN: Deckyard – Open source presentations with AI + live polls (EU-hosted, self-hostable)
```

#### Secondary: Reddit

- r/selfhosted (190k members) — self-hosting angle
- r/opensource — open source angle
- r/GDPR — privacy/compliance angle
- r/webdev — developer tool angle

#### Tertiary: Product Hunt

- Schedule for week after HN (don't split attention)
- Good for broader tech audience

#### Network

- Dutch/French tech communities
- European tech Twitter/Mastodon

### Content Strategy (Post-Launch)

| Content Type         | Frequency     | Purpose               |
| -------------------- | ------------- | --------------------- |
| Changelog/releases   | Every release | Show momentum         |
| Comparison posts     | Monthly       | SEO, positioning      |
| Use case guides      | Bi-weekly     | Help users succeed    |
| Technical deep-dives | Monthly       | Developer credibility |

**Comparison content ideas:**

- "Deckyard vs Mentimeter for GDPR compliance"
- "Self-hosting Deckyard: Complete guide"
- "Why we chose BYO API keys over credits"
- "Building presentations with AI: Deckyard approach"

---

## Technical Decisions

### License: MIT

**Why MIT over AGPL or restrictive licenses:**

- Maximum adoption, no license anxiety
- Enterprises don't need legal review
- Community contributes more freely
- "We're confident enough to be fully open"
- Code isn't the moat — execution, community, and trust are

**Risks accepted:**

- Someone could fork and compete
- Big tech could use without contributing back

**Mitigations:**

- Moving fast > protecting slow
- EU/sovereignty positioning can't be copied by US companies
- Support and managed hosting are the real product

### Hosting: EU-First

**Recommended providers:**

- Scaleway (France) — cost-effective, good reputation
- Scaleway (France) — EU sovereign cloud
- OVH (France) — large EU provider

**Self-hosting requirements:**

- Docker Compose for easy deployment
- Clear documentation
- Environment variable configuration
- No mandatory external dependencies

---

## Success Metrics

### Launch (Week 1-4)

| Metric             | Target |
| ------------------ | ------ |
| HN upvotes         | 100+   |
| GitHub stars       | 500+   |
| Sign-ups (managed) | 200+   |
| Self-host attempts | 50+    |

### Month 1-3

| Metric               | Target |
| -------------------- | ------ |
| GitHub stars         | 1,500+ |
| Monthly active users | 500+   |
| Paying customers     | 20+    |
| MRR                  | €500+  |

### Month 6-12

| Metric               | Target       |
| -------------------- | ------------ |
| GitHub stars         | 5,000+       |
| Monthly active users | 2,000+       |
| Paying customers     | 100+         |
| MRR                  | €2,000-5,000 |

---

## Risks & Mitigations

| Risk                             | Likelihood | Impact | Mitigation                               |
| -------------------------------- | ---------- | ------ | ---------------------------------------- |
| Scope creep delays launch        | Medium     | High   | Ruthless MVP scoping, launch ugly        |
| Competitor adds missing features | Low        | Medium | Move fast, build community               |
| Self-hosting support burden      | Medium     | Medium | Good docs, community forums              |
| Low conversion to paid           | Medium     | Medium | Focus on features that justify paid tier |
| Burnout (side project + day job) | High       | High   | Timebox work, set boundaries             |

---

## Pre-Launch Checklist

### Legal

- [ ] Privacy policy
- [ ] Terms of service
- [ ] Cookie notice (if applicable)
- [ ] LICENSE file (MIT)

### Marketing Site

- [ ] Hero section with value prop
- [ ] Features overview with screenshots
- [ ] Pricing section
- [ ] "Why Deckyard" (EU, open source, BYO key)
- [ ] Demo video or interactive demo
- [ ] Call-to-action (sign up / self-host)

### Open Source Repo

- [ ] Public repo created (github.com/deckyard/deckyard)
- [ ] README with install instructions
- [ ] env.example file
- [ ] Docker Compose configuration
- [ ] CONTRIBUTING.md
- [ ] LICENSE file

### Launch Assets

- [ ] Show HN post drafted
- [ ] r/selfhosted post drafted
- [ ] Demo presentation (dog-food own product)
- [ ] Screenshots for Product Hunt
- [ ] 2-minute demo video (screen recording)

### Community

- [ ] GitHub Discussions enabled
- [ ] Discord or Matrix server (optional for launch)

---

## Appendix: Show HN Draft

```
Title: Show HN: Deckyard – Open source presentations with AI + live polls (EU-hosted)

Body:
Hi HN,

I built Deckyard as an open-source alternative to Slides.com + Mentimeter.

Why I built it:
- Needed AI-powered slide generation without credit limits (BYO API key)
- Wanted live audience interaction (polls, Q&A) built into the presentation
- Required GDPR compliance and EU hosting for work projects
- Frustrated by vendor lock-in and US data residency

Features:
- 44 slide types including data visualizations
- AI deck generation (parallel processing, supports OpenAI/Anthropic/Mistral)
- Live polls and Q&A with real-time results
- Team management with fine-grained permissions
- Analytics (view duration, completion rate)
- Self-host via Docker or use managed EU cloud
- 10 languages supported

Stack: [your stack]
License: MIT

Live: https://deckyard.eu
Repo: https://github.com/deckyard/deckyard
Demo: https://deckyard.eu/demo

This is a solo side project — would love feedback, especially on:
- Self-hosting experience
- Missing features for your use case
- Pricing model thoughts
```

---

## Appendix: Competitor Links

- **Slides.com**: https://slides.com
- **Mentimeter**: https://mentimeter.com
- **Claper**: https://claper.co / https://github.com/ClaperCo/Claper
- **Presenton**: https://presenton.ai / https://github.com/presenton/presenton
- **Particify**: https://particify.de / https://github.com/particify/arsnova
- **reveal.js**: https://revealjs.com / https://github.com/hakimel/reveal.js
- **Slidev**: https://sli.dev / https://github.com/slidevjs/slidev

---

_Document created: January 2026_
_Last updated: January 2026_
