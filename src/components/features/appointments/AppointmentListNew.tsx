import { useAppTranslation } from '@/hooks/useAppTranslation'
import { ApiAppointment } from '@/types'
import { Button } from 'antd'
import { format, parseISO } from 'date-fns'
import { Clock, CreditCard, MapPin } from 'lucide-react'

interface AppointmentListProps {
  appointments: ApiAppointment[]
  onCancelClick: (id: number) => void
}

const AppointmentListNew = ({ appointments, onCancelClick }: AppointmentListProps) => {
  const { t } = useAppTranslation('appointments')

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">{t('appointmentList.noAppointments')}</div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {appointments.map(appointment => (
        <div
          key={appointment.id}
          className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:gap-6">
            <div className="flex gap-4 sm:gap-6 items-start">
              <img
                src={`/placeholders/${appointment.dentistLastName}.png`}
                alt={`${appointment.dentistFirstName} ${appointment.dentistLastName}`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900">
                  {t('appointmentList.doctorPrefix')} {appointment.dentistFirstName}{' '}
                  {appointment.dentistLastName}
                </h3>
                <p className="text-teal-600 font-medium mb-2 sm:mb-3">{appointment.serviceName}</p>
                <div className="space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="flex-shrink-0" />
                    <span>
                      {format(parseISO(appointment.startTime), 'EEE d MMM, yyyy')}{' '}
                      {t('appointmentList.timeFormat')}{' '}
                      {format(parseISO(appointment.startTime), 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span>
                      {appointment.clinicName}, {appointment.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="flex-shrink-0" />
                    <span>
                      {appointment.currency} {appointment.servicePrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <Button
              danger
              onClick={() => onCancelClick(appointment.id)}
              size="large"
              className="w-full sm:w-auto px-6 hover:border-red-500"
            >
              {t('appointmentList.cancelButton')}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AppointmentListNew
