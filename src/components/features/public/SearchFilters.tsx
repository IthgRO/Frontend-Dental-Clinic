import { useAppTranslation } from '@/hooks/useAppTranslation'
import { useDentists } from '@/hooks/useDentists'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Card, Checkbox, Collapse, Divider, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchFilters = () => {
  const { t } = useAppTranslation('dentists')
  const [searchParams, setSearchParams] = useSearchParams()
  const { dentists } = useDentists()
  const [activeKey, setActiveKey] = useState<string[]>(['0'])

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
      services: Array.from(servicesSet).map(name => ({
        label: name,
        value: name,
      })),
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

    setSearchParams(params)
  }, [selectedCity, selectedServices])

  const handleServiceSelect = (serviceName: string, checked: boolean) => {
    setSelectedServices(prev =>
      checked ? [...prev, serviceName] : prev.filter(name => name !== serviceName)
    )
  }

  const handleCitySelect = (value: string | null) => {
    setSelectedCity(value || '')
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
        </div>
      </div>

      <div className="md:hidden">
        <Collapse
          activeKey={activeKey}
          onChange={keys => setActiveKey(typeof keys === 'string' ? [keys] : keys)}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (isActive ? <UpOutlined /> : <DownOutlined />)}
        >
          <Collapse.Panel header={t('filters.location.title')} key="0">
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

          <Collapse.Panel header={t('filters.services.title')} key="1">
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
        </Collapse>
      </div>
    </Card>
  )
}

export default SearchFilters
