// src/components/features/appointments/AppointmentListNew.tsx
import { ApiAppointment } from '@/types'
import { Button } from 'antd'
import { format, parseISO } from 'date-fns'

interface AppointmentListProps {
  appointments: ApiAppointment[]
  onCancelClick: (id: number) => void
}

const AppointmentListNew = ({ appointments, onCancelClick }: AppointmentListProps) => (
  <div className="divide-y">
    {appointments.map(appointment => (
      <div key={appointment.id} className="p-6 flex items-center justify-between">
        <div className="flex gap-6">
          <img
            src="/api/placeholder/100/100"
            alt={`${appointment.dentistFirstName} ${appointment.dentistLastName}`}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold mb-1">
              Dr. {appointment.dentistFirstName} {appointment.dentistLastName}
            </h3>
            <p className="text-gray-600 mb-2">
              {appointment.serviceName} - {appointment.currency} {appointment.servicePrice}
            </p>
            <p className="text-gray-500">
              {format(parseISO(appointment.startTime), 'EEE d MMM, yyyy')} at{' '}
              {format(parseISO(appointment.startTime), 'HH:mm')}
            </p>
            <p className="text-gray-500">
              {appointment.clinicName}, {appointment.city}
            </p>
          </div>
        </div>
        <Button danger onClick={() => onCancelClick(appointment.id)}>
          Cancel Appointment
        </Button>
      </div>
    ))}
  </div>
)

export default AppointmentListNew
