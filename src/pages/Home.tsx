import { lazy, Suspense, memo } from 'react'
import Nav from '@/sections/Nav'
import Hero from '@/sections/Hero'
import { useCms } from '@/cms/store'

const About = lazy(() => import('@/sections/About'))
const Rooms = lazy(() => import('@/sections/Rooms'))
const Dining = lazy(() => import('@/sections/Dining'))
const Amenities = lazy(() => import('@/sections/Amenities'))
const Banquet = lazy(() => import('@/sections/Banquet'))
const Gallery = lazy(() => import('@/sections/Gallery'))
const SocialEmbeds = lazy(() => import('@/sections/SocialEmbeds'))
const Contact = lazy(() => import('@/sections/Contact'))
const Footer = lazy(() => import('@/sections/Footer'))

function Home() {
  const { data } = useCms()
  const s = data.sections

  return (
    <main className="bg-cream">
      <Nav />
      {s.hero && <Hero />}
      <Suspense fallback={null}>
        {s.about && <About />}
        {s.rooms && <Rooms />}
        {s.dining && <Dining />}
        {s.amenities && <Amenities />}
        {s.banquet && <Banquet />}
        {s.gallery && <Gallery />}
        {s.socialEmbeds && <SocialEmbeds />}
        {s.contact && <Contact />}
        <Footer />
      </Suspense>
    </main>
  )
}

export default memo(Home)
