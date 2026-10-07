import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HOTEL } from '@/data/hotel'

const SLIDES = ['https://steelcity.kimi.page/images/hero-exterior.jpg', 'https://steelcity.kimi.page/images/hero-lobby.jpg']

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-navy-deep">
      {SLIDES.map((src, i) => (
        <div key={src} className={`hero-slide ${i === active ? 'active' : ''}`}>
          <img src={src} alt="Hotel Steel City" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/25 to-navy-deep/85" />

      <div className="v-label absolute right-6 top-1/2 hidden -translate-y-1/2 text-cream/50 lg:block">
        Est. Dalli Rajhara — Chhattisgarh
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="eyebrow text-gold-light"
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="font-display mt-6 max-w-4xl text-6xl font-light leading-[0.95] text-cream sm:text-7xl lg:text-8xl"
        >
          Hotel Steel City
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mx-auto mt-8 h-px w-24 origin-center bg-gold"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed tracking-wide text-cream/85 sm:text-lg"
        >
          {HOTEL.tagline} — elegant rooms, pure vegetarian dining and celebrations,
          moments from New Market Main Road.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.45 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href="#contact" className="btn-split solid">
            <span>Book Your Stay</span>
          </a>
          <a href="#rooms" className="btn-split">
            <span>Explore Rooms</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-gold/25 bg-navy-deep/40 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-[0.68rem] uppercase tracking-[0.28em] text-cream/70 sm:flex-row lg:px-10">
          <span>New Market Main Road, Dalli Rajhara</span>
          <span className="hidden sm:inline">Pure Veg Restaurant · City Lights</span>
          <a href={`tel:${HOTEL.reception.replace(/\s/g, '')}`} className="text-gold-light">
            Reservations {HOTEL.reception}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
