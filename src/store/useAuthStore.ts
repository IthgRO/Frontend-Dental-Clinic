import { authService } from '@/services/auth.service'
import { LoginRequest, RegisterRequest, User } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: User | null
  isLoading: boolean
  error: string | null
  setToken: (token: string) => void
  setUser: (user: User) => void
  login: (credentials: LoginRequest) => Promise<{
    shouldRedirect: boolean
    redirectUrl?: string
  }>
  register: (userData: RegisterRequest) => Promise<void>
  updateUserData: (data: Partial<User>) => Promise<void>
  logout: () => void
  clearError: () => void
}

const DENTIST_APP_URL = import.meta.env.VITE_DENTIST_APP_URL

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,

      setToken: (token: string) => set({ token }),
      setUser: (user: User) => set({ user }),

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(credentials)
          const { jwt: token } = response

          // Decode token
          const decodedToken = JSON.parse(atob(token.split('.')[1]))
          const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

          // If Dentist, redirect with token in URL
          if (role === 'Dentist') {
            return {
              shouldRedirect: true,
              redirectUrl: `${DENTIST_APP_URL}/auto-login?token=${token}`,
            }
          }

          // Otherwise, store token for Patient
          localStorage.setItem('auth_token', token)
          set({
            token,
            user: {
              id: decodedToken['http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'],
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              phone: response.phone,
              role,
            },
            isLoading: false,
            error: null,
          })

          return { shouldRedirect: false }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Login failed',
            isLoading: false,
          })
          throw err
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null })
        try {
          await authService.register(userData)
          set({ isLoading: false })
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Registration failed',
            isLoading: false,
          })
          throw err
        }
      },

      updateUserData: async (data: Partial<User>) => {
        set({ isLoading: true, error: null })
        try {
          await authService.updateUserData({
            email: data.email || '',
            phone: data.phone || '',
          })

          const currentUser = useAuthStore.getState().user
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                email: data.email || currentUser.email,
                phone: data.phone || currentUser.phone,
              },
              isLoading: false,
              error: null,
            })
          }
        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Update failed',
            isLoading: false,
          })
          throw err
        }
      },

      logout: () => {
        localStorage.removeItem('auth_token')
        set({ token: null, user: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
)
