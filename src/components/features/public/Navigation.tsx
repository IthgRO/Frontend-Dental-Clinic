// src/components/features/public/Navigation.tsx
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Dental Logo
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link to="/my-account" className="text-gray-600 hover:text-gray-900">
              My Account
            </Link>
            <Button type="primary" size="large" className="bg-black hover:bg-gray-800">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
