# Deckyard Website — Marketing Review & Launch Recommendations

**Reviewer context:** SaaS marketing specialist review, pre-launch stage.
**Date:** January 2026

---

## Executive Summary

The site is well-built technically (excellent SEO, i18n, structured data, accessibility) and has strong messaging around data sovereignty and GDPR compliance. However, **the site is positioned for enterprise/public-sector buyers while the launch audience is developers and OSS enthusiasts**. This is the single biggest strategic gap.

The site reads like it was written to win a procurement process, not to excite a developer into starring a repo or spinning up a Docker container on a Saturday afternoon. Both audiences matter, but the sequence matters more: devs first, orgs later.

Below are recommendations ordered by impact.

---

## 1. STRATEGIC POSITIONING — The Big Shift

### Problem
The current homepage hero says: *"The presentation platform that respects your data"*

This is a compliance message. It speaks to a CISO or a procurement officer. A developer reading this thinks "okay, GDPR tool" and moves on. The eyebrow text reinforces this: *"EU-hosted · GDPR-native · Self-hostable · Open Source"* — three of four bullets are about data residency.

### Recommendation
**Lead with what makes the product exciting, not what makes it compliant.** Compliance is a supporting reason, not the hook.

For a dev/OSS audience, the hook should combine:
- **What it does** (presentations with live interaction, 44 slide types, audience engagement)
- **Why it's different** (open source, self-hostable, extensible via API + MCP)
- **Why now** (AI-native with BYO keys, no vendor lock-in)

**Suggested hero reframe:**

> **Open-source presentations with live audience interaction**
>
> 44 slide types. Built-in polls, Q&A, and feedback. AI generation with your own API keys. Self-host it, extend it via API and MCP, or use our EU-managed cloud.
>
> [Try the sandbox] [View on GitHub]

The GDPR/EU angle becomes a trust badge row *below* the hero (which you already have), not the headline.

### Messaging hierarchy should be:
1. **What it is** — Open-source presentation platform with live interaction
2. **What makes it interesting** — API, MCP, AI with BYO keys, extensible
3. **Why trust it** — EU-hosted, GDPR, self-hostable, MIT licensed
4. **Who it's for** — Teams, educators, orgs (later messaging)

Currently the order is roughly 3 → 1 → 2 → 4.

---

## 2. MISSING: THE DEVELOPER STORY

### Problem
The site has zero content aimed at developers as users/contributors. No mention of:
- The API (the `docs/developer/` section exists but isn't surfaced in marketing)
- MCP integration (not mentioned anywhere on the marketing site)
- How to extend or build on top of Deckyard
- The tech stack (what it's built with)
- Contributing guide or developer experience
- Self-hosting beyond "run Docker"

The `/self-hosting` page is mentioned but doesn't appear to have its own dedicated Astro page yet (only docs content). For devs, this is a primary landing page.

### Recommendations

**a) Add a "Developers" section or page (`/developers`)**
Content should cover:
- Tech stack (what Deckyard is built with)
- REST API overview + link to docs
- MCP server — what it enables, how AI tools can interact with Deckyard
- Self-hosting quick start (Docker one-liner, then link to full docs)
- Extending Deckyard (themes, slide types, integrations)
- Contributing (link to GitHub, mention good-first-issues)
- Architecture overview (what makes it interesting technically)

**b) Surface API/MCP in the homepage**
Add a section between the AI section and the "Your infrastructure, your rules" section:

> **Built to be extended**
>
> Full REST API. MCP server for AI tool integration. Custom themes. Self-host on your own infrastructure and make it yours.
>
> [API docs] [MCP integration] [GitHub]

**c) Add MCP to the feature pages**
MCP (Model Context Protocol) is a significant differentiator for AI-enthusiast developers. If Deckyard has an MCP server, this should be prominently featured — it means Claude, Cursor, Windsurf, and other AI tools can interact with presentations programmatically. This is a genuinely novel capability for a presentation tool.

---

## 3. HERO & PRIMARY CTA

### Problem
The current hero has two CTAs: "Try sandbox" and "Self-host free". The sandbox link goes to `sandbox.deckyard.eu` (external). This is correct for the launch audience, but the hero lacks visual proof of what the product looks like.

The `stage` component exists in the hero (browser chrome frame) but currently shows placeholder content.

### Recommendations

