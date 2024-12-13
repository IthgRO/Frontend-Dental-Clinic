// src/components/features/public/SearchFilters.tsx
import { useDentists } from '@/hooks/useDentists'
import { Button, Card, Checkbox, Divider, Select, Slider } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { dentists } = useDentists()

  // Get unique cities, services and price range from dentists
  const { cities, services, priceRange } = useMemo(() => {
    const citiesSet = new Set<string>()
    const servicesSet = new Map<number, { name: string; price: number }>()
    let minPrice = Infinity
    let maxPrice = 0

    dentists.forEach(dentist => {
      citiesSet.add(dentist.clinic.city)
      dentist.services.forEach(service => {
        servicesSet.set(service.id, { name: service.name, price: service.price })
        minPrice = Math.min(minPrice, service.price)
        maxPrice = Math.max(maxPrice, service.price)
      })
    })

    return {
      cities: Array.from(citiesSet).map(city => ({ label: city, value: city })),
      services: Array.from(servicesSet.entries()).map(([id, { name, price }]) => ({
        label: `${name} (€${price})`,
        value: id,
        price,
      })),
      priceRange: { min: Math.floor(minPrice), max: Math.ceil(maxPrice) },
    }
  }, [dentists])

  // State for filters
  const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '')
  const [selectedServices, setSelectedServices] = useState<number[]>(
    searchParams.get('services')?.split(',').map(Number).filter(Boolean) || []
  )
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice')) || priceRange.min,
    Number(searchParams.get('maxPrice')) || priceRange.max,
  ])

  // Handle URL params on mount
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      const service = services.find(s => s.label.toLowerCase().includes(serviceParam.toLowerCase()))
      if (service) {
        setSelectedServices([service.value])
      }
    }
  }, [searchParams, services])

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams)

    if (selectedCity) {
      params.set('location', selectedCity)
    } else {
      params.delete('location')
    }

    if (selectedServices.length) {
      params.set('services', selectedServices.join(','))
    } else {
      params.delete('services')
    }

    if (selectedPriceRange[0] !== priceRange.min || selectedPriceRange[1] !== priceRange.max) {
      params.set('minPrice', selectedPriceRange[0].toString())
      params.set('maxPrice', selectedPriceRange[1].toString())
    } else {
      params.delete('minPrice')
      params.delete('maxPrice')
    }

    setSearchParams(params)
  }

  const handleServiceSelect = (serviceId: number, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId])
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId))
    }
  }

  return (
    <Card className="sticky top-24">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Location</h3>
          <Select
            className="w-full"
            size="large"
            placeholder="Select your city"
            options={cities}
            value={selectedCity || undefined}
            onChange={setSelectedCity}
            allowClear
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>

        <Divider />

        <div>
          <h3 className="font-medium mb-3">Services</h3>
          <div className="space-y-2">
            {services.map(service => (
              <Checkbox
                key={service.value}
                checked={selectedServices.includes(service.value)}
                onChange={e => handleServiceSelect(service.value, e.target.checked)}
              >
                {service.label}
              </Checkbox>
            ))}
          </div>
        </div>

        <Divider />

        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <Slider
            range
            min={priceRange.min}
            max={priceRange.max}
            value={selectedPriceRange}
            onChange={setSelectedPriceRange as (value: number[]) => void}
            marks={{
              [priceRange.min]: `€${priceRange.min}`,
              [priceRange.max]: `€${priceRange.max}`,
            }}
            className="mt-6"
          />
        </div>

        <Button
          type="primary"
          block
          size="large"
          onClick={handleApplyFilters}
          className="bg-black hover:bg-gray-800"
        >
          Apply Filters
        </Button>
      </div>
    </Card>
  )
}

export default SearchFilters
