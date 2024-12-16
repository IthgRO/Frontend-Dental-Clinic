import { SUPPORTED_LANGUAGES } from '@/config/languages'
import { Select } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const { Option } = Select

const LanguageSwitcher = () => {
  // @ts-ignore - Ignoring TypeScript depth error, the hook works fine
  const { i18n } = useTranslation()

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang)
    }
  }, [i18n])

  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
    localStorage.setItem('preferredLanguage', value)
  }

  return (
    <Select value={i18n.language} onChange={handleChange} className="w-30" size="middle">
      {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
        <Option key={code} value={code}>
          {lang.flag} {lang.name}
        </Option>
      ))}
    </Select>
  )
}

export default LanguageSwitcher
