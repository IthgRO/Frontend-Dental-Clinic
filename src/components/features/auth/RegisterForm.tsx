// src/components/features/auth/RegisterForm.tsx
import { Button, Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

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

export interface RegisterFormProps {
  onFinish: (values: any) => void
  isLoading?: boolean
  termsAccepted: boolean
  onTermsChange: (checked: boolean) => void
  showLinks?: boolean
  className?: string
}

export const RegisterForm = ({
  onFinish,
  isLoading,
  termsAccepted,
  onTermsChange,
  showLinks = true,
  className,
}: RegisterFormProps) => {
  return (
    <Form layout="vertical" onFinish={onFinish} className={`space-y-4 ${className}`}>
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
          onChange={e => onTermsChange(e.target.checked)}
          className="focus:ring-teal-500"
        >
          I agree to the terms and conditions
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-teal-600 hover:bg-teal-600 rounded-md"
          size="large"
          loading={isLoading}
        >
          Sign Up
        </Button>
      </Form.Item>

      {showLinks && (
        <div className="text-center mt-4">
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-teal-600 font-semibold hover:text-teal-600 hover:underline hover:scale-105"
            >
              Login Here
            </Link>
          </p>
        </div>
      )}
    </Form>
  )
}

export default RegisterForm
