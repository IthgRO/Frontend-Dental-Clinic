import { BaseEntity, UUID } from './common.types'

export enum UserRole {
  ADMIN = 'admin',
  DENTIST = 'dentist',
  PATIENT = 'patient',
}

export interface User extends BaseEntity {
  clinic_id: UUID
  email: string
  first_name: string
  last_name: string
  phone: string
  role: UserRole
  timezone: string
  is_active: boolean
}

export interface DentistProfile extends BaseEntity {
  user_id: UUID
  specialization: string
  bio: string
  working_hours: WorkingHours[]
}

export interface WorkingHours {
  day_of_week: number
  start_time: string
  end_time: string
  is_available: boolean
}
