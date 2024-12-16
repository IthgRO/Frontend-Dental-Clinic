import { ApiAppointment } from '@/types'
import { Button } from 'antd'
import { format, parseISO } from 'date-fns'
import { Clock, CreditCard, MapPin } from 'lucide-react'

interface AppointmentListProps {
  appointments: ApiAppointment[]
  onCancelClick: (id: number) => void
}

const AppointmentListNew = ({ appointments, onCancelClick }: AppointmentListProps) => (
  <div className="flex flex-col gap-4">
      {appointments.map(appointment => (
        <div
          key={appointment.id}
          className="p-6 flex items-center justify-between bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
        >
          <div className="flex gap-6">
            <img
              src={`/placeholders/${appointment.dentistLastName}.png`}
              alt={`${appointment.dentistFirstName} ${appointment.dentistLastName}`}
              className="w-24 h-24 rounded-xl object-cover shadow-sm"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Dr. {appointment.dentistFirstName} {appointment.dentistLastName}
              </h3>
              <p className="text-teal-600 font-medium mb-3">{appointment.serviceName}</p>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>
                    {format(parseISO(appointment.startTime), 'EEE d MMM, yyyy')} at{' '}
                    {format(parseISO(appointment.startTime), 'HH:mm')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>
                    {appointment.clinicName}, {appointment.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>
                    {appointment.currency} {appointment.servicePrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            danger
            onClick={() => onCancelClick(appointment.id)}
            size="large"
            className="px-6 hover:border-red-500"
          >
            Cancel Appointment
          </Button>
        </div>
      ))}
    </div>
)

export default AppointmentListNew
