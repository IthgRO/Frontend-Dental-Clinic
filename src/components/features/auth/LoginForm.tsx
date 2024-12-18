import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export interface LoginFormProps {
  onFinish: (values: { email: string; password: string }) => void
  isLoading?: boolean
  error?: string | null
  showLinks?: boolean
  className?: string
}

export const LoginForm = ({
  onFinish,
  isLoading,
  error,
  showLinks = true,
  className,
}: LoginFormProps) => {
  const { t } = useAppTranslation('auth')
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      validateTrigger="onSubmit"
      className={`space-y-4  ${className}`}
    >
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
          placeholder={t('login.emailPlaceholder')}
          className="placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          disabled={isLoading}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label=""
        rules={[{ required: true, message: t('validation.required') }]}
      >
        <div className="relative">
          <Input
            type={passwordVisible ? 'text' : 'password'}
            size="large"
            placeholder={t('login.passwordPlaceholder')}
            className="placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            disabled={isLoading}
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={() => !isLoading && setPasswordVisible(prev => !prev)}
          >
            <img
              src={passwordVisible ? '/seePasswordOn.png' : '/seePasswordOff.png'}
              alt="Toggle Password Visibility"
              className="w-5 h-5"
            />
          </div>
        </div>
      </Form.Item>

      {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
          size="large"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? t('login.loadingButton') : t('login.submitButton')}
        </Button>
      </Form.Item>

      {showLinks && (
        <div className="text-center mt-4">
          <div className="my-4 border-t border-gray-300"></div>
          <p className="text-center mt-2">
            {t('login.noAccount')}{' '}
            <Link
              to="/register"
              className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
            >
              {t('login.signUpLink')}
            </Link>
          </p>
        </div>
      )}
    </Form>
  )
}
