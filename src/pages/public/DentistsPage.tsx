import DentistList from '@/components/features/public/DentistList'
import SearchFilters from '@/components/features/public/SearchFilters'
import ViewToggle from '@/components/features/public/ViewToggle'
import { ViewMode } from '@/types'
import { useState } from 'react'

const DentistsPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <SearchFilters />
        </aside>
        <main className="flex-1">
          <DentistList viewMode={viewMode} />
        </main>
      </div>
    </div>
  )
}

export default DentistsPage
