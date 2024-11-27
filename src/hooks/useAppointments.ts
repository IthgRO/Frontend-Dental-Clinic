import { appointmentService } from '@/services/appointment.service'
import { Appointment } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAppointments = (clinicId: string) => {
  const queryClient = useQueryClient()

  const appointments = useQuery({
    queryKey: ['appointments', clinicId],
    queryFn: () => appointmentService.getAppointments(clinicId),
  })

  const createAppointment = useMutation({
    mutationFn: appointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })

  const updateAppointment = useMutation({
    mutationFn: (appointment: Partial<Appointment>) =>
      appointmentService.updateAppointment(appointment.id!, appointment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })

  return { appointments, createAppointment, updateAppointment }
}
