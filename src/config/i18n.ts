import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './languages'

// Define the type for the translation module
type TranslationModule = {
  default: Record<string, any>
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
    // Extract language and namespace from path
    // Example path: '../locales/english/auth.json'
    const pathParts = path.split('/')
    const language = pathParts[pathParts.length - 2] // 'english'
    const namespace = pathParts[pathParts.length - 1].replace('.json', '') // 'auth'

    // Add translations to resources
    if (!resources[language]) {
      resources[language] = {}
    }
    resources[language][namespace] = module.default
  })

  return resources
}

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: loadTranslations(),
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  // Don't need to declare namespaces as they're loaded dynamically
  load: 'languageOnly',
  supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
})

export default i18n

// Type safety for translation keys (basic example)
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      [key: string]: any // You can make this more specific if needed
    }
  }
}
