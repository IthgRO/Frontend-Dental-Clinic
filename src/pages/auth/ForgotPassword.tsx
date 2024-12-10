import { Form, Input, Button } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

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
    <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
      <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
      <p className="text-center text-gray-600 mb-6">
        Insert the email you used to create an account
      </p>
      <Form layout="vertical" onFinish={onFinish} className="space-y-4">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-black text-white hover:bg-gray-900 rounded-lg"
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
