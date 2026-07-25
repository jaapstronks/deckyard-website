// Card -> PNG. Satori lays the card out into SVG, resvg rasterises it.
//
// Both are pure Node, so this runs during `astro build` and the result is a
// plain file in dist/ - no runtime service, nothing to keep alive, nothing to
// pay for. The generated images are also the reason this stays cheap to
// change: edit card.ts, rebuild, all ~150 cards follow.

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { card, WIDTH, HEIGHT, type CardInput } from './card';
import { fonts } from './fonts';

export async function renderOgImage(input: CardInput): Promise<Buffer> {
  // satori's own types expect a React node; the plain object literals in
  // card.ts are the same shape at runtime.
  const svg = await satori(card(input) as never, { width: WIDTH, height: HEIGHT, fonts });

  return new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
    font: { loadSystemFonts: false },
  })
    .render()
    .asPng();
}

export type { CardInput };
