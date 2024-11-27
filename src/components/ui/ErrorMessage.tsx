import { Alert } from 'antd'

interface ErrorMessageProps {
  message?: string
  description?: string
}

const ErrorMessage = ({ message = 'An error occurred', description }: ErrorMessageProps) => (
  <Alert type="error" message={message} description={description} showIcon className="mb-4" />
)

export default ErrorMessage
