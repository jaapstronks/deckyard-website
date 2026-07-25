// Release notes, and the one thing their order cannot be left to.
//
// A release note's language is its folder, the same rule the blog follows -
// see src/lib/content.ts. What is specific to releases is the ordering: two
// versions can share a date (1.1.0 and 1.2.0 were both cut on 2026-07-24), so
// sorting on the date alone leaves the tie to the collection's own order,
// which is alphabetical by id and put 1.1.0 above 1.2.0. The version is the
// authority when the dates agree.

import type { CollectionEntry } from 'astro:content';

export type Release = CollectionEntry<'releases'>;

/** [1, 2, 0] for "1.2.0". Missing or non-numeric parts count as 0. */
function versionParts(version: string): number[] {
  return version.split('.').map((part) => Number.parseInt(part, 10) || 0);
}

/** Newest first: by date, and by version where two releases share a date. */
export function compareReleasesDesc(a: Release, b: Release): number {
  const byDate = b.data.date.valueOf() - a.data.date.valueOf();
  if (byDate !== 0) return byDate;

  const left = versionParts(a.data.version);
  const right = versionParts(b.data.version);
  const depth = Math.max(left.length, right.length);
  for (let i = 0; i < depth; i++) {
    const diff = (right[i] ?? 0) - (left[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}
