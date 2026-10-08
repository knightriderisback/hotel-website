import { ConciergeBell, Wifi, UtensilsCrossed, ShowerHead, PartyPopper, MapPin } from 'lucide-react'
import type { ReactElement } from 'react'
import Reveal from '@/components/Reveal'
import { useCms } from '@/cms/store'

const ICONS: Record<string, ReactElement> = {
  '24×7 Room Service': <ConciergeBell strokeWidth={1.4} />,
  'High-Speed Wi-Fi': <Wifi strokeWidth={1.4} />,
  'Pure Veg Restaurant': <UtensilsCrossed strokeWidth={1.4} />,
  'Ultra-Modern Washrooms': <ShowerHead strokeWidth={1.4} />,
  'Banquet & Celebrations': <PartyPopper strokeWidth={1.4} />,
  'Prime Location': <MapPin strokeWidth={1.4} />,
}

export default function Amenities() {
  const { data } = useCms()
  const c = data.content
  return (
    <section id="amenities" className="bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-20 text-center">
          <p className="eyebrow text-gold">{c.amenitiesEyebrow}</p>
          <h2 className="font-display mx-auto mt-6 max-w-2xl text-5xl font-light leading-[1.02] text-ink lg:text-6xl">{c.amenitiesTitle}</h2>
          <div className="mx-auto mt-8 h-px w-16" style={{ background: 'var(--gold)' }} />
        </Reveal>
        <div className="grid grid-cols-1 gap-px bg-gold/25 sm:grid-cols-2 lg:grid-cols-3">
          {data.amenities.map((a, i) => (
            <Reveal key={a.title + i} delay={(i % 3) * 0.12} y={24}>
              <div className="group flex h-full flex-col bg-cream p-10 transition-colors duration-500 hover:bg-navy">
                <span className="h-9 w-9 text-gold transition-colors duration-500 group-hover:text-gold-light [&>svg]:h-full [&>svg]:w-full">
                  {ICONS[a.title] || <ConciergeBell strokeWidth={1.4} />}
                </span>
                <h3 className="font-display mt-7 text-2xl font-medium text-ink transition-colors duration-500 group-hover:text-cream">{a.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-cream/60">{a.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
