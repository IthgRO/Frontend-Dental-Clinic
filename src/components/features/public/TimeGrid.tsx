import { useTimeSlots } from '@/hooks/useTimeSlots'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { Button, Spin } from 'antd'
import { addDays, format, parseISO, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface TimeGridProps {
  dentistId: number
}

const TimeGrid = ({ dentistId }: TimeGridProps) => {
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const { availableSlots, fetchSlots, isLoading } = useTimeSlots()
  const { setSelectedDateTime, selectedAppointment } = useAppointmentStore()

  // Calculate dates once
  const dates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)),
    [startDate]
  )

  // Fetch slots only when dentistId or startDate changes
  useEffect(() => {
    if (dentistId) {
      const endDate = addDays(startDate, 6)
      fetchSlots(dentistId, startDate, endDate)
    }
  }, [dentistId, startDate])

  const getTimeSlotsForDate = useCallback(
    (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd')
      return availableSlots
        .filter(slot => format(parseISO(slot.startTime), 'yyyy-MM-dd') === dateStr)
        .map(slot => format(parseISO(slot.startTime), 'HH:mm'))
    },
    [availableSlots]
  )

  const handleDateChange = useCallback((direction: 'prev' | 'next') => {
    setStartDate(current => addDays(current, direction === 'prev' ? -7 : 7))
  }, [])

  const isDateInPast = useCallback((date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }, [])

  const isTimeInPast = useCallback(
    (date: Date, time: string) => {
      if (isDateInPast(date)) return true
      const [hours, minutes] = time.split(':').map(Number)
      const compareDate = new Date(date)
      compareDate.setHours(hours, minutes)
      return compareDate < new Date()
    },
    [isDateInPast]
  )

  const handleTimeSelect = useCallback(
    (date: Date, time: string) => {
      if (!isTimeInPast(date, time)) {
        setSelectedDateTime({
          date: format(date, 'yyyy-MM-dd'),
          time,
        })
      }
    },
    [setSelectedDateTime, isTimeInPast]
  )

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <Button
          type="text"
          icon={<ChevronLeft />}
          onClick={() => handleDateChange('prev')}
          disabled={isDateInPast(startDate)}
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
        {dates.map(date => {
          const timeSlots = getTimeSlotsForDate(date)
          return (
            <div key={date.toISOString()} className="space-y-2">
              {timeSlots.map(time => {
                const isSelected =
                  selectedAppointment?.startDate === `${format(date, 'yyyy-MM-dd')}T${time}:00`
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
                    onClick={() => handleTimeSelect(date, time)}
                    disabled={isPast}
                  >
                    {time}
                  </Button>
                )
              })}
            </div>
          )
        })}
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  )
}

export default TimeGrid
