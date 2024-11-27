import { Service } from '@/types'
import apiClient from './apiClient'

export const serviceService = {
  getServices: async (clinicId: string): Promise<Service[]> => {
    const response = await apiClient.get(`/clinics/${clinicId}/services`)
    return response.data
  },

  getService: async (id: string): Promise<Service> => {
    const response = await apiClient.get(`/services/${id}`)
    return response.data
  },

  createService: async (data: Omit<Service, 'id'>): Promise<Service> => {
    const response = await apiClient.post('/services', data)
    return response.data
  },

  updateService: async (id: string, data: Partial<Service>): Promise<Service> => {
    const response = await apiClient.put(`/services/${id}`, data)
    return response.data
  },

  deleteService: async (id: string): Promise<void> => {
    await apiClient.delete(`/services/${id}`)
  },

  getServicesByCategory: async (clinicId: string, category: string): Promise<Service[]> => {
    const response = await apiClient.get(`/clinics/${clinicId}/services`, {
      params: { category },
    })
    return response.data
  },

  toggleServiceAvailability: async (id: string, isActive: boolean): Promise<Service> => {
    const response = await apiClient.patch(`/services/${id}/availability`, { isActive })
    return response.data
  },
}
