import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { languages, defaultLang, ui } from '@/i18n';
import { postLang, postUrl } from '@/lib/blog';

// One feed per locale: /rss.xml for EN, /nl/rss.xml for NL, and so on for any
// language added later. Each feed carries only that language's posts.
export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({
    params: { locale: lang === defaultLang ? undefined : lang },
    props: { lang },
  }));
}

export async function GET(context) {
  const { lang } = context.props;
  const t = ui[lang].blogIndex;

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .filter((post) => postLang(post) === lang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: t.feedTitle,
    description: t.feedDescription,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.intro,
      pubDate: post.data.pubDate,
      link: postUrl(post),
    })),
  });
}
