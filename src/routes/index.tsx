import AuthLayout from '@/components/layouts/AuthLayout'
import MainLayout from '@/components/layouts/MainLayout'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Appointments = lazy(() => import('@/pages/appointments'))
const Services = lazy(() => import('@/pages/services'))
const Profile = lazy(() => import('@/pages/profile'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
