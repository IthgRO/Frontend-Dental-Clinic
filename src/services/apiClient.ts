import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Let's add some debugging
apiClient.interceptors.request.use(
  config => {
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
