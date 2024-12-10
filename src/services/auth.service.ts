// src/services/auth.service.ts
import { User } from '@/types'
import apiClient from './apiClient'

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/api/user/login', { email, password })
    return response.data
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
