import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Button, Form, Input, Modal } from 'antd'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import PasswordValidation from './PasswordValidation'

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
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [password, setPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const passwordContainerRef = useRef<HTMLDivElement>(null)

  const showTermsModal = () => setIsTermsModalVisible(true)
  const closeTermsModal = () => setIsTermsModalVisible(false)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    form.setFieldsValue({ password: e.target.value })
  }

  const handleValidationChange = (isValid: boolean) => {
    setIsPasswordValid(isValid)
  }

  return (
    <Form
      form={form}
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
          className="max-w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          disabled={isLoading}
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
          className="max-w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          disabled={isLoading}
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
          className="max-w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          disabled={isLoading}
        />
      </Form.Item>

      <Form.Item name="phone" label="" rules={[{ validator: validatePhoneNumber(t) }]}>
        <Input
          size="large"
          placeholder={t('register.phonePlaceholder')}
          className="max-w-[276px] placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          disabled={isLoading}
        />
      </Form.Item>

      <div ref={passwordContainerRef}>
        <Form.Item
          name="password"
          label=""
          rules={[{ required: true, message: t('validation.required') }]}
        >
          <div className="space-y-2">
            <div className="relative">
              <Input
                type={passwordVisible ? 'text' : 'password'}
                size="large"
                placeholder={t('register.passwordPlaceholder')}
                className="placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                disabled={isLoading}
                onChange={handlePasswordChange}
                value={password}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => !isLoading && setPasswordVisible(prev => !prev)}
              >
                <img
                  src={passwordVisible ? '/seePasswordOff.png' : '/seePasswordOn.png'}
                  alt="Toggle Password Visibility"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <PasswordValidation
              password={password}
              onValidationChange={handleValidationChange}
              containerRef={passwordContainerRef}
              isInputFocused={isPasswordFocused}
            />
          </div>
        </Form.Item>
      </div>

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
            disabled={isLoading}
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={() => !isLoading && setConfirmPasswordVisible(prev => !prev)}
          >
            <img
              src={confirmPasswordVisible ? '/seePasswordOff.png' : '/seePasswordOn.png'}
              alt="Toggle Password Visibility"
              className="w-5 h-5"
            />
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 cursor-pointer"
            onClick={() => !isLoading && onTermsChange(!termsAccepted)}
          >
            <img
              src={termsAccepted ? '/checkBoxOn.png' : '/checkBoxOff.png'}
              alt="Checkbox"
              className="w-full h-full"
            />
          </div>
          <label onClick={showTermsModal} className="cursor-pointer text-gray-700 hover:underline">
            {t('register.termsCheckbox')}
          </label>
        </div>
      </Form.Item>

      <Modal
        title={t('register.termsAndConditionsTitle')}
        open={isTermsModalVisible}
        onCancel={closeTermsModal}
        footer={[
          <Button
            key="close"
            className="bg-teal-600 hover:bg-teal-600 rounded-md"
            type="primary"
            onClick={closeTermsModal}
            disabled={isLoading}
          >
            {t('register.closeButton')}
          </Button>,
        ]}
      >
        {t('register.termsAndConditions')}
      </Modal>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
          size="large"
          loading={isLoading}
          disabled={isLoading || !termsAccepted || !isPasswordValid}
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
