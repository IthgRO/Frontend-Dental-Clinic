import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Select } from 'antd'

interface ServiceSelectProps {
  services: {
    id: number
    name: string
    price: number
  }[]
  className?: string
}

const ServiceSelect = ({ services, className = '' }: ServiceSelectProps) => {
  const { t } = useAppTranslation('dentists')
  const { setSelectedService, selectedAppointment } = useAppointmentStore()

  return (
    <Select
      className={className}
      placeholder={t('booking.service.select')}
      size="large"
      value={selectedAppointment?.serviceId}
      options={services.map(service => ({
        value: service.id,
        label: `${service.name} (${t('booking.service.price', { price: service.price })})`,
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
