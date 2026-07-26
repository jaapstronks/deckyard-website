// Numbers the copy quotes about the product itself.
//
// One place, because a figure repeated in two languages on three pages will
// disagree with itself eventually - and on a site that sells verifiability, the
// figure somebody counts is the figure they believe. Copy strings carry a
// `{count}` placeholder (the same trick the footer's `{year}` uses) and the
// component substitutes it, so a locale can never quote a different number.
//
// Not derived at build time: nothing here depends on the core repo, and adding
// a dependency on a sibling checkout to render a marketing page would trade a
// stale number for a build that only works on one machine. Re-count on release.

/**
 * Built-in slide types registered in the core repo
 * (`deckyard/shared/slide-types/types/`), counted 2026-07-26 against
 * `SLIDE_TYPES`.
 *
 * That registry reports 39 on a checkout with custom types present; the extra
 * one is a locally loaded organisation-specific type, which is somebody's own
 * and not something this site can promise. Hence 38.
 */
export const SLIDE_TYPE_COUNT = 38;

/** Substitute the product figures into a copy string. */
export function withFacts(copy: string): string {
  return copy.replace('{count}', String(SLIDE_TYPE_COUNT));
}
