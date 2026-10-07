import { useEffect, useState } from 'react'
import { HOTEL } from '@/data/hotel'

const LINKS = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Dining', href: '#dining' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'nav-glass' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-medium tracking-wide text-cream">
            Steel City
          </span>
          <span className="mt-1 text-[0.58rem] uppercase tracking-[0.5em] text-gold-light">
            Dalli Rajhara
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.7rem] uppercase tracking-[0.3em] text-cream/80 transition-colors duration-300 hover:text-gold-light"
            >
              {l.label}
            </a>
          ))}
          <a href={`tel:${HOTEL.reception.replace(/\s/g, '')}`} className="btn-split !py-2.5 !px-6">
            <span>Reserve</span>
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${
              open ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${
              open ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-6 px-6 pb-8 pt-2 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-[0.3em] text-cream/85"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${HOTEL.reception.replace(/\s/g, '')}`}
            className="btn-split mt-2 w-fit !py-2.5 !px-6"
          >
            <span>Reserve</span>
          </a>
        </nav>
      )}
    </header>
  )
}
