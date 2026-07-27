// Abstract layout glyphs for slide types: grey blocks and text bars that show a
// slide's *structure* rather than shrunk-down real content, the way Keynote and
// PowerPoint draw their layout pickers.
//
// This is a port of the grammar deckyard's editor speaks
// (client/lib/slide-authoring/slide-schematic.js), not of its code: core builds
// DOM with an `h()` factory, this builds SVG shape descriptors an Astro
// component renders. What travels between the two repos is the *spec* - the
// small JSON-safe `{ kind, cells, align, ... }` object each slide type declares -
// so the editor and this site draw the same picture from the same data, and the
// mapping stays data rather than a second hand-drawn icon set.
//
// A spec that names a kind this file does not know renders as the neutral
// text-only glyph, which is also what a deprecated type (deliberately without a
// glyph in core) gets.

/** The schematic spec as it comes out of core's registry. */
export interface SchematicSpec {
  kind?: string;
  cells?: number;
  cols?: number;
  rows?: number;
  align?: 'left' | 'center' | 'right';
  mirror?: boolean;
  /** Legacy image/text grammar, from the editor's layout switcher. */
  split?: number;
  corner?: number;
  duo?: number;
  row?: 'top' | 'bottom';
  textCols?: number;
}

/**
 * Paint roles, not colours. The component maps them to tokens, so a schematic
 * on a dark surface is a token flip rather than a second set of shapes.
 */
export type Role = 'fill' | 'line' | 'strong' | 'accent' | 'sky' | 'stroke';

export type Shape =
  | { t: 'rect'; x: number; y: number; w: number; h: number; rx?: number; role: Role }
  | { t: 'circle'; cx: number; cy: number; r: number; role: Role }
  | { t: 'path'; d: string; role: Role; sw?: number; transform?: string }
  | { t: 'text'; x: number; y: number; s: string; size: number; role: Role; anchor?: string };

// The canvas is 16:9 at a size where a 1-unit stroke still reads, so every
// number below is in "slide percent times 1.6".
export const VIEW_W = 160;
export const VIEW_H = 90;
const PAD = 11;
const IN_X = PAD;
const IN_W = VIEW_W - PAD * 2;
const IN_Y = PAD;
const IN_H = VIEW_H - PAD * 2;

// ---------------------------------------------------------------------------
// primitives
// ---------------------------------------------------------------------------

const rect = (x: number, y: number, w: number, h: number, role: Role, rx = 1.5): Shape => ({
  t: 'rect',
  x,
  y,
  w,
  h,
  rx,
  role,
});

const dot = (cx: number, cy: number, r: number, role: Role = 'strong'): Shape => ({
  t: 'circle',
  cx,
  cy,
  r,
  role,
});

/** Left edge of a block of width `w`, honouring the align modifier. */
function anchorX(w: number, align: SchematicSpec['align']): number {
  if (align === 'left') return IN_X;
  if (align === 'right') return VIEW_W - PAD - w;
  return (VIEW_W - w) / 2;
}

/** A stack of text bars from a top edge, each `[width, height]`. */
function bars(
  x: number,
  y: number,
  rows: [number, number][],
  gap = 4,
  role: Role = 'line'
): Shape[] {
  const out: Shape[] = [];
  let cy = y;
  for (const [w, h] of rows) {
    out.push(rect(x, cy, w, h, role));
    cy += h + gap;
  }
  return out;
}

/** Evenly spaced cells inside the content box. */
function grid(cols: number, rows: number, gap = 4) {
  const w = (IN_W - gap * (cols - 1)) / cols;
  const h = (IN_H - gap * (rows - 1)) / rows;
  const cells: { x: number; y: number; w: number; h: number }[] = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      cells.push({ x: IN_X + c * (w + gap), y: IN_Y + r * (h + gap), w, h });
    }
  }
  return cells;
}

/**
 * The duotone landscape that stands in for a photo: sky, sun, hills. An empty
 * grey rectangle read as "missing image" in the picker; a symbolic picture reads
 * as "a picture goes here", which is what the glyph means.
 */
function landscape(x: number, y: number, w: number, h: number): Shape[] {
  const sx = (v: number) => x + (v / 32) * w;
  const sy = (v: number) => y + (v / 18) * h;
  return [
    rect(x, y, w, h, 'sky', 1.5),
    dot(sx(23.5), sy(5), Math.min(w, h) * 0.09, 'fill'),
    {
      t: 'path',
      role: 'fill',
      d:
        `M${sx(0)} ${sy(18)} L${sx(9)} ${sy(10)} L${sx(14.5)} ${sy(13.5)} ` +
        `L${sx(21)} ${sy(7)} L${sx(27)} ${sy(12)} L${sx(32)} ${sy(9)} ` +
        `L${sx(32)} ${sy(18)} Z`,
    },
  ];
}

