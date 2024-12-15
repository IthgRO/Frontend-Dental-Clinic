import { useDentists } from '@/hooks/useDentists'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { BookAppointmentRequest } from '@/types'
import { Button, Modal } from 'antd'
import { format } from 'date-fns'
import { CheckCircle, Clock, CreditCard, MapPin, User } from 'lucide-react'
import { useMemo } from 'react'
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
  const navigate = useNavigate()
  const { createAppointment } = useAppointmentStore()
  const { dentists } = useDentists()

  const servicePrice = useMemo(() => {
    const dentist = dentists.find(d => d.id === appointment.dentistId)
    const service = dentist?.services.find(s => s.id === appointment.serviceId)
    return service?.price
  }, [dentists, appointment.dentistId, appointment.serviceId])

  const handleConfirm = async () => {
    try {
      await createAppointment({
        dentistId: appointment.dentistId,
        clinicId: appointment.clinicId,
        serviceId: appointment.serviceId,
        startDate: appointment.startDate,
      })
      onClose()
      navigate('/my-account')
    } catch (error) {
      console.error('Failed to create appointment:', error)
    }
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-3 px-2 pt-2">
          <CheckCircle className="text-teal-500" size={24} />
          <h3 className="text-xl font-semibold text-gray-900">Confirm Your Appointment</h3>
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
          <p className="text-lg text-gray-600">Please review your appointment details below:</p>

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

            {servicePrice && (
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-gray-400" />
                <p className="text-gray-900">€{servicePrice.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button size="large" onClick={onClose} className="flex-1 h-11">
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleConfirm}
            className="flex-1 h-11 bg-teal-600 hover:bg-teal-700"
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default BookingConfirmationModal
