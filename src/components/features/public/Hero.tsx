// src/components/features/public/Hero.tsx
import { useDentists } from '@/hooks/useDentists'
import { Button, Select } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const { dentists } = useDentists()
  const [location, setLocation] = useState<string>('')
  const [service, setService] = useState<string>('')

  // Get unique cities and services from dentists
  const { cities, services } = useMemo(() => {
    const citiesSet = new Set<string>()
    const servicesSet = new Set<string>()

    dentists.forEach(dentist => {
      citiesSet.add(dentist.clinic.city)
      dentist.services.forEach(service => {
        servicesSet.add(service.name)
      })
    })

    return {
      cities: Array.from(citiesSet).map(city => ({ label: city, value: city })),
      services: Array.from(servicesSet).map(service => ({ label: service, value: service })),
    }
  }, [dentists])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (service) params.append('service', service)
    navigate(`/dentists?${params.toString()}`)
  }

  return (
    <div className="relative min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img
          src="/api/placeholder/1920/600"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Find your new
          <br />
          dentist online
        </h1>
        <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
          Book appointments with 100+ dentists all over Europe in just one click. Find the perfect
          doctor, perfect place and perfect time.
        </p>

        <Button
          type="primary"
          size="large"
          className="bg-black hover:bg-gray-800 mb-12 px-8"
          onClick={() => navigate('/dentists')}
        >
          Book Appointment
        </Button>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <div className="flex gap-4">
            <Select
              size="large"
              placeholder="Select location"
              value={location || undefined}
              onChange={setLocation}
              options={cities}
              showSearch
              className="flex-1"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
            <Select
              size="large"
              placeholder="Select service"
              value={service || undefined}
              onChange={setService}
              options={services}
              showSearch
              className="flex-1"
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
            <Button
              type="primary"
              size="large"
              onClick={handleSearch}
              className="bg-black hover:bg-gray-800 px-8"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
