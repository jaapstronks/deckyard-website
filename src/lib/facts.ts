// Numbers the copy quotes about the product itself.
//
// One place, because a figure repeated in two languages on three pages will
// disagree with itself eventually - and on a site that sells verifiability, the
// figure somebody counts is the figure they believe. Copy strings carry a
// `{count}` placeholder (the same trick the footer's `{year}` uses) and the
// component substitutes it, so a locale can never quote a different number.
//
// The figure itself is no longer typed here: it is read off
// src/data/slide-types.json, generated from the core registry by
// `npm run sync-slide-types`. It used to be hand-counted, and by the time anyone
// checked, this site was quoting 36, 38 and 44 in three different places.

import { slideTypeCount, slideTypeAudienceCount } from '@/lib/slideTypes';

/** Built-in slide types in core, excluding anything a fork adds locally. */
export const SLIDE_TYPE_COUNT = slideTypeCount;

/** Of those, the ones the audience takes part in. */
export const AUDIENCE_TYPE_COUNT = slideTypeAudienceCount;

/** Substitute the product figures into a copy string. */
export function withFacts(copy: string): string {
  return copy
    .replace('{count}', String(SLIDE_TYPE_COUNT))
    .replace('{audienceCount}', String(AUDIENCE_TYPE_COUNT));
}
