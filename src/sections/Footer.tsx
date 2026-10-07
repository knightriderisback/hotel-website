import { HOTEL } from '@/data/hotel'

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-navy-deep">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div>
            <p className="font-display text-3xl font-light text-cream">Hotel Steel City</p>
            <p className="mt-2 text-[0.62rem] uppercase tracking-[0.5em] text-gold-light">Dalli Rajhara · Chhattisgarh</p>
            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-cream/55">{HOTEL.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <p className="col-span-2 text-[0.62rem] uppercase tracking-[0.3em] text-cream/40">Explore</p>
            {[['Rooms', '#rooms'],['Dining', '#dining'],['Amenities', '#amenities'],['Gallery', '#gallery'],['Contact', '#contact']].map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-light text-cream/70 transition-colors hover:text-gold-light">{label}</a>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-cream/40">Reservations</p>
            <a href={`tel:${HOTEL.reception.replace(/\s/g, '')}`} className="block text-sm font-light text-cream/70 hover:text-gold-light">{HOTEL.reception}</a>
            <a href={`tel:${HOTEL.restaurantPhone.replace(/\s/g, '')}`} className="block text-sm font-light text-cream/70 hover:text-gold-light">{HOTEL.restaurantPhone} — Restaurant</a>
            <a href={HOTEL.instagram} target="_blank" rel="noreferrer" className="block text-sm font-light text-cream/70 hover:text-gold-light">@hotelsteelcity</a>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-[0.62rem] uppercase tracking-[0.28em] text-cream/35 sm:flex-row">
          <span>© {new Date().getFullYear()} Hotel Steel City, Dalli Rajhara</span>
          <span>{HOTEL.website}</span>
        </div>
      </div>
    </footer>
  )
}
