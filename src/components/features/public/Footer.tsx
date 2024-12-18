import { useAppTranslation } from '@/hooks/useAppTranslation'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const { t } = useAppTranslation('common')

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: 'https://facebook.com',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: 'https://linkedin.com',
    },
    {
      name: 'YouTube',
      icon: <Youtube size={20} />,
      url: 'https://youtube.com',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      url: 'https://instagram.com',
    },
  ]

  const quickLinks = [
    { to: '/dentists', label: t('footer.findDentist') },
    { to: '/contact', label: t('footer.contactUs') },
    { to: '/about', label: t('footer.aboutUs') },
    { to: '/privacy', label: t('footer.privacyPolicy') },
  ]

  const accountLinks = [
    { to: '/login', label: t('footer.login') },
    { to: '/register', label: t('footer.signUp') },
    { to: '/my-account', label: t('footer.myAccount') },
    { to: '/appointments', label: t('footer.myAppointments') },
  ]

  const footerLinks = [
    { to: '/terms', label: t('footer.termsOfService') },
    { to: '/privacy', label: t('footer.privacyPolicy') },
    { to: '/cookies', label: t('footer.cookiePolicy') },
  ]

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="Dental Logo" className="h-16 w-auto" />
            </div>
            <p className="text-gray-600 mb-4">{t('footer.description')}</p>
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-teal-600 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">{t('footer.quickLinks')}</h4>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-gray-600 hover:text-teal-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">{t('footer.account')}</h4>
            <div className="space-y-2">
              {accountLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-gray-600 hover:text-teal-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">{t('footer.contact')}</h4>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                {t('footer.email')}:{' '}
                <a
                  href="mailto:support@dental.com"
                  className="hover:text-teal-600 transition-colors"
                >
                  support@dental.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                {t('footer.phone')}:{' '}
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

        {/* Footer Bottom */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex gap-4 text-gray-600">
              {footerLinks.map((link, index) => (
                <div key={link.to} className="flex items-center">
                  <Link to={link.to} className="hover:text-teal-600">
                    {link.label}
                  </Link>
                  {index < footerLinks.length - 1 && <span className="ml-4">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
