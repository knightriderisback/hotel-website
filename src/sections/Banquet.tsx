import Reveal from '@/components/Reveal'
import { HOTEL } from '@/data/hotel'

export default function Banquet() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="img-zoom relative min-h-[70vh]">
        <img src="https://steelcity.kimi.page/images/banquet.jpg" alt="Banquet hall at Hotel Steel City" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy-deep/55" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,22,36,0.72), rgba(11,22,36,0.25))' }} />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
          <Reveal>
            <p className="eyebrow text-gold-light">Weddings & Events</p>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.05] text-cream lg:text-7xl">Celebrate it here</h2>
            <p className="mx-auto mt-8 max-w-xl text-base font-light leading-[1.9] text-cream/75">
              From weddings and receptions to birthdays and corporate gatherings, our banquet hall dresses up beautifully — with pure vegetarian catering from City Lights and a team that handles the details.
            </p>
            <a
              href={`https://wa.me/${HOTEL.receptionRaw}?text=${encodeURIComponent('Hello Hotel Steel City, I would like to enquire about booking the banquet hall for an event.')}`}
              target="_blank" rel="noreferrer" className="btn-split mt-12"
            >
              <span>Plan Your Event</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
