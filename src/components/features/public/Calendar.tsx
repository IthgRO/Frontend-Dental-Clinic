// src/components/features/public/Calendar.tsx
import { Button } from 'antd'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

// interface CalendarProps {
//   onSelectSlot: (slot: string) => void
//   selectedSlot: string
//   availableSlots: string[]
// }

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeek)
    date.setDate(date.getDate() + i)
    return date
  })

  const nextWeek = () => {
    const next = new Date(currentWeek)
    next.setDate(next.getDate() + 7)
    setCurrentWeek(next)
  }

  const prevWeek = () => {
    const prev = new Date(currentWeek)
    prev.setDate(prev.getDate() - 7)
    setCurrentWeek(prev)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button type="text" icon={<ChevronLeft />} onClick={prevWeek} />
        <div className="flex gap-8">
          {dates.map(date => (
            <div key={date.toISOString()} className="text-center">
              <div className="text-sm text-gray-500">{format(date, 'EEE')}</div>
              <div className="font-medium">{format(date, 'd')}</div>
            </div>
          ))}
        </div>
        <Button type="text" icon={<ChevronRight />} onClick={nextWeek} />
      </div>
    </div>
  )
}

export default Calendar
