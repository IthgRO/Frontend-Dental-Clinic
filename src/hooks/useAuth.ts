import { useAppTranslation } from '@/hooks/useAppTranslation'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginRequest, RegisterRequest, User } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useAuth = () => {
  const { t } = useAppTranslation('auth')
  const {
    login: loginStore,
    register: registerStore,
    logout: logoutStore,
    user,
    updateUserData: updateUserStore,
  } = useAuthStore()

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: authService.me,
    enabled: !!user,
    retry: false,
  })

  const login = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return await loginStore(credentials)
    },
    onSuccess: response => {
      toast.success(t('notifications.login.success'))

      if (response.shouldRedirect && response.redirectUrl) {
        window.location.href = response.redirectUrl
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message === 'Invalid credentials'
          ? t('notifications.login.invalidCredentials')
          : t('notifications.login.error')
      toast.error(errorMessage)
    },
  })

  const register = useMutation({
    mutationFn: (data: RegisterRequest) => registerStore(data),
    onSuccess: () => {
      toast.success(t('notifications.register.success'))
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message === 'Email already exists'
          ? t('notifications.register.emailExists')
          : error.response?.data?.message === 'Invalid data'
            ? t('notifications.register.invalidData')
            : t('notifications.register.error')
      toast.error(errorMessage)
    },
  })

  const updateUserData = useMutation({
    mutationFn: (data: Partial<User>) => updateUserStore(data),
    onSuccess: () => {
      toast.success(t('notifications.update.success'))
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message === 'Invalid data'
          ? t('notifications.update.invalidData')
          : t('notifications.update.error')
      toast.error(errorMessage)
    },
  })

  const logout = () => {
    logoutStore()
    toast.success(t('notifications.logout.success'))
  }

  return {
    login,
    register,
    logout,
    updateUserData,
    user: userData || user,
    isLoading: login.isPending || register.isPending || isLoadingUser,
    isAuthenticated: !!user,
  }
}
