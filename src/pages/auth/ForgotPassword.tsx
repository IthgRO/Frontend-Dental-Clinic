import { useAppTranslation } from '@/hooks/useAppTranslation'
import { authService } from '@/services/auth.service'
import { Button, Form, Input, message, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography

const ForgotPassword = () => {
  const { t } = useAppTranslation('auth')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: { email: string }) => {
    setLoading(true)
    try {
      await authService.sendPasswordResetCode(values.email)
      message.success(t('forgotPassword.codeSent'))
      // Navigate to reset password page with email
      navigate(`/reset-password?email=${encodeURIComponent(values.email)}`)
    } catch (error: any) {
      message.error(error.response?.data?.message || t('forgotPassword.sendError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={3}>{t('forgotPassword.title')}</Title>
      </div>
      <p className="text-center text-gray-600 mb-6">{t('forgotPassword.instruction')}</p>
      <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit" className="space-y-4">
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
            placeholder={t('forgotPassword.emailPlaceholder')}
            className="placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
            size="large"
            loading={loading}
          >
            {t('forgotPassword.submitButton')}
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        <p>
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
          >
            {t('forgotPassword.backToLogin')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
