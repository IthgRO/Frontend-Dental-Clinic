import { Appointment } from '@/types'
import { Badge, Calendar } from 'antd'
import type { Moment } from 'moment'

interface CalendarViewProps {
  appointments: Appointment[]
  onSelect: (date: Moment) => void
  loading?: boolean
}

const CalendarView = ({ appointments, onSelect, loading }: CalendarViewProps) => {
  const dateCellRender = (date: Moment) => {
    const dayAppointments = appointments?.filter(app => date.isSame(app.start_time, 'day'))

    return dayAppointments?.length ? (
      <Badge count={dayAppointments.length} style={{ backgroundColor: '#1890ff' }} />
    ) : null
  }

  return (
    <Calendar
      fullscreen={false}
      onSelect={onSelect}
      dateCellRender={dateCellRender}
      loading={loading}
    />
  )
}

export default CalendarView
