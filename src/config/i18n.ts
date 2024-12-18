import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './languages'

// Define the type for the translation module
type TranslationModule = {
  default: Record<string, any>
}

// Get the stored language or use default
const getInitialLanguage = () => {
  const storedLang = localStorage.getItem('preferredLanguage')
  return storedLang && Object.keys(SUPPORTED_LANGUAGES).includes(storedLang)
    ? storedLang
    : DEFAULT_LANGUAGE
}

// This function loads all translation files dynamically
function loadTranslations() {
  const resources: Record<string, Record<string, any>> = {}

  // Initialize language resources
  Object.keys(SUPPORTED_LANGUAGES).forEach(langCode => {
    resources[langCode] = {}
  })

  // Dynamically import all translation files from the locales directory
  const translationFiles = import.meta.glob<TranslationModule>('../locales/**/*.json', {
    eager: true,
  })

  // Process each translation file
  Object.entries(translationFiles).forEach(([path, module]) => {
    const pathParts = path.split('/')
    const language = pathParts[pathParts.length - 2]
    const namespace = pathParts[pathParts.length - 1].replace('.json', '')

    if (!resources[language]) {
      resources[language] = {}
    }
    resources[language][namespace] = module.default
  })

  return resources
}

i18n.use(initReactI18next).init({
  resources: loadTranslations(),
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
  interpolation: {
    escapeValue: false,
  },
})

// Add a language change listener to persist the selection
i18n.on('languageChanged', lng => {
  localStorage.setItem('preferredLanguage', lng)
})

export default i18n

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      [key: string]: any
    }
  }
}
