// src/pages/public/MyAccountPage.tsx
import AppointmentListNew from '@/components/features/appointments/AppointmentListNew'
import CancelConfirmationModal from '@/components/features/appointments/CancelConfirmationModal'
import Navigation from '@/components/layouts/Navigation'
import { useAppointments } from '@/hooks/useAppointments'
import { Button, Spin } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAccountPage = () => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null)
  const { appointments, isLoading } = useAppointments()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">My Appointments</h1>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/dentists')}
            className="bg-black hover:bg-gray-800"
          >
            Book New Appointment
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <AppointmentListNew
            appointments={appointments || []}
            onCancelClick={setSelectedAppointmentId}
          />
        </div>

        {selectedAppointmentId && (
          <CancelConfirmationModal
            isOpen={!!selectedAppointmentId}
            appointmentId={selectedAppointmentId}
            onClose={() => setSelectedAppointmentId(null)}
          />
        )}
      </div>
    </div>
  )
}

export default MyAccountPage
