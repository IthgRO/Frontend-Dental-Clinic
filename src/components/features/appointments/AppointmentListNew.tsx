import { useAppTranslation } from '@/hooks/useAppTranslation'
import { ApiAppointment } from '@/types'
import { Button } from 'antd'
import { format, parseISO, isPast } from 'date-fns'
import { Clock, MapPin, Eye } from 'lucide-react'

interface AppointmentListProps {
  appointments: ApiAppointment[]
  onEditClick: (id: number) => void
}

const AppointmentListNew = ({ appointments, onEditClick }: AppointmentListProps) => {
  const { t } = useAppTranslation('appointments')

  const isAppointmentPast = (startTime: string) => {
    const appointmentDate = parseISO(startTime)
    return isPast(appointmentDate)
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">{t('appointmentList.noAppointments')}</div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {appointments.map(appointment => {
        const isPastAppointment = isAppointmentPast(appointment.startTime)

        return (
          <div
            key={appointment.id}
            className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
          >
            <div className="p-4 flex flex-col lg:flex-row gap-4">
              {/* Image and Details */}
              <div className="flex gap-4 flex-1">
                <img
                  src={`/placeholders/${appointment.dentistLastName}.png`}
                  alt={`${appointment.dentistFirstName} ${appointment.dentistLastName}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {t('appointmentList.doctorPrefix')} {appointment.dentistFirstName}{' '}
                    {appointment.dentistLastName}
                  </h3>
                  <p className="text-teal-600 font-medium mb-2">{appointment.serviceName}</p>

                  <div className="space-y-2 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="flex-shrink-0 text-gray-400" />
                      <span className="truncate">
                        {format(parseISO(appointment.startTime), 'EEE d MMM, yyyy')}{' '}
                        {t('appointmentList.timeFormat')}{' '}
                        {format(parseISO(appointment.startTime), 'HH:mm')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="flex-shrink-0 text-gray-400" />
                      <span className="truncate">
                        {appointment.clinicName}, {appointment.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View/Edit Button */}
              <div className="flex flex-col gap-2 sm:min-w-[120px]">
                <Button
                  size="large"
                  onClick={() => onEditClick(appointment.id)}
                  className="w-full border-teal-600 hover:border-teal-700 text-teal-600 hover:text-teal-700 rounded-md h-10"
                >
                  {isPastAppointment ? (
                    <div className="flex items-center justify-center gap-2">
                      <Eye size={16} />
                      {t('appointmentList.viewButton')}
                    </div>
                  ) : (
                    t('appointmentList.editButton')
                  )}
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AppointmentListNew
