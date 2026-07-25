// Which pages get a generated card, and what goes on it.
//
// One list, read twice: the /og/[...path].png endpoint builds an image for
// every entry, and SiteLayout (plus the Starlight Head override) looks up the
// current page in the same list to point og:image at it. Because both sides
// read this module, a page can never advertise a card that was not generated.

import { getCollection } from 'astro:content';
import { ui, languages, localizePath, type Lang, type Content } from '@/i18n';
import type { CardInput } from './card';

/** A page path (no trailing slash, '' for the site root) and its card copy. */
export interface OgTarget {
  path: string;
  input: CardInput;
}

/**
 * Marketing pages, one entry per route under src/pages/[...locale]/.
 * The card takes the page's own hero copy rather than its <title>, because the
 * hero is the human sentence and the meta title carries an SEO suffix.
 *
 * The homepage is deliberately absent: it keeps the hand-made card in
 * public/images/og/, which sells the product rather than naming a page.
 */
const marketingPages: { path: string; card: (t: Content) => CardInput }[] = [
  {
    path: '/blog',
    card: (t) => ({ label: t.nav.blog, title: t.blogIndex.title, intro: t.blogIndex.intro }),
  },
  {
    path: '/changelog',
    card: (t) => ({ label: t.nav.changelog, title: t.changelog.title, intro: t.changelog.intro }),
  },
  {
    path: '/hosting',
    card: (t) => ({
      label: t.hosting.heroKicker,
      title: t.hosting.heroTitle,
      intro: t.hosting.heroIntro,
    }),
  },
  {
    path: '/structured-slides',
    card: (t) => ({
      label: t.structured.kicker,
      title: t.structured.title,
      intro: t.structured.dek,
    }),
  },
];

/** Strip the trailing slash so '/hosting/' and '/hosting' are one key. */
export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed.startsWith('/') || trimmed === '' ? trimmed : `/${trimmed}`;
}

/** '/nl/blog/de-code-staat-online' -> '/og/nl/blog/de-code-staat-online.png' */
export function ogPathFor(pathname: string): string {
  const path = normalizePath(pathname);
  return `/og${path === '' ? '/index' : path}.png`;
}

/** 'docs/slide-types/data' -> 'Slide types', the section a docs page sits in. */
function docsSection(id: string): string | undefined {
  const [, section, ...rest] = id.split('/');
  if (!section || rest.length === 0) return undefined;
  const words = section.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

async function collectTargets(): Promise<OgTarget[]> {
  const targets: OgTarget[] = [];

  for (const lang of Object.keys(languages) as Lang[]) {
    const t = ui[lang];
    for (const page of marketingPages) {
      targets.push({
        path: normalizePath(localizePath(page.path, lang)),
        input: page.card(t),
      });
    }
  }

  // Blog posts carry their own language, so each post produces exactly one
  // card, in the locale it was written in.
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  for (const post of posts) {
    const lang = (post.data.lang ?? 'en') as Lang;
    const t = ui[lang];
    targets.push({
      path: normalizePath(localizePath(`/blog/${post.id}`, lang)),
      input: {
        label: t.nav.blog,
        meta: new Intl.DateTimeFormat(t.blogPost.dateLocale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(post.data.pubDate),
        title: post.data.title,
        intro: post.data.description ?? post.data.intro,
      },
    });
  }

  // Docs are English-only (see astro.config.mjs), so no locale loop here.
  const docs = await getCollection('docs');
  for (const entry of docs) {
    targets.push({
      path: normalizePath(`/${entry.id}`),
      input: {
        label: ui.en.nav.docs,
        meta: docsSection(entry.id),
        title: entry.data.title,
        intro: entry.data.description,
      },
    });
  }

  return targets;
}

// The collections are read once per build, not once per page: SiteLayout asks
// for a lookup on every one of the ~150 pages it renders.
let cache: Promise<Map<string, CardInput>> | undefined;

function targetMap(): Promise<Map<string, CardInput>> {
  cache ??= collectTargets().then((list) => new Map(list.map((t) => [t.path, t.input])));
  return cache;
}

export async function ogTargets(): Promise<OgTarget[]> {
  return [...(await targetMap())].map(([path, input]) => ({ path, input }));
}

/**
 * The generated card for a page, or undefined when that page has none - the
 * caller then keeps whatever default it had.
 */
export async function ogImageForPath(pathname: string): Promise<string | undefined> {
  const path = normalizePath(pathname);
  return (await targetMap()).has(path) ? ogPathFor(path) : undefined;
}
