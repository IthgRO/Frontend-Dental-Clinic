import { dentistService } from '@/services/dentist.service'
import { TimeSlot } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

export const useTimeSlots = (dentistId: number, startDate: Date, endDate: Date) => {
  const startDateStr = format(startDate, "yyyy-MM-dd'T'08:00:00.000'Z'")
  const endDateStr = format(endDate, "yyyy-MM-dd'T'23:59:59.999'Z'")

  const {
    data: availableSlots = [],
    isLoading,
    error,
  } = useQuery<TimeSlot[]>({
    queryKey: ['timeSlots', dentistId, startDateStr, endDateStr],
    queryFn: () => dentistService.getAvailableSlots(dentistId, startDateStr, endDateStr),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes before garbage collection
  })

  return {
    availableSlots,
    isLoading,
    error,
  }
}
