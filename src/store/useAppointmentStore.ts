import { Appointment, AppointmentStatus } from '@/types'
import { create } from 'zustand'

interface Error {
  message: string
}

interface AppointmentState {
  appointments: Appointment[]
  selectedAppointment: Appointment | null
  isLoading: boolean
  error: string | null
  fetchAppointments: (clinicId: string) => Promise<void>
  createAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<void>
  updateAppointment: (appointment: Appointment) => Promise<void>
  updateStatus: (id: string, status: AppointmentStatus) => Promise<void>
}

export const useAppointmentStore = create<AppointmentState>(set => ({
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  error: null,
  fetchAppointments: async (clinicId: string) => {
    set({ isLoading: true })
    try {
      // API call implementation
      const response = await fetch(`/api/clinics/${clinicId}/appointments`)
      const data = await response.json()
      set({ appointments: data, isLoading: false })
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
  createAppointment: async (newAppointment: Omit<Appointment, 'id'>) => {
    set({ isLoading: true })
    try {
      // API call implementation
      const response = await fetch('/api/appointments', {
        method: 'POST',
        body: JSON.stringify(newAppointment),
      })
      const data = await response.json()
      set(state => ({
        appointments: [...state.appointments, data],
        isLoading: false,
      }))
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
  updateAppointment: async (updatedAppointment: Appointment) => {
    set({ isLoading: true })
    try {
      // API call implementation
      const response = await fetch(`/api/appointments/${updatedAppointment.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedAppointment),
      })
      const data = await response.json()
      set(state => ({
        appointments: state.appointments.map(app => (app.id === data.id ? data : app)),
        isLoading: false,
      }))
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
  updateStatus: async (appointmentId: string, newStatus: AppointmentStatus) => {
    set({ isLoading: true })
    try {
      // API call implementation
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await response.json()
      console.log('data', data)
      set(state => ({
        appointments: state.appointments.map(app =>
          app.id === appointmentId ? { ...app, status: newStatus } : app
        ),
        isLoading: false,
      }))
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
}))
