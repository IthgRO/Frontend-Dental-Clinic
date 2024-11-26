import { BaseEntity, UUID } from './common.types'

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface Appointment extends BaseEntity {
  clinic_id: UUID
  patient_id: UUID
  dentist_id: UUID
  service_id: UUID
  start_time: Date
  end_time: Date
  timezone: string
  status: AppointmentStatus
  notes?: string
}
