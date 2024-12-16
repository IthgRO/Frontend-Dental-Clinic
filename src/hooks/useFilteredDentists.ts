import { useDentists } from '@/hooks/useDentists'
import { useSearchParams } from 'react-router-dom'

export const useFilteredDentists = () => {
  const [searchParams] = useSearchParams()
  const { dentists, isLoading, error } = useDentists()

  const location = searchParams.get('location')
  const services = searchParams.get('services')?.split(',')
  const service = searchParams.get('service')?.toLowerCase()
  const minPrice = Number(searchParams.get('minPrice'))
  const maxPrice = Number(searchParams.get('maxPrice'))

  const filteredDentists = dentists.filter(dentist => {
    // Filter by location
    if (location && dentist.clinic.city !== location) {
      return false
    }

    // First check services parameter
    if (services?.length) {
      const dentistServiceNames = dentist.services.map(s => s.name)
      if (!services.some(serviceName => dentistServiceNames.includes(serviceName))) {
        return false
      }
    }
    // Only check service parameter if services parameter is not present
    else if (service) {
      const hasService = dentist.services.some(s => s.name.toLowerCase().includes(service))
      if (!hasService) return false
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      const dentistPrices = dentist.services.map(s => s.price)
      const dentistMinPrice = Math.min(...dentistPrices)
      const dentistMaxPrice = Math.max(...dentistPrices)

      if (minPrice && dentistMaxPrice < minPrice) return false
      if (maxPrice && dentistMinPrice > maxPrice) return false
    }

    return true
  })

  return {
    filteredDentists,
    isLoading,
    error,
  }
}
