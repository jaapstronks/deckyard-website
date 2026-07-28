// Locale registry, copy lookup and routing helpers for the marketing site.
//
// Adding a language is meant to be additive, never a refactor:
//   1. add the code to `languages` below,
//   2. create src/i18n/locales/<code>/ with the namespaces you have translated
//      (start with meta.ts; everything else is optional),
//   3. register it in `overrides`.
// Anything you leave out falls back to EN, so a half-translated language still
// builds and still reads. Pages are generated from `locales` by the
// [...locale] routes, so no page file has to be copied per language.
//
// Docs (Starlight) are English-only and deliberately outside this system: see
// the comment in astro.config.mjs about not setting Astro's global i18n.
//
// Editorial copy in locales/ is outgoing marketing text: keep it natural, and
// in Dutch avoid em dashes (use " - " or ";"). Functional strings (aria
// labels, placeholders) may stay pragmatic.

import type { Content, DeepPartial } from '@/i18n/types';
import { en } from '@/i18n/locales/en';
import { nl } from '@/i18n/locales/nl';

export type { Content } from '@/i18n/types';

/** Display names are shown in the language switcher, in their own language. */
export const languages = {
  en: 'English',
  nl: 'Nederlands',
} as const;

export type Lang = keyof typeof languages;

/** The default locale is served at the root with no path prefix. */
export const defaultLang: Lang = 'en';

/**
 * Non-default locales. Typed as partial so a language can ship incomplete;
 * missing keys are filled from EN by the merge below.
 */
const overrides: Record<Exclude<Lang, typeof defaultLang>, DeepPartial<Content>> = {
  nl,
};

/**
 * Fill gaps in `partial` from `base`. Arrays and non-plain values are taken
 * whole: a locale that translates a list translates all of it, so half an
 * array from EN and half from NL never gets stitched together.
 */
function withFallback<T>(base: T, partial: DeepPartial<T> | undefined): T {
  if (partial === undefined) return base;
  if (Array.isArray(base) || typeof base !== 'object' || base === null) {
    return partial as T;
  }
  const out = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(partial as Record<string, unknown>)) {
    if (value === undefined) continue;
    out[key] = withFallback((base as Record<string, unknown>)[key], value as DeepPartial<unknown>);
  }
  return out as T;
}

/** Every locale, complete: `ui[lang].home.heroTitleMain` always resolves. */
export const ui: Record<Lang, Content> = Object.fromEntries(
  (Object.keys(languages) as Lang[]).map((lang) => [
    lang,
    lang === defaultLang ? en : withFallback(en, overrides[lang as Exclude<Lang, 'en'>]),
  ])
) as Record<Lang, Content>;

// ---- Sandbox ---------------------------------------------------------------

/**
 * Live hosted playground: the Deckyard editor anyone can try without installing.
 *
 * Not a full Deckyard, and copy must not say so. `SANDBOX_MODE` in the core repo
 * switches off AI (a public anonymous playground plus per-prompt LLM cost is an
 * open-ended bill), uploads and scope changes, which is why publishing is not
 * available; decks expire and exports carry a watermark. Anything the site sends
 * a reader here to try has to be something that works with those off.
 */
export const sandboxBaseUrl = 'https://sandbox.deckyard.eu';

/**
 * Open the sandbox in the same language as the site the visitor came from.
 * The sandbox reads `?lang=` (validated against its locale manifest) and sets
 * the anonymous session locale, precedence URL-param > localStorage > default.
 * See deckyard#317. Our lang codes match the sandbox's manifest tags.
 */
export function sandboxUrl(lang: Lang): string {
  return `${sandboxBaseUrl}/?lang=${lang}`;
}

// ---- Routing helpers -------------------------------------------------------

/** True when `value` is a locale we actually serve. */
export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages;
}

/** Detect the active locale from a URL pathname (e.g. /nl/blog/ -> 'nl'). */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return isLang(seg) ? seg : defaultLang;
}

/**
 * Turn a logical path (always the EN/root form, starting with '/') into the
 * URL for a given locale. Default locale keeps the bare path; others get a
 * '/<lang>' prefix.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/**
 * Split a pathname into its locale and the logical (root-form) path. Used by
 * the language switcher to build the counterpart URL for the current page.
 */
export function stripLangFromPath(pathname: string): { lang: Lang; path: string } {
  const parts = pathname.split('/');
  const seg = parts[1];
  if (isLang(seg) && seg !== defaultLang) {
    const rest = '/' + parts.slice(2).join('/');
    return { lang: seg, path: rest === '/' ? '/' : rest };
  }
  return { lang: defaultLang, path: pathname };
}

/**
 * The `params.locale` value each [...locale] route needs, one entry per
 * language: `undefined` for the default locale so it builds at the root, the
 * code itself for the rest. Use in getStaticPaths().
 */
export function localeParams(): {
  params: { locale: string | undefined };
  props: { lang: Lang };
}[] {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    params: { locale: lang === defaultLang ? undefined : lang },
    props: { lang },
  }));
}
