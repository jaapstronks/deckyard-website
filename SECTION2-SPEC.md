# Section 2: "Presentations Are Still Broken"

*Specification for homepage section replacing the current "vision" block*

---

## Purpose

This section does the heavy lifting of explaining **why Deckyard exists** and **how it's different**. It bridges from the sovereignty hook (hero) to the product proof (slide types, features).

**Target audience for this section:** Anyone who's ever wasted time on presentations—but especially people in organizations where brand consistency and efficiency matter.

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ SECTION: problem-solution                                               │
│ Background: default (white/light)                                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ HEADER BLOCK                                                     │   │
│  │                                                                  │   │
│  │ [Headline - h2, centered]                                       │   │
│  │ "Presentations are still broken"                                │   │
│  │                                                                  │   │
│  │ [Problem statement - p.section-lead, centered, max-width ~700px]│   │
│  │ 2-3 sentences describing the pain                               │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ SOLUTION BLOCK                                                   │   │
│  │                                                                  │   │
│  │ [Solution pivot - p, centered, slightly smaller than lead]      │   │
│  │ 2-3 sentences introducing the Deckyard approach                 │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ VIDEO DEMO                                                       │   │
│  │                                                                  │   │
│  │ ┌───────────────────────────────────────────────────────────┐   │   │
│  │ │                                                           │   │   │
│  │ │                    [Video Player]                         │   │   │
│  │ │                     16:9 aspect                           │   │   │
│  │ │                   max-width: 900px                        │   │   │
│  │ │                     centered                              │   │   │
│  │ │                                                           │   │   │
│  │ │  Poster: screenshot of the prompt → result moment         │   │   │
│  │ │  Controls: visible, not autoplay                          │   │   │
│  │ │                                                           │   │   │
│  │ └───────────────────────────────────────────────────────────┘   │   │
│  │                                                                  │   │
│  │ [Caption - small, centered, muted color]                        │   │
│  │ "From prompt to presentation in 30 seconds"                     │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ SUPPORTING POINTS                                                │   │
│  │                                                                  │   │
│  │ [3-column grid on desktop, stack on mobile]                     │   │
│  │                                                                  │   │
│  │ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │   │
│  │ │  [Icon]     │  │  [Icon]     │  │  [Icon]     │               │   │
│  │ │             │  │             │  │             │               │   │
│  │ │  Title      │  │  Title      │  │  Title      │               │   │
│  │ │  (bold)     │  │  (bold)     │  │  (bold)     │               │   │
│  │ │             │  │             │  │             │               │   │
│  │ │  Description│  │  Description│  │  Description│               │   │
│  │ │  (1-2 lines)│  │  (1-2 lines)│  │  (1-2 lines)│               │   │
│  │ └─────────────┘  └─────────────┘  └─────────────┘               │   │
│  │                                                                  │   │
│  │  Roles & permissions    Live data          AI generation        │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Structure (Astro)

```astro
<!-- ============================================================
     PROBLEM/SOLUTION: "Presentations are still broken"
     Problem statement → Solution pivot → Video demo → Supporting points
     ============================================================ -->
<section id="problem" class="section">
  <div class="container">
    <!-- Header -->
    <h2>{t('home.problem.title')}</h2>
    <p class="section-lead">{t('home.problem.pain')}</p>

    <!-- Solution pivot -->
    <p class="section-pivot">{t('home.problem.solution')}</p>

    <!-- Video demo -->
    <div class="demo-video">
      <div class="demo-video-wrapper">
        <video
          controls
          preload="metadata"
          poster="/images/demo-poster.jpg"
          class="demo-video-player"
        >
          <source src="/videos/deckyard-demo.mp4" type="video/mp4" />
          <source src="/videos/deckyard-demo.webm" type="video/webm" />
          <!-- Fallback for no video support -->
          <img src="/images/demo-poster.jpg" alt={t('home.problem.video.alt')} />
        </video>
      </div>
      <p class="demo-video-caption">{t('home.problem.video.caption')}</p>
    </div>

    <!-- Supporting points -->
    <div class="grid cards-3 problem-cards">
      <article class="card">
        <div class="card-icon" aria-hidden="true">
          <svg class="icon"><use href="#icon-users"></use></svg>
        </div>
        <h3>{t('home.problem.roles.title')}</h3>
        <p>{t('home.problem.roles.description')}</p>
      </article>
      <article class="card">
        <div class="card-icon" aria-hidden="true">
          <svg class="icon"><use href="#icon-database"></use></svg>
        </div>
        <h3>{t('home.problem.liveData.title')}</h3>
        <p>{t('home.problem.liveData.description')}</p>
      </article>
      <article class="card">
        <div class="card-icon" aria-hidden="true">
          <svg class="icon"><use href="#icon-sparkle"></use></svg>
        </div>
        <h3>{t('home.problem.generation.title')}</h3>
        <p>{t('home.problem.generation.description')}</p>
      </article>
    </div>
  </div>
</section>
```

---

## CSS Notes

