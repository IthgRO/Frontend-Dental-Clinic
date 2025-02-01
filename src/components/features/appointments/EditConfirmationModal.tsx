// EditConfirmationModal.tsx
import { useAppointments } from '@/hooks/useAppointments'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { AlertCircle, Clock, MapPin, User, X } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Button, Modal } from 'antd'
import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import AppointmentTimePicker from './AppointmentTimePicker'

interface EditConfirmationModalProps {
  isOpen: boolean
  appointmentId: number
  onClose: () => void
}

const EditConfirmationModal = ({ isOpen, appointmentId, onClose }: EditConfirmationModalProps) => {
  const { t } = useAppTranslation('appointments')
  const { appointments, updateAppointment } = useAppointments()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()

  const appointment = appointments?.find((a: any) => a.id === appointmentId)
  if (!appointment) return null

  // Set initial selected date and time from the appointment when the modal opens.
  useEffect(() => {
    if (appointment && isOpen) {
      const appointmentDate = parseISO(appointment.startTime)
      setSelectedDate(appointmentDate)
      setSelectedTime(format(appointmentDate, 'HH:mm'))
    }
  }, [appointment, isOpen])

  const handleUpdate = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        toast.error(t('notifications.error.invalidDate'))
        return
      }

      // Combine the selected date with the chosen time.
      const [hours, minutes] = selectedTime.split(':').map(Number)
      const newDate = new Date(selectedDate)
      newDate.setHours(hours, minutes, 0)
      const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss")

      await updateAppointment.mutateAsync({ appointmentId, newDate: formattedDate })
      toast.success(t('notifications.success.updated'))
      onClose()
    } catch (error) {
      toast.error(t('notifications.error.updating'))
      console.error('Failed to update appointment:', error)
    }
  }

  return (
    <>
      <style jsx global>{`
        :where(.css-dev-only-do-not-override-1x0dypw).ant-modal .ant-modal-content {
          padding: 0 !important;
        }
        @media (min-width: 640px) {
          :where(.css-dev-only-do-not-override-1x0dypw).ant-modal .ant-modal-content {
            padding: 24px !important;
          }
        }
      `}</style>

      <Modal
        open={isOpen}
        footer={null}
        onCancel={onClose}
        width={1000}
        centered
        closeIcon={<X className="w-5 h-5" />}
        rootClassName="!max-w-none"
        modalRender={modal => (
          <div className="rounded-2xl overflow-hidden bg-white">
            <div className="max-h-[90vh] overflow-y-auto">{modal}</div>
          </div>
        )}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-3 sm:p-4 lg:border-r border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-blue-500" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">{t('editModal.title')}</h3>
              </div>

              <p className="text-base text-gray-600">{t('editModal.message')}</p>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{appointment.serviceName}</p>
                    <p className="text-gray-600">
                      {t('appointmentList.doctorPrefix')} {appointment.dentistFirstName}{' '}
                      {appointment.dentistLastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">
                    {appointment.clinicName}, {appointment.city}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-400 flex-shrink-0" />
                  <p className="text-gray-600">
                    {format(parseISO(appointment.startTime), 'EEE d MMM, yyyy')}
                    {t('appointmentList.timeFormat')}{' '}
                    {format(parseISO(appointment.startTime), 'HH:mm')}
                  </p>
                </div>
              </div>

              {selectedDate && selectedTime && (
                <div className="mt-4 p-3 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 font-medium">
                    {t('editModal.newAppointment') || 'New Appointment'}
                  </p>
                  <p className="text-gray-600">
                    {format(selectedDate, 'EEE, d MMM yyyy')} {t('appointmentList.timeFormat')}{' '}
                    {selectedTime}
                  </p>
                </div>
              )}

              <div className="pt-3">
                <div className="flex gap-3">
                  <Button size="large" onClick={onClose} className="flex-1 h-11">
                    {t('editModal.keepButton')}
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleUpdate}
                    loading={updateAppointment.isPending}
                    disabled={updateAppointment.isPending || !selectedDate || !selectedTime}
                    className="flex-1 h-11 bg-teal-600 hover:bg-teal-700 border-teal-600 hover:border-teal-700"
                  >
                    {t('editModal.confirmButton')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <AppointmentTimePicker
              dentistId={appointment.dentistId}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditConfirmationModal
