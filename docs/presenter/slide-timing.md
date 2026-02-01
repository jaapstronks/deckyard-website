---
title: "Slide Timing & Pacing"
description: "Control presentation pacing with auto-advance, per-slide durations, and a visual pacing timer"
---

# Slide Timing & Pacing

Control presentation pacing with timed slides, per-slide duration overrides, and a visual pacing timer.

## Overview

Deckyard's timing system helps you deliver presentations at the right pace. It supports two modes:

- **Auto-advance** - Slides advance automatically on a timer (great for kiosks, Pecha Kucha, Ignite)
- **Pacing timer** - A visual countdown that keeps you on track while you advance slides manually

Both modes support per-slide duration overrides, so individual slides can have longer or shorter timers than the deck default.

## Enabling Timed Slides

1. Open your presentation in the editor
2. Click the **gear icon** to open **Deck settings**
3. Check **Enable timed slides** in the auto-advance section
4. Set your default **seconds per slide** (1--300)
5. Choose a **timer behavior** (auto-advance or pacing timer)

The total deck time is shown at the bottom of the section and updates live as you change settings.

## Timer Modes

### Auto-Advance

In auto-advance mode, slides move forward automatically when the timer expires:

- A countdown bar fills at the bottom of the slide
- When it reaches 100%, the next slide appears
- On the last slide, the timer stops (or loops back to the first slide if looping is enabled)
- Press `A` to pause/resume during your presentation

**Best for:**
- Unattended displays and kiosks
- Pecha Kucha (20 slides x 20 seconds)
- Ignite talks (20 slides x 15 seconds)
- Trade show loops

### Pacing Timer

In pacing mode, the timer is visual-only -- you still advance slides manually:

- A countdown bar fills at the bottom of the slide
- When it reaches 100%, the bar turns **red** and a brief "Time's up" hint appears
- The timer keeps running past 100% so you can see how far over you are
- You advance to the next slide whenever you're ready, which resets the timer
- Press `A` to pause/resume the timer

**Best for:**
- Conference talks with a time limit
- Rehearsing presentation pacing
- Any talk where you want timing guidance without losing control

### Choosing a Mode

| | Auto-advance | Pacing timer |
|---|---|---|
| Slides advance | Automatically | Manually (you press next) |
| Timer at 100% | Advances to next slide | Bar turns red, keeps running |
| Loop option | Available | Hidden (not applicable) |
| Share viewer | Audiences see auto-advance | No timer shown to audience |
| Best for | Kiosks, timed formats | Live talks, rehearsals |

## Per-Slide Duration

By default, every slide uses the deck-level timer (e.g. 20 seconds). You can override this for individual slides:

1. Select a slide in the editor
2. A **Slide duration (seconds)** input appears between the header and the form fields (only visible when timed slides are enabled)
3. Enter a value between 1 and 300
4. Leave the field empty to use the deck default

The placeholder shows the current deck default so you can always see what "empty" means.

### Use Cases

- **Title slides** - Set a short duration (5s) since they're just an intro
- **Complex diagrams** - Set a longer duration (60s) to give more explanation time
- **Video slides** - Match the duration to the video length
- **Q&A slides** - Set a long duration or use pacing mode to stay flexible

### How It Works

- Per-slide durations are stored as `slide.duration` alongside existing slide properties like `notes` and `visibility`
- When no override is set, the deck default is used
- The total deck time in settings accounts for all per-slide overrides
- The progress area in presenter mode shows the total calculated time

## Presenter View

When presenting with timed slides enabled:

### Progress Bar

A thin bar at the bottom of the slide shows countdown progress:

- **Blue** (normal) - Timer counting down
- **Dimmed** - Timer is paused
- **Red with pulse** (pacing mode only) - Timer has expired, you're in overtime

You can toggle the bar's visibility in deck settings with the **Show countdown bar** checkbox.

### Controls

- Press `A` to pause/resume the timer
- The toolbar button reflects the current mode:
  - Auto-advance: **Pause auto** / **Resume auto**
  - Pacing timer: **Pause timer** / **Resume timer**

### Total Time Display

When timed slides are enabled, the presenter progress area shows the total deck time:

```
3 / 10 · 6m 40s
```

This updates as you navigate through slides.

## Share Viewer Behavior

How timing works for audiences viewing via share links:

- **Auto-advance mode** - Audiences see the same auto-advance behavior with per-slide durations. Slides advance automatically.
- **Pacing mode** - No timer is shown to the audience. Pacing is a presenter-only feature since the audience doesn't need to see your countdown.

## Settings Reference

### Deck-Level Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Enable timed slides | Turn timing on/off | Off |
| Seconds per slide | Default duration for all slides | 20 |
| Timer behavior | Auto-advance or Pacing timer | Auto-advance |
| Loop | Restart from first slide after last (auto-advance only) | Off |
| Show countdown bar | Display the progress bar during presentation | On |

### Per-Slide Setting

| Setting | Description | Default |
|---------|-------------|---------|
| Slide duration | Override for this slide (1--300 seconds) | Empty (uses deck default) |

## Tips

- **Rehearse first** - Use pacing mode to find the right timing for each slide before committing to auto-advance
- **Start with the deck default** - Only add per-slide overrides where the default truly doesn't fit
- **Pecha Kucha format** - Set to 20 seconds, auto-advance, 20 slides. The format enforces tight storytelling.
- **Ignite format** - Set to 15 seconds, auto-advance, 20 slides
- **The `A` key is your friend** - It pauses/resumes in both modes, useful when audience questions interrupt your flow
- **Overtime is not a failure** - In pacing mode, going slightly over on a slide is normal. The red bar helps you self-correct on the next one.

## Keyboard Reference

| Shortcut | Action |
|----------|--------|
| `A` | Pause/resume timer |
| `Right`, `Space` | Next slide (resets timer) |
| `Left` | Previous slide (resets timer) |

## Related

- [Presenter Mode](/docs/presenter/)
- [Laser Pointer & Drawing](/docs/presenter/highlighter/)
- [Audience Follow Mode](/docs/presenter/follow-mode/)
