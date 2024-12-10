import { Form, Input, Button, message } from 'antd'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    const token = searchParams.get('token')
    if (!token) {
      message.error('Invalid or expired token.')
      return
    }

    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!')
      return
    }

    setLoading(true)
    try {
      await authService.resetPassword(token, values.password)
      message.success('Password reset successful! You can now log in.')
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
      <h2 className="text-center text-2xl font-bold mb-4">Set New Password</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, message: 'Please input your new password!' },
            { min: 8, message: 'Password must be at least 8 characters!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
            },
          ]}
        >
          <Input.Password size="large" placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords do not match!'))
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm new password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full bg-black text-white"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ResetPassword
