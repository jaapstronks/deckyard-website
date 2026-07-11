# Deckyard Front Page: UI/UX Design Recommendations

*Based on: POSITIONING-WORKSHOP-NOTES.md*
*Prepared by: UI/UX Design Consultation*
*Date: January 2026*

---

## Design Philosophy

The positioning is clear: **sovereignty first, product depth second**. The page needs to feel European, technical-but-approachable, and confident. Not startup-flashy. Not enterprise-stuffy. Think: a well-crafted developer tool that happens to also look good.

**Visual tone:** Clean, structured (mirroring the product philosophy), with enough warmth to avoid feeling clinical. The irony would be a chaotic landing page for a product about structured presentations.

---

## Section-by-Section UI Recommendations

### 1. Hero Section

**Goal:** Hook with sovereignty + ownership. Immediate clarity on what this is.

**Recommended elements:**

- **Large headline** — "A presentation platform that's actually yours" needs breathing room. Full viewport width, generous whitespace.

- **Subhead as a short paragraph** — Not bullet points. The current draft reads well as flowing text.

- **Two CTAs side by side** — Primary button (filled): "Try the sandbox" / Secondary button (outlined or ghost): "View on GitHub". Equal visual weight signals both paths are valid.

- **Trust badges row** — Four small pill-shaped badges below CTAs:
  - 🇫🇷 Hosted in France
  - MIT licensed
  - Self-hostable
  - GDPR-native

  These should feel like metadata, not marketing. Small, muted, factual.

- **Hero visual** — This is the critical decision. Options:
  1. **Static product screenshot** — Shows the editor with a polished deck. Safe, clear, boring.
  2. **Animated product preview** — A subtle loop showing slides being edited or a deck being presented. More engaging, but risks distraction.
  3. **Abstract geometric/structured visual** — Plays into "structured slides" metaphor. Distinctive, but doesn't show the product.
  4. **Recommended: Browser mockup with real product** — A laptop or browser frame showing the actual editor. Grounded, professional, shows this is real software.

- **No auto-playing video.** Developers hate that.

---

### 2. Vision Section: "Built for how we work now"

**Goal:** Explain the architecture philosophy without being dry.

**Recommended elements:**

- **Section intro** — Headline + 2-3 sentence lead paragraph. Left-aligned, not centered. Feels more editorial.

- **Three-column feature grid** — Each pillar gets a card:

  | Card | Icon style | Content |
  |------|-----------|---------|
  | Structured slides | Grid/blocks icon | The "not blank canvas" message |
  | AI that understands | Brain/sparkle icon | Constraints enable automation |
  | Open formats | Arrows/exchange icon | Markdown in, everything out |

  Cards should have subtle borders or backgrounds, not floating in space. Each gets a short headline + 2 sentences max.

- **Optional: mini-illustration per card** — Not stock icons. Custom line illustrations that feel consistent. Budget permitting.

---

### 3. Product Showcase: "Everything you need, nothing you don't"

**Goal:** Visual proof. Show the 44 slide types, the editor experience.

**Recommended elements:**

- **Slide type gallery** — This is the money shot. Show a grid or horizontal scroll of actual slide type thumbnails. Users should think "oh, there really are a lot of these" without reading a number.

  Two approaches:
  1. **Static grid** — 12-16 slide thumbnails in a responsive grid. Hover reveals the type name.
  2. **Interactive carousel** — Horizontal scroll with category filters (Data, Narrative, Interactive, etc.). More engaging, more dev effort.

- **Editor screenshot** — A large, high-quality screenshot of the editor in action. Possibly with callout annotations pointing to key UI elements. This builds trust—it's real software, not vapor.

- **Category breakdown** — Small text or subtle tabs: "Charts & Data" / "Comparisons" / "Narratives" / "Interactions" — lets people scan for their use case.

- **Avoid: feature bullet lists.** Show, don't list.

---

### 4. Interactions Section

**Goal:** Position as Mentimeter alternative. Show that audience engagement is built in.

**Recommended elements:**

- **Split layout** — Left side: headline + description. Right side: visual of interaction features.

- **Mockup of live interaction** — Show a poll or Q&A slide with simulated audience responses. Could be animated (votes ticking up) for delight, but static works too.

- **Feature pills** — Small horizontal list under the visual: Polls • Q&A • Feedback • Word clouds • Quizzes. Quick scannable proof of capability.

- **No comparison chart to Mentimeter** — The positioning notes say "implied, not explicit." Let the feature set speak.

---

### 5. AI Section

**Goal:** 65% enthusiasm, 35% control/reassurance. Appeal to both AI-curious and AI-skeptical.

**Recommended elements:**

- **Asymmetric layout** — Don't make this section look like every other AI feature page. Avoid: gradient backgrounds, sparkle animations, "magic" language.

- **Capability strip** — A horizontal row of what AI can do:
  - Generate from prompt
  - Convert documents
  - Translate slides
  - Auto-summarize

  Each as a small card or icon+label.

- **"Bring your own keys" emphasis** — This is the differentiator. Consider a mini-diagram or logo row: OpenAI / Anthropic / Mistral / DeepSeek / Local. Shows provider flexibility visually.

- **Control messaging** — A small callout box or highlighted text: "Choose your provider. Self-host to keep prompts on your infrastructure. Or disable AI entirely." This calms the skeptics.

