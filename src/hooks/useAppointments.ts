import { APPOINTMENTS_QUERY_KEY, TIME_SLOTS_QUERY_KEY } from '@/constants/queryKeys'
import { dentistService } from '@/services/dentist.service'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { BookAppointmentRequest } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAppointments = () => {
  const queryClient = useQueryClient()
  const { setSelectedService, setSelectedDateTime, resetSelection } = useAppointmentStore()

  const fetchAppointments = useQuery({
    queryKey: [APPOINTMENTS_QUERY_KEY],
    queryFn: dentistService.getMyAppointments,
  })

  const bookAppointment = useMutation({
    mutationFn: (data: BookAppointmentRequest) =>
      dentistService.bookAppointment(data.dentistId, data.clinicId, data.serviceId, data.startDate),
    onSuccess: (_, variables) => {
      // Invalidate both queries to force a refetch
      queryClient.invalidateQueries({
        queryKey: [APPOINTMENTS_QUERY_KEY],
      })

      queryClient.invalidateQueries({
        queryKey: [TIME_SLOTS_QUERY_KEY],
      })

      resetSelection()
    },
  })

  const cancelAppointment = useMutation({
    mutationFn: dentistService.cancelAppointment,
    onSuccess: async () => {
      // Invalidate both queries to force a refetch
      queryClient.invalidateQueries({
        queryKey: [APPOINTMENTS_QUERY_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [TIME_SLOTS_QUERY_KEY],
      })
    },
  })

  return {
    appointments: fetchAppointments.data,
    isLoading:
      fetchAppointments.isLoading || bookAppointment.isPending || cancelAppointment.isPending,
    error: fetchAppointments.error,
    bookAppointment,
    cancelAppointment,
    setSelectedService,
    setSelectedDateTime,
    resetSelection,
  }
}
