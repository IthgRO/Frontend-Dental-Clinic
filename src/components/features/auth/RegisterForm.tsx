import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const validatePhoneNumber = (t: any) => (_: any, value: string) => {
  const phoneRegex = /^\+?\d{10,15}$/
  if (!value) {
    return Promise.reject(t('validation.required'))
  }
  if (!phoneRegex.test(value)) {
    return Promise.reject(t('validation.phone'))
  }
  return Promise.resolve()
}

export interface RegisterFormProps {
  onFinish: (values: any) => void
  isLoading?: boolean
  termsAccepted: boolean
  onTermsChange: (checked: boolean) => void
  showLinks?: boolean
  className?: string
}

export const RegisterForm = ({
  onFinish,
  isLoading,
  termsAccepted,
  onTermsChange,
  showLinks = true,
  className,
}: RegisterFormProps) => {
  const { t } = useAppTranslation('auth')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      validateTrigger="onSubmit"
      className={`space-y-4 ${className}`}
    >
      <Form.Item
        name="firstName"
        label=""
        rules={[{ required: true, message: t('validation.required') }]}
      >
        <Input
          size="large"
          placeholder={t('register.namePlaceholder')}
          className="w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </Form.Item>

      <Form.Item
        name="lastName"
        label=""
        rules={[{ required: true, message: t('validation.required') }]}
      >
        <Input
          size="large"
          placeholder={t('register.surnamePlaceholder')}
          className="w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label=""
        rules={[
          { required: true, message: t('validation.required') },
          { type: 'email', message: t('validation.email') },
        ]}
      >
        <Input
          size="large"
          placeholder={t('register.emailPlaceholder')}
          className="w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </Form.Item>

      <Form.Item name="phone" label="" rules={[{ validator: validatePhoneNumber(t) }]}>
        <Input
          size="large"
          placeholder={t('register.phonePlaceholder')}
          className="w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label=""
        rules={[
          { required: true, message: t('validation.required') },
          { min: 8, message: t('validation.passwordLength') },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message: t('validation.passwordRequirements'),
          },
        ]}
      >
        <div className="relative">
          <Input
            type={passwordVisible ? 'text' : 'password'}
            size="large"
            placeholder={t('register.passwordPlaceholder')}
            className="placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setPasswordVisible(prev => !prev)}
          >
            <img
              src={
                passwordVisible ? '/seePasswordOn.png' : '/seePasswordOff.png'
              }
              alt="Toggle Password Visibility"
              className="w-5 h-5"
            />
          </div>
        </div>
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label=""
        dependencies={['password']}
        rules={[
          { required: true, message: t('validation.required') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(t('validation.passwordsMatch')))
            },
          }),
        ]}
      >
        <div className="relative">
          <Input
            type={confirmPasswordVisible ? 'text' : 'password'}
            size="large"
            placeholder={t('register.confirmPasswordPlaceholder')}
            className="placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setConfirmPasswordVisible(prev => !prev)}
          >
            <img
              src={
                confirmPasswordVisible
                  ? '/seePasswordOn.png'
                  : '/seePasswordOff.png'
              }
              alt="Toggle Password Visibility"
              className="w-5 h-5"
            />
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 cursor-pointer" onClick={() => onTermsChange(!termsAccepted)}>
            <img
              src={termsAccepted ? '/checkBoxOn.png' : '/checkBoxOff.png'}
              alt="Checkbox"
              className="w-full h-full"
            />
          </div>
          <label
            onClick={() => onTermsChange(!termsAccepted)}
            className="cursor-pointer text-gray-700"
          >
            {t('register.termsCheckbox')}
          </label>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
          size="large"
          loading={isLoading}
        >
          {isLoading ? t('register.loadingButton') : t('register.submitButton')}
        </Button>
      </Form.Item>

      {showLinks && (
        <div className="text-center mt-4">
          <p>
            {t('register.haveAccount')}{' '}
            <Link
              to="/login"
              className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
            >
              {t('register.loginLink')}
            </Link>
          </p>
        </div>
      )}
    </Form>
  )
}

export default RegisterForm
