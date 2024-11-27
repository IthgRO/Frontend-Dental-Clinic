import AppointmentForm from '@/components/features/appointments/AppointmentForm'
import { useAppointments } from '@/hooks/useAppointments'
import { useClinicStore } from '@/store/useClinicStore'
import { Table } from 'antd'

const Appointments = () => {
  const { selectedClinic } = useClinicStore()
  const { appointments } = useAppointments(selectedClinic?.id || '')

  const columns = [
    {
      title: 'Patient',
      dataIndex: ['patient', 'name'],
    },
    {
      title: 'Service',
      dataIndex: ['service', 'name'],
    },
    {
      title: 'Date',
      dataIndex: 'start_time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ]

  return (
    <div>
      <AppointmentForm />
      <Table columns={columns} dataSource={appointments.data} loading={appointments.isPending} />
    </div>
  )
}

export default Appointments
