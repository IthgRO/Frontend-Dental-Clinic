import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
  role: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuthStore()

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      setToken(data.token)
      setUser(data.user)
      navigate('/dashboard')
    },
  })

  const register = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      navigate('/login')
    },
  })

  const logout = () => {
    useAuthStore.getState().logout()
    navigate('/login')
  }

  return { login, register, logout }
}
