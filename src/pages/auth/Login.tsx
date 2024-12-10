import { useAuth } from '@/hooks/useAuth'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await authService.login(values.email, values.password)
      localStorage.setItem('token', response.token) // Save token to localStorage
      message.success('Login successful!')
      navigate('/dashboard') // Redirect to dashboard
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed. Try again.')
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
          Don’t have an account?{' '}
          <Link to="/register" className="text-black font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
