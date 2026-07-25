// EN locale, assembled from one file per namespace.
import type { Content } from '@/i18n/types';
import { meta } from './meta';
import { nav } from './nav';
import { waitlist } from './waitlist';
import { footer } from './footer';
import { home } from './home';
import { install } from './install';
import { structured } from './structured';
import { anatomy } from './anatomy';
import { blogIndex } from './blogIndex';
import { blogPost } from './blogPost';
import { blogCard } from './blogCard';
import { changelog } from './changelog';

export const en: Content = {
  ...meta,
  nav,
  waitlist,
  footer,
  home,
  install,
  structured,
  anatomy,
  blogIndex,
  blogPost,
  blogCard,
  changelog,
};
