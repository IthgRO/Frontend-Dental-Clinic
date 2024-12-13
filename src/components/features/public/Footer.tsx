// src/components/features/public/Footer.tsx
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="Dental Logo" className="h-16 w-auto" />
            </div>
            <p className="text-gray-600 mb-4">
              Book appointments with the best dentists in your area.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-teal-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-teal-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-teal-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-teal-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Rest of the footer content remains the same */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/dentists" className="block text-gray-600 hover:text-teal-600">
                Find a Dentist
              </Link>
              <Link to="/contact" className="block text-gray-600 hover:text-teal-600">
                Contact Us
              </Link>
              <Link to="/about" className="block text-gray-600 hover:text-teal-600">
                About Us
              </Link>
              <Link to="/privacy" className="block text-gray-600 hover:text-teal-600">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Account</h4>
            <div className="space-y-2">
              <Link to="/login" className="block text-gray-600 hover:text-teal-600">
                Login
              </Link>
              <Link to="/register" className="block text-gray-600 hover:text-teal-600">
                Sign Up
              </Link>
              <Link to="/my-account" className="block text-gray-600 hover:text-teal-600">
                My Account
              </Link>
              <Link to="/appointments" className="block text-gray-600 hover:text-teal-600">
                My Appointments
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contact</h4>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                Email:{' '}
                <a
                  href="mailto:support@dental.com"
                  className="hover:text-teal-600 transition-colors"
                >
                  support@dental.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                Phone:{' '}
                <a href="tel:+1234567890" className="hover:text-teal-600 transition-colors">
                  (123) 456-7890
                </a>
              </p>
              <address className="not-italic">
                123 Dental Street
                <br />
                New York, NY 10001
              </address>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Dental Logo. All rights reserved.
            </p>
            <div className="flex gap-4 text-gray-600">
              <Link to="/terms" className="hover:text-teal-600">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-teal-600">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/cookies" className="hover:text-teal-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
