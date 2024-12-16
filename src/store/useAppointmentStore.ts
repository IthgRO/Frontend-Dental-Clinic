import { dentistService } from '@/services/dentist.service'
import { Appointment, BookAppointmentRequest } from '@/types'
import { create } from 'zustand'

interface AppointmentState {
  appointments: Appointment[]
  selectedAppointment: Partial<BookAppointmentRequest> | null
  isLoading: boolean
  error: string | null
  setSelectedService: (service: { value: string; label: string; price: number }) => void
  setSelectedDateTime: (dateTime: { date: string; time: string }) => void
  createAppointment: (appointment: Partial<BookAppointmentRequest>) => Promise<void>
  fetchMyAppointments: () => Promise<void>
  cancelAppointment: (id: number) => Promise<void>
  resetSelection: () => void
  clearSelectedAppointment: () => void
}

export const useAppointmentStore = create<AppointmentState>(set => ({
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  error: null,

  setSelectedService: service => {
    set(state => ({
      selectedAppointment: {
        ...state.selectedAppointment,
        serviceId: parseInt(service.value),
        price: service.price,
      },
    }))
  },

  setSelectedDateTime: dateTime => {
    set(state => ({
      selectedAppointment: {
        ...state.selectedAppointment,
        startDate: `${dateTime.date}T${dateTime.time}`,
      },
    }))
  },

  fetchMyAppointments: async () => {
    set({ isLoading: true })
    try {
      const appointments = await dentistService.getMyAppointments()
      set({ appointments, isLoading: false })
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to fetch appointments',
        isLoading: false,
      })
    }
  },

  createAppointment: async appointment => {
    set({ isLoading: true })
    try {
      if (
        !appointment.dentistId ||
        !appointment.clinicId ||
        !appointment.serviceId ||
        !appointment.startDate
      ) {
        throw new Error('Missing required appointment details')
      }

      await dentistService.bookAppointment(
        appointment.dentistId,
        appointment.clinicId,
        appointment.serviceId,
        appointment.startDate
      )
      set(state => ({
        selectedAppointment: null,
        isLoading: false,
      }))
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to create appointment',
        isLoading: false,
      })
      throw err
    }
  },

  cancelAppointment: async id => {
    set({ isLoading: true })
    try {
      await dentistService.cancelAppointment(id)
      set(state => ({
        appointments: state.appointments.filter(app => app.id !== id.toString()),
        isLoading: false,
      }))
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to cancel appointment',
        isLoading: false,
      })
      throw err
    }
  },

  resetSelection: () => {
    set({ selectedAppointment: null })
  },

  // New function to clear selected appointment
  clearSelectedAppointment: () => {
    set({
      selectedAppointment: null,
      error: null,
    })
  },
}))
