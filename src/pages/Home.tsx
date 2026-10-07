import { HOTEL } from '../data/hotel'

export default function Home() {
  const wa = `https://wa.me/${HOTEL.receptionRaw}?text=${encodeURIComponent('Hello Hotel Steel City, I would like to book a room.')}`
  return (
    <main>
      <header className="bg-navy-deep text-cream px-6 py-5 flex items-center justify-between">
        <div>
          <p className="font-display text-2xl">Steel City</p>
          <p className="text-xs tracking-[0.35em] uppercase text-gold">Dalli Rajhara</p>
        </div>
        <a href={`tel:${HOTEL.reception.replace(/\s/g, '')}`} className="border border-[#af915f] px-4 py-2 text-xs tracking-[0.2em] uppercase">Reserve</a>
      </header>
      <section className="bg-navy text-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <p className="tracking-[0.4em] uppercase text-sm text-gold">Welcome to</p>
        <h1 className="font-display text-6xl mt-4 font-light">Hotel Steel City</h1>
        <p className="mt-6 max-w-xl text-lg font-light">{HOTEL.tagline}</p>
        <div className="mt-10 flex gap-4">
          <a href={wa} className="bg-[#af915f] text-[#0b1624] px-6 py-3 text-xs tracking-[0.2em] uppercase">Book Your Stay</a>
          <a href="#rooms" className="border border-[#af915f] px-6 py-3 text-xs tracking-[0.2em] uppercase">Explore Rooms</a>
        </div>
      </section>
      <section id="rooms" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-display text-5xl font-light">Rooms & suites</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {['Deluxe Room','Executive Suite','Family Room'].map((name) => (
            <article key={name} className="border border-[#af915f]/40 p-6">
              <h3 className="font-display text-3xl">{name}</h3>
              <p className="mt-3 text-sm leading-7">Air conditioning, high-speed Wi-Fi, modern washroom and 24x7 room service.</p>
            </article>
          ))}
        </div>
      </section>
      <section id="contact" className="bg-navy-deep text-cream px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl font-light">Find us</h2>
          <p className="mt-4 max-w-xl font-light">{HOTEL.address}</p>
          <p className="mt-4">Reception {HOTEL.reception}</p>
          <p>Restaurant {HOTEL.restaurantPhone}</p>
          <a href={wa} className="inline-block mt-6 border border-[#af915f] px-5 py-3 text-xs tracking-[0.2em] uppercase">WhatsApp booking</a>
        </div>
      </section>
    </main>
  )
}
