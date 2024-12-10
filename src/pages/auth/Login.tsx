import apiClient from '@/services/apiClient'
import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  // Modified useEffect with better error handling and logging
  useEffect(() => {
    console.log('Attempting to fetch dentists...')
    apiClient
      .get('/dentist/seeAvailableDentists')
      .then(response => {
        console.log('Successfully fetched dentists:', response.data)
      })
      .catch(error => {
        console.error('Error fetching dentists:', error)
        // More specific error handling
        if (error.response) {
          message.error(`Server error: ${error.response.status}`)
        } else if (error.request) {
          message.error('No response from server')
        } else {
          message.error('Error setting up request')
        }
      })
  }, [])

  const testGetRequest = async () => {
    try {
      const response = await apiClient.get('/dentist/seeAvailableDentists')
      console.log('Test GET request data:', response.data)
      message.success('GET request successful! Check console')
    } catch (error: any) {
      console.error('Test GET request failed:', error)
      message.error(error.response?.data?.message || 'GET request failed')
    }
  }

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await apiClient.post('/user/login', {
        email: values.email,
        password: values.password,
      })

      console.log('Login successful:', response.data)
      localStorage.setItem('token', response.data.token)
      message.success('Login successful!')
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Login failed:', error)
      message.error(error.response?.data?.message || 'Login failed. Try again.')
    }
  }

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
      <h2 className="text-center text-2xl font-bold mb-4">Welcome Back</h2>

      {/* Added test button */}
      <Button onClick={testGetRequest} className="mb-4 w-full">
        Test GET Request
      </Button>

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
