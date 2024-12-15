// src/pages/public/MyAccountPage.tsx
import AppointmentListNew from '@/components/features/appointments/AppointmentListNew'
import CancelConfirmationModal from '@/components/features/appointments/CancelConfirmationModal'
import { useAppointments } from '@/hooks/useAppointments'
import { Spin } from 'antd'
import { useState } from 'react'

const MyAccountPage = () => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null)
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
        <h1 className="text-2xl font-semibold">My Appointments</h1>
      </div>

      <AppointmentListNew
        appointments={appointments || []}
        onCancelClick={setSelectedAppointmentId}
      />

      {selectedAppointmentId && (
        <CancelConfirmationModal
          isOpen={!!selectedAppointmentId}
          appointmentId={selectedAppointmentId}
          onClose={() => setSelectedAppointmentId(null)}
        />
      )}
    </>
  )
}

export default MyAccountPage
