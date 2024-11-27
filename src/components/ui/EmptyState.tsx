import { Empty } from 'antd'

interface EmptyStateProps {
  title?: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="py-12 flex flex-col items-center">
    <Empty
      description={
        <div className="text-center">
          {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      }
    >
      {action && <div className="mt-4">{action}</div>}
    </Empty>
  </div>
)

export default EmptyState
