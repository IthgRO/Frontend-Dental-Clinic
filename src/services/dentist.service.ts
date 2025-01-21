import apiClient from './apiClient'

export const dentistService = {
  getAvailableDentists: async () => {
    const response = await apiClient.get('/dentist/seeAvailableDentists')
    return response.data
  },

  getAvailableSlots: async (dentistId: number, startDate: string, endDate: string) => {
    const response = await apiClient.post('/dentist/seeAvailableSlots', {
      dentistId,
      startDate,
      endDate,
    })
    return response.data
  },

  bookAppointment: async (
    dentistId: number,
    clinicId: number,
    serviceId: number,
    startDate: string
  ) => {
    const response = await apiClient.post('/dentist/bookAppointment', {
      dentistId,
      clinicId,
      serviceId,
      startDate,
    })
    return response.data
  },

  getMyAppointments: async () => {
    const response = await apiClient.get('/dentist/seeMyAppointments')
    return response.data
  },

  cancelAppointment: async (appointmentId: number) => {
    const response = await apiClient.post('/dentist/cancelAppointment', {
      appointmentId,
    })
    return response.data
  },

  updateAppointment: async (appointmentId: number, newDate: string) => {
    const response = await apiClient.post('/dentist/updateAppointment', {
      appointmentId,
      newDate,
    })
    return response.data
  },
}
