import { Service } from '@/types'
import { create } from 'zustand'

interface Error {
  message: string
}

interface ServiceState {
  services: Service[]
  selectedService: Service | null
  isLoading: boolean
  error: string | null
  fetchServices: (clinicId: string) => Promise<void>
  selectService: (service: Service) => void
  createService: (service: Omit<Service, 'id'>) => Promise<void>
  updateService: (service: Service) => Promise<void>
  deleteService: (id: string) => Promise<void>
}

export const useServiceStore = create<ServiceState>(set => ({
  services: [],
  selectedService: null,
  isLoading: false,
  error: null,
  fetchServices: async (clinicId: string) => {
    set({ isLoading: true })
    try {
      const response = await fetch(`/api/clinics/${clinicId}/services`)
      const data = await response.json()
      set({ services: data, isLoading: false })
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
  selectService: (service: Service) => set({ selectedService: service }),
  createService: async (newService: Omit<Service, 'id'>) => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        body: JSON.stringify(newService),
      })
      const data = await response.json()
      set(state => ({
        services: [...state.services, data],
        isLoading: false,
      }))
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
  updateService: async (updatedService: Service) => {
    set({ isLoading: true })
    try {
      const response = await fetch(`/api/services/${updatedService.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedService),
      })
      const data = await response.json()
      set(state => ({
        services: state.services.map(service => (service.id === data.id ? data : service)),
        isLoading: false,
      }))
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
  deleteService: async (serviceId: string) => {
    set({ isLoading: true })
    try {
      await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      })
      set(state => ({
        services: state.services.filter(service => service.id !== serviceId),
        isLoading: false,
      }))
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
}))
