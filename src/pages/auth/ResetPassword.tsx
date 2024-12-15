import { useAppTranslation } from '@/hooks/useAppTranslation'
import { authService } from '@/services/auth.service'
import { Button, Form, Input, message, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const { Title } = Typography

const ResetPassword = () => {
  const { t } = useAppTranslation('auth')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    const token = searchParams.get('token')
    if (!token) {
      message.error(t('resetPassword.invalidToken'))
      return
    }

    if (values.password !== values.confirmPassword) {
      message.error(t('resetPassword.passwordsDontMatch'))
      return
    }

    setLoading(true)
    try {
      await authService.resetPassword(token, values.password)
      message.success(t('resetPassword.success'))
      navigate('/login')
    } catch (error: any) {
      message.error(error.response?.data?.message || t('resetPassword.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={3}>{t('resetPassword.title')}</Title>
      </div>
      <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit">
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
              placeholder={t('resetPassword.passwordPlaceholder')}
              className="placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(prev => !prev)}
            >
              <img
                src={
                  passwordVisible
                    ? '/src/assets/seePasswordOn.png'
                    : '/src/assets/seePasswordOff.png'
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
              placeholder={t('resetPassword.confirmPasswordPlaceholder')}
              className="placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setConfirmPasswordVisible(prev => !prev)}
            >
              <img
                src={
                  confirmPasswordVisible
                    ? '/src/assets/seePasswordOn.png'
                    : '/src/assets/seePasswordOff.png'
                }
                alt="Toggle Password Visibility"
                className="w-5 h-5"
              />
            </div>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
          >
            {t('resetPassword.submitButton')}
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        <p>
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
          >
            {t('resetPassword.backToLogin')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
