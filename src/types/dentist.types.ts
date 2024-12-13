// src/types/index.ts (add these types)
export interface Dentist {
  id: string
  name: string
  clinic: string
  address: string
  services: string[]
  image: string
  rating: number
  experience: number
  languages: string[]
  specialization: string
  availableFrom: Date
  pricing: {
    consultation: number
    cleaning: number
    whitening: number
  }
}

export interface SearchFilters {
  query: string
  location: string
  services: string[]
  availability: string[]
}
