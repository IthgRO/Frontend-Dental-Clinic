import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import { useAuthStore } from '@/store/useAuthStore'
import {
  CalendarOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Dropdown, Menu } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const { token, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="account" onClick={() => navigate('/my-account')} icon={<UserOutlined />}>
        My Account
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />} danger>
        Logout
      </Menu.Item>
    </Menu>
  )

  const mobileMenu = (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="px-2 py-4">
          <Link to="/" className="flex items-center mb-6" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" alt="Dental Logo" className="h-8 w-auto" />
          </Link>

          <div className="space-y-2">
            <Button
              icon={<HomeOutlined />}
              block
              type="text"
              onClick={() => {
                navigate('/')
                setIsOpen(false)
              }}
              className="h-12 text-left justify-start text-base"
            >
              Home
            </Button>

            {token ? (
              <>
                <Button
                  icon={<UserOutlined />}
                  block
                  type="text"
                  onClick={() => {
                    navigate('/my-account')
                    setIsOpen(false)
                  }}
                  className="h-12 text-left justify-start text-base"
                >
                  My Account
                </Button>
                <Button
                  icon={<LogoutOutlined />}
                  block
                  type="text"
                  onClick={handleLogout}
                  className="h-12 text-left justify-start text-base text-red-500 hover:text-red-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  icon={<LoginOutlined />}
                  block
                  type="text"
                  onClick={() => {
                    navigate('/login')
                    setIsOpen(false)
                  }}
                  className="h-12 text-left justify-start text-base"
                >
                  Log In
                </Button>
                <Button
                  icon={<UserAddOutlined />}
                  block
                  type="text"
                  onClick={() => {
                    navigate('/register')
                    setIsOpen(false)
                  }}
                  className="h-12 text-left justify-start text-base"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Dental Logo" className="h-10 md:h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {token ? (
              <>
                <Dropdown overlay={userMenu} placement="bottomRight">
                  <Button
                    icon={<UserOutlined />}
                    className="flex items-center gap-2 border-none hover:text-teal-600 h-10"
                  >
                    My Account
                  </Button>
                </Dropdown>
                <Button
                  type="primary"
                  icon={<CalendarOutlined />}
                  size="large"
                  onClick={() => navigate('/dentists')}
                  className="bg-teal-600 hover:bg-teal-700 border-none h-10"
                >
                  Book Appointment
                </Button>
              </>
            ) : (
              <>
                <div className="hidden sm:block">
                  <div className="relative flex w-[240px] h-10 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-200"></div>
                    <Link
                      to="/login"
                      className="flex-1 flex items-center justify-center gap-2 text-gray-600 font-medium hover:bg-teal-600 hover:text-white transition-all"
                    >
                      <LoginOutlined />
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 flex items-center justify-center gap-2 text-gray-600 font-medium hover:bg-teal-600 hover:text-white transition-all"
                    >
                      <UserAddOutlined />
                      Sign Up
                    </Link>
                  </div>
                </div>
                <Button
                  type="primary"
                  icon={<CalendarOutlined />}
                  size="large"
                  onClick={() => navigate('/dentists')}
                  className="bg-teal-600 hover:bg-teal-700 border-none h-10"
                >
                  Book Appointment
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              type="primary"
              icon={<CalendarOutlined />}
              onClick={() => navigate('/dentists')}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Book
            </Button>
            <Button icon={<MenuOutlined />} onClick={() => setIsOpen(true)} />
            <Drawer
              title={null}
              placement="right"
              onClose={() => setIsOpen(false)}
              open={isOpen}
              width={300}
              bodyStyle={{ padding: 0 }}
              closeIcon={null}
            >
              {mobileMenu}
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
