import { authService } from '@/services/auth.service'
import { Button, Form, Input, message, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    try {
      const response = await authService.login(values)
      localStorage.setItem('token', response.token)
      message.success('Login successful!')
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Login failed:', error)
      message.error(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={3}>Welcome Back</Title>
      </div>
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
            placeholder="Email"
            className="placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label=""
          rules={[{ required: true, message: 'Please input your password!' }]}
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
            size="large"
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <p>
          Forgot Password?{' '}
          <Link
            to="/forgot-password"
            className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
          >
            Reset Here
          </Link>
        </p>
        <div className="my-4 border-t border-gray-300"></div>
        <p className="text-center mt-2">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
