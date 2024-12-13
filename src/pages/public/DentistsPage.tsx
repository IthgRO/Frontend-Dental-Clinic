// src/pages/public/DentistsPage.tsx
import DentistList from '@/components/features/public/DentistList'
import SearchFilters from '@/components/features/public/SearchFilters'

const DentistsPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64">
        <SearchFilters />
      </aside>
      <main className="flex-1">
        <DentistList />
      </main>
    </div>
  )
}

export default DentistsPage
