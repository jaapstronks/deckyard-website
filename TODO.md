# Deckyard Website - Content & Asset Tracking

Last updated: 2026-01-25

---

## Content Status Overview

### Marketing Pages

| Page | Status | Notes |
|------|--------|-------|
| `/` (Homepage) | ✅ Done | EU sovereignty lead, updated nav |
| `/pricing` | ✅ Done | Now uses BaseLayout with FAQ schema |
| `/features` | ✅ Done | Needs hero screenshot |
| `/features/slide-types` | ✅ Done | Needs 44 slide type thumbnails |
| `/features/ai` | ✅ Done | Needs AI modal screenshot |
| `/features/interactions` | ✅ Done | Needs interaction screenshots |
| `/compare/mentimeter` | ✅ Done | - |
| `/compare/slides-com` | ✅ Done | - |
| `/compare/google-slides` | ✅ Done | - |
| `/compare/powerpoint` | ✅ Done | - |
| `/self-hosting` | ✅ Existing | Review for updates |
| `/eu-privacy` | ✅ Existing | Review for updates |

### Documentation

| Doc | Status | Notes |
|-----|--------|-------|
| `/docs/` (index) | ✅ Existing | - |
| `/docs/getting-started` | ✅ Existing | Could expand |
| `/docs/user-manual` | ✅ Existing | - |
| `/docs/slide-types/` | ✅ Done | - |
| `/docs/slide-types/data` | ✅ Done | - |
| `/docs/slide-types/interactive` | ✅ Done | - |
| `/docs/slide-types/cards` | ✅ Done | - |
| `/docs/slide-types/media` | ✅ Done | - |
| `/docs/slide-types/structure` | ✅ Done | - |
| `/docs/ai/getting-started` | ✅ Done | - |
| `/docs/ai/deck-generation` | ✅ Done | - |
| `/docs/interactions/polls` | ✅ Done | - |
| `/docs/interactions/qa` | ✅ Done | - |
| `/docs/interactions/feedback` | ✅ Done | - |
| `/docs/themes/` | ✅ Done | Custom theme documentation |
| `/docs/export/` | ✅ Done | Export formats documentation |
| `/docs/collaboration/` | ✅ Done | Sharing, permissions, comments |
| `/docs/presenter/` | ✅ Done | Presenter mode guide |
| `/docs/publishing/` | ✅ Done | Publishing & embedding |
| `/docs/configuration/environment` | ✅ Existing | - |
| `/docs/integrations/webhooks` | ✅ Existing | - |
| `/docs/integrations/analytics` | ✅ Existing | - |

---

## SEO Status

### Completed

| Item | Status | Notes |
|------|--------|-------|
| Sitemap generation | ✅ Done | `@astrojs/sitemap` configured with i18n |
| robots.txt | ✅ Done | Created in `/public/robots.txt` |
| Canonical URLs | ✅ Done | Added to BaseLayout |
| OG meta tags | ✅ Done | Title, description, image, site_name, locale |
| Twitter Card tags | ✅ Done | summary_large_image with image |
| hreflang tags | ✅ Done | All 12 locales supported |
| JSON-LD Organization | ✅ Done | In BaseLayout |
| JSON-LD WebSite | ✅ Done | In BaseLayout |
| JSON-LD WebPage | ✅ Done | In BaseLayout (per page) |
| JSON-LD SoftwareApplication | ✅ Done | In BaseLayout |
| JSON-LD FAQPage | ✅ Done | On pricing page |
| JSON-LD Product/Offer | ✅ Done | On pricing page |
| Favicon SVG | ✅ Done | `/public/favicon.svg` |
| Web manifest | ✅ Done | `/public/site.webmanifest` |
| Site URL configured | ✅ Done | `site: 'https://deckyard.eu'` in astro.config |
| Meta robots/googlebot | ✅ Done | Added to BaseLayout |
| Preconnect hints | ✅ Done | sandbox.deckyard.eu |

### Remaining SEO Tasks

| Item | Priority | Notes |
|------|----------|-------|
| ~~Generate PNG favicons~~ | ~~High~~ | ✅ Done - Created via `scripts/generate-favicons.js` |
| Dedicated OG image | High | Create optimized 1200x630px social sharing image |
| ~~Update root English pages~~ | ~~Medium~~ | ✅ Done - `/features.astro`, `/features/*.astro` now use BaseLayout |
| ~~Add BreadcrumbList schema~~ | ~~Low~~ | ✅ Done - Dynamic breadcrumbs in BaseLayout |
| Create Twitter/X account | Low | Update `@deckyard` handle once created |

