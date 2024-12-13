import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Select } from 'antd'

interface ServiceSelectProps {
  services: {
    id: number
    name: string
    price: number
  }[]
}

const ServiceSelect = ({ services }: ServiceSelectProps) => {
  const { setSelectedService, selectedAppointment } = useAppointmentStore()

  return (
    <Select
      className="w-full mb-8"
      placeholder="Select Service"
      size="large"
      value={selectedAppointment?.serviceId}
      options={services.map(service => ({
        value: service.id,
        label: `${service.name} ($${service.price})`,
      }))}
      onChange={value => {
        const service = services.find(s => s.id === value)
        if (service) {
          setSelectedService({
            value: service.id.toString(),
            label: service.name,
            price: service.price,
          })
        }
      }}
    />
  )
}

export default ServiceSelect
