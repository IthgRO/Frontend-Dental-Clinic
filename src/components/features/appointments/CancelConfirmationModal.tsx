// src/components/features/appointments/CancelConfirmationModal.tsx
import { useAppointments } from '@/hooks/useAppointments'
import { Button, Modal } from 'antd'
import { format, parseISO } from 'date-fns'

interface CancelConfirmationModalProps {
  isOpen: boolean
  appointmentId: number
  onClose: () => void
}

const CancelConfirmationModal = ({
  isOpen,
  appointmentId,
  onClose,
}: CancelConfirmationModalProps) => {
  const { appointments, cancelAppointment } = useAppointments()
  const appointment = appointments?.find(a => a.id === appointmentId)

  if (!appointment) return null

  const handleCancel = async () => {
    try {
      await cancelAppointment.mutateAsync(appointmentId)
      onClose()
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to cancel appointment:', error)
    }
  }

  return (
    <Modal title="Cancel Appointment" open={isOpen} footer={null} onCancel={onClose} width={500}>
      <div className="py-6 space-y-6">
        <div className="space-y-4">
          <p className="text-lg">Are you sure you want to cancel this appointment?</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{appointment.serviceName}</p>
            <p className="text-gray-600">
              Dr. {appointment.dentistFirstName} {appointment.dentistLastName}
            </p>
            <p className="text-gray-600">
              {appointment.clinicName}, {appointment.city}
            </p>
            <p className="text-gray-500">
              {format(parseISO(appointment.startTime), 'EEE d MMM, yyyy')} at{' '}
              {format(parseISO(appointment.startTime), 'HH:mm')}
            </p>
            <p className="text-gray-500">
              {appointment.currency} {appointment.servicePrice}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            size="large"
            onClick={onClose}
            className="flex-1"
            disabled={cancelAppointment.isPending}
          >
            No, Go back
          </Button>
          <Button
            danger
            size="large"
            onClick={handleCancel}
            loading={cancelAppointment.isPending}
            className="flex-1"
          >
            Yes, Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CancelConfirmationModal
