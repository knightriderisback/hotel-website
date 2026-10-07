import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Rooms from '../sections/Rooms'
import Amenities from '../sections/Amenities'
import Dining from '../sections/Dining'
import Banquet from '../sections/Banquet'
import Gallery from '../sections/Gallery'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Dining />
      <Banquet />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
