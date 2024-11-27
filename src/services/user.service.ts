import { User } from '@/types'
import apiClient from './apiClient'

export const userService = {
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put('/users/profile', data)
    return response.data
  },

  changePassword: async (data: {
    current_password: string
    new_password: string
  }): Promise<void> => {
    await apiClient.put('/users/password', data)
  },
}
