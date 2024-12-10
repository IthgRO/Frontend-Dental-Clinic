import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Test GET request to verify API access
    fetch('https://dentalbackend.azurewebsites.net/api/dentist/seeAvailableDentists', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Successfully fetched dentists:', data)
      })
      .catch(error => {
        console.error('Error fetching dentists:', error)
      })
  }, [])

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch('https://dentalbackend.azurewebsites.net/api/user/login', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Login successful:', data)

      localStorage.setItem('token', data.token)
      message.success('Login successful!')
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Login failed:', error)
      message.error(error.message || 'Login failed. Try again.')
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
