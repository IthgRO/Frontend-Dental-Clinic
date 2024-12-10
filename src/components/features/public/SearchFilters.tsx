// src/components/features/public/SearchFilters.tsx
import { cities } from '@/constants/locations'
import { services } from '@/constants/services'
import { Button, Card, Checkbox, Divider, Select, Space } from 'antd'

const SearchFilters = () => (
  <Card className="sticky top-24">
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Location</h3>
        <Select
          className="w-full"
          size="large"
          placeholder="Select your city"
          options={cities}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      <Divider />

      <div>
        <h3 className="font-medium mb-3">Services</h3>
        <Space direction="vertical" className="w-full">
          {services.map(service => (
            <Checkbox key={service.value}>{service.label}</Checkbox>
          ))}
        </Space>
      </div>

      <Divider />

      <div>
        <h3 className="font-medium mb-3">Availability</h3>
        <Space direction="vertical" className="w-full">
          <Checkbox>Available Today</Checkbox>
          <Checkbox>Next 3 Days</Checkbox>
          <Checkbox>This Week</Checkbox>
          <Checkbox>Weekends Only</Checkbox>
        </Space>
      </div>

      <Button type="primary" block size="large" className="bg-black">
        Apply Filters
      </Button>
    </div>
  </Card>
)

export default SearchFilters
