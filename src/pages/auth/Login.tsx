import { useAuth } from '@/hooks/useAuth'
import { Button, Card, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography

const Login = () => {
  const { login } = useAuth()

  const onFinish = (values: { email: string; password: string }) => {
    login.mutate(values)
  }

  return (
    <Card className="shadow-md">
      <div className="text-center mb-6">
        <Title level={2}>Welcome Back</Title>
        <p className="text-gray-500">Sign in to continue</p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={login.isPending}>
            Sign In
          </Button>
        </Form.Item>

        <div className="text-center">
          <Link to="/register" className="text-primary">
            Don't have an account? Register
          </Link>
        </div>
      </Form>
    </Card>
  )
}

export default Login
