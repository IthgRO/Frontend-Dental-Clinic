import { Spin } from 'antd'

const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <Spin size="large" />
  </div>
)

export default LoadingScreen
