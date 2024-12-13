import BookingConfirmationModal from '@/components/features/booking/BookingConfirmationModal'
import DentistHeader from '@/components/features/public/DentistHeader'
import Navigation from '@/components/features/public/Navigation'
import ServiceSelect from '@/components/features/public/ServiceSelect'
import TimeGrid from '@/components/features/public/TimeGrid'
import { useDentists } from '@/hooks/useDentists'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Button, Spin } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const DentistBookingPage = () => {
  const { id } = useParams()
  const { selectedDentist, dentists, isLoading, error } = useDentists(id)
  const { selectedAppointment } = useAppointmentStore()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  // Handle errors
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dentist</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  // Handle loading state
  if (isLoading || !selectedDentist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-6xl mx-auto px-8 py-8">
        <DentistHeader name={selectedDentist.name} clinic={selectedDentist.clinic.name} />
        <ServiceSelect services={selectedDentist.services} />
        <TimeGrid dentistId={selectedDentist.id} />
        <div className="flex justify-end mt-8">
          <Button
            type="primary"
            size="large"
            disabled={!selectedAppointment?.startDate || !selectedAppointment?.serviceId}
            onClick={() => setIsConfirmModalOpen(true)}
            className="bg-black hover:bg-gray-800"
          >
            Continue
          </Button>
        </div>
      </div>

      {selectedAppointment?.startDate && selectedAppointment?.serviceId && (
        <BookingConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          appointment={{
            dentistId: selectedDentist.id,
            clinicId: selectedDentist.clinic.id,
            serviceId: selectedAppointment.serviceId,
            startDate: selectedAppointment.startDate,
            dentistName: selectedDentist.name,
            clinic: selectedDentist.clinic.name,
            address: selectedDentist.clinic.city,
          }}
        />
      )}
    </div>
  )
}

export default DentistBookingPage
