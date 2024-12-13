import { Appointment } from '@/types'
import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'

interface AppointmentListProps {
  appointments: Appointment[]
  limit?: number
}

const AppointmentList = ({ appointments, limit }: AppointmentListProps) => {
  const displayedAppointments = limit ? appointments.slice(0, limit) : appointments

  const columns: ColumnsType<Appointment> = [
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Dentist',
      dataIndex: 'dentistName',
      key: 'dentistName',
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <span>
          {format(new Date(record.date), 'MMM d, yyyy')} at {record.time}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'confirmed' ? 'green' : status === 'cancelled' ? 'red' : 'gold'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ]

  return (
    <Table columns={columns} dataSource={displayedAppointments} rowKey="id" pagination={false} />
  )
}

export default AppointmentList
