import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    lang: z.enum(['en', 'nl']).default('en'),
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
  loader: glob({ pattern: '**/*.md', base: 'src/content/releases' }),
  schema: z.object({
    // Semver, e.g. "1.1.0". Doubles as the anchor slug (dots -> dashes).
    version: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'nl']).default('en'),
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
    schema: docsSchema()
  }),
};
