import Navigation from '@/components/nav/Navigation'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Testimonies from '@/components/sections/Testimonies'
import About from '@/components/sections/About'
import Sermon from '@/components/sections/Sermon'
import NextSteps from '@/components/sections/NextSteps'
import CampFeature from '@/components/sections/CampFeature'
import Footer from '@/components/sections/Footer'
import Countdown from '@/components/ui/Countdown'

export default function Home() {
  return (
    <>
      <Navigation />
      <Countdown />
      <main>
        <Hero />
        <Stats />
        <Testimonies />
        <About />
        <Sermon />
        <NextSteps />
        <CampFeature />
      </main>
      <Footer />
    </>
  )
}
