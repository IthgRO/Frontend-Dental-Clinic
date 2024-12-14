import { useDentistStore } from '@/store/useDentistStore'
import { format } from 'date-fns'

export const useTimeSlots = () => {
  const { availableSlots, fetchAvailableSlots, isLoading } = useDentistStore()

  const fetchSlots = (dentistId: number, startDate: Date, endDate: Date) => {
    const startDateStr = format(startDate, "yyyy-MM-dd'T'00:00:00.000'Z'")
    const endDateStr = format(endDate, "yyyy-MM-dd'T'23:59:59.999'Z'")
    return fetchAvailableSlots(dentistId, startDateStr, endDateStr)
  }

  return {
    availableSlots,
    fetchSlots,
    isLoading,
  }
}
