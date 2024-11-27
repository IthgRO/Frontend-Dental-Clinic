import { Clinic } from '@/types'
import { create } from 'zustand'

interface Error {
  message: string
}

interface ClinicState {
  clinics: Clinic[]
  selectedClinic: Clinic | null
  isLoading: boolean
  error: string | null
  fetchClinics: () => Promise<void>
  selectClinic: (clinic: Clinic) => void
  updateClinic: (updatedClinic: Clinic) => Promise<void>
}

export const useClinicStore = create<ClinicState>(set => ({
  clinics: [],
  selectedClinic: null,
  isLoading: false,
  error: null,
  fetchClinics: async () => {
    set({ isLoading: true })
    try {
      // API call implementation
      const response = await fetch('/api/clinics')
      const data = await response.json()
      set({ clinics: data, isLoading: false })
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
  selectClinic: (selectedClinic: Clinic) => set({ selectedClinic }),
  updateClinic: async (updatedClinic: Clinic) => {
    set({ isLoading: true })
    try {
      // API call implementation
      const response = await fetch(`/api/clinics/${updatedClinic.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedClinic),
      })
      const data = await response.json()
      set(state => ({
        clinics: state.clinics.map(clinic => (clinic.id === data.id ? data : clinic)),
        isLoading: false,
      }))
    } catch (err) {
      const error = err as Error
      set({ error: error.message, isLoading: false })
    }
  },
}))
