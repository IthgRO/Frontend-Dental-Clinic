// src/hooks/useAppointments.ts
import { dentistService } from '@/services/dentist.service'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { BookAppointmentRequest } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useAppointments = () => {
  const { setSelectedService, setSelectedDateTime, resetSelection } = useAppointmentStore()

  const fetchAppointments = useQuery({
    queryKey: ['appointments'],
    queryFn: dentistService.getMyAppointments,
  })

  const bookAppointment = useMutation({
    mutationFn: (data: BookAppointmentRequest) =>
      dentistService.bookAppointment(data.dentistId, data.clinicId, data.serviceId, data.startDate),
    onSuccess: () => {
      toast.success('Appointment booked successfully')
      resetSelection()
      fetchAppointments.refetch()
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to book appointment')
    },
  })

  const cancelAppointment = useMutation({
    mutationFn: dentistService.cancelAppointment,
    onSuccess: () => {
      toast.success('Appointment cancelled successfully')
      fetchAppointments.refetch()
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment')
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
