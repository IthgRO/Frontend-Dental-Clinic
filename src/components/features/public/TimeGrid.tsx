import { useTimeSlots } from '@/hooks/useTimeSlots'
import { useAppointmentStore } from '@/store/useAppointmentStore'
import { TimeSlot } from '@/types'
import { Button, Empty, Spin } from 'antd'
import { addDays, format, parseISO, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

interface TimeGridProps {
  dentistId: number
}

const TimeGrid = ({ dentistId }: TimeGridProps) => {
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const endDate = addDays(startDate, 6)

  const { availableSlots, isLoading } = useTimeSlots(dentistId, startDate, endDate)
  const { setSelectedDateTime, selectedAppointment } = useAppointmentStore()

  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)),
    [startDate]
  )

  const getTimeSlotsForDate = useCallback(
    (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd')
      return (availableSlots as TimeSlot[])
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

  const hasAvailableSlots = useMemo(() => {
    return weekDates.some(date => {
      if (isDateInPast(date)) return false
      const slots = getTimeSlotsForDate(date)
      return slots.some(time => !isTimeInPast(date, time))
    })
  }, [weekDates, getTimeSlotsForDate, isDateInPast, isTimeInPast])

  const renderTimeSlots = useCallback(
    (date: Date) => {
      const timeSlots = getTimeSlotsForDate(date)
      const availableTimeSlots = timeSlots.filter(time => !isTimeInPast(date, time))
      const isPastDate = isDateInPast(date)

      if (isPastDate) {
        return (
          <div className="h-12 flex items-center justify-center rounded border border-gray-100">
            <p className="text-gray-400 text-sm">Past date</p>
          </div>
        )
      }

      if (!timeSlots.length) {
        return (
          <div className="h-12 flex items-center justify-center rounded border border-gray-100">
            <p className="text-gray-400 text-sm">No slots</p>
          </div>
        )
      }

      return availableTimeSlots.map(time => {
        const isSelected =
          selectedAppointment?.startDate === `${format(date, 'yyyy-MM-dd')}T${time}`
        const buttonClassName = isSelected
          ? 'w-full h-12 bg-teal-600 text-white border-teal-600 hover:bg-teal-600 hover:border-teal-600'
          : 'w-full h-12 hover:border-teal-600 hover:text-teal-600'

        return (
          <Button
            key={`${date.toISOString()}-${time}`}
            className={buttonClassName}
            onClick={() => handleTimeSelect(date, time)}
          >
            {time}
          </Button>
        )
      })
    },
    [getTimeSlotsForDate, isDateInPast, isTimeInPast, handleTimeSelect, selectedAppointment]
  )

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <Button
          type="text"
          icon={<ChevronLeft />}
          onClick={() => handleDateChange('prev')}
          disabled={isDateInPast(startDate)}
          className="flex-shrink-0"
        />
        <div className="grid grid-cols-7 flex-1 px-2">
          {weekDates.map(date => (
            <div key={date.toISOString()} className="text-center">
              <div className="text-gray-500 text-xs sm:text-sm">{format(date, 'EEE')}</div>
              <div className="font-medium text-sm sm:text-base">{format(date, 'd')}</div>
              <div className="text-xs text-gray-400 hidden sm:block">{format(date, 'MMM')}</div>
            </div>
          ))}
        </div>
        <Button
          type="text"
          icon={<ChevronRight />}
          onClick={() => handleDateChange('next')}
          className="flex-shrink-0"
        />
      </div>

      {!isLoading && !hasAvailableSlots ? (
        <div className="py-8 sm:py-12 px-4">
          <Empty
            description={
              <div className="space-y-2">
                <p className="text-gray-600">No available appointments this week</p>
                <p className="text-gray-400 text-sm">Please try another week</p>
              </div>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {weekDates.map(date => (
            <div key={date.toISOString()} className="space-y-1 sm:space-y-2">
              {renderTimeSlots(date)}
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  )
}

export default TimeGrid
