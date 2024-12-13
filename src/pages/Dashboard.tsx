import AppointmentList from '@/components/features/appointments/AppointmentList'
import { useAppointments } from '@/hooks/useAppointments'
import { CalendarOutlined, MedicineBoxOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Col, Row, Spin, Statistic } from 'antd'

const Dashboard = () => {
  const { appointments, isLoading } = useAppointments()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    )
  }

  const totalAppointments = appointments?.length || 0
  const upcomingAppointments =
    appointments?.filter(app => new Date(app.date + 'T' + app.time) > new Date()).length || 0

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
              title="Total Services"
              value={appointments?.filter(app => app.service)?.length || 0}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Appointments">
        <AppointmentList appointments={appointments || []} limit={5} />
      </Card>
    </div>
  )
}

export default Dashboard
