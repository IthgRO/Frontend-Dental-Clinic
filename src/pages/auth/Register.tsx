import { useAuth } from '@/hooks/useAuth'
import { Form, Input, Button, Select, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const Register = () => {
  const { register } = useAuth()
  const [termsAccepted, setTermsAccepted, setRegistrationSuccess] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: {
    name: string
    surname: string
    email: string
    password: string
    confirmPassword: string
    role: UserRole
  }) => {
    if (!termsAccepted) {
      alert('You must agree to the terms and conditions')
      return
    }
    register.mutate(values)
    //
    const payload = {
      FirstName: values.name,
      LastName: values.surname,
      Email: values.email,
      Phone: '0000000000',
      ClinicId: '0',
      Role: values.role,
      Password: values.password,
    }

    console.log('Payload being sent to backend:', payload)

    try {
      await authService.register(payload)
      alert('Registration successful!')
      setRegistrationSuccess(true)
    } catch (error: any) {
      console.error('Registration error:', error)
      if (error.response) {
        console.error('Backend responded with:', error.response.data)
        alert(error.response.data.message || 'Registration failed. Please try again.')
      } else {
        alert('An unexpected bad error occurred. Please try again later.')
      }
    }
  }

  /*
    try {
      // Make the backend call
      const response = await authService.register({
        FirstName: values.name,
        LastName: values.surname,
        Email: values.email,
        Phone: '0000000000', 
        ClinicId: '0',
        Role: values.role,
        Password: values.password,
      })

      alert('Registration successful!')
      navigate('/login') // redirect to the login page after successful registration
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

*/
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Create Account</h2>
        <Form layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              size="large"
              placeholder="Enter your name"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            />
          </Form.Item>

          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true, message: 'Please input your surname!' }]}
          >
            <Input
              size="large"
              placeholder="Enter your surname"
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
              { min: 8, message: 'Password must be at least 8 characters long!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
              },
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
                  return Promise.reject(new Error('The two passwords do not match!'))
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
            <Select
              size="large"
              placeholder="Select your role"
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-black focus:border-black"
            >
              <Option value="Patient">Patient</Option>
              <Option value="Dentist">Dentist</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Checkbox onChange={e => setTermsAccepted(e.target.checked)}>
              I agree to the terms and conditions
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-black text-white hover:bg-gray-900 rounded-lg"
              size="large"
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
