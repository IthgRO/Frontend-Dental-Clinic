import { TIME_SLOTS_QUERY_KEY } from '@/constants/queryKeys'
import { dentistService } from '@/services/dentist.service'
import { TimeSlot } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

export const useTimeSlots = (dentistId: number, startDate: Date, endDate: Date) => {
  const startDateStr = format(startDate, "yyyy-MM-dd'T'00:00:00.000'Z'")
  const endDateStr = format(endDate, "yyyy-MM-dd'T'23:59:59.999'Z'")

  const queryKey = [TIME_SLOTS_QUERY_KEY, dentistId, startDateStr, endDateStr]

  const {
    data: availableSlots = [],
    isLoading,
    error,
  } = useQuery<TimeSlot[]>({
    queryKey,
    queryFn: () => dentistService.getAvailableSlots(dentistId, startDateStr, endDateStr),
  })

  return {
    availableSlots,
    isLoading,
    error,
    queryKey,
  }
}
