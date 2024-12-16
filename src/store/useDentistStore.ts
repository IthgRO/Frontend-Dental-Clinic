import { dentistService } from '@/services/dentist.service'
import { Dentist, DentistResponse } from '@/types'
import { create } from 'zustand'

interface DentistState {
  dentists: Dentist[]
  selectedDentist: Dentist | null
  isLoading: boolean
  error: string | null
  fetchDentists: () => Promise<Dentist[]>
  selectDentist: (dentist: Dentist) => void
  clearSelectedDentist: () => void
}

export const useDentistStore = create<DentistState>(set => ({
  dentists: [],
  selectedDentist: null,
  isLoading: false,
  error: null,

  fetchDentists: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await dentistService.getAvailableDentists()
      const formattedDentists: Dentist[] = response.dentists.map((d: DentistResponse) => ({
        id: d.id,
        name: `${d.firstName} ${d.lastName}`,
        email: d.email,
        phone: d.phone,
        priceRange: {
          min: d.minimumPrice,
          max: d.maximumPrice,
        },
        clinic: d.clinic,
        services: d.services,
      }))
      set({ dentists: formattedDentists, isLoading: false })
      return formattedDentists
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch dentists',
        isLoading: false,
      })
      throw error
    }
  },

  selectDentist: dentist => {
    set({ selectedDentist: dentist })
  },

  clearSelectedDentist: () => {
    set({ selectedDentist: null })
  },
}))
