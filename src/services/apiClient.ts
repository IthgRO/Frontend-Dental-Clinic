import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dentalbackend.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Connection: 'keep-alive',
  },
  // Important for CORS
  withCredentials: false,
})

apiClient.interceptors.request.use(
  config => {
    // Add CORS headers to each request
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    config.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept'

    console.log('Making request to:', config.url, 'with data:', config.data)
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => {
    console.log('Got response:', response.data)
    return response
  },
  error => {
    console.error('Response error:', error.response || error)
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

export default apiClient
