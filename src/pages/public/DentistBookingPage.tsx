// src/pages/public/DentistBookingPage.tsx
import BookingConfirmationModal from '@/components/features/booking/BookingConfirmationModal'
import DentistHeader from '@/components/features/public/DentistHeader'
import Navigation from '@/components/features/public/Navigation'
import ServiceSelect from '@/components/features/public/ServiceSelect'
import TimeGrid from '@/components/features/public/TimeGrid'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Button } from 'antd'
import { useState } from 'react'

const DentistBookingPage = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const { selectedAppointment } = useAppointmentStore()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <DentistHeader name="Dr. Leona Vale" clinic="Bright Smile Dentistry" />
        <ServiceSelect />
        <TimeGrid />
        <div className="flex justify-end mt-8">
          <Button
            type="primary"
            size="large"
            disabled={!selectedAppointment}
            onClick={() => setIsConfirmModalOpen(true)}
            className="bg-black hover:bg-gray-800"
          >
            Continue
          </Button>
        </div>
      </div>

      {selectedAppointment && (
        <BookingConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          appointment={{
            ...selectedAppointment,
            dentistName: 'Dr. Leona Vale',
            clinic: 'Bright Smile Dentistry',
            address: 'Norway, Dummy Street 45',
          }}
        />
      )}
    </div>
  )
}

export default DentistBookingPage
