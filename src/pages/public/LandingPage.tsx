// src/pages/public/LandingPage.tsx
import Hero from '@/components/features/public/Hero'
import Footer from '@/components/layouts/Footer'
import Navigation from '@/components/layouts/Navigation'

const LandingPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1">
      <Hero />
    </main>
    <Footer />
  </div>
)

export default LandingPage