**a) Hero visual is critical — prioritize real screenshots or a short demo**
The hero image/video is the single highest-impact visual asset on the site. Before launch:
- A real screenshot of the editor with an interesting presentation open (not a blank state)
- OR a 15-30 second silent autoplay video/GIF showing: create slide → add poll → see audience response
- The browser chrome frame you built is a nice touch — fill it with real content

**b) Reorder CTAs for the dev audience**
Current: `[Try sandbox]` `[Self-host free]`
Suggested: `[Try the sandbox]` `[View on GitHub]`

"Self-host free" is an action that requires setup — it's not an impulse click. "View on GitHub" is — devs click it to evaluate. The self-hosting guide should be linked prominently but isn't a hero-level CTA for the awareness stage.

**c) Add a GitHub stars badge or counter near the CTA**
Social proof for OSS projects. Even at 0 stars, showing the GitHub badge signals "this is a real open source project, go look."

---

## 4. PRICING PAGE — Needs Rework

### Problems
1. **Placeholder prices** (€19/€49) need real numbers before launch
2. **Flat team pricing doesn't work** (you acknowledged this)
3. **Self-hosted is "highlighted"** but for the managed cloud revenue model, you need Pro/Team to be compelling too
4. **"Contact us" as CTA for Pro/Team** is high friction — fine at launch if you're doing manual onboarding, but should eventually have self-serve signup
5. **Comparison table vs Mentimeter/Slides.com** shows specific competitor prices — verify these are current and accurate, or they'll undermine credibility

### Recommendations

**a) Pricing model suggestion:**

| Tier | Price | Target | Key Limit |
|------|-------|--------|-----------|
| **Self-hosted** | Free forever | Devs, OSS users | Unlimited everything |
| **Starter** | €9-12/month | Freelancers, individuals | 1 user, X GB storage, managed hosting |
| **Pro** | €29-39/month | Small teams | Up to 10 users, more storage, custom domain |
| **Team** | €8-12/user/month | Larger orgs | Unlimited users, SSO, audit log, priority support |

This gives you:
- A low entry point that undercuts Slides.com ($5-11/user/month depending on plan)
- Per-seat pricing at the Team tier (which orgs expect and can expense)
- No free hosted tier (as you want)
- Clear upgrade path

**b) For launch, simplify to two tiers:**
- **Self-hosted**: Free (the star of the show)
- **Managed Cloud**: "Coming soon — join waitlist" or a simple "from €X/month" with a contact CTA

Don't launch with complex pricing if the cloud isn't the primary conversion target yet. Overcomplicating pricing before you have pricing feedback from real users is a common pre-launch mistake.

**c) Remove or soften competitor price comparisons until you have final pricing**
Showing "Mentimeter costs €240-500/month for 20 people" next to placeholder Deckyard prices looks unfinished.

---

## 5. COMPARISON PAGES — Strong but Premature

### Assessment
You have 6 detailed comparison pages (vs Mentimeter, Slides.com, Google Slides, PowerPoint, Slido, Claper). These are well-written — honest about trade-offs, which builds credibility.

### Problem
For a pre-launch product with no user base, aggressive comparison pages against established products can backfire:
- No social proof to back up claims
- If someone searches "Deckyard vs Mentimeter" and finds your page, they'll wonder why they've never heard of Deckyard
- The "when [competitor] might be better" sections are good but the tone still assumes Deckyard is a proven alternative

### Recommendations

**a) Keep the pages but deprioritize them in navigation**
They're good SEO content for later. But the main nav shouldn't feature "Compare" prominently at launch. Move it to the footer only.

**b) Add qualifiers**
Be transparent about launch status. "Deckyard is a new open-source alternative to [competitor]" reads better than implying you're an established player.

**c) Focus comparison energy on Claper first**
Claper is the closest competitor (also open source, also interactive presentations). This is the comparison your dev audience will actually make. The Mentimeter/Slides.com comparisons matter more for the org-buyer phase later.

---

## 6. USE CASE PAGES — Right Content, Wrong Timing

### Assessment
Education, Government, Nonprofits, Remote Teams, Training — these are enterprise/org vertical pages.

### Recommendation
**Don't delete them, but don't feature them in navigation at launch.** Keep them as SEO landing pages. When an education institution searches for "GDPR-compliant presentation tool for schools," you want to rank. But they shouldn't be in the primary site navigation during the dev-audience phase.

