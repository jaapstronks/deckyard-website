// Fonts for the OG-card renderer.
//
// Satori needs real font binaries and reads ttf/otf/woff - not woff2, which is
// all the @fontsource packages the site ships. So the three faces the card
// actually uses are vendored here as static TTF instances pulled from Google
// Fonts (same families as the site: Bricolage Grotesque for the title, Funnel
// Sans for the intro, Space Mono for the label). Vendoring keeps the build
// hermetic: no network call while generating ~150 images.
//
// They come in through Vite's `?inline` (a base64 data URI) rather than fs,
// because this module is bundled before it runs: a path relative to the source
// file no longer exists by the time the build renders the cards.

import type { SatoriOptions } from 'satori';
import bricolage from './fonts/bricolage-800.ttf?inline';
import funnel from './fonts/funnel-400.ttf?inline';
import spaceMono from './fonts/spacemono-700.ttf?inline';

const decode = (dataUri: string) => Buffer.from(dataUri.slice(dataUri.indexOf(',') + 1), 'base64');

export const display = 'Bricolage Grotesque';
export const body = 'Funnel Sans';
export const mono = 'Space Mono';

export const fonts: SatoriOptions['fonts'] = [
  { name: display, data: decode(bricolage), weight: 800, style: 'normal' },
  { name: body, data: decode(funnel), weight: 400, style: 'normal' },
  { name: mono, data: decode(spaceMono), weight: 700, style: 'normal' },
];
