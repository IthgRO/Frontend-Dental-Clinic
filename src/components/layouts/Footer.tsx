// src/components/layouts/Footer.tsx
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const Footer = () => (
  <footer className="bg-gray-100 py-8">
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">Site Name</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
        <div className="text-right">
          <h4 className="font-medium mb-2">Contact</h4>
          <a
            href="mailto:dummyemail@gmail.com"
            className="text-gray-600 hover:text-black transition-colors"
          >
            dummyemail@gmail.com
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
