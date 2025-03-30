import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from '../public/locales/en/translation.json'
import translationES from '../public/locales/es/translation.json'

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
}

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: resources,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export default i18n
