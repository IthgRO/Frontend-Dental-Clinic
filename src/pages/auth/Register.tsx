// src/components/Register.tsx

import { authService, RegisterRequest } from '@/services/auth.service'
import { Button, Checkbox, Form, Input, message, Select } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Option } = Select

// Enum to map role strings to numbers
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
        id: 0, // Default value as per API spec
        clinicId: 1, // Default clinic ID
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        role: UserRole[values.role], // Convert string role to number
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's timezone
        password: values.password,
      }

      await authService.register(payload)
      message.success('Registration successful! Please log in.')
      navigate('/login')
    } catch (error: any) {
      setLoading(false)

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
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Create Account</h2>

        <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input
              size="large"
              placeholder="Enter your first name"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input
              size="large"
              placeholder="Enter your last name"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number" rules={[{ validator: validatePhoneNumber }]}>
            <Input
              size="large"
              placeholder="Enter your phone number"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            />
          </Form.Item>

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
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            />
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
                  return Promise.reject(new Error('The passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm your password"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Register as"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select size="large" placeholder="Select your role" className="rounded-lg">
              <Option value="Patient">Patient</Option>
              <Option value="Dentist">Dentist</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Checkbox checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)}>
              I agree to the terms and conditions
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-black text-white hover:bg-gray-900 rounded-lg"
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
            <Link to="/login" className="text-black font-semibold hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
