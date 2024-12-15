import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import { useAuthStore } from '@/store/useAuthStore'
import { UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const { token, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="account">
        <Link to="/my-account">My Account</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Dental Logo" className="h-16 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/dentists" className="text-gray-600 hover:text-teal-600 transition-colors">
                Find a Dentist
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-teal-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {token ? (
              <>
                <Dropdown overlay={userMenu} placement="bottomRight">
                  <Button
                    icon={<UserOutlined />}
                    className="flex items-center gap-2 border-none hover:text-teal-600"
                  >
                    My Account
                  </Button>
                </Dropdown>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate('/dentists')}
                  className="bg-teal-600 hover:bg-teal-700 border-none"
                >
                  Book Appointment
                </Button>
              </>
            ) : (
              <>
                <div className="hidden sm:block">
                  <div className="relative flex w-[240px] h-10 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* Divider */}
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-200"></div>

                    {/* Login Button */}
                    <Link
                      to="/login"
                      className="flex-1 flex items-center justify-center text-gray-600 font-medium hover:bg-teal-600 hover:text-white transition-all"
                    >
                      Log In
                    </Link>

                    {/* Sign Up Button */}
                    <Link
                      to="/register"
                      className="flex-1 flex items-center justify-center text-gray-600 font-medium hover:bg-teal-600 hover:text-white transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate('/dentists')}
                  className="bg-teal-600 hover:bg-teal-700 border-none"
                >
                  Book Appointment
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
