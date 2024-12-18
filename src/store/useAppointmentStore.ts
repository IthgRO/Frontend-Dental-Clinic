import { queryClient } from '@/config/queryClient'
import { APPOINTMENTS_QUERY_KEY, TIME_SLOTS_QUERY_KEY } from '@/constants/queryKeys'
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

      // Invalidate appointments query
      await queryClient.invalidateQueries({
        queryKey: [APPOINTMENTS_QUERY_KEY],
      })
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

      // Invalidate both queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [APPOINTMENTS_QUERY_KEY],
        }),
        queryClient.invalidateQueries({
          predicate: query => {
            const queryKey = query.queryKey as unknown[]
            return queryKey[0] === TIME_SLOTS_QUERY_KEY && queryKey[1] === appointment.dentistId
          },
        }),
      ])

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

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [APPOINTMENTS_QUERY_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [TIME_SLOTS_QUERY_KEY],
        }),
      ])

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

  clearSelectedAppointment: () => {
    set({
      selectedAppointment: null,
      error: null,
    })
  },
}))
