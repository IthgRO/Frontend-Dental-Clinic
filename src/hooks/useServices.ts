import { serviceService } from '@/services/service.service'
import { Service } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useServices = (clinicId: string) => {
  const queryClient = useQueryClient()

  const services = useQuery({
    queryKey: ['services', clinicId],
    queryFn: () => serviceService.getServices(clinicId),
  })

  const createService = useMutation({
    mutationFn: serviceService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  const updateService = useMutation({
    mutationFn: (service: Partial<Service>) => serviceService.updateService(service.id!, service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  const deleteService = useMutation({
    mutationFn: serviceService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
  })

  return { services, createService, updateService, deleteService }
}
