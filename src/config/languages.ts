export const SUPPORTED_LANGUAGES = {
  english: {
    code: 'english',
    name: 'English',
    flag: '🇬🇧',
  },
  norwegian: {
    code: 'norwegian',
    name: 'Norsk',
    flag: '🇳🇴',
  },
  icelandic: {
    code: 'icelandic',
    name: 'Íslenska',
    flag: '🇮🇸',
  },
  swedish: {
    code: 'swedish',
    name: 'Svenska',
    flag: '🇸🇪',
  },
} as const

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

export const DEFAULT_LANGUAGE: LanguageCode = 'english'

// Helper function to get all available namespaces
export function getAvailableNamespaces(): string[] {
  const translationFiles = import.meta.glob('../locales/english/*.json', { eager: true })
  return Object.keys(translationFiles).map(path => {
    const parts = path.split('/')
    return parts[parts.length - 1].replace('.json', '')
  })
}
