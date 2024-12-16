import { TimeSlot } from '@/types'
import { format, parseISO } from 'date-fns'

export const getNextAvailableTime = (availableSlots: TimeSlot[]): string | null => {
  if (!availableSlots.length) return null

  const now = new Date()
  const availableSlot = availableSlots.find(slot => {
    const slotTime = parseISO(slot.startTime)
    return slotTime > now
  })

  if (!availableSlot) return null

  const slotDate = parseISO(availableSlot.startTime)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (slotDate.toDateString() === today.toDateString()) {
    return `Today at ${format(slotDate, 'HH:mm')}`
  } else if (slotDate.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow at ${format(slotDate, 'HH:mm')}`
  } else {
    return `${format(slotDate, 'EEE, d MMM')} at ${format(slotDate, 'HH:mm')}`
  }
}
