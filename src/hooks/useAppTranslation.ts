import { useTranslation, UseTranslationResponse } from 'react-i18next'

export const useAppTranslation = (namespace: 'auth' | 'common' = 'common') => {
  // @ts-ignore - Ignoring TypeScript depth error once, in a centralized place
  return useTranslation(namespace) as UseTranslationResponse<typeof namespace>
}
