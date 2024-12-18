import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useDentists } from '@/hooks/useDentists'
import { Button, Select } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const { t } = useAppTranslation('landing')
  const navigate = useNavigate()
  const { dentists } = useDentists()
  const [location, setLocation] = useState<string>('')
  const [service, setService] = useState<string>('')

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
    <div className="bg-gray-50 mb-8 md:mb-16">
      <div className="relative flex justify-center items-end min-h-[450px] sm:min-h-[500px] md:min-h-[550px]">
        {/* Background Image with Mobile Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10"></div>
          <img
            src="/landing-page-hero.png"
            alt="Background"
            className="w-full h-full object-cover object-[100%_center]"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-20 h-full w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col items-center justify-center">
            {/* Main Content Wrapper */}
            <div className="w-full max-w-3xl flex flex-col items-center space-y-8 md:space-y-16 mb-[-24px] md:mb-[-44px]">
              {/* Text Content */}
              <div className="flex flex-col justify-start items-start text-left w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                  {t('hero.title.line1')}
                  <br />
                  {t('hero.title.line2')}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-12 max-w-2xl">
                  {t('hero.subtitle')}
                </p>

                <Button
                  type="primary"
                  size="large"
                  className="h-10 md:h-12 px-6 md:px-8 text-sm md:text-base bg-black hover:bg-gray-800 border-none"
                  onClick={() => navigate('/dentists')}
                >
                  {t('hero.bookButton')}
                </Button>
              </div>

              {/* Search Bar - Mobile Layout */}
              <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-lg mb-[24px] md:mb-[44px]">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Select
                    size="large"
                    placeholder={t('hero.search.locationPlaceholder')}
                    value={location || undefined}
                    onChange={setLocation}
                    options={cities}
                    showSearch
                    className="w-full"
                    allowClear
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                  <Select
                    size="large"
                    placeholder={t('hero.search.servicePlaceholder')}
                    value={service || undefined}
                    onChange={setService}
                    options={services}
                    showSearch
                    className="w-full"
                    allowClear
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSearch}
                    className="w-full sm:w-auto bg-black hover:bg-gray-800 border-none px-8"
                  >
                    {t('hero.search.searchButton')}
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
