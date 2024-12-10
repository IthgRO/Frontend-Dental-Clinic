// src/components/features/booking/BookingConfirmModal.tsx
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Button, Modal } from 'antd'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

interface BookingConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: {
    service: string
    dentistName: string
    clinic: string
    date: string
    time: string
    address: string
  }
}

const BookingConfirmModal = ({ isOpen, onClose, appointment }: BookingConfirmModalProps) => {
  const navigate = useNavigate()
  const { createAppointment } = useAppointmentStore()

  const handleConfirm = async () => {
    await createAppointment({
      ...appointment,
      id: Date.now().toString(),
      status: 'confirmed',
    })
    onClose()
    navigate('/my-account')
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
          <LabelValue label="Service" value={appointment.service} />
          <LabelValue label="Dentist" value={appointment.dentistName} />
          <LabelValue label="Clinic" value={appointment.clinic} />
          <LabelValue
            label="Appointment Time"
            value={`${format(new Date(appointment.date), 'EEE d MMM, yyyy')} at ${appointment.time}`}
          />
          <LabelValue label="Address" value={appointment.address} />
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

export default BookingConfirmModal