```css
/* Solution pivot - slightly smaller than lead, different weight */
.section-pivot {
  max-width: 750px;
  margin: 0 auto 2.5rem;
  text-align: center;
  font-size: 1.125rem; /* smaller than .section-lead */
  color: var(--color-text-secondary);
}

/* Video demo container */
.demo-video {
  max-width: 900px;
  margin: 0 auto 3rem;
}

.demo-video-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background: var(--color-surface-alt);
}

.demo-video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.demo-video-caption {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* Cards below video - tighter spacing */
.problem-cards {
  margin-top: 3rem;
}

.problem-cards .card {
  text-align: center;
}

.problem-cards .card h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.problem-cards .card p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
}
```

---

## Copy for en.json

Replace the current `home.vision` block with `home.problem`:

```json
"problem": {
  "title": "Presentations are still broken",
  "pain": "Every presentation tool hands you a blank canvas and says \"design whatever you want.\" That's the problem. People spend hours wrestling with layouts. Brand guidelines get ignored. Data goes stale in old decks. And AI can't help—there's nothing structured for it to work with.",
  "solution": "Deckyard works like a website, not a canvas. Designers create templates. Everyone else fills in content. The system enforces consistency. And because slides are structured, AI can generate, update, and translate them automatically.",
  "video": {
    "alt": "Demo: creating a presentation from a Notion page using AI",
    "caption": "From prompt to presentation in 30 seconds"
  },
  "roles": {
    "title": "Roles that make sense",
    "description": "Designers control templates and styling. Editors fill in content. No one drags text boxes around. Your brand stays intact."
  },
  "liveData": {
    "title": "Always-current data",
    "description": "Connect slides to Notion, Google Sheets, or your APIs. Numbers update automatically. No more stale quarterly decks."
  },
  "generation": {
    "title": "AI that actually helps",
    "description": "Generate decks from prompts or documents. Structured templates mean reliable output—not random layouts you have to fix."
  }
}
```

---

## Video Storyboard

The demo video should be **30-45 seconds**, no audio required (or optional subtle music). Here's the shot sequence:

| Time | Shot | What's shown |
|------|------|--------------|
| 0:00-0:05 | Prompt input | User types in a chat/command box: "Create a Q4 report presentation from this Notion page" + pastes link |
| 0:05-0:10 | Processing | Brief animation showing AI working (could be a progress indicator or slide thumbnails appearing) |
| 0:10-0:20 | Result | The finished presentation appears. Quick scroll through 4-5 slides showing different types (title, KPIs, chart, text+image, conclusion) |
| 0:20-0:30 | Editor | Brief tour of the editor interface—click into a slide, show how content is structured (not freeform), maybe change one value |
| 0:30-0:40 | Present mode | Launch presentation, show it in present mode, maybe flip through 2-3 slides |
| 0:40-0:45 | End card | Deckyard logo + "Try the sandbox" |

**Key principles:**
- Fast cuts, not lingering
- Show real UI, not mockups
- No voiceover needed—it should be self-explanatory
- Captions optional but can help (e.g., "Connected to Notion..." "12 slides generated")

---

## Fallback If No Video Yet

Until the video is ready, use a **static image with caption**:

```astro
<!-- Temporary: replace with video when ready -->
<div class="demo-video">
  <div class="demo-video-wrapper demo-video-static">
    <img
      src="/images/demo-prompt-to-deck.png"
      alt={t('home.problem.video.alt')}
      class="demo-static-image"
    />
  </div>
  <p class="demo-video-caption">{t('home.problem.video.caption')}</p>
</div>
```

The static image should be a **before/after composite**:
- Left side: The prompt input ("Create a Q4 report from Notion...")
- Right side: The resulting presentation (thumbnail grid or single slide)
- Arrow or visual connector between them

---

## Alternative Headlines (Ranked)

If "Presentations are still broken" feels too harsh, alternatives:

| Rank | Headline | Tone |
|------|----------|------|
| 1 | Presentations are still broken | Bold, provocative, earns attention |
| 2 | Stop wrestling with slides | Action-oriented, names the frustration |
| 3 | What if slides just worked? | Curious, inviting |
| 4 | Presentations, without the busywork | Benefit-focused |
| 5 | The end of layout chaos | Specific but slightly clever |

My recommendation: **Go with #1** ("Presentations are still broken"). It's confident, it's true, and it sets up the solution. The target audience (people who've wasted time on decks) will nod in recognition.

---

## Section Order Context

This section sits between:
- **Before:** Hero ("A presentation platform that's actually yours")
- **After:** Showcase (slide type grid)

The narrative flow:
1. Hero: You can own this
2. **This section:** Here's why that matters—presentations are broken, Deckyard fixes it
3. Showcase: Look at all the slide types
4. Interactions: Plus it does polls/Q&A
5. AI: And the AI actually works
6. Sovereignty: Your infrastructure or ours
7. Open platform: It's fully open
8. CTA: Try it

---

## Checklist

- [ ] Remove current `home.vision` section from index.astro
- [ ] Add new section structure per above
- [ ] Add CSS for `.section-pivot`, `.demo-video`, `.problem-cards`
- [ ] Replace `home.vision` with `home.problem` in en.json
- [ ] Translate `home.problem` keys to other locales
- [ ] Create demo video (or static fallback image)
- [ ] Update any internal links that referenced `#vision`
