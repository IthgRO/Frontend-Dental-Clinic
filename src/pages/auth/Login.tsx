import { authService } from '@/services/auth.service'
import { Button, Form, Input, message } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

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
    <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
      <h2 className="text-center text-2xl font-bold mb-4">Welcome Back</h2>

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

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-black text-white hover:bg-gray-900 rounded-md"
            size="large"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <p>
          Forgot Password?{' '}
          <Link to="/forgot-password" className="text-black font-semibold hover:underline">
            Reset Here
          </Link>
        </p>
        <p className="mt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
