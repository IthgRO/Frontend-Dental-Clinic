// src/components/features/public/DentistList.tsx
import { mockDentists } from '@/utils/mockDentists'
import DentistCard from './DentistCard'

const DentistList = () => (
  <div className="flex flex-col space-y-6">
    {mockDentists.map(dentist => (
      <DentistCard key={dentist.id} dentist={dentist} />
    ))}
  </div>
)

export default DentistList