### Files Modified for SEO

```
astro.config.mjs              - Added sitemap integration, site URL, i18n config
src/layouts/BaseLayout.astro  - Full SEO meta tags, JSON-LD, breadcrumbs
src/pages/pricing.astro       - Refactored to use BaseLayout, FAQ/Product schema
src/pages/features.astro      - Refactored to use BaseLayout
src/pages/features/ai.astro   - Refactored to use BaseLayout
src/pages/features/interactions.astro - Refactored to use BaseLayout
src/pages/features/slide-types.astro  - Refactored to use BaseLayout
public/robots.txt             - Created
public/favicon.svg            - Created
public/favicon-16x16.png      - Generated from SVG
public/favicon-32x32.png      - Generated from SVG
public/apple-touch-icon.png   - Generated from SVG
public/site.webmanifest       - Created
scripts/generate-favicons.js  - Utility script for PNG generation
```

---

## Screenshots Needed

### Priority 1: Hero & Key Pages

| Screenshot | For Page | Dimensions | Status | Notes |
|------------|----------|------------|--------|-------|
| Editor overview | Homepage hero | 1920x1080 | ❌ TODO | Show editor with slide panel, various types |
| Poll with live results | /features/interactions | 1920x1080 | ❌ TODO | Votes appearing in real-time |
| AI generation modal | /features/ai | 1200x800 | ❌ TODO | Prompt input with example |
| Mobile follow-along | /features/interactions | 375x812 | ❌ TODO | Phone showing current slide |
| QR join screen | /features/interactions | 1920x1080 | ❌ TODO | Audience join page |

### Priority 2: Slide Type Thumbnails (36+)

All thumbnails should be **400x225px** (16:9 aspect ratio).

**Tips for capturing:**
- Use consistent, professional example content
- Deckyard theme/branding visible
- Clean data, no personal information
- Same slide dimensions throughout

#### Data Slides
| Slide Type | Status | Notes |
|------------|--------|-------|
| Chart | ❌ TODO | Bar chart with sample data |
| KPI Metrics | ❌ TODO | 3-4 KPIs with values |
| Table | ❌ TODO | Simple comparison table |
| Funnel | ❌ TODO | Sales funnel example |
| Pyramid | ❌ TODO | Hierarchy example |
| Timeline | ❌ TODO | 4-5 milestones |
| Matrix | ❌ TODO | 2x2 SWOT style |
| Agenda | ❌ TODO | Meeting agenda |

#### Interactive Slides
| Slide Type | Status | Notes |
|------------|--------|-------|
| Poll | ❌ TODO | With sample votes |
| Likert Scale | ❌ TODO | Agreement scale |
| Likert Slider | ❌ TODO | 1-10 rating |
| Feedback | ❌ TODO | Word cloud or list |
| Q&A | ❌ TODO | Questions displayed |
| Follow Invite | ❌ TODO | QR code visible |
| Word Cloud | ❌ TODO | Dynamic word cloud |
| Quiz | ❌ TODO | Question with options |

#### Content Cards
| Slide Type | Status | Notes |
|------------|--------|-------|
| Card Stack | ❌ TODO | 3-4 cards |
| Icon Cards | ❌ TODO | Features with icons |
| Team Overview | ❌ TODO | Grid of team members |
| Team Cards | ❌ TODO | Single member spotlight |
| Logo Wall | ❌ TODO | Client logos |
| Gallery | ❌ TODO | Image gallery |
| Process | ❌ TODO | Step-by-step |
| Comparison | ❌ TODO | Side-by-side |

#### Media Slides
| Slide Type | Status | Notes |
|------------|--------|-------|
| Image | ❌ TODO | Full image |
| Image + Text | ❌ TODO | Split layout |
| Video | ❌ TODO | Video embed |
| Embed | ❌ TODO | iFrame content |
| Code | ❌ TODO | Code snippet |

#### Structure Slides
| Slide Type | Status | Notes |
|------------|--------|-------|
| Title | ❌ TODO | Opening slide |
| Chapter | ❌ TODO | Section divider |
| Section | ❌ TODO | Sub-section |
| Content | ❌ TODO | Text slide |
| Quote | ❌ TODO | Featured quote |
| List | ❌ TODO | Bullet points |
| Two Column | ❌ TODO | Split layout |
| Payoff | ❌ TODO | CTA slide |
| Thank You | ❌ TODO | Closing slide |

### Priority 3: Feature Details

