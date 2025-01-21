import { useAppointments } from '@/hooks/useAppointments'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { AlertCircle, Clock, CreditCard, MapPin, User } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Button, Modal, Input } from 'antd'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

interface EditConfirmationModalProps {
  isOpen: boolean
  appointmentId: number
  onClose: () => void
}

const EditConfirmationModal = ({ isOpen, appointmentId, onClose }: EditConfirmationModalProps) => {
  const { t } = useAppTranslation('appointments')
  const { appointments, updateAppointment } = useAppointments()
  const [newDate, setNewDate] = useState('') // or separate date/time states

  const appointment = appointments?.find((a: any) => a.id === appointmentId)
  if (!appointment) return null

  const handleUpdate = async () => {
    try {
      if (!newDate) {
        toast.error(t('notifications.error.invalidDate')) // you'll need a new i18n key
        return
      }

      await updateAppointment.mutateAsync({ appointmentId, newDate })
      toast.success(t('notifications.success.updated')) // new i18n key
      onClose()
    } catch (error) {
      toast.error(t('notifications.error.updating')) // new i18n key
      console.error('Failed to update appointment:', error)
    }
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-3 px-2 pt-2">
          <AlertCircle className="text-blue-500" size={24} />
          <h3 className="text-xl font-semibold text-gray-900">{t('editModal.title')}</h3>
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
          <p className="text-lg text-gray-600">{t('editModal.message')}</p>

          {/* Show appointment info, similar to CancelConfirmationModal */}
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{appointment.serviceName}</p>
                <p className="text-gray-600">
                  {t('appointmentList.doctorPrefix')} {appointment.dentistFirstName}{' '}
                  {appointment.dentistLastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-400" />
              <p className="text-gray-600">
                {appointment.clinicName}, {appointment.city}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={20} className="text-gray-400" />
              <p className="text-gray-600">
                {format(parseISO(appointment.startTime), 'EEE d MMM, yyyy')}
                {t('appointmentList.timeFormat')} {format(parseISO(appointment.startTime), 'HH:mm')}
              </p>
            </div>

            {/* <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-gray-400" />
              <p className="text-gray-600">
                {appointment.currency} {appointment.servicePrice}
              </p>
            </div> */}
          </div>

          <div>
            <label htmlFor="newDate" className="block mb-1 text-gray-600">
              {t('editModal.newDateLabel')}
            </label>
            <Input
              id="newDate"
              type="datetime-local"
              onChange={e => setNewDate(e.target.value)}
              value={newDate}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            size="large"
            onClick={onClose}
            className="flex-1 h-11"
            disabled={updateAppointment.isPending}
          >
            {t('editModal.keepButton')}
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleUpdate}
            loading={updateAppointment.isPending}
            disabled={updateAppointment.isPending}
            className="flex-1 h-11"
          >
            {t('editModal.confirmButton')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditConfirmationModal
