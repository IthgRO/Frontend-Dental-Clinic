// src/pages/public/DentistBookingPage.tsx
import AuthModal from '@/components/features/auth/AuthModal'
import BookingConfirmationModal from '@/components/features/booking/BookingConfirmationModal'
import DentistHeader from '@/components/features/public/DentistHeader'
import ServiceSelect from '@/components/features/public/ServiceSelect'
import TimeGrid from '@/components/features/public/TimeGrid'
import { useDentists } from '@/hooks/useDentists'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Button, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DentistBookingPage = () => {
  const { id } = useParams()
  const { selectedDentist, isLoading, error } = useDentists(id)
  const { selectedAppointment, setSelectedService } = useAppointmentStore()
  const { token } = useAuthStore()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // Preselect first service when dentist data loads
  useEffect(() => {
    if (selectedDentist?.services && selectedDentist.services.length > 0) {
      const firstService = selectedDentist.services[0]
      setSelectedService({
        value: firstService.id.toString(),
        label: firstService.name,
        price: firstService.price,
      })
    }
  }, [selectedDentist, setSelectedService])

  const handleContinueClick = () => {
    if (!token) {
      setIsAuthModalOpen(true)
    } else {
      setIsConfirmModalOpen(true)
    }
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dentist</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (isLoading || !selectedDentist) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <DentistHeader name={selectedDentist.name} clinic={selectedDentist.clinic.name} />

      <div className="flex items-center gap-4 mb-8 justify-between">
        <ServiceSelect services={selectedDentist.services} className="w-[500px]" />
        <Button
          type="primary"
          size="large"
          disabled={!selectedAppointment?.serviceId}
          onClick={handleContinueClick}
          className="bg-teal-600 hover:bg-teal-700"
        >
          Continue
        </Button>
      </div>

      <TimeGrid dentistId={selectedDentist.id} />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false)
          setIsConfirmModalOpen(true)
        }}
      />

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
    </>
  )
}

export default DentistBookingPage
