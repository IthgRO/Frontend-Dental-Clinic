// src/components/features/booking/TimeGrid.tsx
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { generateWeekSchedule } from '@/utils/mockData'
import { Button } from 'antd'
import { addDays, format, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const TimeGrid = () => {
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [weekSchedule, setWeekSchedule] = useState<string[][]>([])
  const { setSelectedDateTime, selectedAppointment } = useAppointmentStore()

  useEffect(() => {
    setWeekSchedule(generateWeekSchedule())
  }, [startDate])

  const dates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))
  const maxSlots = Math.max(...weekSchedule.map(day => day.length))

  const handleDateChange = (direction: 'prev' | 'next') => {
    setStartDate(date => addDays(date, direction === 'prev' ? -7 : 7))
  }

  const isDateInPast = (date: Date) => {
    return date < new Date(new Date().setHours(0, 0, 0, 0))
  }

  const isTimeInPast = (date: Date, time: string) => {
    if (isDateInPast(date)) return true

    const [hours, minutes] = time.split(':').map(Number)
    const currentDate = new Date()
    const compareDate = new Date(date)
    compareDate.setHours(hours, minutes)

    return compareDate < currentDate
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button
          type="text"
          icon={<ChevronLeft />}
          onClick={() => handleDateChange('prev')}
          disabled={isDateInPast(addDays(startDate, -7))}
        />
        <div className="grid grid-cols-7 flex-1">
          {dates.map(date => (
            <div key={date.toISOString()} className="text-center">
              <div className="text-gray-500 text-sm">{format(date, 'EEE')}</div>
              <div className="font-medium">{format(date, 'd')}</div>
              <div className="text-xs text-gray-400">{format(date, 'MMM')}</div>
            </div>
          ))}
        </div>
        <Button type="text" icon={<ChevronRight />} onClick={() => handleDateChange('next')} />
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, dayIndex) => (
          <div key={date.toISOString()} className="space-y-2">
            {Array.from({ length: maxSlots }, (_, slotIndex) => {
              const time = weekSchedule[dayIndex]?.[slotIndex]
              if (!time) return <div key={slotIndex} className="h-12" />

              const isSelected =
                selectedAppointment?.date === format(date, 'yyyy-MM-dd') &&
                selectedAppointment?.time === time

              const isPast = isTimeInPast(date, time)

              return (
                <Button
                  key={`${date.toISOString()}-${time}`}
                  className={`w-full h-12 transition-colors ${
                    isSelected
                      ? 'border-2 border-black text-black'
                      : isPast
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:border-black'
                  }`}
                  onClick={() => {
                    if (!isPast) {
                      setSelectedDateTime({
                        date: format(date, 'yyyy-MM-dd'),
                        time,
                      })
                    }
                  }}
                  disabled={isPast}
                >
                  {time}
                </Button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimeGrid
