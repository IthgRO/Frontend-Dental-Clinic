// src/components/layouts/Navigation.tsx
import { Link } from 'react-router-dom'

const Navigation = () => (
  <nav className="bg-white border-b">
    <div className="max-w-7xl mx-auto px-8 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          Dental Logo
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
          <Link to="/my-account" className="text-gray-700 hover:text-gray-900">
            My Account
          </Link>
          <Link
            to="/book"
            className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

export default Navigation
