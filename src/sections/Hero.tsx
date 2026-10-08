import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCms } from '@/cms/store'

export default function Hero() {
  const { data } = useCms()
  const c = data.content
  const slides = data.images.heroSlides.filter(Boolean)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 6500)
    return () => clearInterval(t)
  }, [slides.length])

  return (
    <section id="top" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-navy-deep">
      {slides.map((src, i) => (
        <div key={src + i} className={`hero-slide ${i === active ? 'active' : ''}`}>
          <img src={src} alt={c.hotelName} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/25 to-navy-deep/85" />
      <div className="v-label absolute right-6 top-1/2 hidden -translate-y-1/2 text-cream/50 lg:block">Est. {c.town} — Chhattisgarh</div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="eyebrow text-gold-light">{c.heroWelcome}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5 }} className="font-display mt-6 max-w-4xl text-6xl font-light leading-[0.95] text-cream sm:text-7xl lg:text-8xl">{c.heroTitle}</motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mx-auto mt-8 h-px w-24 origin-center bg-gold" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="mt-8 max-w-xl text-base font-light leading-relaxed tracking-wide text-cream/85 sm:text-lg">{c.heroSubtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.45 }} className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#contact" className="btn-split solid"><span>{c.heroCtaPrimary}</span></a>
          <a href="#rooms" className="btn-split"><span>{c.heroCtaSecondary}</span></a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }} className="absolute inset-x-0 bottom-0 z-10 border-t border-gold/25 bg-navy-deep/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-[0.68rem] uppercase tracking-[0.28em] text-cream/70 sm:flex-row lg:px-10">
          <span>New Market Main Road, {c.town}</span>
          <span className="hidden sm:inline">Pure Veg Restaurant · City Lights</span>
          <a href={`tel:${c.reception.replace(/\s/g, '')}`} className="text-gold-light">Reservations {c.reception}</a>
        </div>
      </motion.div>
    </section>
  )
}
