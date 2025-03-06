import { LoginForm } from '@/components/features/auth/LoginForm'
import { RegisterForm } from '@/components/features/auth/RegisterForm'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useAuth } from '@/hooks/useAuth'
import { authService, RegisterRequest } from '@/services/auth.service'
import { useAuthStore } from '@/store/useAuthStore'
import { message, Modal, Tabs } from 'antd'
import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const { t } = useAppTranslation('auth')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { error, clearError } = useAuthStore()
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState('1')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await login.mutateAsync(values, {
        onSuccess: () => {
          clearError()
          onSuccess()
          onClose()
        },
      })
    } catch (e) {
      // Error is handled by the auth store
    }
  }

  const handleRegister = async (values: any) => {
    if (!termsAccepted) {
      message.error(t('validation.acceptTerms'))
      return
    }

    setIsRegistering(true)
    try {
      const payload: RegisterRequest = {
        id: 0,
        clinicId: 1,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        role: 0, // Patient role
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        password: values.password,
      }

      await authService.register(payload)
      message.success(t('register.success'))
      setActiveTab('1') // Switch to login tab
      setTermsAccepted(false)
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        if (Array.isArray(errors.$)) {
          message.error(errors.$[0])
        } else {
          message.error(t('register.validationError'))
        }
      } else {
        message.error(t('register.error'))
      }
    } finally {
      setIsRegistering(false)
    }
  }

  const items = [
    {
      key: '1',
      label: t('login.title'),
      children: (
        <LoginForm
          onFinish={handleLogin}
          isLoading={login.isPending}
          error={error}
          showLinks={false}
          className="pt-4"
        />
      ),
    },
    {
      key: '2',
      label: t('register.title'),
      children: (
        <RegisterForm
          onFinish={handleRegister}
          isLoading={isRegistering}
          termsAccepted={termsAccepted}
          onTermsChange={setTermsAccepted}
          showLinks={false}
          className="pt-4"
        />
      ),
    },
  ]

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      destroyOnClose
      afterClose={() => {
        clearError()
        setTermsAccepted(false)
        setActiveTab('1')
      }}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} className="auth-tabs" />
    </Modal>
  )
}

export default AuthModal
