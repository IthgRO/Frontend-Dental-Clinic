import { authService } from '@/services/auth.service'
import { Button, Form, Input, message, Typography } from 'antd'
import { useState } from 'react'

const { Title } = Typography

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { email: string }) => {
    setLoading(true)
    try {
      await authService.forgotPassword(values.email)
      message.success('A password reset link has been sent to your email address.')
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to send reset link.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={3}>Reset Password</Title>
      </div>
      <p className="text-center text-gray-600 mb-6">
        Insert the email you used to create an account
      </p>
      <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit" className="space-y-4">
        <Form.Item
          name="email"
          label=""
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
            className="placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
            size="large"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
