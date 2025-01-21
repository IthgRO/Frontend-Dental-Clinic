import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useTimeSlots } from '@/hooks/useTimeSlots'
import { Dentist } from '@/types'
import { getNextAvailableTime } from '@/utils/dateUtils'
import { CalendarOutlined, EuroOutlined } from '@ant-design/icons'
import { Card, Tag } from 'antd'
import { MapPin } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface DentistCardProps {
  dentist: Dentist
}

const DentistCard = ({ dentist }: DentistCardProps) => {
  const { t } = useAppTranslation('dentists')
  const priceRange = t('card.price.range', {
    min: dentist.priceRange.min.toLocaleString(),
    max: dentist.priceRange.max.toLocaleString(),
  })

  const lastName = dentist.name.split(' ')[1]
  const imageFileName = `${lastName}.png`
  const imagePath = `/placeholders/${imageFileName}`

  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  const { availableSlots } = useTimeSlots(dentist.id, today, nextWeek)
  const nextAvailableTime = useMemo(() => getNextAvailableTime(availableSlots), [availableSlots])

  return (
    <Link to={`/dentists/${dentist.id}`}>
      <Card hoverable className="transition-all hover:shadow-lg">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="relative mb-4">
            <img
              src={imagePath}
              alt={dentist.name}
              className="w-full h-44 object-cover rounded-lg"
            />
            {/* <div className="absolute top-3 right-3">
              <Tag className="bg-white/90 backdrop-blur-sm border-0">
                <EuroOutlined className="mr-1" />
                {priceRange}
              </Tag>
            </div> */}
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{dentist.name}</h2>

            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span>{dentist.clinic.name}</span>
              </div>
              <span className="text-gray-500">{dentist.clinic.city}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {dentist.services.slice(0, 3).map(service => (
                <Tag key={service.id} className="m-0 bg-gray-50">
                  {service.name}
                </Tag>
              ))}
              {dentist.services.length > 3 && (
                <Tag className="m-0 bg-gray-50">
                  {t('card.services.more', { count: dentist.services.length - 3 })}
                </Tag>
              )}
            </div>

            {nextAvailableTime && (
              <div className="flex items-center text-teal-600 border-t pt-3">
                <CalendarOutlined className="mr-2" />
                <span className="text-sm">
                  {t('card.availability.today', { time: nextAvailableTime })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden items-center sm:flex gap-6">
          <img src={imagePath} alt={dentist.name} className="w-40 h-40 rounded-lg object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-semibold mb-1">{dentist.name}</h2>
                <p className="text-gray-600">{dentist.clinic.name}</p>
              </div>
              {/* <div className="text-gray-600 flex items-center">
                <EuroOutlined className="mr-1" />
                {priceRange}
              </div> */}
            </div>

            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <MapPin size={16} />
              <span>{dentist.clinic.city}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {dentist.services.map(service => (
                <Tag key={service.id} className="bg-gray-50">
                  {service.name}
                </Tag>
              ))}
            </div>

            {nextAvailableTime && (
              <div className="inline-flex items-center px-3 py-1.5 bg-teal-50 text-teal-600 rounded-md">
                <CalendarOutlined className="mr-2" />
                <span>{t('card.availability.today', { time: nextAvailableTime })}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default DentistCard
