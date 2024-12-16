import { useDentistStore } from '@/store/useDentistStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

export const useDentists = (dentistId?: string) => {
  const {
    dentists,
    selectedDentist,
    isLoading: storeLoading,
    error,
    fetchDentists,
    selectDentist,
    clearSelectedDentist,
  } = useDentistStore()

  // Keep track of the current dentistId
  const currentDentistIdRef = useRef<string | undefined>(dentistId)

  const { isLoading: queryLoading } = useQuery({
    queryKey: ['dentists'],
    queryFn: fetchDentists,
    enabled: dentists.length === 0,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })

  // Only clear selected dentist when navigating away from dentist pages
  useEffect(() => {
    const previousDentistId = currentDentistIdRef.current
    currentDentistIdRef.current = dentistId

    if (previousDentistId && !dentistId) {
      clearSelectedDentist()
    }
  }, [dentistId, clearSelectedDentist])

  // Handle dentist selection when dentistId changes or when dentists data is loaded
  useEffect(() => {
    if (dentists.length > 0 && dentistId) {
      const dentist = dentists.find(d => d.id === Number(dentistId))
      if (dentist && (!selectedDentist || selectedDentist.id !== dentist.id)) {
        selectDentist(dentist)
      }
    }
  }, [dentists, dentistId, selectDentist, selectedDentist])

  return {
    dentists,
    selectedDentist,
    isLoading: storeLoading || queryLoading,
    error,
  }
}
