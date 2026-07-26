// NL locale, assembled from one file per namespace.
import type { Content } from '@/i18n/types';
import { meta } from './meta';
import { nav } from './nav';
import { waitlist } from './waitlist';
import { footer } from './footer';
import { home } from './home';
import { install } from './install';
import { structured } from './structured';
import { compare } from './compare';
import { accessibility } from './accessibility';
import { hosting } from './hosting';
import { anatomy } from './anatomy';
import { blogIndex } from './blogIndex';
import { blogPost } from './blogPost';
import { blogCard } from './blogCard';
import { changelog } from './changelog';

export const nl: Content = {
  ...meta,
  nav,
  waitlist,
  footer,
  home,
  install,
  structured,
  compare,
  accessibility,
  hosting,
  anatomy,
  blogIndex,
  blogPost,
  blogCard,
  changelog,
};
