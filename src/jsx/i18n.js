import metaEn from './../meta.en.json';
import metaEs from './../meta.es.json';
import metaFr from './../meta.fr.json';

export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'];
export const DEFAULT_LANGUAGE = 'en';

const META_BY_LANGUAGE = {
  en: metaEn,
  es: metaEs,
  fr: metaFr
};

export function resolveLanguage(container) {
  const queryLang = new URLSearchParams(window.location.search).get('lang');
  if (SUPPORTED_LANGUAGES.includes(queryLang)) return queryLang;

  const attrLang = container?.getAttribute('lang');
  if (SUPPORTED_LANGUAGES.includes(attrLang)) return attrLang;

  // Primary mechanism: unctad.org serves translated pages under a /fr/ or /es/ path
  // segment (e.g. unctad.org/fr/...), so detect the language from the URL path first.
  const pathLang = window.location.pathname.split('/').find(segment => SUPPORTED_LANGUAGES.includes(segment));
  if (pathLang) return pathLang;

  return DEFAULT_LANGUAGE;
}

export function getMeta(lang) {
  return META_BY_LANGUAGE[lang] ?? META_BY_LANGUAGE[DEFAULT_LANGUAGE];
}
