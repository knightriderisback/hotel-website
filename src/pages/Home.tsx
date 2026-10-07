import Nav from '@/sections/Nav'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Rooms from '@/sections/Rooms'
import Dining from '@/sections/Dining'
import Amenities from '@/sections/Amenities'
import Banquet from '@/sections/Banquet'
import Gallery from '@/sections/Gallery'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <main className="bg-cream">
      <Nav />
      <Hero />
      <About />
      <Rooms />
      <Dining />
      <Amenities />
      <Banquet />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
