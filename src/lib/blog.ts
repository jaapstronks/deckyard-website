// Blog posts, and the thing the collection does not say out loud.
//
// A post's language is the folder it sits in - see src/lib/content.ts for why
// that is a folder and not a field. What is specific to the blog is pairing:
// two files are the same piece of writing when they share a `translationKey`.
// Nothing else links them - a Dutch post is its own file with its own Dutch
// slug - so without that key the language switcher and hreflang have no
// counterpart to point at, and have to fall back to the blog index.

import type { CollectionEntry } from 'astro:content';
import { localizePath, type Lang } from '@/i18n';
import { langFromFolder } from '@/lib/content';

export type Post = CollectionEntry<'blog'>;

/** The language folder a post sits in. */
export function postLang(post: Post): Lang {
  return langFromFolder(post.id, 'blog');
}

/** The URL slug: the id minus its language folder. */
export function postSlug(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

/** '/nl/blog/waar-je-slides-eigenlijk-staan/' */
export function postUrl(post: Post): string {
  return localizePath(`/blog/${postSlug(post)}/`, postLang(post));
}

/**
 * Where this post can be read in every language it exists in, itself included.
 * A post without a `translationKey` is a set of one.
 *
 * `all` must be the same list the routes build from: a translation that is
 * still a draft is not a translation the site can link to yet.
 */
export function postLocaleUrls(post: Post, all: Post[]): Partial<Record<Lang, string>> {
  const key = post.data.translationKey;
  const siblings = key ? all.filter((p) => p.data.translationKey === key) : [post];

  const urls: Partial<Record<Lang, string>> = {};
  for (const sibling of siblings) {
    const lang = postLang(sibling);
    const seen = urls[lang];
    if (seen) {
      throw new Error(
        `Two ${lang} posts share translationKey "${key}": ${seen} and ${postUrl(sibling)}. ` +
          `A key ties one post per language together.`
      );
    }
    urls[lang] = postUrl(sibling);
  }
  return urls;
}