- **Visual suggestion:** A settings panel mockup showing the AI configuration options. Makes the "on your terms" tangible.

---

### 6. Sovereignty Section: "Your infrastructure, or ours"

**Goal:** Make the EU hosting + self-host choice clear and credible.

**Recommended elements:**

- **Two-path layout** — Visually show two options side by side:

  | EU Cloud | Self-hosted |
  |----------|-------------|
  | Scaleway France | Your servers |
  | Managed for you | Full control |
  | Free tier available | Docker in 3 steps |

  Not a comparison table with checkmarks—more like two cards of equal weight.

- **Map or location indicator** — A subtle EU map or France pin. Makes the geography tangible. Avoid: cliché flag imagery.

- **Self-hosting quick start** — A code snippet preview: `docker run deckyard/deckyard`. Shows it's real, builds developer trust.

- **Trust reinforcement** — Small text: "Netherlands company. French infrastructure. No US in the data chain."

---

### 7. Open Platform Section

**Goal:** Developer credibility. This is real open source.

**Recommended elements:**

- **GitHub integration** — Live or near-live star count. Link directly to repo. This is social proof for developers.

- **Technical capability cards:**
  - Full API
  - MIT license
  - MCP-ready (explain briefly or link)
  - Open formats

- **Code snippet** — Show a real API call or MCP integration example. 3-4 lines of code. Developers trust what they can read.

- **License badge** — MIT license should be visible, possibly as a badge graphic.

---

### 8. Social Proof Section

**Goal:** Build credibility without customer logos (yet).

**Recommended elements for launch:**

- **GitHub stars** — If they're growing, show the count dynamically.

- **"Built by" founder intro** — Small photo, name, one-line bio. Humanizes the product. "Built by [Name], who previously [credibility point]."

- **Origin story hint** — "Developed for [founder's company]. Now available to everyone." Shows it's battle-tested internally.

- **Placeholder architecture** — Design the section to accommodate logos and quotes later. Use subtle "Coming soon" or just leave the space minimal for now.

**Future state:** Logo row of organizations using it. Quote carousel. Usage stats.

---

### 9. Final CTA Section

**Goal:** Close the page with clear action paths.

**Recommended elements:**

- **Bold headline** — "Ready to try it?" or "Start building presentations that are actually yours."

- **Three-button layout:**
  1. **Primary (largest):** Try the sandbox
  2. **Secondary:** View on GitHub
  3. **Tertiary:** Self-host guide

- **No email capture form.** Developers bounce from those. Let the sandbox be the conversion.

- **Minimal footer below** — Links to docs, GitHub, legal, contact. Keep it clean.

---

## Global UI Considerations

### Navigation

- **Sticky header** — Logo + main nav + single CTA button ("Try sandbox")
- **Nav items:** Product / Pricing / Docs / GitHub (external link icon)
- Keep it minimal. No mega-menus.

### Typography

- **Headlines:** Strong, modern sans-serif. Not playful, not corporate. Think: Inter, Geist, or similar.
- **Body:** Highly readable, generous line height. The positioning text is good—it needs room to breathe.
- **Code snippets:** Monospace, obviously. Consider a syntax-highlighted style.

### Color

- **Recommendation:** Lean European. Not US startup primary colors. Consider:
  - Deep navy or forest green as primary
  - Clean white/light grey backgrounds
  - Accent color that's distinctive but not garish
- **Avoid:** Gradient overload, neon accents, "techy" cyan/purple schemes that every AI startup uses.

### Motion

- **Subtle and purposeful.** Scroll-triggered fades are fine. No bouncing elements.
- **Microinteractions:** Button hovers, card lifts. Keep them fast.
- **Loading states:** If the sandbox CTA leads somewhere, show progress clearly.

### Responsive

- **Mobile-first content priority.** The messaging is wordy—ensure it reads well on narrow screens.
- **Slide gallery needs mobile treatment.** Horizontal scroll, not tiny grid.
- **CTAs must remain prominent** on all breakpoints.

---

## Not Recommended

Things to avoid based on the positioning:

1. **Comparison tables vs competitors** — Implied positioning, not explicit attacks.
2. **"As seen in" press logos** — Don't have them yet. Don't fake it.
3. **Signup forms before value is shown** — Sandbox first.
4. **Dense feature lists** — Show the product instead.
5. **"AI-powered" as the headline** — Everyone says that. Lead with sovereignty.
6. **Testimonial carousels with stock photos** — Obviously fake. Skip until real.
7. **Auto-playing video with sound** — Instant bounce.
8. **Chat widget** — Solo founder can't support that. Docs instead.

---

## Priority Order for Design

If resources are limited, prioritize:

1. **Hero section** — First impression is everything.
2. **Product showcase** — Visual proof the product exists and is polished.
3. **Sovereignty section** — The differentiator must land.
4. **Final CTA** — Don't lose them at the end.
5. **Everything else** — Important but secondary to the above.

---

## Summary

The front page should feel like the product it's selling: **structured, opinionated, and confidently European**. Every section should earn its place. The hierarchy is clear: sovereignty opens the door, product depth keeps them reading, sandbox CTA closes.

Design for developers first. They'll be skeptical, technically literate, and allergic to marketing fluff. Show the product. Show the code. Let them try it themselves.

---

*Ready for visual design phase. Recommend creating wireframes for hero + product showcase first, then extending to full page.*
