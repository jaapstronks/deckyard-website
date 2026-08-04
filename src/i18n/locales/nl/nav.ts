import type { NavContent } from '@/i18n/types';

export const nav: NavContent = {
  sandbox: 'Probeer',
  howItWorks: 'Hoe het werkt',
  features: 'Functies',
  blog: 'Blog',
  hosting: 'Hosting',
  compare: 'Vergeleken',
  accessibility: 'Toegankelijkheid',
  spec: 'Formaat',
  changelog: 'Changelog',
  // The docs are English-only (see astro.config.mjs), so the Dutch nav says so
  // rather than sending someone to a language switch that does not exist.
  docs: 'Docs (EN)',
  github: 'GitHub',
  homeAria: 'Deckyard startpagina',
  languageAria: 'Taal',
  menuAria: 'Menu',
  themeAria: 'Donker thema',
};
