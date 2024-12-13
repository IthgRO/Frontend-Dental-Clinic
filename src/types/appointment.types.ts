// User related types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  phone?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  id: number
  clinicId: number
  email: string
  firstName: string
  lastName: string
  phone: string
  role: number
  timezone: string
  password: string
}

// Appointment related types
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Appointment {
  id: string
  service: string
  dentistId: string // Added for API compatibility
  dentistName: string
  dentistImage?: string
  clinicId: string // Added for API compatibility
  clinic: string
  date: string
  time: string
  address: string
  status: AppointmentStatus
  serviceId: string // Added for API compatibility
  price?: number
  startDate?: string // Added for API compatibility
}

export interface DentistResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  maximumPrice: number
  minimumPrice: number
  clinic: {
    id: number
    name: string
    city: string
  }
  services: {
    id: number
    name: string
    price: number
  }[]
}

export interface Dentist {
  id: number
  name: string
  email: string
  phone: string
  priceRange: {
    min: number
    max: number
  }
  clinic: {
    id: number
    name: string
    city: string
  }
  services: {
    id: number
    name: string
    price: number
  }[]
}

// Service related types
export interface Service {
  id: string
  name: string
  price: number
  duration: number
  description?: string
}

// Clinic related types
export interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email?: string
}

// API Request/Response types
export interface GetFreeSlotsRequest {
  dentistId: number
  startDate: string
  endDate: string
}

export interface ApiAppointment {
  id: number
  dentistFirstName: string
  dentistLastName: string
  clinicName: string
  city: string
  serviceName: string
  servicePrice: number
  currency: string
  startTime: string
  endTime: string
}

export interface BookAppointmentRequest {
  dentistId: number
  clinicId: number
  serviceId: number
  startDate: string
}

export interface CancelAppointmentRequest {
  appointmentId: number
}

export interface TimeSlot {
  startTime: string
  endTime: string
}

export interface AvailableSlotsRequest {
  dentistId: number
  startDate: string
  endDate: string
}
