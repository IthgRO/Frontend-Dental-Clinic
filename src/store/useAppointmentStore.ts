// src/store/useAppointmentStore.ts
import { Appointment, AppointmentStatus } from '@/types'
import { create } from 'zustand'

interface AppointmentState {
  appointments: Appointment[]
  selectedAppointment: Partial<Appointment> | null
  isLoading: boolean
  error: string | null
  setSelectedService: (service: { value: string; label: string; price: number }) => void
  setSelectedDateTime: (dateTime: { date: string; time: string }) => void
  createAppointment: (appointment: Partial<Appointment>) => Promise<void>
  updateStatus: (id: string, status: AppointmentStatus) => Promise<void>
  resetSelection: () => void
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
        service: service.label,
        price: service.price,
      },
    }))
  },

  setSelectedDateTime: dateTime => {
    set(state => ({
      selectedAppointment: {
        ...state.selectedAppointment,
        date: dateTime.date,
        time: dateTime.time,
      },
    }))
  },

  resetSelection: () => {
    set({ selectedAppointment: null })
  },

  createAppointment: async appointment => {
    set({ isLoading: true })
    try {
      const newAppointment = {
        ...appointment,
        id: Date.now().toString(),
        status: 'confirmed' as AppointmentStatus,
      }

      set(state => ({
        appointments: [...state.appointments, newAppointment as Appointment],
        selectedAppointment: null,
        isLoading: false,
      }))
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },

  updateStatus: async (id, status) => {
    set({ isLoading: true })
    try {
      set(state => ({
        appointments: state.appointments.map(app => (app.id === id ? { ...app, status } : app)),
        isLoading: false,
      }))
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },
}))
