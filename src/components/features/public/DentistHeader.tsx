// src/components/features/booking/DentistHeader.tsx
interface DentistHeaderProps {
  name: string
  clinic: string
}

const DentistHeader = ({ name, clinic }: DentistHeaderProps) => {
  return (
    <div className="mb-8 border-b pb-6">
      <h1 className="text-3xl font-semibold mb-1">{name}</h1>
      <p className="text-gray-600">{clinic}</p>
    </div>
  )
}

export default DentistHeader
