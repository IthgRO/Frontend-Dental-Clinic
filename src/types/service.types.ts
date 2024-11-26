import { BaseEntity, UUID } from './common.types'

export interface Service extends BaseEntity {
  clinic_id: UUID
  dentist_id: UUID
  name: string
  description: string
  duration: number
  price: number
  category: string
  is_active: boolean
}
