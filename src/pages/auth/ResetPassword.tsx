import { useAppTranslation } from '@/hooks/useAppTranslation'
import { authService } from '@/services/auth.service'
import { Button, Form, Input, message, Typography } from 'antd'
import { useState, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import PasswordValidation from '@/components/features/auth/PasswordValidation'

const { Title } = Typography

interface ResetPasswordForm {
  code: string
  newPassword: string
  confirmPassword: string
}

const ResetPassword = () => {
  const { t } = useAppTranslation('auth')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [form] = Form.useForm()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const passwordContainerRef = useRef<HTMLDivElement>(null)
  const email = searchParams.get('email')

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    form.setFieldsValue({ newPassword })
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value
    setConfirmPassword(newConfirmPassword)
    form.setFieldsValue({ confirmPassword: newConfirmPassword })
  }

  const handleValidationChange = (isValid: boolean) => {
    setIsPasswordValid(isValid)
  }

  const onFinish = async (values: ResetPasswordForm) => {
    if (!email) {
      message.error(t('resetPassword.emailRequired') || 'Email is required')
      return
    }

    if (!isPasswordValid) {
      message.error(t('validation.invalidPassword') || 'Please enter a valid password')
      return
    }

    setLoading(true)
    try {
      await authService.changePassword({
        email,
        code: values.code,
        newPassword: values.newPassword,
      })
      message.success(t('resetPassword.success') || 'Password successfully reset')
      navigate('/login')
    } catch (error: any) {
      message.error(
        error.response?.data?.message || t('resetPassword.error') || 'Failed to reset password'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!email) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">
          {t('resetPassword.emailRequired') || 'Email is required'}
        </p>
        <Link
          to="/forgot-password"
          className="text-teal-600 font-semibold hover:text-teal-600 hover:underline"
        >
          {t('resetPassword.backToForgotPassword') || 'Back to Reset Request'}
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-teal-100 p-3 rounded-full">
            <KeyRound className="w-6 h-6 text-teal-600" />
          </div>
        </div>
        <Title level={3}>{t('resetPassword.title') || 'Reset Password'}</Title>
        <p className="text-gray-600 mt-2">
          {t('resetPassword.instruction', { email }) ||
            `Enter the verification code sent to ${email}`}
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-6">
        {/* Code input */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t('resetPassword.enterCode') || 'Verification Code'}
            </span>
          </div>
        </div>

        <Form.Item
          name="code"
          rules={[{ required: true, message: t('validation.required') || 'Required' }]}
        >
          <Input
            size="large"
            placeholder="000000"
            className="font-mono text-center tracking-widest placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>

        {/* New Password section */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {t('resetPassword.newPassword') || 'New Password'}
            </span>
          </div>
        </div>

        <div ref={passwordContainerRef}>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: t('validation.required') || 'Required' }]}
          >
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  size="large"
                  placeholder={t('resetPassword.passwordPlaceholder') || 'Enter new password'}
                  className="pr-10 placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  onChange={handlePasswordChange}
                  value={password}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
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
          dependencies={['newPassword']}
          rules={[
            { required: true, message: t('validation.required') || 'Required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(t('validation.passwordsMatch') || 'Passwords must match')
                )
              },
            }),
          ]}
          validateFirst={true}
        >
          <div className="relative">
            <Input
              type={confirmPasswordVisible ? 'text' : 'password'}
              size="large"
              placeholder={t('resetPassword.confirmPasswordPlaceholder') || 'Confirm new password'}
              className="pr-10 placeholder:text-gray-400 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {confirmPasswordVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </Form.Item>

        <Form.Item className="mb-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 rounded-md"
            size="large"
            loading={loading}
            disabled={loading || !isPasswordValid}
          >
            {t('resetPassword.submitButton') || 'Reset Password'}
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <Link
          to="/login"
          className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
        >
          {t('resetPassword.backToLogin') || 'Back to Login'}
        </Link>
      </div>
    </div>
  )
}

export default ResetPassword
