import { Dentist } from '@/types'
import { Card, Rate, Tag } from 'antd'
import { Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DentistCardProps {
  dentist: Dentist
}

const DentistCard = ({ dentist }: DentistCardProps) => (
  <Link to={`/dentists/${dentist.id}`}>
    <Card hoverable className="transition-all hover:shadow-lg">
      <div className="flex gap-6">
        <img src={dentist.image} alt={dentist.name} className="w-40 h-40 rounded-lg object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-1">{dentist.name}</h2>
              <p className="text-gray-600 mb-2">{dentist.clinic}</p>
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin size={16} />
                <span>{dentist.address}</span>
              </div>
            </div>
            <Rate disabled defaultValue={4.5} className="text-sm" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {dentist.services.map(service => (
              <Tag key={service}>{service}</Tag>
            ))}
          </div>

          <div className="flex items-center gap-2 text-green-600">
            <Clock size={16} />
            <span>Next available: Today at 14:00</span>
          </div>
        </div>
      </div>
    </Card>
  </Link>
)

export default DentistCard
