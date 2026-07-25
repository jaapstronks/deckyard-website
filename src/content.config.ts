import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  // Posts live in a folder per language (blog/en/, blog/nl/); that folder is
  // the post's language, so there is no `lang` field to contradict it. See
  // src/lib/blog.ts. Underscore-prefixed files are skipped, so `_template.md`
  // can sit next to the language folders without becoming a post.
  //
  // The id - and therefore the URL - is the file path, minus the language
  // folder that the route strips. One exception worth knowing about: the glob
  // loader honours a `slug:` in frontmatter first, verbatim, and it does so
  // before this schema runs, so it works even though nothing declares it. It
  // stays undeclared on purpose: a post that wants a different URL should get
  // a different filename, not a second place where the URL is decided.
  loader: glob({ pattern: '**/[!_]*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    // The same string on the English and the Dutch file of one post. It is
    // what lets hreflang and the language switcher point at the real
    // counterpart; leave it off and the post is simply untranslated.
    translationKey: z.string().optional(),
    pubDate: z.coerce.date(),
    category: z.string().default('Building in public'),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Jaap Stronks'),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const releases = defineCollection({
  // A release note's language is its folder (releases/en/, releases/nl/), the
  // same rule the blog follows; see src/lib/content.ts. One release therefore
  // has one file per language, both named after the version.
  loader: glob({ pattern: '**/[!_]*.md', base: 'src/content/releases' }),
  schema: z.object({
    // Semver, e.g. "1.1.0". Doubles as the anchor slug (dots -> dashes), so
    // the two languages link to the same anchor on their own changelog page.
    version: z.string(),
    date: z.coerce.date(),
    // One-line framing shown under the version heading.
    summary: z.string(),
    // Short badge next to the version, e.g. "Feature release".
    tag: z.string().optional(),
    // Marks the newest release so the index can flag it "Latest".
    latest: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  releases,
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
};
