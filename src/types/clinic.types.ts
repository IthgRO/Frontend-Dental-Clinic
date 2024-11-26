import { BaseEntity } from './common.types'

export interface Clinic extends BaseEntity {
  name: string
  address: string
  city: string
  country: string
  timezone: string
  phone: string
  email: string
  is_active: boolean
}
