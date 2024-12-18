// src/hooks/useAuth.ts
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginRequest, RegisterRequest } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useAuth = () => {
  const { t } = useAppTranslation('auth')
  const { login: loginStore, register: registerStore, logout: logoutStore } = useAuthStore()

  const login = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      await loginStore(credentials)
    },
    onSuccess: () => {
      toast.success(t('notifications.login.success'))
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

  const logout = () => {
    logoutStore()
    toast.success(t('notifications.logout.success'))
  }

  return {
    login,
    register,
    logout,
    isLoading: login.isPending || register.isPending,
  }
}
