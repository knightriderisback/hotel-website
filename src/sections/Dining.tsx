import Reveal from '@/components/Reveal'
import { useCms } from '@/cms/store'

export default function Dining() {
  const { data } = useCms()
  const c = data.content
  return (
    <section id="dining" className="relative overflow-hidden bg-navy-deep py-28 lg:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="img-zoom relative min-h-[420px] lg:min-h-[760px]">
          <img src={data.images.restaurant} alt="Restaurant" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-deep/40" />
        </div>
        <div className="flex items-center px-6 py-20 lg:px-20 lg:py-40">
          <div>
            <Reveal>
              <p className="eyebrow text-gold-light">{c.diningEyebrow}</p>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-cream lg:text-6xl">{c.diningTitle}</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-9 max-w-md text-base font-light leading-[1.9] text-cream/70">{c.diningBody}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <a href={`tel:${c.restaurantPhone.replace(/\s/g, '')}`} className="btn-split mt-12">
                <span>Restaurant — {c.restaurantPhone}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
