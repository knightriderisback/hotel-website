import Reveal from '@/components/Reveal'
import { HOTEL, ROOMS } from '@/data/hotel'

export default function Rooms() {
  return (
    <section id="rooms" className="bg-navy py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-20 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-gold-light">Stay With Us</p>
            <h2 className="font-display mt-6 max-w-xl text-5xl font-light leading-[1.02] text-cream lg:text-6xl">
              Rooms & suites, kept simple and immaculate
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed tracking-wide text-cream/65">
            Every room carries air conditioning, high-speed Wi-Fi, an ultra-modern
            washroom and our 24×7 room service. Call us directly for the best available rates.
          </p>
        </Reveal>
        <div className="flex flex-col gap-24">
          {ROOMS.map((room, i) => (
            <div key={room.name} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <Reveal className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`} y={40}>
                <div className="img-zoom frame-gold aspect-[16/10]">
                  <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
                </div>
              </Reveal>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1 lg:pr-10' : 'lg:pl-10'}`}>
                <Reveal delay={0.15}>
                  <span className="font-display text-lg italic text-gold-light">0{i + 1}</span>
                  <h3 className="font-display mt-3 text-4xl font-light text-cream lg:text-5xl">{room.name}</h3>
                  <div className="rule-gold mt-6" />
                  <p className="mt-7 text-sm font-light leading-[1.9] text-cream/70">{room.blurb}</p>
                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-cream/75">
                        <span className="h-1 w-1 rounded-full bg-gold" />{f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${HOTEL.receptionRaw}?text=${encodeURIComponent(`Hello Hotel Steel City, I would like to enquire about the ${room.name}.`)}`}
                    target="_blank" rel="noreferrer" className="btn-split mt-10"
                  >
                    <span>Enquire — {room.name}</span>
                  </a>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
