import { LoginRequest, LoginResponse, RegisterRequest } from '@/types'
import apiClient from './apiClient'

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/user/login', credentials)
      return response.data
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
      throw error
    }
  },

  register: async (userData: RegisterRequest) => {
    try {
      const response = await apiClient.post('/user/register', userData)
      return response.data
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message)
      throw error
    }
  },

  sendPasswordResetCode: async (email: string) => {
    try {
      const response = await apiClient.post('/user/sendPasswordChangeCode', { email })
      return response.data
    } catch (error: any) {
      console.error('Send reset code error:', error.response?.data || error.message)
      throw error
    }
  },

  changePassword: async (data: { email: string; code: string; newPassword: string }) => {
    try {
      const response = await apiClient.post('/user/changeForgottenPassword', data)
      return response.data
    } catch (error: any) {
      console.error('Change password error:', error.response?.data || error.message)
      throw error
    }
  },

  me: async () => {
    try {
      const response = await apiClient.get('/auth/me')
      return response.data
    } catch (error: any) {
      console.error('Get user profile error:', error.response?.data || error.message)
      throw error
    }
  },
}
