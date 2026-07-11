# Homepage & UI/UX Review

*Review date: January 2026*
*Reviewed against: POSITIONING-WORKSHOP-NOTES.md*

---

## Executive Summary

The **UI-UX-RECOMMENDATIONS.md** document is strong—it correctly translates the positioning strategy into actionable design guidance. However, the **actual homepage implementation** has a critical gap: the hero copy hasn't been updated to match the agreed positioning. The structure is correct, but the most important element (the first thing visitors see) still uses generic messaging.

| Document | Score | Verdict |
|----------|-------|---------|
| UI-UX-RECOMMENDATIONS.md | 8/10 | Good strategic alignment, actionable |
| Homepage structure (index.astro) | 7/10 | Correct section order and layout |
| Homepage copy (en.json) | 5/10 | Hero misaligned, other sections good |

---

## Critical Issue: Hero Copy Mismatch

This is the single most important fix.

### Current hero (en.json lines 51-57)

```
Title: "Modern presentations, zero lock-in"

Lead: "A turn-key platform with 44 slide types, AI generation,
and real-time collaboration. Built on open standards and portable
formats, so you're never locked in. Self-host for free or let us
run it for you."
```

### Problems with current hero

1. **Leads with features** — "44 slide types" is a spec, not a hook
2. **"Zero lock-in" is defensive** — Defines Deckyard by what it isn't
3. **Buries the sovereignty angle** — The key differentiator is hidden
4. **Generic SaaS voice** — Could describe dozens of products
5. **No emotional resonance** — Doesn't speak to the frustration or vision

### Agreed hero (from positioning workshop)

```
Title: "A presentation platform that's actually yours"

Lead: "Built for how we work now. Structured slides that AI can
understand. Open formats your tools can talk to. EU-hosted or on
your servers. No lock-in, no platform risk."
```

### Why the agreed version is better

1. **"Actually yours"** — Ownership hook, implies others aren't
2. **"Built for how we work now"** — Forward-looking, not defensive
3. **"Structured slides that AI can understand"** — The key insight in one phrase
4. **"EU-hosted or on your servers"** — Sovereignty upfront
5. **"No lock-in, no platform risk"** — Contrast comes last, not first

### Action required

Replace `home.hero.title` and `home.hero.lead` in en.json (and all locale files).

---

## Section-by-Section Analysis

### 1. Hero Section

**Structure:** Good. Browser mockup area, CTA buttons, trust badges.

**Copy issues:**
- Title and lead need replacement (see above)
- Eyebrow currently says "Open Source · 44 Slide Types · AI Generation · Self-hostable" — this is fine but could lead with "EU-hosted" to reinforce positioning

**Visual:**
- Current: Static screenshot with TODO for live embed
- Recommendation: The live Deckyard-presentation-about-Deckyard idea is excellent. Prioritize this. Ensure fallback screenshot is high quality and shows the editor with real content, not empty states.

**Trust badges:** Good selection (Hosted in France, GDPR-native, Self-hostable, MIT licensed). Order is correct—sovereignty first.


### 2. Vision Section — "Built for how we work now"

**Structure:** Three-card grid. Correct.

**Copy:** Matches workshop drafts exactly. This is the strongest section.

```
- "Structured slides, not blank canvases"
- "AI that understands your content"
- "Open formats, interoperable by design"
```

**Issue:** Currently feels slightly disconnected from the hero because the hero doesn't set up this narrative. Once the hero is fixed, this section will flow naturally as "here's what that means."

**No changes needed** to this section's copy.


### 3. Showcase Section — "Everything you need, nothing you don't"

**Structure:** Slide type thumbnail grid. Good visual proof.

**Copy:** Works fine. Lead text is appropriate:
> "44 slide types covering data, comparisons, narratives, and interactions. Each one encodes design best practices so your presentations always look professional."

**Implementation note:** The slideTypes array in index.astro shows 16 types. This is fine for a preview grid—showing all 44 would be overwhelming. Consider adding "+28 more" or linking to full slide types page.

**No major changes needed.**


