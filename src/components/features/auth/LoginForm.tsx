// src/components/features/auth/LoginForm.tsx
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

export interface LoginFormProps {
  onFinish: (values: { email: string; password: string }) => void
  isLoading?: boolean
  error?: string | null
  showLinks?: boolean
  className?: string
}

export const LoginForm = ({
  onFinish,
  isLoading,
  error,
  showLinks = true,
  className,
}: LoginFormProps) => {
  return (
    <Form layout="vertical" onFinish={onFinish} className={`space-y-4 ${className}`}>
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
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
          size="large"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Form.Item>

      {showLinks && (
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
      )}
    </Form>
  )
}
