import { Clinic } from '@/types'
import apiClient from './apiClient'

export const clinicService = {
  getClinics: async () => {
    const response = await apiClient.get('/clinics')
    return response.data
  },

  getClinic: async (id: string) => {
    const response = await apiClient.get(`/clinics/${id}`)
    return response.data
  },

  createClinic: async (data: Partial<Clinic>) => {
    const response = await apiClient.post('/clinics', data)
    return response.data
  },

  updateClinic: async (id: string, data: Partial<Clinic>) => {
    const response = await apiClient.put(`/clinics/${id}`, data)
    return response.data
  },

  deleteClinic: async (id: string) => {
    const response = await apiClient.delete(`/clinics/${id}`)
    return response.data
  },
}
