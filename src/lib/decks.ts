import type { Lang } from '@/i18n';

/**
 * Which locales have a deck of their own on the homepage.
 *
 * A deck is a self-contained Deckyard HTML export in `public/decks/` (see the
 * README there for how one is made and what breaks it). That is an asset, not
 * copy, so it lives here rather than in the locale dictionaries - and a locale
 * with no entry simply gets no deck. The hero then keeps the single-column
 * layout it had before, which is the right answer while a translated export
 * does not exist: half a megabyte of the wrong language is worse than nothing.
 *
 * The poster is a still of the first slide, rendered ahead of the deck so the
 * hero paints without waiting for it. Generate one at 1320x854 (the frame's own
 * width times 9/16, plus the 112px of presenter chrome) with:
 *
 *   chrome --headless --window-size=1320,854 --virtual-time-budget=4000 \
 *     --screenshot=poster.png file://$PWD/public/decks/<slug>.html
 *   cwebp -q 74 -m 6 -sharp_yuv poster.png -o public/images/hero/deck-poster-<lang>.webp
 */
export interface HeroDeck {
  /** Self-contained export, served verbatim from `public/decks/`. */
  src: string;
  /** Still of the first slide, same framing as the deck itself. */
  poster: string;
}

export const heroDecks: Partial<Record<Lang, HeroDeck>> = {
  nl: {
    src: '/decks/hoi-dit-is-deckyard-nl.html',
    poster: '/images/hero/deck-poster-nl.webp',
  },
};

/**
 * Fixed height of the export's own presenter chrome, in CSS pixels: a 56px
 * title bar and a 56px control bar that do not scale with the frame. An aspect
 * ratio alone would therefore letterbox the slide more and more as the frame
 * narrows, so the embed adds this on top of the 16:9 slide area.
 */
export const DECK_CHROME_PX = 112;
