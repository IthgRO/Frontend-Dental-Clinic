import { useState } from 'react'
import AppointmentListNew from '@/components/features/appointments/AppointmentListNew'
import CancelConfirmationModal from '@/components/features/appointments/CancelConfirmationModal'
import EditConfirmationModal from '@/components/features/appointments/EditConfirmationModal'
import AccountSettings from '@/components/features/account/AccountSettings'
import { useAppointments } from '@/hooks/useAppointments'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Spin } from 'antd'
import { Calendar, Settings } from 'lucide-react'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

const MyAccountPage = () => {
  const { t } = useAppTranslation('appointments')
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null)
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null)
  const { appointments, isLoading } = useAppointments()
  const location = useLocation()
  const currentPath = location.pathname

  const navigationItems = [
    {
      id: 'appointments',
      path: '/my-account',
      label: t('myAppointments.title'),
      icon: Calendar,
    },
    {
      id: 'settings',
      path: '/my-account/settings',
      label: t('accountSettings.title'),
      icon: Settings,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    )
  }

  const isAppointmentsPage = currentPath === '/my-account'

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Mobile Tabs */}
      <div className="md:hidden bg-white rounded-lg shadow-sm p-2">
        <div className="flex">
          {navigationItems.map(item => {
            const Icon = item.icon
            const isActive = item.path === currentPath
            return (
              <Link
                key={item.id}
                to={item.path}
                className={clsx(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  isActive ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon size={18} className={isActive ? 'text-teal-600' : 'text-gray-400'} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 shrink-0">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          {navigationItems.map(item => {
            const Icon = item.icon
            const isActive = item.path === currentPath
            return (
              <Link
                key={item.id}
                to={item.path}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors',
                  isActive ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon size={20} className={isActive ? 'text-teal-600' : 'text-gray-400'} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {isAppointmentsPage ? (
          <>
            <AppointmentListNew
              appointments={appointments || []}
              onCancelClick={setSelectedAppointmentId}
              onEditClick={setEditingAppointmentId}
            />

            {selectedAppointmentId && (
              <CancelConfirmationModal
                isOpen={!!selectedAppointmentId}
                appointmentId={selectedAppointmentId}
                onClose={() => setSelectedAppointmentId(null)}
              />
            )}

            {editingAppointmentId && (
              <EditConfirmationModal
                isOpen={!!editingAppointmentId}
                appointmentId={editingAppointmentId}
                onClose={() => setEditingAppointmentId(null)}
              />
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <AccountSettings />
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAccountPage
