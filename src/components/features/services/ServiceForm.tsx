import { useServices } from '@/hooks/useServices'
import { useClinicStore } from '@/store/useDentistStore'
import { Service } from '@/types'
import { Button, Form, Input, InputNumber, Modal } from 'antd'
import { useState } from 'react'

interface ServiceFormValues {
  name: string
  description?: string
  duration: number
  price: number
  category: string
}

interface ServiceFormProps {
  service?: Service
  onSuccess?: () => void
}

const ServiceForm = ({ service, onSuccess }: ServiceFormProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [form] = Form.useForm<ServiceFormValues>()

  const { selectedClinic } = useClinicStore()
  const { createService, updateService } = useServices(selectedClinic?.id || '')

  const handleSubmit = async (values: ServiceFormValues) => {
    if (!selectedClinic?.id) return

    const action = service ? updateService : createService
    await action.mutateAsync({
      ...values,
      clinic_id: selectedClinic.id,
      ...(service && { id: service.id }),
    })
    setIsVisible(false)
    form.resetFields()
    onSuccess?.()
  }

  return (
    <>
      <Button
        className="sm:w-full lg:w-[100px] w-16"
        type="primary"
        onClick={() => setIsVisible(true)}
      >
        {service ? 'Edit Service' : 'New Service'}
      </Button>

      <Modal
        title={service ? 'Edit Service' : 'New Service'}
        open={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={service}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true }]}>
            <InputNumber min={15} step={15} />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              formatter={value => `$ ${value}`}
              parser={value => parseFloat(value?.replace(/\$\s?|(,*)/g, '') || '0')}
            />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createService.isPending || updateService.isPending}
              block
            >
              {service ? 'Update' : 'Create'} Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ServiceForm