/** A text block: one heading bar over two body lines. The neutral fallback. */
function textBlock(x: number, y: number, w: number): Shape[] {
  return [
    rect(x, y, w * 0.7, 6, 'strong'),
    ...bars(x, y + 12, [
      [w, 4],
      [w * 0.85, 4],
      [w * 0.55, 4],
    ]),
  ];
}

// Four generic line icons for the icon-cards glyph, so it reads as "icon plus
// label" rather than as avatars. Same four core uses.
const ICONS: Record<string, string> = {
  gear: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8 3.5a8 8 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a8 8 0 0 0-2-1.2l-.4-2.6H8.9l-.4 2.6a8 8 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a8 8 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a8 8 0 0 0 2 1.2l.4 2.6h4.2l.4-2.6a8 8 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.06-.4.1-.8.1-1.2Z',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.3 1 2.1V16h6v-.4c0-.8.4-1.5 1-2.1A6 6 0 0 0 12 3Z',
  star: 'M12 3l2.6 5.6 6 .7-4.4 4.1 1.2 6L12 16.9 6.6 19.5l1.2-6L3.4 9.3l6-.7L12 3Z',
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
};

/**
 * Place a 24x24 icon path in a cell. The path keeps its own coordinates and is
 * moved and scaled by a transform, so the glyphs can be copied from core
 * verbatim instead of being re-projected by hand.
 */
function icon(name: string, cx: number, cy: number, size: number): Shape {
  const k = size / 24;
  return {
    t: 'path',
    role: 'stroke',
    // Stroke width is divided back out of the scale so every icon in the set
    // draws with the same visual weight regardless of cell size.
    sw: 1.7 / k,
    d: ICONS[name],
    transform: `translate(${(cx - size / 2).toFixed(2)} ${(cy - size / 2).toFixed(2)}) scale(${k.toFixed(4)})`,
  };
}

// ---------------------------------------------------------------------------
// the grammar
// ---------------------------------------------------------------------------

/** Map a legacy (kind-less) layout-switcher spec onto a dispatch key. */
function legacyKind(s: SchematicSpec): string {
  if (Number(s.cols) > 1) return 'cols';
  if (Number(s.textCols) > 1) return 'textCols';
  if (Number(s.split) > 0) return 'split';
  if (Number(s.corner) > 0) return 'corner';
  if (Number(s.duo) > 0) return 'duo';
  if (s.row === 'top' || s.row === 'bottom') return 'row';
  return 'text';
}

/* eslint-disable complexity */
/**
 * Turn a schematic spec into the shapes that draw it.
 * @param spec the descriptor a slide type declares; null renders the fallback.
 */
