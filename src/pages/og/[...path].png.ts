// Every generated OG card, rendered at build time into dist/og/**.png.
//
// The route mirrors the page it belongs to: /nl/blog/de-code-staat-online ->
// /og/nl/blog/de-code-staat-online.png. Which pages exist here is decided by
// src/lib/og/targets.ts, the same list the layouts read.

import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '@/lib/og/render';
import { ogTargets } from '@/lib/og/targets';
import type { CardInput } from '@/lib/og/card';

export const getStaticPaths: GetStaticPaths = async () =>
  (await ogTargets()).map(({ path, input }) => ({
    // '' (the site root) would give an empty rest parameter, which Astro will
    // not build; targets.ts never emits it, but keep the fallback honest.
    params: { path: path.replace(/^\//, '') || 'index' },
    props: { input },
  }));

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.input as CardInput);

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
