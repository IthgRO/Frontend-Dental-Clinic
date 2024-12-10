// src/pages/public/DentistsPage.tsx
import DentistList from '@/components/features/public/DentistList'
import Navigation from '@/components/features/public/Navigation'
import SearchFilters from '@/components/features/public/SearchFilters'

const DentistsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64">
            <SearchFilters />
          </aside>
          <main className="flex-1">
            <DentistList />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DentistsPage
