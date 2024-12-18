import AuthModal from '@/components/features/auth/AuthModal'
import BookingConfirmationModal from '@/components/features/booking/BookingConfirmationModal'
import DentistHeader from '@/components/features/public/DentistHeader'
import ServiceSelect from '@/components/features/public/ServiceSelect'
import TimeGrid from '@/components/features/public/TimeGrid'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useDentists } from '@/hooks/useDentists'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Button, Spin } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DentistBookingPage = () => {
  const { t } = useAppTranslation('dentists')
  const navigate = useNavigate()
  const { id } = useParams()
  const { selectedDentist, isLoading, error } = useDentists(id)
  const { selectedAppointment, setSelectedService, clearSelectedAppointment } =
    useAppointmentStore()
  const { token } = useAuthStore()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // Check if both service and time slot are selected
  const isBookingValid = selectedAppointment?.serviceId && selectedAppointment?.startDate

  useEffect(() => {
    return () => {
      clearSelectedAppointment()
    }
  }, [clearSelectedAppointment])

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
    if (!isBookingValid) return
    if (!token) {
      setIsAuthModalOpen(true)
    } else {
      setIsConfirmModalOpen(true)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">{t('page.errorLoading')}</h2>
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
      <div className="mb-6">
        <Button
          icon={<ArrowLeft className="w-5 h-5" />}
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          <span>{t('booking.navigation.back')}</span>
        </Button>
      </div>

      <DentistHeader
        name={selectedDentist.name}
        clinic={selectedDentist.clinic.name}
        city={selectedDentist.clinic.city}
        dentistId={selectedDentist.id}
        priceRange={selectedDentist.priceRange}
        phone={selectedDentist.phone}
        email={selectedDentist.email}
      />

      <div className="flex items-center gap-4 mb-8 justify-between">
        <ServiceSelect services={selectedDentist.services} className="w-[500px]" />
        <Button
          type="primary"
          size="large"
          disabled={!isBookingValid}
          onClick={handleContinueClick}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {t('booking.service.continue')}
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
