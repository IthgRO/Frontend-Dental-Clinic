import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useDentists } from '@/hooks/useDentists'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Card, Checkbox, Collapse, Divider, Select, Slider, Tag } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchFilters = () => {
  const { t } = useAppTranslation('dentists')
  const [searchParams, setSearchParams] = useSearchParams()
  const { dentists } = useDentists()
  const [activeKey, setActiveKey] = useState<string[]>(['0'])

  const { cities, services, priceRange } = useMemo(() => {
    const citiesSet = new Set<string>()
    const servicesSet = new Map<string, { name: string; price: number }>()
    let minPrice = Infinity
    let maxPrice = 0

    dentists.forEach(dentist => {
      citiesSet.add(dentist.clinic.city)
      dentist.services.forEach(service => {
        servicesSet.set(service.name, { name: service.name, price: service.price })
        minPrice = Math.min(minPrice, service.price)
        maxPrice = Math.max(maxPrice, service.price)
      })
    })

    return {
      cities: Array.from(citiesSet).map(city => ({ label: city, value: city })),
      services: Array.from(servicesSet.entries()).map(([name, { price }]) => ({
        label: `${name} (€${price})`,
        value: name,
        price,
      })),
      priceRange: { min: Math.floor(minPrice), max: Math.ceil(maxPrice) },
    }
  }, [dentists])

  const [selectedCity, setSelectedCity] = useState(searchParams.get('location') || '')
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    const servicesParam = searchParams.get('services')
    if (servicesParam) {
      return servicesParam.split(',')
    }
    const serviceParam = searchParams.get('service')
    if (serviceParam && services.length) {
      const service = services.find(s => s.label.toLowerCase().includes(serviceParam.toLowerCase()))
      if (service) {
        return [service.value]
      }
    }
    return []
  })

  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice')) || priceRange.min,
    Number(searchParams.get('maxPrice')) || priceRange.max,
  ])
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>(selectedPriceRange)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (searchParams.has('service')) {
      const params = new URLSearchParams(searchParams)
      params.delete('service')
      setSearchParams(params, { replace: true })
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    params.delete('service')

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
    }

    setSearchParams(params)
  }, [selectedCity, selectedServices, selectedPriceRange, isDragging])

  const handleServiceSelect = (serviceName: string, checked: boolean) => {
    setSelectedServices(prev =>
      checked ? [...prev, serviceName] : prev.filter(name => name !== serviceName)
    )
  }

  const handleCitySelect = (value: string | null) => {
    setSelectedCity(value || '')
  }

  const handleSliderChange = (value: number[]) => {
    setTempPriceRange([value[0], value[1]])
    setIsDragging(true)
  }

  const handleSliderAfterChange = (value: number[]) => {
    setSelectedPriceRange([value[0], value[1]])
    setIsDragging(false)
  }

  const getExtraContent = (type: 'location' | 'services' | 'price') => {
    switch (type) {
      case 'location':
        return selectedCity ? <Tag color="blue">{selectedCity}</Tag> : null
      case 'services':
        return selectedServices.length ? (
          <Tag color="blue">
            {t('filters.services.selected', { count: selectedServices.length })}
          </Tag>
        ) : null
      case 'price':
        return selectedPriceRange[0] !== priceRange.min ||
          selectedPriceRange[1] !== priceRange.max ? (
          <Tag color="blue">
            {t('filters.price.format', { min: selectedPriceRange[0], max: selectedPriceRange[1] })}
          </Tag>
        ) : null
      default:
        return null
    }
  }

  return (
    <Card className="sticky top-24">
      <div className="hidden md:block">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">{t('filters.location.title')}</h3>
            <Select
              className="w-full"
              size="large"
              placeholder={t('filters.location.placeholder')}
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
            <h3 className="font-medium mb-3">{t('filters.services.title')}</h3>
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
            <h3 className="font-medium mb-3">{t('filters.price.title')}</h3>
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
      </div>

      <div className="md:hidden">
        <Collapse
          activeKey={activeKey}
          onChange={keys => setActiveKey(typeof keys === 'string' ? [keys] : keys)}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (isActive ? <UpOutlined /> : <DownOutlined />)}
        >
          <Collapse.Panel
            header={t('filters.location.title')}
            key="0"
            extra={getExtraContent('location')}
          >
            <Select
              className="w-full"
              size="large"
              placeholder={t('filters.location.placeholder')}
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

          <Collapse.Panel
            header={t('filters.services.title')}
            key="1"
            extra={getExtraContent('services')}
          >
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

          <Collapse.Panel
            header={t('filters.price.title')}
            key="2"
            extra={getExtraContent('price')}
          >
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
