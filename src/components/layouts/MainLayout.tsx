import Header from '@/components/layouts/Header'
import Sidebar from '@/components/layouts/Sidebar'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Header />
        <Content className="p-6">
          <div className="bg-white rounded-lg p-6 min-h-full">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
