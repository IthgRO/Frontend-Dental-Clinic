// AppointmentTimePicker.tsx
import { useTimeSlots } from '@/hooks/useTimeSlots'
import { useAppTranslation } from '@/hooks/useAppTranslation'
import { addDays, format, parseISO } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useMemo, useRef, useEffect, useState } from 'react'
import { Button, Empty, Spin } from 'antd'

interface AppointmentTimePickerProps {
  dentistId: number
  onDateSelect: (date: Date) => void
  onTimeSelect: (time: string) => void
  selectedDate?: Date
  selectedTime?: string
}

const AppointmentTimePicker = ({
  dentistId,
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
}: AppointmentTimePickerProps) => {
  const { t } = useAppTranslation('appointments')
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [showTopGradient, setShowTopGradient] = useState(false)
  const [showBottomGradient, setShowBottomGradient] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const weekEnd = addDays(currentWeekStart, 6)
  const { availableSlots, isLoading } = useTimeSlots(dentistId, currentWeekStart, weekEnd)

  // Initialize currentWeekStart based on selectedDate
  useEffect(() => {
    if (selectedDate) {
      const day = selectedDate.getDay()
      const diff = selectedDate.getDate() - day + (day === 0 ? -6 : 1)
      const weekStart = new Date(selectedDate)
      weekStart.setDate(diff)
      setCurrentWeekStart(weekStart)
    }
  }, [])

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeekStart, i)
    return {
      date,
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      month: format(date, 'MMM'),
      isSelected: selectedDate
        ? format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
        : false,
    }
  })

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      setShowTopGradient(scrollTop > 0)
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
      setShowBottomGradient(scrollHeight > clientHeight && !isAtBottom)
    }
  }, [])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      handleScroll()
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  const getTimeSlotsForDate = useCallback(
    (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd')

      // Get available slots for the date
      const availableSlotsForDate = (availableSlots || [])
        .filter(slot => format(parseISO(slot.startTime), 'yyyy-MM-dd') === dateStr)
        .map(slot => format(parseISO(slot.startTime), 'HH:mm'))

      // If this is the selected date and we have a selectedTime, include it
      if (
        selectedDate &&
        selectedTime &&
        format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') &&
        !availableSlotsForDate.includes(selectedTime)
      ) {
        return [...availableSlotsForDate, selectedTime].sort()
      }

      return availableSlotsForDate
    },
    [availableSlots, selectedDate, selectedTime]
  )

  const handlePrevWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, -7))
  }

  const handleNextWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, 7))
  }

  const handleDateSelect = (date: Date) => {
    if (!isDateInPast(date)) {
      onDateSelect(date)
      onTimeSelect('') // Reset time selection when date changes
    }
  }

  const isDateInPast = useCallback((date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Spin size="large" />
      </div>
    )
  }

  const selectedDaySlots = selectedDate ? getTimeSlotsForDate(selectedDate) : []

  return (
    <div className="w-full bg-white h-full sm:h-auto">
      <div className="p-3 sm:p-6 space-y-3 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 px-1">
          {t('editModal.selectDateTime')}
        </h2>

        <div className="relative">
          <div className="px-8 sm:px-16">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 border-b border-gray-200">
                <div className="grid grid-cols-7">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div
                      key={day}
                      className="text-center text-xs sm:text-sm text-gray-600 py-1.5 sm:py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white">
                <div className="grid grid-cols-7">
                  {weekDays.map(({ date, dayNumber, month, isSelected }) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      disabled={isDateInPast(date)}
                      className={`${
                        isDateInPast(date) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'
                      }`}
                    >
                      <div
                        className={`text-center py-1.5 sm:py-2 ${
                          isSelected ? 'bg-teal-600 text-white' : ''
                        }`}
                      >
                        <div className="text-lg sm:text-xl font-medium leading-tight">
                          {dayNumber}
                        </div>
                        <div
                          className={`text-xs sm:text-sm ${
                            isSelected ? 'text-white' : 'text-gray-500'
                          }`}
                        >
                          {month}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePrevWeek}
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isDateInPast(currentWeekStart)}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <button
            onClick={handleNextWeek}
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2 sm:space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 px-1">
              {t('editModal.selectTime')}
            </h3>
            {selectedDate && (
              <p className="text-sm text-gray-600 px-1 mt-1">
                {format(selectedDate, 'EEEE, MMMM d')}
              </p>
            )}
          </div>

          <div className="relative">
            {/* Top gradient */}
            {showTopGradient && (
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            )}

            <div
              ref={scrollRef}
              className="max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              {selectedDate ? (
                selectedDaySlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 px-0.5 pb-0.5">
                    {selectedDaySlots.map(time => {
                      const isTimeSelected = selectedTime === time
                      const isOriginalAppointmentTime =
                        isTimeSelected &&
                        !availableSlots?.some(
                          slot => format(parseISO(slot.startTime), 'HH:mm') === time
                        )

                      return (
                        <button
                          key={time}
                          onClick={() => onTimeSelect(time)}
                          disabled={isOriginalAppointmentTime}
                          className={`py-2 sm:py-3 px-2 sm:px-4 rounded-lg border text-center text-sm sm:text-base transition-colors
                    ${
                      isTimeSelected
                        ? 'border-teal-600 bg-teal-50 text-teal-600'
                        : 'border-gray-200 text-gray-900 hover:border-teal-600'
                    }
                    ${isOriginalAppointmentTime ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="py-4">
                    <Empty
                      description={
                        <div className="space-y-2">
                          <p className="text-gray-600">{t('editModal.noSlots')}</p>
                          <p className="text-gray-400 text-sm">{t('editModal.tryAnother')}</p>
                        </div>
                      }
                    />
                  </div>
                )
              ) : null}
            </div>

            {/* Bottom gradient */}
            {showBottomGradient && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentTimePicker
