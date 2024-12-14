// src/components/features/booking/BookingConfirmationModal.tsx
import { useDentists } from '@/hooks/useDentists'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { BookAppointmentRequest } from '@/types'
import { Button, Modal } from 'antd'
import { format } from 'date-fns'
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

  // Find the service price
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
      title="Confirm Appointment"
      open={isOpen}
      footer={null}
      onCancel={onClose}
      width={500}
      className="rounded-lg"
    >
      <div className="py-6 space-y-6">
        <div className="space-y-4">
          <LabelValue label="Dentist" value={appointment.dentistName} />
          <LabelValue label="Clinic" value={appointment.clinic} />
          <LabelValue
            label="Appointment Time"
            value={format(new Date(appointment.startDate), 'EEE d MMM, yyyy HH:mm')}
          />
          <LabelValue label="Address" value={appointment.address} />
          {servicePrice && <LabelValue label="Price" value={`€${servicePrice.toLocaleString()}`} />}
        </div>

        <div className="flex gap-4">
          <Button size="large" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleConfirm}
            className="flex-1 bg-black hover:bg-gray-800"
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    </Modal>
  )
}

const LabelValue = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    <p className="text-lg">{value}</p>
  </div>
)

export default BookingConfirmationModal
