import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useTimeSlots } from '@/hooks/useTimeSlots'
import { getNextAvailableTime } from '@/utils/dateUtils'
import { EuroOutlined } from '@ant-design/icons'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useMemo } from 'react'

interface DentistHeaderProps {
  name: string
  clinic: string
  city: string
  dentistId: number
  imageUrl?: string
  priceRange?: { min: number; max: number }
  phone?: string
  email?: string
}

const DentistHeader = ({
  name,
  clinic,
  city,
  dentistId,
  priceRange,
  imageUrl,
  phone,
  email,
}: DentistHeaderProps) => {
  const { t } = useAppTranslation('dentists')
  const lastName = name.split(' ')[1]
  const defaultImageUrl = `/placeholders/${lastName}.png`

  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  const { availableSlots } = useTimeSlots(dentistId, today, nextWeek)
  const nextAvailableTime = useMemo(() => getNextAvailableTime(availableSlots), [availableSlots])

  return (
    <div className="mb-8 border-b pb-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={imageUrl || defaultImageUrl}
          alt={name}
          className="w-full md:w-48 h-48 rounded-lg object-cover shadow-md"
        />

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{name}</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-4">{clinic}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{city}</span>
                </div>

                {phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={18} />
                    <a href={`tel:${phone}`} className="hover:text-teal-600">
                      {phone}
                    </a>
                  </div>
                )}

                {email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={18} />
                    <a href={`mailto:${email}`} className="hover:text-teal-600 break-all">
                      {email}
                    </a>
                  </div>
                )}

                {nextAvailableTime && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} />
                    <span>{t('booking.header.available', { time: nextAvailableTime })}</span>
                  </div>
                )}
              </div>
            </div>

            {priceRange && (
              <div className="text-left md:text-right mt-4 md:mt-0">
                <div className="text-gray-600 flex items-center gap-1">
                  <EuroOutlined />
                  <span>
                    {t('card.price.range', {
                      min: priceRange.min.toLocaleString(),
                      max: priceRange.max.toLocaleString(),
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DentistHeader
