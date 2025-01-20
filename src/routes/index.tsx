// src/routes/index.tsx

import AuthLayout from '@/components/layouts/AuthLayout'
import PublicLayout from '@/components/layouts/public/PublicLayout'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

const LandingPage = lazy(() => import('@/pages/public/LandingPage'))
const Login = lazy(() => import('@/pages/auth/Login'))
const AutoLoginPage = lazy(() => import('@/pages/auth/AutoLogin'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))
const DentistsPage = lazy(() => import('@/pages/public/DentistsPage'))
const DentistBookingPage = lazy(() => import('@/pages/public/DentistBookingPage'))
const MyAccountPage = lazy(() => import('@/pages/public/MyAccountPage'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dentists" element={<DentistsPage />} />
          <Route path="/dentists/:id" element={<DentistBookingPage />} />
          <Route
            path="/my-account"
            element={
              <PrivateRoute>
                <MyAccountPage />
              </PrivateRoute>
            }
          />
          {/* Our auto-login route */}
          <Route path="/auto-login" element={<AutoLoginPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
