// src/hooks/useAuth.ts
import { useAuthStore } from '@/store/useAuthStore'
import { LoginRequest, RegisterRequest } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useAuth = () => {
  const { login: loginStore, register: registerStore, logout: logoutStore } = useAuthStore()

  const login = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      await loginStore(credentials)
    },
    onSuccess: () => {
      toast.success('Login successful')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed')
    },
  })

  const register = useMutation({
    mutationFn: (data: RegisterRequest) => registerStore(data),
    onSuccess: () => {
      toast.success('Registration successful! Please log in.')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed')
    },
  })

  const logout = () => {
    logoutStore()
  }

  return {
    login,
    register,
    logout,
    isLoading: login.isPending || register.isPending,
  }
}
