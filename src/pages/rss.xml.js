import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (
    await getCollection('blog', ({ data }) => !data.draft && (data.lang ?? 'en') === 'en')
  ).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Deckyard blog',
    description:
      'Building Deckyard in the open: an open source presentation platform for European organizations.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.intro,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
