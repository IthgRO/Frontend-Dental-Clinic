import { cities } from '@/constants/locations'
import { CalendarOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const [isSelectActive, setIsSelectActive] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    if (isSelectActive) {
      setIsOpen(true)
    }
  }, [isSelectActive])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (date) params.append('date', date.toISOString())
    navigate(`/dentists?${params.toString()}`)
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
    setIsSelectActive(true)
    setIsOpen(false)
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
            {isSelectActive ? (
              <Select
                size="large"
                placeholder="Select location"
                value={location}
                onChange={handleLocationChange}
                options={cities}
                showSearch
                open={isOpen}
                onDropdownVisibleChange={setIsOpen}
                onClick={() => setIsOpen(true)}
                className="flex-1"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            ) : (
              <Input
                size="large"
                placeholder="Search location"
                prefix={<SearchOutlined className="text-gray-400" />}
                onFocus={() => setIsSelectActive(true)}
                value={location}
                className="flex-1"
                readOnly
              />
            )}
            <DatePicker
              size="large"
              placeholder="Date"
              onChange={date => setDate(date?.toDate() || null)}
              suffixIcon={<CalendarOutlined className="text-gray-400" />}
              className="w-48"
            />
            <Button
              type="primary"
              size="large"
              onClick={handleSearch}
              disabled={!location || !date}
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
