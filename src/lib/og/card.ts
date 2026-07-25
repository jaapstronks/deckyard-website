// The OG card template: one layout, every page.
//
// This is the sharable twin of the site's dark sections - deep green ground,
// brass mono label, Bricolage title, the mark watermarked into the corner - so
// a link to a blog post, a docs page or /hosting reads as the same object as
// the hand-made homepage card it sits next to.
//
// Written as plain satori element objects rather than JSX: this module runs in
// the build, not in a component, and a `h()` helper keeps the file free of a
// JSX runtime it would otherwise have to pull in.

import { display, body, mono } from './fonts';
import { markDataUri } from './mark';

export const WIDTH = 1200;
export const HEIGHT = 630;

// Palette, mirroring src/styles/tokens.css. Duplicated on purpose: satori
// cannot read CSS custom properties, and an OG card that silently followed a
// token change would be a worse surprise than one that stayed put.
const INK = '#f5f3ef';
const BRASS = '#f0c84d';
const GREEN_DEEP = '#10281b';
const GREEN = '#254d38';

type Node = { type: string; props: Record<string, unknown> };

// Satori reads an array `children` as "multiple nodes" even when it holds one,
// and then demands an explicit display on the parent. Unwrapping a lone child
// keeps plain text divs plain.
const h = (type: string, props: Record<string, unknown> = {}, ...children: unknown[]): Node => {
  const kids = children.flat().filter(Boolean);
  return {
    type,
    props: { ...props, ...(kids.length ? { children: kids.length === 1 ? kids[0] : kids } : {}) },
  };
};

export interface CardInput {
  /** The headline. Wraps to at most three lines; longer titles shrink. */
  title: string;
  /** Mono eyebrow, e.g. "Blog", "Docs". Rendered uppercase and spaced out. */
  label?: string;
  /** Second eyebrow item after a middot, e.g. a publication date. */
  meta?: string;
  /** Sits under the title, clamped to two lines. Blog intros, descriptions. */
  intro?: string;
}

/**
 * Titles vary from "Tags" to a full sentence, and a fixed size would either
 * clip the long ones or leave the short ones adrift in the layout. Step down
 * by length so every card fills roughly the same block of space.
 */
function titleSize(title: string): number {
  const n = title.length;
  if (n <= 24) return 92;
  if (n <= 40) return 78;
  if (n <= 60) return 66;
  if (n <= 90) return 56;
  return 46;
}

export function card({ title, label, meta, intro }: CardInput): Node {
  const eyebrow = [label, meta].filter(Boolean).join('   ·   ');

  return h(
    'div',
    {
      style: {
        position: 'relative',
        display: 'flex',
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: GREEN_DEEP,
        backgroundImage:
          `radial-gradient(circle at 88% 6%, rgba(184,134,15,0.20) 0%, rgba(184,134,15,0) 40%), ` +
          `linear-gradient(148deg, ${GREEN_DEEP} 0%, #163620 48%, ${GREEN} 100%)`,
        fontFamily: body,
      },
    },

    // Watermark: the mark bleeding off the bottom-right corner, the same
    // gesture as the homepage card.
    h('img', {
      src: markDataUri('#ffffff'),
      width: 760,
      height: 693,
      style: { position: 'absolute', right: -175, bottom: -195, opacity: 0.042 },
    }),

    // Hairline frame, inset like a mounted print.
    h('div', {
      style: {
        position: 'absolute',
        top: 28,
        left: 28,
        right: 28,
        bottom: 28,
        border: '1px solid rgba(240,200,77,0.22)',
        borderRadius: 26,
      },
    }),

    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '74px 80px',
        },
      },

      // ---- Eyebrow ----
      h(
        'div',
        { style: { display: 'flex', height: 30, alignItems: 'center' } },
        eyebrow &&
          h(
            'div',
            {
              style: {
                fontFamily: mono,
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: BRASS,
              },
            },
            eyebrow
          )
      ),

      // ---- Title + intro ----
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', paddingTop: 24 } },
        h(
          'div',
          {
            style: {
              // Block, not flex: satori only honours lineClamp on block text.
              display: 'block',
              fontFamily: display,
              fontWeight: 800,
              fontSize: titleSize(title),
              lineHeight: 1.04,
              letterSpacing: -1.5,
              color: INK,
              lineClamp: 3,
            },
          },
          title
        ),
        intro &&
          h(
            'div',
            {
              style: {
                display: 'block',
                marginTop: 24,
                fontFamily: body,
                fontSize: 27,
                lineHeight: 1.4,
                color: 'rgba(245,243,239,0.74)',
                lineClamp: 2,
              },
            },
            intro
          )
      ),

      // ---- Footer: logo lockup / domain ----
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center' } },
          h('img', { src: markDataUri(BRASS), width: 46, height: 42 }),
          h(
            'div',
            {
              style: {
                marginLeft: 16,
                fontFamily: display,
                fontWeight: 800,
                fontSize: 40,
                letterSpacing: -0.5,
                color: INK,
              },
            },
            'deckyard'
          )
        ),
        h(
          'div',
          {
            style: {
              fontFamily: mono,
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 2,
              color: BRASS,
            },
          },
          'deckyard.eu'
        )
      )
    )
  );
}
