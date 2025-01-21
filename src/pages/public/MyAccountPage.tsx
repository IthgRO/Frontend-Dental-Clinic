import AppointmentListNew from '@/components/features/appointments/AppointmentListNew'
import CancelConfirmationModal from '@/components/features/appointments/CancelConfirmationModal'
import EditConfirmationModal from '@/components/features/appointments/EditConfirmationModal' // NEW
import { useAppointments } from '@/hooks/useAppointments'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Spin } from 'antd'
import { useState } from 'react'

const MyAccountPage = () => {
  const { t } = useAppTranslation('appointments')
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null)
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null)
  const { appointments, isLoading } = useAppointments()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">{t('myAppointments.title')}</h1>
      </div>

      <AppointmentListNew
        appointments={appointments || []}
        onCancelClick={setSelectedAppointmentId}
        onEditClick={setEditingAppointmentId} // NEW
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
  )
}

export default MyAccountPage
