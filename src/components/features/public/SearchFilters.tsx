import { useDentists } from '@/hooks/useDentists'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Card, Checkbox, Collapse, Divider, Select, Slider, Tag } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { dentists } = useDentists()
  const [activeKey, setActiveKey] = useState<string[]>(['0'])

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

  const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '')
  const [selectedServices, setSelectedServices] = useState<number[]>(
    searchParams.get('services')?.split(',').map(Number).filter(Boolean) || []
  )
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice')) || priceRange.min,
    Number(searchParams.get('maxPrice')) || priceRange.max,
  ])
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>(selectedPriceRange)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      const service = services.find(s => s.label.toLowerCase().includes(serviceParam.toLowerCase()))
      if (service) {
        setSelectedServices([service.value])
      }
    }
  }, [searchParams, services])

  useEffect(() => {
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

    if (!isDragging) {
      if (selectedPriceRange[0] !== priceRange.min || selectedPriceRange[1] !== priceRange.max) {
        params.set('minPrice', selectedPriceRange[0].toString())
        params.set('maxPrice', selectedPriceRange[1].toString())
      } else {
        params.delete('minPrice')
        params.delete('maxPrice')
      }
      setSearchParams(params)
    }
  }, [selectedCity, selectedServices, selectedPriceRange, isDragging])

  const handleServiceSelect = (serviceId: number, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId])
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId))
    }
  }

  const handleCitySelect = (value: string | null) => {
    setSelectedCity(value || '')
  }

  const handleSliderChange = (value: [number, number]) => {
    setTempPriceRange(value)
    setIsDragging(true)
  }

  const handleSliderAfterChange = (value: [number, number]) => {
    setSelectedPriceRange(value)
    setIsDragging(false)
  }

  const getExtraContent = (type: 'location' | 'services' | 'price') => {
    switch (type) {
      case 'location':
        return selectedCity ? <Tag color="blue">{selectedCity}</Tag> : null
      case 'services':
        return selectedServices.length ? (
          <Tag color="blue">{selectedServices.length} selected</Tag>
        ) : null
      case 'price':
        return selectedPriceRange[0] !== priceRange.min ||
          selectedPriceRange[1] !== priceRange.max ? (
          <Tag color="blue">
            €{selectedPriceRange[0]} - €{selectedPriceRange[1]}
          </Tag>
        ) : null
      default:
        return null
    }
  }

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Location</h3>
        <Select
          className="w-full"
          size="large"
          placeholder="Select your city"
          options={cities}
          value={selectedCity || undefined}
          onChange={handleCitySelect}
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
          value={isDragging ? tempPriceRange : selectedPriceRange}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
          marks={{
            [priceRange.min]: `€${priceRange.min}`,
            [priceRange.max]: `€${priceRange.max}`,
          }}
          className="mt-6"
        />
      </div>
    </div>
  )

  return (
    <Card className="sticky top-24">
      <div className="hidden md:block">{filterContent}</div>

      <div className="md:hidden">
        <Collapse
          activeKey={activeKey}
          onChange={keys => setActiveKey(typeof keys === 'string' ? [keys] : keys)}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (isActive ? <UpOutlined /> : <DownOutlined />)}
        >
          <Collapse.Panel header="Location" key="0" extra={getExtraContent('location')}>
            <Select
              className="w-full"
              size="large"
              placeholder="Select your city"
              options={cities}
              value={selectedCity || undefined}
              onChange={handleCitySelect}
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Collapse.Panel>

          <Collapse.Panel header="Services" key="1" extra={getExtraContent('services')}>
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
          </Collapse.Panel>

          <Collapse.Panel header="Price Range" key="2" extra={getExtraContent('price')}>
            <Slider
              range
              min={priceRange.min}
              max={priceRange.max}
              value={isDragging ? tempPriceRange : selectedPriceRange}
              onChange={handleSliderChange}
              onAfterChange={handleSliderAfterChange}
              marks={{
                [priceRange.min]: `€${priceRange.min}`,
                [priceRange.max]: `€${priceRange.max}`,
              }}
              className="mt-6"
            />
          </Collapse.Panel>
        </Collapse>
      </div>
    </Card>
  )
}

export default SearchFilters
