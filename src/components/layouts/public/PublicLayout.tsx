// src/components/layouts/public/PublicLayout.tsx
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Outlet />
    </Layout>
  )
}

export default PublicLayout
