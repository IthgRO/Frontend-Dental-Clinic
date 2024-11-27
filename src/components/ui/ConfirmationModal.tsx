import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

interface ConfirmationModalProps {
  title: string
  content: string
  onConfirm: () => void
  onCancel: () => void
  isVisible: boolean
  isLoading?: boolean
}

const ConfirmationModal = ({
  title,
  content,
  onConfirm,
  onCancel,
  isVisible,
  isLoading,
}: ConfirmationModalProps) => (
  <Modal
    title={title}
    open={isVisible}
    onOk={onConfirm}
    onCancel={onCancel}
    confirmLoading={isLoading}
  >
    <div className="flex items-center">
      <ExclamationCircleOutlined className="text-warning text-2xl mr-2" />
      <p>{content}</p>
    </div>
  </Modal>
)

export default ConfirmationModal