| Screenshot | For Page | Status | Notes |
|------------|----------|--------|-------|
| Document upload modal | /features/ai | ❌ TODO | PDF/Word upload dialog |
| API key settings | /features/ai | ❌ TODO | Settings panel |
| Mobile voting UI | /features/interactions | ❌ TODO | Phone voting interface |
| Q&A moderation view | /features/interactions | ❌ TODO | Moderator panel |
| Export dropdown | /features | ❌ TODO | Export menu open |
| Team workspace | /features | ❌ TODO | Workspace list view |
| Theme customizer | /features | ❌ TODO | Theme settings |

---

## Videos Needed

### Essential (Priority 1)

| Video | Duration | For Page | Status | Content |
|-------|----------|----------|--------|---------|
| Poll flow | 15-30s | /features/interactions | ❌ TODO | QR scan → vote → results appear |
| AI generation | 30-45s | /features/ai | ❌ TODO | Enter prompt → deck generated |
| Product overview | 60-90s | Homepage | ❌ TODO | Quick tour: editor, present, interact |

### Nice-to-Have (Priority 2)

| Video | Duration | For Page | Status | Content |
|-------|----------|----------|--------|---------|
| Self-host setup | 2min | /self-hosting | ❌ TODO | Docker compose walkthrough |
| Full deck creation | 2-3min | /features | ❌ TODO | Start to finish |
| Theme customization | 1min | /features | ❌ TODO | Creating custom theme |

**Video specs:**
- Format: MP4 (H.264)
- Resolution: 720p minimum, 1080p preferred
- Audio: Optional (no audio required)
- Hosting: EU CDN or self-hosted

---

## Content Improvements Needed

### Pages to Review/Update

- [ ] `/self-hosting` - Check if Docker instructions are current
- [ ] `/eu-privacy` - Verify all claims are accurate
- [ ] Homepage - Add live embed demo (replace static screenshot)

### Documentation Gaps

All major documentation structure has been created with stub content. Pages need content expansion:

**Completed Stub Pages (39 new pages created 2026-01-25):**

Collaboration Section (expanded from 1 to 7 pages):
- [x] `/docs/collaboration/` - Overview
- [x] `/docs/collaboration/sharing-permissions` - Permissions system
- [x] `/docs/collaboration/comments` - Slide comments
- [x] `/docs/collaboration/realtime-editing` - Slide locks
- [x] `/docs/collaboration/activity-notifications` - Activity feed
- [x] `/docs/collaboration/versions` - Version history
- [x] `/docs/collaboration/ownership-transfer` - Transfer ownership

Asset Libraries Section (new):
- [x] `/docs/libraries/` - Overview
- [x] `/docs/libraries/slide-library` - Reusable slides
- [x] `/docs/libraries/image-library` - Shared images

Admin & Self-Hosting Section (new):
- [x] `/docs/admin/` - Overview
- [x] `/docs/admin/user-management` - User administration
- [x] `/docs/admin/email-configuration` - SMTP/Brevo setup
- [x] `/docs/admin/email-templates` - Template customization
- [x] `/docs/admin/settings` - Instance settings
- [x] `/docs/admin/digest-emails` - Weekly digests
- [x] `/docs/admin/gdpr-privacy` - GDPR compliance
- [x] `/docs/admin/sandbox-mode` - Demo environments

AI Features (expanded from 2 to 6 pages):
- [x] `/docs/ai/analysis` - DreamBot analysis
- [x] `/docs/ai/translation` - AI translation
- [x] `/docs/ai/description-generation` - Auto descriptions
- [x] `/docs/ai/alt-text` - Accessibility alt text

Presenting (expanded from 1 to 4 pages):
- [x] `/docs/presenter/follow-mode` - Audience follow
- [x] `/docs/presenter/notes-view` - Speaker notes
- [x] `/docs/presenter/presentation-locks` - Advisory locks

Publishing (expanded from 1 to 3 pages):
- [x] `/docs/publishing/embedding` - SDK embedding
- [x] `/docs/publishing/og-images` - Social previews

Customization (expanded):
- [x] `/docs/themes/editor` - Visual theme editor
- [x] `/docs/customization/custom-slide-types` - Custom types
- [x] `/docs/export/handoff-bundle` - Complete export bundle

Interactions:
- [x] `/docs/interactions/lead-capture` - Lead forms

Configuration:
- [x] `/docs/configuration/authentication` - Auth setup

Integrations:
- [x] `/docs/integrations/media-services` - Unsplash/Giphy
- [x] `/docs/integrations/real-time` - SSE updates

