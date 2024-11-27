import { userService } from '@/services/user.service'
import { User } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
