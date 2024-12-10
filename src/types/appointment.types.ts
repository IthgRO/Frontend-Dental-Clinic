export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Appointment {
  id: string
  service: string
  dentistName: string
  dentistImage?: string
  clinic: string
  date: string
  time: string
  address: string
  status: AppointmentStatus
}
