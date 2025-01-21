import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useDentists } from '@/hooks/useDentists'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { BookAppointmentRequest } from '@/types'
import { Button, Modal } from 'antd'
import { format } from 'date-fns'
import { CheckCircle, Clock, CreditCard, MapPin, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface ExtendedAppointment extends BookAppointmentRequest {
  dentistName: string
  clinic: string
  address: string
}

interface BookingConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: ExtendedAppointment
}

const BookingConfirmationModal = ({ isOpen, onClose, appointment }: BookingConfirmModalProps) => {
  const { t } = useAppTranslation('dentists')
  const navigate = useNavigate()
  const { createAppointment } = useAppointmentStore()
  const { dentists } = useDentists()
  const [isLoading, setIsLoading] = useState(false)

  const servicePrice = useMemo(() => {
    const dentist = dentists.find(d => d.id === appointment.dentistId)
    const service = dentist?.services.find(s => s.id === appointment.serviceId)
    return service?.price
  }, [dentists, appointment.dentistId, appointment.serviceId])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await createAppointment({
        dentistId: appointment.dentistId,
        clinicId: appointment.clinicId,
        serviceId: appointment.serviceId,
        startDate: appointment.startDate,
      })
      toast.success(t('booking.notifications.success'))
      onClose()
      navigate('/my-account')
    } catch (error) {
      toast.error(t('booking.notifications.error'))
      console.error('Failed to create appointment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-3 px-2 pt-2">
          <CheckCircle className="text-teal-500" size={24} />
          <h3 className="text-xl font-semibold text-gray-900">{t('booking.confirmation.title')}</h3>
        </div>
      }
      open={isOpen}
      footer={null}
      onCancel={onClose}
      width={500}
      className="rounded-xl overflow-hidden"
    >
      <div className="py-6 space-y-6">
        <div className="space-y-4">
          <p className="text-lg text-gray-600">{t('booking.confirmation.subtitle')}</p>

          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-400" />
              <p className="text-gray-900">{appointment.dentistName}</p>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-400" />
              <div>
                <p className="text-gray-900">{appointment.clinic}</p>
                <p className="text-gray-600">{appointment.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={20} className="text-gray-400" />
              <p className="text-gray-900">
                {format(new Date(appointment.startDate), 'EEE d MMM, yyyy HH:mm')}
              </p>
            </div>

            {/* {servicePrice && (
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-gray-400" />
                <p className="text-gray-900">
                  {t('booking.service.price', { price: servicePrice })}
                </p>
              </div>
            )} */}
          </div>
        </div>

        <div className="flex gap-4">
          <Button size="large" onClick={onClose} className="flex-1 h-11" disabled={isLoading}>
            {t('booking.confirmation.buttons.cancel')}
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleConfirm}
            loading={isLoading}
            disabled={isLoading}
            className="flex-1 h-11 bg-teal-600 hover:bg-teal-700"
          >
            {t('booking.confirmation.buttons.confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default BookingConfirmationModal
