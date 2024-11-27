import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/useAuthStore'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown, Layout } from 'antd'

const { Header: AntHeader } = Layout

const Header = () => {
  const { user } = useAuthStore()
  const { logout } = useAuth()

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ]

  return (
    <AntHeader className="bg-white px-6 flex justify-end items-center">
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <Button type="text" className="flex items-center">
          <Avatar icon={<UserOutlined />} />
          <span className="ml-2">
            {user?.first_name} {user?.last_name}
          </span>
        </Button>
      </Dropdown>
    </AntHeader>
  )
}

export default Header
