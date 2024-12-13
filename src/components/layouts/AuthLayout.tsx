import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const AuthLayout = () => {
  return (
    <Layout className="min-h-screen">
      {/* <Navigation /> */}
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
