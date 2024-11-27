import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const AuthLayout = () => {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}

export default AuthLayout
