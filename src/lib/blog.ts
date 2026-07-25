// Blog posts, and the two things the collection does not say out loud.
//
// A post's language is the folder it sits in (src/content/blog/<lang>/), not a
// frontmatter field, so its location and its language cannot disagree. That
// also keeps the ids of the two languages apart: the glob loader keys its
// store on the id, and a Dutch post whose slug happened to match an English
// one used to overwrite it with nothing louder than a build warning.
//
// Two files are the same piece of writing when they share a `translationKey`.
// Nothing else links them - a Dutch post is its own file with its own Dutch
// slug - so without that key the language switcher and hreflang have no
// counterpart to point at, and have to fall back to the blog index.

import type { CollectionEntry } from 'astro:content';
import { isLang, localizePath, type Lang } from '@/i18n';

export type Post = CollectionEntry<'blog'>;

/** The language folder a post sits in. */
export function postLang(post: Post): Lang {
  const [dir] = post.id.split('/');
  if (!isLang(dir)) {
    throw new Error(
      `Blog post "${post.id}" is not in a language folder. ` +
        `Move it to src/content/blog/<lang>/, e.g. src/content/blog/en/${post.id}.md`
    );
  }
  return dir;
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
