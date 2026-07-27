// The spec section's icon set.
//
// Lucide paths, inlined rather than pulled in as a dependency: seven glyphs do
// not justify a package, and the build already vendors what it needs (the OG
// fonts do the same). Every path is drawn on a 24x24 box with no fill, so the
// wrapper in SpecIcon.astro can set the stroke to currentColor and the icon
// inherits whatever surface it lands on - the same token-flip rule the rest of
// the site follows.
//
// Structural data, not copy: an icon is a role, not a sentence, so it lives here
// beside the components and never in a locale file.

export const SPEC_ICONS = {
  /** A file with angle brackets in it. The deck format: JSON you can read. */
  'file-code':
    '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m10 12.5-2 2.5 2 2.5" /><path d="m14 12.5 2 2.5-2 2.5" />',

  /** A sealed box. The deck package: the data with its pixels inside it. */
  package:
    '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /><path d="m7.5 4.27 9 5.15" />',

  /** One line branching into several. One declaration, four consumers. */
  split:
    '<path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" /><path d="m15 9 6-6" />',

  /** Braces. Meaning rather than coordinates. */
  braces:
    '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',

  /** A machine that reads. The same contract a person is shown. */
  bot: '<path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />',

  /** Two lines that separate. The envelope version and the content version. */
  'git-branch':
    '<line x1="6" x2="6" y1="3" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />',

  /** A shield with a tick. Degradation that was designed, not survived. */
  'shield-check':
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />',
} as const;

export type SpecIconName = keyof typeof SPEC_ICONS;
