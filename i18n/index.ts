import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'i18n/locales/en.json';
import ru from 'i18n/locales/ru.json';
import uk from 'i18n/locales/uk.json';

type BaseStructure = typeof en;

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en satisfies BaseStructure,
    },
    ru: {
      translation: ru satisfies BaseStructure,
    },
    uk: {
      translation: uk satisfies BaseStructure,
    },
  },
});

export default i18n;
