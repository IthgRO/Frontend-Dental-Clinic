import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useFilteredDentists } from '@/hooks/useFilteredDentists'
import { ViewMode } from '@/types'
import { Spin } from 'antd'
import DentistCard from './DentistCard'

interface DentistListProps {
  viewMode: ViewMode
}

const DentistList = ({ viewMode }: DentistListProps) => {
  const { t } = useAppTranslation('dentists')
  const { filteredDentists, isLoading, error } = useFilteredDentists()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{t('page.error')}</div>
  }

  if (filteredDentists.length === 0) {
    return <div className="text-center py-12 text-gray-500">{t('page.noResults')}</div>
  }

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'flex flex-col space-y-6'
      }
    >
      {filteredDentists.map(dentist => (
        <DentistCard key={dentist.id} dentist={dentist} viewMode={viewMode} />
      ))}
    </div>
  )
}

export default DentistList
