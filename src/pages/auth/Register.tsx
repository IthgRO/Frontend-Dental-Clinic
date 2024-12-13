import { authService, RegisterRequest } from '@/services/auth.service'
import { Button, Checkbox, Form, Input, message, Select, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography
const { Option } = Select

enum UserRole {
  Patient = 0,
  Dentist = 1,
}

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: keyof typeof UserRole
  phone: string
}

const Register = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const validatePhoneNumber = (_: any, value: string) => {
    const phoneRegex = /^\+?\d{10,15}$/
    if (!value) {
      return Promise.reject('Phone number is required!')
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject('Please enter a valid phone number!')
    }
    return Promise.resolve()
  }

  const onFinish = async (values: FormValues) => {
    if (!termsAccepted) {
      message.error('Please accept the terms and conditions')
      return
    }

    setLoading(true)

    try {
      const payload: RegisterRequest = {
        id: 0,
        clinicId: 1,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        role: UserRole[values.role],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        password: values.password,
      }

      await authService.register(payload)
      message.success('Registration successful! Please log in.')
      navigate('/login')
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        if (Array.isArray(errors.$)) {
          message.error(errors.$[0])
        } else {
          message.error('Validation failed. Please check your input.')
        }
      } else {
        message.error('Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={3}>Create Account</Title>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
        <Form.Item
          name="firstName"
          label=""
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input
            size="large"
            placeholder="Name"
            className="w-[276px] placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          label=""
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input
            size="large"
            placeholder="Surname"
            className="w-[276px] placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label=""
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: '*Invalid email' },
          ]}
        >
          <Input
            size="large"
            placeholder="Email"
            className="w-[276px] placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>

        <Form.Item name="phone" label="" rules={[{ validator: validatePhoneNumber }]}>
          <Input
            size="large"
            placeholder="Phone number"
            className="w-[276px] placeholder:text-gray-600 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label=""
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            className="placeholder:text-gray-500 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
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
                return Promise.reject(new Error('The passwords do not match!'))
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Confirm Password"
            className="placeholder:text-gray-500 rounded-lg border-gray-300 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
            className="focus:ring-teal-500"
          >
            I agree to the terms and conditions
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 rounded-md"
            size="large"
            loading={loading}
            disabled={loading}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <p>
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-teal-500 font-semibold hover:text-teal-500 hover:underline hover:scale-105"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
