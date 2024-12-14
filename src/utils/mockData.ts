// src/utils/mockData.ts
export const generateRandomTimeSlots = () => {
  const baseSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  return baseSlots.filter(() => Math.random() > 0.3)
}

export const generateWeekSchedule = () => {
  return Array.from({ length: 7 }, () => generateRandomTimeSlots())
}
