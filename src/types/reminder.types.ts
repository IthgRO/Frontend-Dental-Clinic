import { BaseEntity, UUID } from './common.types'

export enum ReminderType {
  EMAIL = 'email',
  SMS = 'sms',
}

export enum ReminderStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

export interface Reminder extends BaseEntity {
  appointment_id: UUID
  type: ReminderType
  status: ReminderStatus
  timezone: string
  send_at: Date
  sent_at?: Date
}
