import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Dentist, ViewMode } from '@/types'
import { Card, Tag, Tooltip } from 'antd'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'

interface DentistCardProps {
  dentist: Dentist
  viewMode: ViewMode
}

const DentistCard = ({ dentist, viewMode }: DentistCardProps) => {
  const { t } = useAppTranslation('dentists')
  const lastName = dentist.name.split(' ')[1]
  const imageFileName = `${lastName}.png`
  const imagePath = `/placeholders/${imageFileName}`

  const { visibleServices, remainingServices } = useMemo(() => {
    const containerWidth = viewMode === 'grid' ? 300 : 500
    const avgServiceWidth = 120
    const maxServicesInRow = Math.floor(containerWidth / avgServiceWidth)

    return {
      visibleServices: dentist.services.slice(0, maxServicesInRow - 1),
      remainingServices: dentist.services.slice(maxServicesInRow - 1),
    }
  }, [dentist.services, viewMode])

  const tooltipContent =
    remainingServices.length > 0 ? (
      <div className="flex flex-col gap-1">
        {remainingServices.map(service => (
          <span key={service.id}>{service.name}</span>
        ))}
      </div>
    ) : null

  if (viewMode === 'list') {
    return (
      <Link to={`/dentists/${dentist.id}`} className="block">
        <Card hoverable className="transition-all hover:shadow-lg">
          <div className="flex items-center gap-6">
            <img
              src={imagePath}
              alt={dentist.name}
              className="w-32 md:w-40 h-32 md:h-40 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-semibold mb-1">{dentist.name}</h2>
              <p className="text-gray-500 mb-2">{dentist.clinic.name}</p>
              <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                <MapPin size={14} />
                <span>{dentist.clinic.city}</span>
              </div>

              <div className="flex items-center gap-2">
                {visibleServices.map(service => (
                  <Tag key={service.id} className="m-0 bg-gray-50">
                    {service.name}
                  </Tag>
                ))}
                {remainingServices.length > 0 && (
                  <Tooltip title={tooltipContent} placement="top">
                    <Tag className="m-0 bg-gray-50 cursor-help">+{remainingServices.length}</Tag>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link to={`/dentists/${dentist.id}`} className="block h-full">
      <Card
        hoverable
        className="transition-all hover:shadow-lg overflow-hidden h-full"
        bodyStyle={{ padding: 0 }}
      >
        <div>
          <img
            src={imagePath}
            alt={dentist.name}
            className="w-full aspect-[4/3] object-cover rounded-t-lg"
          />

          <div className="px-4 py-3 space-y-2">
            <h2 className="text-xl font-semibold">{dentist.name}</h2>
            <p className="text-gray-500">{dentist.clinic.name}</p>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <MapPin size={14} />
              <span>{dentist.clinic.city}</span>
            </div>

            <div className="flex items-center gap-2">
              {visibleServices.map(service => (
                <Tag key={service.id} className="m-0 bg-gray-50">
                  {service.name}
                </Tag>
              ))}
              {remainingServices.length > 0 && (
                <Tooltip title={tooltipContent} placement="top">
                  <Tag className="m-0 bg-gray-50 cursor-help">+{remainingServices.length}</Tag>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default DentistCard