### 4. Interactions Section

**Structure:** Split layout (visual + copy). Feature pills. Correct.

**Copy:** Good. Captures the Mentimeter-alternative angle without naming competitors:
> "Engage your audience without switching tools"
> "No more juggling a separate tool alongside your presentation."

**Visual:** TODO comment mentions replacing with "screenshot showing live poll with simulated audience responses." This is the right approach—show results appearing in real-time.

**Minor issue:** "Quizzes" chip says "Follow-along" — this is confusing. Either call it "Quizzes" or "Follow-along mode" but not both labels for one feature.


### 5. AI Section

**Structure:** Capability strip + split layout + callout box. Good.

**Copy:** Matches the 65/35 positive/reassurance balance we agreed on.

Strong phrases:
- "AI that actually works—on your terms"
- "Deckyard's AI works reliably because the slide system was designed for it"
- "no credits, no markup, no limits"

**Minor improvements:**

1. **Capability strip** has 4 items: Generate, Convert, Translate, Analyze. Consider cutting "Analyze & improve" — it's vague compared to the others. Three concrete capabilities is stronger than four with one weak.

2. **"Structured slides = reliable output"** heading is good but the description could be punchier:

   Current:
   > "AI tools struggle with freeform canvases. Deckyard's opinionated slide types give AI clear targets. The result: consistent, usable decks—not random layouts."

   Consider:
   > "AI can't reliably manipulate freeform canvases. But it can understand 'use the KPI slide for these numbers.' Opinionated templates make AI actually useful."


### 6. Sovereignty Section

**Structure:** Two-card layout (Cloud vs Self-host) with docker command. Correct.

**Copy:** Good. Trust line is strong:
> "Netherlands company. French infrastructure. No US in the data chain."

**Visual recommendations from UI doc:**
- Subtle EU map or France location pin
- Not flag-wavy, just reinforcing

This isn't currently implemented. Consider adding a small visual element—even just a map pin icon next to "Hosted on Scaleway, France."

**Order question:** Currently Cloud is highlighted (deploy-card-highlight class) and appears first. This makes sense for conversion, but consider whether Self-hosted should be first to reinforce the open source positioning. Either order is defensible.


### 7. Open Platform Section

**Structure:** Four-card grid + two CTAs. Correct.

**Copy:** Good coverage of open source, API, MCP, formats.

**Missing element:** The UI recommendations doc suggests showing a real API code snippet. This isn't implemented. Adding 3-5 lines of example code would significantly increase developer trust:

```javascript
// Create a presentation via API
const deck = await deckyard.presentations.create({
  title: "Q4 Report",
  template: "corporate",
  slides: [{ type: "kpi", data: metrics }]
});
```

This shows the API is real and well-designed.


### 8. Social Proof Section

**Structure:** Founder block + badges. Minimal.

**Current copy:**
> "Built for real use at the founder's organization. Now open source and available to everyone."
> "Built by Jaap Stronks"
> "Solo founder, Rotterdam, Netherlands"

**Problems:**
1. "Founder's organization" is vague—what organization?
2. No credibility hook—why should we trust this person?
3. No photo (recommended in UI doc)
4. Feels like an afterthought

**Recommendations:**

Add specificity without oversharing:
> "Built by Jaap Stronks for daily use at a European communications agency. Now open source and available to everyone."

Or if comfortable naming the company:
> "Built by Jaap Stronks at [Company], where it powers [X presentations / client work / internal comms]. Now open source."

Add a one-line credibility point:
> "15 years in web development. Previously [X]."

Consider founder photo—puts a face to the project, builds trust for a pre-launch product.


### 9. Final CTA Section

**Structure:** Three-button layout. Correct.

**Copy:** Clean and appropriate:
> "Ready to try it?"
> "Start building presentations that are actually yours."

The callback to "actually yours" from the hero is good (once the hero is fixed).

**No changes needed.**

---

## UI-UX-RECOMMENDATIONS.md Review

### What's strong

