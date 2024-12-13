import { useAppointments } from '@/hooks/useAppointments'
import { useServices } from '@/hooks/useServices'
import { useClinicStore } from '@/store/useDentistStore'
import { Appointment, Service } from '@/types'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import { useState } from 'react'

interface AppointmentFormData {
  service_id: string
  start_time: Date
  notes?: string
}

interface AppointmentFormProps {
  appointment?: Appointment
  onSuccess?: () => void
}

const AppointmentForm = ({ appointment, onSuccess }: AppointmentFormProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [form] = Form.useForm<AppointmentFormData>()

  const { selectedClinic } = useClinicStore()
  const { createAppointment, updateAppointment } = useAppointments(selectedClinic?.id || '')
  const { services } = useServices(selectedClinic?.id || '')

  const handleSubmit = async (values: AppointmentFormData) => {
    const action = appointment ? updateAppointment : createAppointment
    await action.mutateAsync({
      ...values,
      clinic_id: selectedClinic?.id,
      ...(appointment && { id: appointment.id }),
    })
    setIsVisible(false)
    form.resetFields()
    onSuccess?.()
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsVisible(true)}>
        {appointment ? 'Edit Appointment' : 'New Appointment'}
      </Button>

      <Modal
        title={appointment ? 'Edit Appointment' : 'New Appointment'}
        open={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Form<AppointmentFormData>
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={appointment}
        >
          <Form.Item name="service_id" label="Service" rules={[{ required: true }]}>
            <Select>
              {services.data?.map((service: Service) => (
                <Select.Option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="start_time" label="Date & Time" rules={[{ required: true }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createAppointment.isPending || updateAppointment.isPending}
              block
            >
              {appointment ? 'Update' : 'Create'} Appointment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AppointmentForm
