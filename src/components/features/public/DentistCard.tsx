import { Dentist } from '@/types'
import { Card, Tag } from 'antd'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DentistCardProps {
  dentist: Dentist
}

const DentistCard = ({ dentist }: DentistCardProps) => {
  const priceRange = `$${dentist.priceRange.min}-$${dentist.priceRange.max}`
  const lastName = dentist.name.split(" ")[1]
  const imageFileName = `${lastName}.png`;
  const imagePath = `/placeholders/${imageFileName}`


  return (
    <Link to={`/dentists/${dentist.id}`}>
      <Card hoverable className="transition-all hover:shadow-lg">
        <div className="flex gap-6">
          <img
            src={imagePath} // Placeholder since we don't have images
            alt={dentist.name}
            className="w-40 h-40 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold mb-1">{dentist.name}</h2>
                <p className="text-gray-600 mb-2">{dentist.clinic.name}</p>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <MapPin size={16} />
                  <span>{dentist.clinic.city}</span>
                </div>
              </div>
              <div
                className="text-[#868686]"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                }}
              >
                {priceRange}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {dentist.services.map(service => (
                <Tag key={service.id}>{service.name}</Tag>
              ))}
            </div>

            <div className="flex items-center gap-2 text-green-600">
              <span>Next available: Tomorrow at 14:25</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default DentistCard
