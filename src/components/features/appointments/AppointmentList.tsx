import { useAppointments } from '@/hooks/useAppointments'
import { useClinicStore } from '@/store/useClinicStore'
import { Appointment } from '@/types'
import { List, Tag } from 'antd'
import { format } from 'date-fns'

interface AppointmentListProps {
  limit?: number
  date?: Date
}

const AppointmentList = ({ limit, date }: AppointmentListProps) => {
  const { selectedClinic } = useClinicStore()
  const { appointments } = useAppointments(selectedClinic?.id || '')

  let filteredAppointments = appointments.data || []
  if (date) {
    filteredAppointments = filteredAppointments.filter(
      app => format(new Date(app.start_time), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
  }
  if (limit) {
    filteredAppointments = filteredAppointments.slice(0, limit)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'gold',
      confirmed: 'green',
      cancelled: 'red',
      completed: 'blue',
    }
    return colors[status] || 'default'
  }

  return (
    <List
      dataSource={filteredAppointments}
      loading={appointments.isLoading}
      renderItem={(appointment: Appointment) => (
        <List.Item
          extra={
            <Tag color={getStatusColor(appointment.status)}>{appointment.status.toUpperCase()}</Tag>
          }
        >
          <List.Item.Meta
            title={format(new Date(appointment.start_time), 'PPp')}
            description={appointment.notes}
          />
        </List.Item>
      )}
    />
  )
}

export default AppointmentList