Getting Started (expanded from 3 to 9 pages):
- [x] `/docs/getting-started/keyboard-shortcuts` - Shortcuts
- [x] `/docs/getting-started/import` - Import PPTX/PDF
- [x] `/docs/getting-started/duplication` - Copy presentations
- [x] `/docs/getting-started/search` - Search & discovery
- [x] `/docs/getting-started/tags` - Tag organization
- [x] `/docs/getting-started/trash` - Trash & recovery

**Content Needed:**
All stub pages contain "Documentation coming soon" placeholders that need to be filled with actual content by referencing the main codebase at `/Users/jstronks/Github NW/deckyard`

---

## Design/CSS Improvements

- [ ] Replace visual placeholders on /features/interactions
- [ ] Add actual images to slide type cards (currently placeholder text)
- [ ] Consider adding hover states to slide type cards
- [ ] Mobile testing on all new pages

---

## Technical Tasks

- [x] Set `site` in astro.config.mjs for sitemap generation
- [x] Add favicon
- [x] Generate PNG favicon variants from SVG
- [ ] Test all internal links
- [ ] Verify Starlight docs sidebar works correctly
- [ ] Performance audit (image optimization)
- [x] Update root English pages to use BaseLayout (removes duplicate HTML)

---

## Quick Reference: File Locations

### Screenshots go in:
```
public/images/screenshots/     - General screenshots
public/images/slide-types/     - 36+ slide type thumbnails
public/images/hero/            - Hero images
```

### Videos go in:
```
public/videos/                 - Demo videos
```

### Marketing pages:
```
src/pages/                     - Main pages (English, some legacy)
src/pages/[...locale]/         - Localized pages (use these!)
src/pages/features/            - Feature subpages
src/pages/compare/             - Comparison pages
```

### Documentation:
```
src/content/docs/              - All documentation
```

### SEO files:
```
public/robots.txt              - Crawler directives
public/favicon.svg             - Vector favicon
public/site.webmanifest        - PWA manifest
src/layouts/BaseLayout.astro   - SEO meta tags & JSON-LD
```

---

## Changelog

### 2026-01-24 (Late Evening)
- Completed remaining SEO tasks:
  - Generated PNG favicons (16x16, 32x32, 180x180) from SVG
  - Added `scripts/generate-favicons.js` utility
  - Refactored root English pages to use BaseLayout:
    - `/features.astro`
    - `/features/ai.astro`
    - `/features/interactions.astro`
    - `/features/slide-types.astro`
  - Added dynamic BreadcrumbList schema to BaseLayout

### 2026-01-24 (Evening)
- Implemented comprehensive SEO improvements:
  - Added `@astrojs/sitemap` with i18n support (12 languages)
  - Created `robots.txt` with sitemap reference
  - Enhanced BaseLayout with canonical URLs, OG tags, Twitter cards
  - Added JSON-LD schemas: Organization, WebSite, WebPage, SoftwareApplication
  - Refactored pricing page with FAQPage and Product schemas
  - Created SVG favicon and web manifest
  - Added preconnect hints for external resources

### 2026-01-24
- Created initial TODO tracking system
- Implemented all marketing pages from content plan
- Created documentation for slide types, AI, interactions
- Updated navigation across all pages

### 2026-01-25
- Major documentation expansion (39 new stub pages):
  - Expanded Collaboration from 1 to 7 pages
  - Added new Asset Libraries section (3 pages)
  - Added new Admin & Self-Hosting section (8 pages)
  - Expanded AI Features from 2 to 6 pages
  - Expanded Presenting from 1 to 4 pages
  - Expanded Publishing from 1 to 3 pages
  - Expanded Getting Started from 3 to 9 pages
  - Added Lead Capture, Authentication, Media Services, Real-Time docs
- Explored main Deckyard codebase to identify undocumented features:
  - Search & discovery, tags, trash/recovery
  - Import from PPTX/PDF, duplication
  - GDPR/privacy features, sandbox mode
  - AI translation, description generation, alt text
  - Digest emails, presentation locks
  - Handoff bundle export, OpenGraph images
- Updated sidebar configuration with all new pages

### 2026-01-24 (Night)
- Added compare pages: `/compare/google-slides`, `/compare/powerpoint`
- Added translations for new compare pages
- Created comprehensive documentation:
  - `/docs/themes/` - Theme customization
  - `/docs/export/` - Export formats (PDF, PPTX, HTML, PNG, JSON)
  - `/docs/collaboration/` - Sharing, permissions, workspaces
  - `/docs/presenter/` - Presenter mode, notes, navigation
  - `/docs/publishing/` - Publishing, embedding, OG images
- Updated Starlight sidebar with new sections
