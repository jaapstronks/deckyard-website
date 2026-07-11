import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
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

export const collections = {
  blog,
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema()
  }),
};
