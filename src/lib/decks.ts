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
 * hero paints without waiting for it. Same framing as the embed: 16:9, and
 * `?ui=min` so the still has no chrome the frame will not have either.
 *
 *   chrome --headless --window-size=1320,743 --virtual-time-budget=4000 \
 *     --screenshot=poster.png "file://$PWD/public/decks/<slug>.html?ui=min"
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
  // The two decks are not translations of each other and do not need to be. The
  // Dutch one introduces Deckyard; this one is a deck somebody would actually
  // give - a lemonade stand reporting a quarter to its investors - which is the
  // better demonstration now that the page around it explains the product. 1.17
  // MB, and none of it fetched until somebody presses play.
  en: {
    src: '/decks/sunnyside-lemonade-stand-en.html',
    poster: '/images/hero/deck-poster-en.webp',
  },
};