export function schematicShapes(spec: SchematicSpec | null | undefined): Shape[] {
  const s = spec && typeof spec === 'object' ? spec : {};
  const kind = s.kind || legacyKind(s);
  const align = s.align;
  const mirror = !!s.mirror;
  const cells = Number(s.cells);

  switch (kind) {
    // --- text / title family ------------------------------------------------
    case 'title': {
      const w = 84;
      const x = anchorX(w, align);
      return [rect(x, 34, w, 10, 'strong'), rect(x, 50, w * 0.55, 5, 'line')];
    }
    case 'statement': {
      const w = 104;
      const x = anchorX(w, align);
      return [rect(x, 30, w, 11, 'strong'), rect(x, 47, w * 0.62, 11, 'strong')];
    }
    case 'section': {
      const w = 78;
      const x = anchorX(w, align);
      return [
        rect(x, 30, 20, 3, 'accent'),
        rect(x, 39, w, 10, 'strong'),
        rect(x, 55, w * 0.5, 5, 'line'),
      ];
    }
    case 'quote':
      return [
        { t: 'text', x: IN_X, y: 40, s: '“', size: 40, role: 'accent' },
        ...bars(IN_X + 20, 24, [
          [104, 7],
          [104, 7],
          [66, 7],
        ]),
        rect(IN_X + 20, 57, 40, 4, 'line'),
      ];
    case 'oneCol':
      return [
        rect(IN_X, IN_Y, 74, 7, 'strong'),
        ...bars(IN_X, IN_Y + 15, [
          [IN_W, 4],
          [IN_W, 4],
          [IN_W, 4],
          [IN_W * 0.6, 4],
        ]),
      ];
    case 'twoCol': {
      const colW = (IN_W - 8) / 2;
      return [
        rect(IN_X, IN_Y, 74, 7, 'strong'),
        ...bars(IN_X, IN_Y + 15, [
          [colW, 4],
          [colW, 4],
          [colW, 4],
          [colW * 0.6, 4],
        ]),
        ...bars(IN_X + colW + 8, IN_Y + 15, [
          [colW, 4],
          [colW, 4],
          [colW, 4],
          [colW * 0.6, 4],
        ]),
      ];
    }
    case 'bullets':
    case 'numbers': {
      // No title bar: three big rows read more clearly at glyph size than a
      // heading plus five thin ones.
      const out: Shape[] = [];
      for (let i = 0; i < 3; i += 1) {
        const y = 24 + i * 16;
        if (kind === 'numbers') {
          out.push({ t: 'text', x: IN_X, y: y + 7, s: String(i + 1), size: 9, role: 'accent' });
        } else {
          out.push(dot(IN_X + 3, y + 4, 3, 'accent'));
        }
        out.push(rect(IN_X + 14, y, IN_W - 14, 7, 'line'));
      }
      return out;
    }

    // --- media family -------------------------------------------------------
    case 'image':
      return landscape(0, 0, VIEW_W, VIEW_H);
    case 'video':
      return [
        ...landscape(0, 0, VIEW_W, VIEW_H),
        dot(VIEW_W / 2, VIEW_H / 2, 13, 'strong'),
        { t: 'path', role: 'sky', d: 'M76 38 L88 45 L76 52 Z' },
      ];
    case 'code':
      return [
        { t: 'text', x: VIEW_W / 2, y: 53, s: '</>', size: 26, role: 'strong', anchor: 'middle' },
      ];
    case 'embed':
      return [
        rect(IN_X, IN_Y, IN_W, 11, 'fill'),
        dot(IN_X + 6, IN_Y + 5.5, 2, 'strong'),
        dot(IN_X + 13, IN_Y + 5.5, 2, 'strong'),
        dot(IN_X + 20, IN_Y + 5.5, 2, 'strong'),
        rect(IN_X, IN_Y + 14, IN_W, IN_H - 14, 'sky'),
      ];
    case 'gallery':
      return grid(3, 2)
        .slice(0, cells || 6)
        .flatMap((c) => landscape(c.x, c.y, c.w, c.h));
    case 'cards': {
      const cols = Number(s.cols) || 3;
      const rows = Number(s.rows) || 2;
      return grid(cols, rows)
        .slice(0, cells || cols * rows)
        .flatMap((c) => [
          ...landscape(c.x, c.y, c.w, c.h - 7),
          rect(c.x, c.h - 5 + c.y, c.w * 0.7, 4, 'line'),
        ]);
    }
    case 'logos':
      return grid(4, 2)
        .slice(0, cells || 8)
        .map((c) => rect(c.x, c.y + c.h * 0.2, c.w, c.h * 0.6, 'fill', 3));
    case 'partners':
      return [
        rect(anchorX(70, align), 22, 70, 9, 'strong'),
        rect(30, 48, 40, 14, 'fill', 3),
        rect(90, 48, 40, 14, 'fill', 3),
      ];

    // --- structured / data family -------------------------------------------
    case 'blocks':
      return grid(2, 2)
        .slice(0, cells || 4)
        .flatMap((c) => [
          rect(c.x, c.y, c.w, c.h, 'fill'),
          rect(c.x + 5, c.y + 6, c.w * 0.6, 5, 'strong'),
          rect(c.x + 5, c.y + 15, c.w * 0.8, 3.5, 'line'),
        ]);
    case 'iconCards':
      return grid(2, 2).flatMap((c, i) => [
        rect(c.x, c.y, c.w, c.h, 'fill'),
        icon(['gear', 'bulb', 'star', 'bolt'][i], c.x + c.w / 2, c.y + c.h / 2, 16),
      ]);
    case 'kpi':
      return grid(2, 2)
        .slice(0, cells || 4)
        .flatMap((c) => [
          rect(c.x, c.y, c.w, c.h, 'fill'),
          rect(c.x + 5, c.y + 7, c.w * 0.5, 9, 'strong'),
          rect(c.x + 5, c.y + 20, c.w * 0.3, 4, 'accent'),
        ]);
    case 'table': {
      const cols = Number(s.cols) || 3;
      const rows = Number(s.rows) || 3;
      return grid(cols, rows, 2).map((c, i) =>
        rect(c.x, c.y, c.w, c.h, i < cols ? 'strong' : 'fill')
      );
    }
    case 'chart': {
      const heights = [40, 65, 50, 85, 60];
      const bw = 18;
      const gap = (IN_W - heights.length * bw) / (heights.length - 1);
      const base = VIEW_H - PAD - 4;
      return [
        ...heights.map((pc, i) =>
          rect(
            IN_X + i * (bw + gap),
            base - (IN_H - 6) * (pc / 100),
            bw,
            (IN_H - 6) * (pc / 100),
            i === 3 ? 'accent' : 'fill'
          )
        ),
        rect(IN_X, base + 1, IN_W, 1.5, 'strong'),
      ];
    }
    case 'comparison': {
      const panel = (IN_W - 10) / 2;
      return [
        rect(IN_X, IN_Y, panel, 6, 'strong'),
        ...bars(IN_X, IN_Y + 13, [
          [panel, 4],
          [panel * 0.7, 4],
        ]),
        rect(VIEW_W / 2 - 0.75, IN_Y, 1.5, IN_H, 'accent'),
        rect(VIEW_W / 2 + 5, IN_Y, panel, 6, 'strong'),
        ...bars(VIEW_W / 2 + 5, IN_Y + 13, [
          [panel, 4],
          [panel * 0.7, 4],
        ]),
      ];
    }
    case 'matrix':
      return [
        ...grid(2, 2, 3).map((c) => rect(c.x, c.y, c.w, c.h, 'fill')),
        rect(VIEW_W / 2 - 0.75, IN_Y - 3, 1.5, IN_H + 6, 'accent'),
        rect(IN_X - 3, VIEW_H / 2 - 0.75, IN_W + 6, 1.5, 'accent'),
      ];

    // --- flow / relationship family -----------------------------------------
    case 'process': {
      const bw = 36;
      const gap = (IN_W - 3 * bw) / 2;
      const y = VIEW_H / 2 - 11;
      const out: Shape[] = [];
      for (let i = 0; i < 3; i += 1) {
        const x = IN_X + i * (bw + gap);
        out.push(rect(x, y, bw, 22, 'fill'));
        if (i < 2) {
          out.push({
            t: 'path',
            role: 'accent',
            sw: 1.6,
            d: `M${x + bw + 3} ${y + 11} H${x + bw + gap - 3} m-4 -3.5 l4 3.5 l-4 3.5`,
          });
        }
      }
      return out;
    }
    case 'timeline': {
      const y = VIEW_H / 2;
      return [
        rect(IN_X, y - 0.75, IN_W, 1.5, 'fill'),
        ...[0, 1, 2, 3].map((i) => dot(IN_X + 6 + i * ((IN_W - 12) / 3), y, 4, 'accent')),
      ];
    }
    case 'pyramid':
    case 'funnel': {
      const funnel = kind === 'funnel';
      const widths = funnel ? [92, 70, 46] : [46, 70, 92];
      const th = 18;
      // The accent marks the narrow end - a funnel's outcome, a pyramid's apex.
      // Accenting the middle instead made the two glyphs read identically, since
      // the middle tier is the same width in both.
      const point = funnel ? 2 : 0;
      return widths.map((pc, i) => {
        const w = (IN_W * pc) / 100;
        return rect(
          (VIEW_W - w) / 2,
          IN_Y + 5 + i * (th + 3),
          w,
          th,
          i === point ? 'accent' : 'fill'
        );
      });
    }
    case 'cycle': {
      const r = 26;
      return [
        {
          t: 'path',
          role: 'stroke',
          sw: 1.5,
          d: `M${VIEW_W / 2 - r} ${VIEW_H / 2} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`,
        },
        ...[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          return dot(VIEW_W / 2 + Math.cos(a) * r, VIEW_H / 2 + Math.sin(a) * r, 5, 'accent');
        }),
      ];
    }

    // --- interaction family -------------------------------------------------
    case 'poll':
      return [
        rect(IN_X, IN_Y, 74, 6, 'strong'),
        ...[80, 55, 35].map((pc, i) =>
          rect(IN_X, IN_Y + 16 + i * 14, (IN_W * pc) / 100, 10, i === 0 ? 'accent' : 'fill')
        ),
      ];
    case 'bars': {
      const rows = Math.max(3, Math.min(Number(s.rows) || 5, 5));
      const h = (IN_H - 16 - (rows - 1) * 3) / rows;
      return [
        rect(IN_X, IN_Y, 74, 6, 'strong'),
        ...Array.from({ length: rows }, (_, i) =>
          rect(IN_X, IN_Y + 16 + i * (h + 3), IN_W * 0.7, h, 'fill')
        ),
      ];
    }
    case 'slider':
      return [
        rect(IN_X, IN_Y + 6, 74, 6, 'strong'),
        rect(IN_X, VIEW_H / 2 + 6, IN_W, 4, 'fill', 2),
        dot(IN_X + IN_W * 0.62, VIEW_H / 2 + 8, 7, 'accent'),
      ];
    case 'feedback':
      return [
        rect(IN_X, IN_Y, 74, 6, 'strong'),
        rect(IN_X, IN_Y + 15, IN_W, IN_H - 15, 'fill'),
        ...bars(IN_X + 5, IN_Y + 22, [
          [IN_W - 40, 3.5],
          [IN_W - 60, 3.5],
        ]),
      ];
    case 'qr': {
      const size = 40;
      const x = (VIEW_W - size) / 2;
      const y = 16;
      const eye = (ex: number, ey: number): Shape[] => [
        rect(ex, ey, 11, 11, 'strong', 1),
        rect(ex + 3.5, ey + 3.5, 4, 4, 'sky', 0.5),
      ];
      return [
        rect(x, y, size, size, 'fill', 2),
        ...eye(x + 4, y + 4),
        ...eye(x + size - 15, y + 4),
        ...eye(x + 4, y + size - 15),
        rect(x + 22, y + 22, 5, 5, 'strong', 0.5),
        rect(x + 30, y + 30, 5, 5, 'strong', 0.5),
        rect(anchorX(44, align), 64, 44, 4, 'line'),
      ];
    }
    case 'countdown':
      return [rect(anchorX(76, align), 34, 76, 22, 'strong', 3)];

    // --- legacy image/text layout grammar ------------------------------------
    case 'split': {
      const iw = (VIEW_W * Number(s.split)) / 100;
      const img = landscape(mirror ? VIEW_W - iw : 0, 0, iw, VIEW_H);
      const tx = mirror ? PAD : iw + PAD;
      return [...img, ...textBlock(tx, 28, VIEW_W - iw - PAD * 2)];
    }
    case 'corner': {
      const iw = (VIEW_W * Number(s.corner)) / 100;
      const ih = VIEW_H * 0.62;
      const img = landscape(mirror ? VIEW_W - iw : 0, VIEW_H - ih, iw, ih);
      const tx = mirror ? PAD : iw + PAD;
      return [...img, ...textBlock(tx, 20, VIEW_W - iw - PAD * 2)];
    }
    case 'duo': {
      const iw = (VIEW_W * Number(s.duo)) / 100;
      const ix = mirror ? VIEW_W - iw : 0;
      const tx = mirror ? PAD : iw + PAD;
      return [
        ...landscape(ix, 0, iw, VIEW_H / 2 - 1),
        ...landscape(ix, VIEW_H / 2 + 1, iw, VIEW_H / 2 - 1),
        ...textBlock(tx, 28, VIEW_W - iw - PAD * 2),
      ];
    }
    case 'row': {
      const top = s.row === 'top';
      const ih = VIEW_H * 0.46;
      const iy = top ? 0 : VIEW_H - ih;
      const ty = top ? ih + 8 : PAD;
      return [
        ...landscape(0, iy, VIEW_W / 2 - 1, ih),
        ...landscape(VIEW_W / 2 + 1, iy, VIEW_W / 2 - 1, ih),
        ...textBlock(IN_X, ty, IN_W),
      ];
    }
    case 'cols': {
      const n = Math.min(Number(s.cols) || 3, 3);
      return grid(n, 1).flatMap((c) => [
        ...landscape(c.x, c.y, c.w, c.h * 0.55),
        rect(c.x, c.y + c.h * 0.62, c.w, 4, 'line'),
        rect(c.x, c.y + c.h * 0.62 + 8, c.w * 0.6, 4, 'line'),
      ]);
    }
    case 'textCols': {
      const n = Math.min(Math.max(Number(s.textCols) || 2, 2), 3);
      return grid(n, 1).flatMap((c) => textBlock(c.x, c.y, c.w));
    }

    // --- fallback ------------------------------------------------------------
    default:
      return textBlock(IN_X, 26, IN_W);
  }
}
/* eslint-enable complexity */

/**
 * A short human name for a spec, used as the glyph's accessible description
 * when it is the only thing standing in for the type's shape.
 */
export function schematicKind(spec: SchematicSpec | null | undefined): string {
  const s = spec && typeof spec === 'object' ? spec : {};
  return s.kind || legacyKind(s);
}
