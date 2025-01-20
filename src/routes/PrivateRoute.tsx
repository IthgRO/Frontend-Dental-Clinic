// src/routes/PrivateRoute.tsx

import { getAuthToken, getUserRole } from '@/utils/auth'
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation()
  const token = getAuthToken()
  const role = getUserRole()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is Dentist, possibly redirect them to dentist auto-login with the token:
  if (role === 'Dentist') {
    // It's up to you if you want a one-liner or something more elaborate:
    window.location.href = `http://localhost:5174/auto-login?token=${token}`
    return null
  }

  return <>{children}</>
}

export default PrivateRoute
