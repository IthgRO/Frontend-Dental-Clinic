import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginRequest } from '@/types'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Login = () => {
  const { login, isLoading } = useAuth()
  const { token, error, clearError } = useAuthStore()
  const [form] = Form.useForm()

  useEffect(() => {
    // Clear any existing errors when component mounts
    clearError()
  }, [clearError])

  // Redirect if already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  const onFinish = async (values: LoginRequest) => {
    login.mutate(values)
  }

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4">Welcome Back</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
        validateTrigger="onBlur"
      >
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
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            disabled={isLoading}
          />
        </Form.Item>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-black text-white hover:bg-gray-900 rounded-md"
            size="large"
            loading={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <p>
          <Link
            to="/forgot-password"
            className="text-black font-semibold hover:underline"
            tabIndex={isLoading ? -1 : 0}
          >
            Forgot Password?
          </Link>
        </p>
        <p className="mt-2">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-black font-semibold hover:underline"
            tabIndex={isLoading ? -1 : 0}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
