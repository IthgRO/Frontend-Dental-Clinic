import { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LoginCredentials {
  email: string
  password: string
}

interface Error {
  message: string
}

interface AuthState {
  token: string | null
  user: User | null
  isLoading: boolean
  error: string | null
  setToken: (token: string) => void
  setUser: (user: User) => void
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      setToken: (token: string) => set({ token }),
      setUser: (user: User) => set({ user }),
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          // API call implementation
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          })
          const data = await response.json()
          set({
            token: data.token,
            user: data.user,
            isLoading: false,
          })
        } catch (err) {
          const error = err as Error
          set({ error: error.message, isLoading: false })
        }
      },
      logout: () => set({ token: null, user: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
