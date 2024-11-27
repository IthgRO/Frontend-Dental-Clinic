import { Appointment, AppointmentStatus } from '@/types'
import apiClient from './apiClient'

export const appointmentService = {
  getAppointments: async (clinicId: string) => {
    const response = await apiClient.get(`/appointments`, {
      params: { clinicId },
    })
    return response.data
  },

  createAppointment: async (data: Partial<Appointment>) => {
    const response = await apiClient.post('/appointments', data)
    return response.data
  },

  updateAppointment: async (id: string, data: Partial<Appointment>) => {
    const response = await apiClient.put(`/appointments/${id}`, data)
    return response.data
  },

  updateStatus: async (id: string, status: AppointmentStatus) => {
    const response = await apiClient.patch(`/appointments/${id}/status`, { status })
    return response.data
  },

  deleteAppointment: async (id: string) => {
    const response = await apiClient.delete(`/appointments/${id}`)
    return response.data
  },
}
