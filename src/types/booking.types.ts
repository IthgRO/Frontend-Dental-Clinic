export interface TimeSlot {
  id: string
  time: string
  isAvailable: boolean
}

export interface Service {
  id: string
  name: string
  duration: number
  price: number
  description?: string
}

export interface DentistDetails {
  id: string
  name: string
  clinic: string
  image: string
  services: Service[]
  availability: {
    date: string
    slots: TimeSlot[]
  }[]
}
