import Nav from '@/sections/Nav'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Rooms from '@/sections/Rooms'
import Dining from '@/sections/Dining'
import Amenities from '@/sections/Amenities'
import Banquet from '@/sections/Banquet'
import Gallery from '@/sections/Gallery'
import SocialEmbeds from '@/sections/SocialEmbeds'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import { useCms } from '@/cms/store'

export default function Home() {
  const { data } = useCms()
  const s = data.sections

  return (
    <main className="bg-cream">
      <Nav />
      {s.hero && <Hero />}
      {s.about && <About />}
      {s.rooms && <Rooms />}
      {s.dining && <Dining />}
      {s.amenities && <Amenities />}
      {s.banquet && <Banquet />}
      {s.gallery && <Gallery />}
      {s.socialEmbeds && <SocialEmbeds />}
      {s.contact && <Contact />}
      <Footer />
    </main>
  )
}
