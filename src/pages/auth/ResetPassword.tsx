import { authService } from '@/services/auth.service'
import { Form, Input, Button, message, Typography } from 'antd'
import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

const { Title } = Typography

const ResetPassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

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
      navigate('/login')
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={3}>Set Your New Password</Title>
      </div>
      <Form layout="vertical" onFinish={onFinish} validateTrigger="onSubmit">
        <Form.Item
          name="password"
          label=""
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
          <div className="relative">
            <Input
              type={passwordVisible ? 'text' : 'password'}
              size="large"
              placeholder="Password"
              className="placeholder:text-gray-500 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
          <div className="relative">
            <Input
              type={confirmPasswordVisible ? 'text' : 'password'}
              size="large"
              placeholder="Confirm Password"
              className="placeholder:text-gray-500 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
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
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        <p>
          Go back to{' '}
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
