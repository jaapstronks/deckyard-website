// i18n helper functions for Deckyard website

import en from './locales/en.json';
import nl from './locales/nl.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import da from './locales/da.json';
import sv from './locales/sv.json';
import no from './locales/no.json';
import it from './locales/it.json';
import pl from './locales/pl.json';
import fi from './locales/fi.json';

export const defaultLocale = 'en';

export const locales = ['en', 'nl', 'de', 'fr', 'es', 'pt', 'da', 'sv', 'no', 'it', 'pl', 'fi'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  da: 'Dansk',
  sv: 'Svenska',
  no: 'Norsk',
  it: 'Italiano',
  pl: 'Polski',
  fi: 'Suomi',
};

const translations: Record<Locale, typeof en> = {
  en,
  nl,
  de,
  fr,
  es,
  pt,
  da,
  sv,
  no,
  it,
  pl,
  fi,
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment && isValidLocale(segment)) {
    return segment;
  }
  return defaultLocale;
}

export function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);
  const first = segments[0];
  if (first && isValidLocale(first)) {
    return first;
  }
  return defaultLocale;
}

type TranslationKeys = keyof typeof en;
type NestedTranslationKeys<T> = T extends object
  ? { [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${NestedTranslationKeys<T[K]>}` : K) : never }[keyof T]
  : never;

type FlattenedKeys = NestedTranslationKeys<typeof en>;

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Return the key if not found
    }
  }
  return typeof current === 'string' ? current : path;
}

export function t(locale: Locale, key: string): string {
  const translation = translations[locale];
  if (!translation) {
    return getNestedValue(translations[defaultLocale], key);
  }
  const value = getNestedValue(translation, key);
  // Fallback to English if translation is missing
  if (value === key) {
    return getNestedValue(translations[defaultLocale], key);
  }
  return value;
}

export function useTranslations(locale: Locale) {
  return (key: string) => t(locale, key);
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash for processing
  const cleanPath = path.replace(/^\//, '');

  // Check if path already has a locale prefix
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];

  let pathWithoutLocale = cleanPath;
  if (firstSegment && isValidLocale(firstSegment)) {
    // Remove existing locale prefix
    segments.shift();
    pathWithoutLocale = segments.join('/');
  }

  // For default locale, don't add prefix (except for root)
  if (locale === defaultLocale) {
    return '/' + pathWithoutLocale;
  }

  // Add locale prefix
  return '/' + locale + (pathWithoutLocale ? '/' + pathWithoutLocale : '');
}

export function getPathWithoutLocale(path: string): string {
  const cleanPath = path.replace(/^\//, '');
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    segments.shift();
    return '/' + segments.join('/');
  }

  return '/' + cleanPath;
}