At launch, replace the use-case nav links with:
- **Developers** (API, MCP, self-hosting, contributing)
- **Features** (what it does)
- **Docs** (how to use/deploy it)
- **GitHub** (direct link)

---

## 7. HOMEPAGE SECTION ORDER — Restructure for Dev Audience

### Current order:
1. Hero (privacy/compliance message)
2. Feature cards (slide types)
3. Audience interaction
4. AI generation
5. Self-hosting / deployment
6. Open source values
7. Final CTA

### Recommended order for launch:
1. **Hero** — What it is + sandbox CTA + GitHub CTA
2. **Quick demo/visual proof** — Screenshot or video showing the product
3. **Key capabilities** — 44 slide types, live interaction, AI generation (3-card overview)
4. **Built for developers** — API, MCP, self-hosting, extensibility (NEW)
5. **AI with your own keys** — BYO API keys, no credits (resonates with AI-enthusiast devs)
6. **Open source values** — MIT license, transparency, community
7. **EU-hosted & self-hostable** — Trust/compliance section (supporting, not leading)
8. **Final CTA** — Try sandbox + View on GitHub

---

## 8. CONTENT GAPS

### Missing pages/content that matter for launch:

| Content | Priority | Why |
|---------|----------|-----|
| **Developer page** (`/developers`) | HIGH | Primary audience needs a landing page |
| **Changelog / releases** | HIGH | Shows momentum and active development |
| **Real product screenshots** | HIGH | Placeholders undermine credibility fatally |
| **GitHub README alignment** | HIGH | README should drive traffic to site and vice versa |
| **Blog post: "Why we built Deckyard"** | MEDIUM | Origin story for Hacker News/Reddit launch |
| **Blog post: "Self-hosting Deckyard in 5 minutes"** | MEDIUM | Practical dev content |
| **Blog post: "Using MCP with Deckyard"** | MEDIUM | AI audience bait |
| **Case studies** | LOW (for now) | No customers yet; placeholder page is fine |
| **Testimonials** | LOW (for now) | Get real ones post-launch, don't fabricate |
| **Newsletter/email capture** | MEDIUM | You need a way to notify interested people |

### Content to write before launch:
1. A founding story / "why" blog post (for HN/Reddit/Product Hunt launch)
2. A technical "how it works" post (for dev credibility)
3. An MCP integration post (for AI community interest)

---

## 9. LAUNCH CHANNELS — Where Dev/OSS Audiences Hang Out

This is outside the website itself, but the site needs to be optimized for these launch vectors:

| Channel | What to optimize for |
|---------|---------------------|
| **Hacker News** | Homepage must pass the "30-second scroll" test. Devs will open the site, scroll quickly, decide if it's interesting. Lead with what it IS, not compliance. |
| **Reddit** (r/selfhosted, r/opensource, r/webdev) | Self-hosting story + Docker setup simplicity. These communities love "I built X" posts. |
| **Product Hunt** | Visual demo, clear value prop, comparison to known tools |
| **GitHub** | README → website funnel. Stars as social proof. Good first issues for contributors. |
| **Dev Twitter/Mastodon** | Short-form "look what this can do" demos. MCP angle for AI community. |
| **AI tool communities** | MCP integration is genuinely novel for a presentation tool. Pitch it to Claude/Cursor communities. |

**The website needs to convert a Hacker News click in 10 seconds.** Current site takes ~30 seconds of reading compliance copy before you understand what the product actually does.

---

## 10. DESIGN & UX NOTES

### What's working well:
- Clean, professional visual identity (forest green + brass is distinctive)
- Excellent responsive design
- Good accessibility (ARIA, keyboard nav)
- Nice component library (pricing cards, feature grids, browser chrome frame)
- Structured SEO (JSON-LD, hreflang, sitemap)
- 12-language i18n infrastructure

### What needs attention:

**a) No product visuals anywhere**
Screenshots are placeholders. This is the #1 blocker for launch credibility. A presentation tool MUST show what presentations look like. Without visuals, the site is just text claims.

**Before launch, you need at minimum:**
- Hero: real editor screenshot or short video
- Features page: real screenshots of slide types, polls, AI generation
- At least 3-4 screenshots showing different capabilities

**b) No video/demo anywhere**
The `/public/videos/` directory is empty. Even a 30-second screen recording would dramatically increase engagement. For a visual product like presentations, showing beats telling.