1. **Strategic alignment** — Correctly prioritizes sovereignty as door-opener
2. **"Not recommended" list** — Smart avoidance of common mistakes:
   - No auto-playing video
   - No "trusted by" without logos
   - No comparison tables (yet)
   - No multiple font weights chaos
3. **Typography choices** — Inter/Geist are developer-friendly
4. **Color guidance** — "Lean European, not US startup primaries" is exactly right
5. **Section priority order** — Hero > Showcase > Sovereignty > CTA matches strategy

### What could be stronger

1. **Mobile guidance** — Mentioned but not detailed. The slide type grid especially needs mobile treatment (probably 2-column or horizontal scroll).

2. **Animation/interaction** — No guidance on micro-interactions. Recommend: subtle, functional (e.g., slide type cards lift on hover), nothing flashy.

3. **Dark mode** — Not mentioned. Given developer audience, this should be considered. At minimum, ensure the design works in both modes.

4. **Accessibility** — Brief mention but no specifics. Add: color contrast requirements, focus states, screen reader considerations for the slide type grid.

5. **Loading states** — The live embed in hero will need a loading state. Document this.

---

## Action Items by Priority

### P0 — Critical (do before launch)

| Item | Location | Description |
|------|----------|-------------|
| Replace hero copy | en.json (+ all locales) | Use agreed "actually yours" messaging |
| High-quality hero visual | index.astro + assets | Either live embed or polished screenshot |

### P1 — Important (do before launch if possible)

| Item | Location | Description |
|------|----------|-------------|
| Strengthen social proof | en.json, index.astro | Add specificity, credibility point, consider photo |
| Add API code snippet | index.astro, en.json | Show real code in Open Platform section |
| Fix "Quizzes/Follow-along" confusion | en.json | Pick one label |

### P2 — Polish (can do post-launch)

| Item | Location | Description |
|------|----------|-------------|
| Add EU/France visual element | Sovereignty section | Subtle map or pin icon |
| Tighten AI capability strip | en.json | Consider 3 items instead of 4 |
| Add "+X more" to slide type grid | index.astro | Indicate there are more than 16 types |
| Mobile grid treatment | CSS | Ensure slide type grid works on mobile |

### P3 — Future consideration

| Item | Description |
|------|-------------|
| Dark mode | Design system extension |
| Accessibility audit | WCAG compliance check |
| Animation guidelines | Micro-interaction standards |

---

## Suggested Copy Changes

### Hero (en.json)

```json
"hero": {
  "eyebrow": "EU-hosted · Open Source · Self-hostable · MIT Licensed",
  "title": "A presentation platform that's actually yours",
  "lead": "Built for how we work now. Structured slides that AI can understand. Open formats your tools can talk to. EU-hosted or on your servers. No lock-in, no platform risk.",
  "trySandbox": "Try the sandbox",
  "viewOnGithub": "View on GitHub",
  ...
}
```

### Social proof (en.json)

```json
"proof": {
  "origin": "Built for daily use at a European communications agency. Now open source and available to everyone.",
  "builtBy": "Built by",
  "founderName": "Jaap Stronks",
  "founderRole": "Solo founder · Rotterdam, Netherlands · 15 years in web development",
  "mitLicense": "MIT licensed",
  "madeIn": "Made in Europe"
}
```

### AI capability strip (en.json)

```json
"capabilities": {
  "generate": "Generate from prompt",
  "convert": "Convert documents",
  "translate": "Translate to any language"
}
```

(Remove "Analyze & improve" — or replace with something concrete like "Improve existing slides")

### Interactions chip (en.json)

```json
"quizzes": "Follow-along mode"
```

(Or rename to just "Quizzes" if that's more accurate)

---

## Conclusion

The foundation is solid. The section structure follows the positioning strategy correctly. The UI recommendations document provides good guidance.

The critical gap is the hero copy—it's still using old, generic messaging instead of the ownership/sovereignty hook we agreed on. Fix that first. Everything else is refinement.

Once the hero says "A presentation platform that's actually yours," the rest of the page will click into place as the supporting argument for that claim.
