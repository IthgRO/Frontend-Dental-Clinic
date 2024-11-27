import { useAuth } from '@/hooks/useAuth'
import { UserRole } from '@/types'
import { Button, Card, Form, Input, Select, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography
const { Option } = Select

interface RegisterFormValues {
  first_name: string
  last_name: string
  email: string
  password: string
  role: UserRole
}

const Register = () => {
  const { register } = useAuth()

  const onFinish = (values: RegisterFormValues) => {
    register.mutate(values)
  }

  return (
    <Card className="shadow-md">
      <div className="text-center mb-6">
        <Title level={2}>Create Account</Title>
        <p className="text-gray-500">Fill in your details to register</p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input size="large" placeholder="Enter your first name" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input size="large" placeholder="Enter your last name" />
        </Form.Item>

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
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Register as"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select size="large" placeholder="Select your role">
            <Option value={UserRole.PATIENT}>Patient</Option>
            <Option value={UserRole.DENTIST}>Dentist</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={register.isPending}>
            Register
          </Button>
        </Form.Item>

        <div className="text-center">
          <Link to="/login" className="text-primary">
            Already have an account? Login
          </Link>
        </div>
      </Form>
    </Card>
  )
}

export default Register
