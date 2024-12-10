// src/components/features/booking/ServiceSelect.tsx
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Select } from 'antd'

const services = [
  { value: 'extraction', label: 'Tooth Extraction', price: 150 },
  { value: 'whitening', label: 'Teeth Whitening', price: 200 },
  { value: 'cleaning', label: 'Dental Cleaning', price: 100 },
]

const ServiceSelect = () => {
  const { setSelectedService, selectedAppointment } = useAppointmentStore()

  return (
    <Select
      className="w-full mb-8"
      placeholder="Service"
      size="large"
      value={selectedAppointment?.service || undefined}
      options={services.map(service => ({
        value: service.value,
        label: `${service.label} ($${service.price})`,
      }))}
      onChange={value => {
        const service = services.find(s => s.value === value)
        if (service) {
          setSelectedService(service)
        }
      }}
    />
  )
}
export default ServiceSelect
