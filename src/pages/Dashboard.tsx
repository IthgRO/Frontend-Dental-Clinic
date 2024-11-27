import AppointmentList from '@/components/features/appointments/AppointmentList'
import { useAppointments } from '@/hooks/useAppointments'
import { useServices } from '@/hooks/useServices'
import { useClinicStore } from '@/store/useClinicStore'
import { CalendarOutlined, MedicineBoxOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'

const Dashboard = () => {
  const { selectedClinic } = useClinicStore()
  const { appointments } = useAppointments(selectedClinic?.id || '')
  const { services } = useServices(selectedClinic?.id || '')

  const totalAppointments = appointments.data?.length || 0
  const totalServices = services.data?.length || 0
  const upcomingAppointments =
    appointments.data?.filter(app => new Date(app.start_time) > new Date()).length || 0

  return (
    <div>
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Appointments"
              value={totalAppointments}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Upcoming Appointments"
              value={upcomingAppointments}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Available Services"
              value={totalServices}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Appointments">
        <AppointmentList limit={5} />
      </Card>
    </div>
  )
}

export default Dashboard
