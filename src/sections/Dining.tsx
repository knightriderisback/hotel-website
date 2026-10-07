import Reveal from '@/components/Reveal'
import { HOTEL } from '@/data/hotel'

export default function Dining() {
  return (
    <section id="dining" className="relative overflow-hidden bg-navy-deep py-28 lg:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="img-zoom relative min-h-[420px] lg:min-h-[760px]">
          <img src="https://steelcity.kimi.page/images/restaurant.jpg" alt="City Lights — pure vegetarian restaurant" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-deep/40" />
        </div>
        <div className="flex items-center px-6 py-20 lg:px-20 lg:py-40">
          <div>
            <Reveal>
              <p className="eyebrow text-gold-light">Dining</p>
              <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-cream lg:text-6xl">
                City Lights —<br /><span className="italic text-gold-light">pure vegetarian,</span> done properly
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-9 max-w-md text-base font-light leading-[1.9] text-cream/70">
                Our in-house restaurant serves the kind of vegetarian food the region is proud of —
                slow-cooked dals, paneer done a dozen ways, breads off the tawa and thalis that arrive generous and hot.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6">
                {[['Pure Vegetarian', 'No compromise, full flavour'],['Room Dining', '24×7 in-room service'],['Family Seating', 'Comfortable for all ages'],['Celebrations', 'Group bookings & parties']].map(([t, n]) => (
                  <div key={t} className="border-l border-gold/35 pl-4">
                    <p className="text-sm font-medium tracking-wide text-cream">{t}</p>
                    <p className="mt-1 text-xs font-light text-cream/55">{n}</p>
                  </div>
                ))}
              </div>
              <a href={`tel:${HOTEL.restaurantPhone.replace(/\s/g, '')}`} className="btn-split mt-12">
                <span>Restaurant — {HOTEL.restaurantPhone}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
