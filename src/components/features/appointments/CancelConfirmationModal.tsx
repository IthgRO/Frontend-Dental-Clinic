// src/components/features/appointments/CancelConfirmationModal.tsx
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Button, Modal } from 'antd'
import { format } from 'date-fns'

interface CancelConfirmationModalProps {
  isOpen: boolean
  appointmentId: string
  onClose: () => void
}

const CancelConfirmationModal = ({
  isOpen,
  appointmentId,
  onClose,
}: CancelConfirmationModalProps) => {
  const { appointments, updateStatus } = useAppointmentStore()
  const appointment = appointments.find(a => a.id === appointmentId)

  if (!appointment) return null

  const appointmentDate =
    appointment.date instanceof Date ? appointment.date : new Date(appointment.date)

  return (
    <Modal title="Cancel Appointment" open={isOpen} footer={null} onCancel={onClose} width={500}>
      <div className="py-6 space-y-6">
        <div className="space-y-4">
          <p className="text-lg">Are you sure you want to cancel this appointment?</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{appointment.service}</p>
            <p className="text-gray-600">{appointment.dentistName}</p>
            <p className="text-gray-500">
              {format(appointmentDate, 'EEE d MMM, yyyy')} at {appointment.time}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button size="large" onClick={onClose} className="flex-1">
            No, Go back
          </Button>
          <Button
            danger
            size="large"
            onClick={async () => {
              await updateStatus(appointmentId, 'cancelled')
              onClose()
            }}
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
