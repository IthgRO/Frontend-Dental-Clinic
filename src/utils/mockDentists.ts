// src/data/mockDentists.ts
import { cities } from '@/constants/locations'
import { services } from '@/constants/services'
import { Dentist } from '@/types'

const clinics = [
  'Bright Smile Dentistry',
  'Nordic Dental Care',
  'City Dental Center',
  'Modern Smile Studio',
  'Dental Excellence',
]

const streets = ['Karl Johans gate', 'Storgata', 'Grønlandsleiret', 'Bogstadveien', 'Torggata']

const dentistNames = [
  'Dr. Sofia Andersson',
  'Dr. Erik Nielsen',
  'Dr. Maria Larsson',
  'Dr. Johan Berg',
  'Dr. Anna Olsen',
  'Dr. Lars Nilsson',
  'Dr. Ingrid Svendsen',
  'Dr. Magnus Holm',
  'Dr. Kristin Dahl',
  'Dr. Henrik Lund',
]

const specialties = services.map(s => s.label)
const ratings = [4.2, 4.5, 4.7, 4.8, 4.3, 4.6, 4.9, 4.4]
const yearsExperience = [3, 5, 7, 10, 12, 15, 20, 25]
const languages = ['English', 'Norwegian', 'Swedish', 'Danish', 'German']

export const mockDentists: Dentist[] = dentistNames.map((name, index) => {
  const city = cities[Math.floor(Math.random() * cities.length)]
  const street = streets[Math.floor(Math.random() * streets.length)]
  const clinic = clinics[Math.floor(Math.random() * clinics.length)]

  // Random selection of 3-5 services
  const numServices = Math.floor(Math.random() * 3) + 3
  const dentistServices = [...specialties].sort(() => Math.random() - 0.5).slice(0, numServices)

  // Random selection of 2-3 languages
  const numLanguages = Math.floor(Math.random() * 2) + 2
  const spokenLanguages = [...languages].sort(() => Math.random() - 0.5).slice(0, numLanguages)

  return {
    id: (index + 1).toString(),
    name,
    clinic,
    address: `${street} ${Math.floor(Math.random() * 100)}, ${city.label}`,
    services: dentistServices,
    image: `/api/placeholder/${400 + index}/${300 + index}`,
    rating: ratings[Math.floor(Math.random() * ratings.length)],
    experience: yearsExperience[Math.floor(Math.random() * yearsExperience.length)],
    languages: spokenLanguages,
    specialization: dentistServices[0],
    availableFrom: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
    pricing: {
      consultation: 80 + Math.floor(Math.random() * 40),
      cleaning: 100 + Math.floor(Math.random() * 50),
      whitening: 200 + Math.floor(Math.random() * 100),
    },
  }
})