**c) The sandbox CTA goes to an external domain**
`sandbox.deckyard.eu` — make sure this loads fast, works without signup, and has a good first-run experience. This is your #1 conversion mechanism. If the sandbox is slow, broken, or empty-feeling, nothing else on the site matters.

**d) Language picker in primary nav**
12 languages is impressive infrastructure, but with English-only docs and a dev-first audience, the language picker takes up valuable nav real estate at launch. Consider moving it to footer-only initially.

**e) Blog is "Coming Soon"**
Either have 1-2 posts ready at launch or remove the blog link from navigation. "Coming Soon" pages signal incompleteness.

---

## 11. NAVIGATION — Simplify for Launch

### Current nav:
Features | Pricing | EU & Privacy | Docs | [Language] | [Try sandbox]

### Recommended launch nav:
Features | Developers | Pricing | Docs | GitHub | [Try sandbox]

**Changes:**
- **Add "Developers"** — primary audience page
- **Add "GitHub"** — direct link, signals OSS identity
- **Remove "EU & Privacy"** from top nav — still accessible via footer and homepage section
- **Remove language picker** from top nav — move to footer
- **Remove "Compare" from mobile menu** — keep in footer only

---

## 12. SEO — Already Strong, Minor Additions

### What's done well:
- Canonical URLs with locale awareness
- Full hreflang implementation
- JSON-LD (Organization, WebSite, SoftwareApplication, BreadcrumbList)
- Proper meta tags + Open Graph + Twitter cards
- Sitemap with i18n support
- robots.txt

### Additions:
- **Add FAQ schema** to pricing page and EU-privacy page (you have FAQ sections but no FAQ structured data)
- **Add `datePublished` and `dateModified`** to marketing pages (currently only optional/article pages)
- **Create an OG image per page** — currently all pages share the same default image. At minimum, create distinct OG images for: homepage, pricing, features, each comparison page
- **GitHub repo link** should use `rel="me"` for verification

---

## 13. ANALYTICS — The Privacy Paradox

### Current state: No analytics at all.

### The problem:
You're building a privacy-first product, but you still need to know if your website works. Zero analytics means you can't measure:
- Which pages convert to sandbox visits
- Where visitors drop off
- Which launch channels drive traffic
- Whether pricing page visitors click "contact" or bounce

### Recommendation:
**Use Plausible or Umami** — both are privacy-friendly, no-cookie analytics that align with your values. Self-host Umami alongside Deckyard if you want full data control. This lets you say "we use privacy-respecting, cookie-free analytics" rather than "we have no idea if our site works."

Add this before launch. You need data from day one.

---

## 14. QUICK WINS — Do Before Launch

Ranked by impact and effort:

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Replace placeholder screenshots with real product visuals | Critical | Medium |
| 2 | Rewrite hero headline for dev audience | High | Low |
| 3 | Add GitHub link + badge to hero and nav | High | Low |
| 4 | Add developer/API/MCP page or section | High | Medium |
| 5 | Simplify nav for launch audience | High | Low |
| 6 | Write 1-2 launch blog posts | High | Medium |
| 7 | Add Plausible/Umami analytics | High | Low |
| 8 | Rework pricing (simplify for launch) | Medium | Low |
| 9 | Move comparison pages out of main nav | Medium | Low |
| 10 | Record a short product demo video | Medium | Medium |
| 11 | Add FAQ schema to pricing/EU pages | Low | Low |
| 12 | Create per-page OG images | Low | Medium |

---

## 15. POST-LAUNCH ROADMAP (Website)

Once you have real users and community traction:

1. **Add testimonials/quotes** from real self-hosters and community members
2. **Feature comparison pages more prominently** once you have credibility
3. **Activate use-case pages** in navigation when targeting org buyers
4. **Build out blog** with technical content, migration guides, case studies
5. **Add email capture** (changelog newsletter, launch updates)
6. **A/B test pricing** once managed cloud is actively sold
7. **Add community showcase** — presentations made with Deckyard

---

## Summary: The Core Shift

**Current site says:** "We're the GDPR-compliant, EU-hosted alternative to Mentimeter for organizations."

**Launch site should say:** "We're the open-source presentation platform developers can self-host, extend via API and MCP, and use with their own AI keys. Also happens to be EU-hosted and GDPR-native."

Same product. Same features. Different emphasis. Match the message to the audience you need first — developers and OSS enthusiasts — and the organizational buyers will follow once you have credibility and community.
