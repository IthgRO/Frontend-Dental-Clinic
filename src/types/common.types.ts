export type Timezone = string
export type UUID = string

export interface BaseEntity {
  id: UUID
  created_at: Date
  updated_at: Date
}

export interface TimestampEntity {
  created_at: Date
  updated_at: Date
}
