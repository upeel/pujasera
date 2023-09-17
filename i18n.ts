import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detectorLanguage from 'i18next-browser-languagedetector'
import commonId from './src/locales/id/common.json'
import commonEn from './src/locales/en/common.json'

const resources = {
  id: {
    common: commonId
  },
  en: {
    common: commonEn
  }
}
i18n
  .use(detectorLanguage)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.MODE !== 'production',
    defaultNS: 'common',
    ns: ['common', 'form'],
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false
    },
    resources: resources,
    supportedLngs: ['id', 'en']
  })

export default i18n
