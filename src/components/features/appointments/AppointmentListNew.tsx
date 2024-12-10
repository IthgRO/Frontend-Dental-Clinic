// src/components/features/appointments/AppointmentList.tsx
import { Appointment } from '@/types'
import { Button } from 'antd'
import { format } from 'date-fns'

interface AppointmentListProps {
  appointments: Appointment[]
  onCancelClick: (id: string) => void
}

const AppointmentListNew = ({ appointments, onCancelClick }: AppointmentListProps) => (
  <div className="divide-y">
    {appointments.map(appointment => (
      <div key={appointment.id} className="p-6 flex items-center justify-between">
        <div className="flex gap-6">
          <img
            src={appointment.dentistImage || '/api/placeholder/100/100'}
            alt={appointment.dentistName}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold mb-1">{appointment.dentistName}</h3>
            <p className="text-gray-600 mb-2">{appointment.service}</p>
            <p className="text-gray-500">
              {format(new Date(appointment.date), 'EEE d MMM, yyyy')} at {appointment.time}
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
