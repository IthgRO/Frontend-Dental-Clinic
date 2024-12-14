// src/components/layouts/public/PublicLayout.tsx
import Footer from '@/components/features/public/Footer'
import Navigation from '@/components/features/public/Navigation'
import { Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'

const { Content } = Layout

const PublicLayout = () => {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <Layout className="min-h-screen bg-white">
      <Navigation />
      <Content className="bg-gray-50">
        <div className={isLandingPage ? '' : 'max-w-7xl mx-auto px-4 py-8 bg-gray-50'}>
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  )
}

export default PublicLayout
