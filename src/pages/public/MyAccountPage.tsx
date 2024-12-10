// src/pages/MyAccountPage.tsx
import AppointmentListNew from '@/components/features/appointments/AppointmentListNew'
import CancelConfirmationModal from '@/components/features/appointments/CancelConfirmationModal'
import Navigation from '@/components/layouts/Navigation'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAccountPage = () => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null)
  const { appointments } = useAppointmentStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-6 py-8">
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
            appointments={appointments}
            onCancelClick={setSelectedAppointmentId}
          />
        </div>

        <CancelConfirmationModal
          isOpen={!!selectedAppointmentId}
          appointmentId={selectedAppointmentId!}
          onClose={() => setSelectedAppointmentId(null)}
        />
      </div>
    </div>
  )
}

export default MyAccountPage
