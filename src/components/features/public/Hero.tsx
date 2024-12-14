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
    <div className="bg-gray-50 mb-16">
      <div className="relative flex justify-center items-end min-h-[550px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/landing-page-hero.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full">
          <div className="max-w-7xl mx-auto px-8 h-full flex flex-col items-center justify-center">
            {/* Main Content Wrapper with controlled width */}
            <div className="w-full max-w-3xl flex flex-col items-center space-y-16 mb-[-44px]">
              {/* Text Content */}
              <div className="flex flex-col justify-start items-start text-left">
                <h1 className="text-5xl font-bold text-white mb-6">
                  Find your new
                  <br />
                  dentist online
                </h1>
                <p className="text-xl text-white/90 mb-12 max-w-2xl">
                  Book appointments with 100+ dentists all over Europe in just one click. Find the
                  perfect doctor, perfect place and perfect time.
                </p>

                <Button
                  type="primary"
                  size="large"
                  className="h-12 px-8 text-base bg-black hover:bg-gray-800 border-none"
                  onClick={() => navigate('/dentists')}
                >
                  Book Appointment
                </Button>
              </div>

              {/* Search Bar */}
              <div className="w-full bg-white p-6 rounded-lg shadow-lg mb-[44px]">
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
                    className="bg-black hover:bg-gray-800 border-none px-8"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
