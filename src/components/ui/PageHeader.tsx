import { Typography } from 'antd'

const { Title } = Typography

interface PageHeaderProps {
  title: string
  action?: React.ReactNode
}

const PageHeader = ({ title, action }: PageHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <Title level={2}>{title}</Title>
    {action && <div>{action}</div>}
  </div>
)

export default PageHeader
