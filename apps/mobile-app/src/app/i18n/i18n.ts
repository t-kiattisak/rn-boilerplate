import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

export const defaultNS = 'common';

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  defaultNS,
  fallbackLng: ['th', 'en'],
  interpolation: {
    escapeValue: false,
  },
  lng: 'th',
  ns: Object.keys(resources.en),
  resources,
});

export const i18nLocale = i18n;
export type { LanguageResources } from './resources';
