import { AppointmentStatus } from '@/types'
import { Tag } from 'antd'

const statusColors = {
  pending: 'gold',
  confirmed: 'green',
  cancelled: 'red',
  completed: 'blue',
}

interface StatusBadgeProps {
  status: AppointmentStatus
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <Tag color={statusColors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>
)

export default StatusBadge
