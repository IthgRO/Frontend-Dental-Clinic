// src/services/auth.service.ts
import { UUID } from '@/types'
import apiClient from './apiClient'

export const authService = {
  login: async (email: string, password: string) => {
    console.log('Attempting login with:', { email, password })
    try {
      const response = await apiClient.post('/api/user/login', {
        email,
        password,
      })
      console.log('Login response:', response.data)
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  register: async (userData: {
    FirstName: string
    LastName: string
    Email: string
    Phone: string
    ClinicId: UUID
    Role: string
    Password: string
  }) => {
    const response = await apiClient.post('/api/user/register', userData)
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (token: string, password: string) => {
    const response = await apiClient.post('/auth/reset-password', { token, password })
    return response.data
  },

  me: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },
}
