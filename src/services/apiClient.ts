import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('Request:', { url: config.url, data: config.data })
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    console.log('Response:', response.data)
    return response
  },
  error => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })
    return Promise.reject(error)
  }
)

export default apiClient
