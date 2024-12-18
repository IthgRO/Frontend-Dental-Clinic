import { useTranslation, UseTranslationResponse } from 'react-i18next'

// Define all available translation namespaces
export type TranslationNamespace =
  | 'auth'
  | 'common'
  | 'appointments'
  | 'dentists'
  | 'landing'
  | 'profile'

export const useAppTranslation = (namespace: TranslationNamespace = 'common') => {
  // @ts-ignore - Ignoring TypeScript depth error once, in a centralized place
  return useTranslation(namespace) as UseTranslationResponse<typeof namespace>
}
