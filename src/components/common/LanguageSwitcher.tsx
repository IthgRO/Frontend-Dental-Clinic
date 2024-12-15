import { SUPPORTED_LANGUAGES } from '@/config/languages'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

const { Option } = Select

const LanguageSwitcher = () => {
  // @ts-ignore - Ignoring TypeScript depth error, the hook works fine
  const { i18n } = useTranslation()

  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
    localStorage.setItem('preferredLanguage', value)
  }

  return (
    <Select defaultValue={i18n.language} onChange={handleChange} className="w-40" size="middle">
      {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
        <Option key={code} value={code}>
          {lang.flag} {lang.name}
        </Option>
      ))}
    </Select>
  )
}

export default LanguageSwitcher
