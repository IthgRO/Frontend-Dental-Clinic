// src/pages/AutoLogin.tsx

import { useAuthStore } from '@/store/useAuthStore'
import { parseJwt } from '@/utils/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AutoLoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const setToken = useAuthStore(state => state.setToken)
  const setUser = useAuthStore(state => state.setUser)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      // Store token in localStorage
      localStorage.setItem('auth_token', token)
      setToken(token)

      // Decode
      const decoded = parseJwt(token)
      if (decoded) {
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

        setUser({
          id: decoded['http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'],
          firstName: decoded['given_name'] || '',
          lastName: decoded['family_name'] || '',
          email: decoded['email'] || '',
          phone: decoded['phone_number'] || '',
          role,
        })
      }
    }
    // After storing, navigate to your patient dashboard or my-account
    navigate('/my-account', { replace: true })
  }, [searchParams, navigate, setToken, setUser])

  return null
}
