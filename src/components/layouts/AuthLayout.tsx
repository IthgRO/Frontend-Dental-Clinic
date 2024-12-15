import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import LanguageSwitcher from '../common/LanguageSwitcher'

const { Content } = Layout

const AuthLayout = () => {
  return (
    <Layout className="min-h-screen">
      {/* <Navigation /> */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <Content className="flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </Content>
      {/* <Footer /> */}
    </Layout>
  )
}

export default AuthLayout
