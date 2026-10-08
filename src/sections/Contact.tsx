import { useState } from 'react'
import Reveal from '@/components/Reveal'
import { useCms } from '@/cms/store'

export default function Contact() {
  const { data } = useCms()
  const c = data.content
  const [form, setForm] = useState({ name: '', checkin: '', nights: '1', guests: '2', room: data.rooms[0]?.name || 'Deluxe Room' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Hello ${c.hotelName}, I would like to book.\n\nName: ${form.name}\nRoom: ${form.room}\nCheck-in: ${form.checkin || 'Flexible'}\nNights: ${form.nights}\nGuests: ${form.guests}`
    window.open(`https://wa.me/${c.receptionRaw}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const inputCls = 'w-full border-b border-cream/30 bg-transparent py-3 text-sm font-light tracking-wide text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none transition-colors'

  return (
    <section id="contact" className="bg-navy-deep py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-gold-light">{c.contactEyebrow}</p>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-cream lg:text-6xl">{c.contactTitle}</h2>
            <p className="mt-8 max-w-md text-base font-light leading-[1.9] text-cream/70">{c.address}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 space-y-5">
              <a href={`tel:${c.reception.replace(/\s/g, '')}`} className="group flex items-baseline gap-6">
                <span className="w-28 text-[0.62rem] uppercase tracking-[0.3em] text-cream/45">Reception</span>
                <span className="font-display text-2xl font-light text-gold-light">{c.reception}</span>
              </a>
              <a href={`tel:${c.restaurantPhone.replace(/\s/g, '')}`} className="group flex items-baseline gap-6">
                <span className="w-28 text-[0.62rem] uppercase tracking-[0.3em] text-cream/45">Restaurant</span>
                <span className="font-display text-2xl font-light text-gold-light">{c.restaurantPhone}</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.25} className="mt-12">
            <div className="frame-gold relative z-10 aspect-[16/9] w-full bg-navy">
              <iframe title="Map" src={c.mapEmbed} className="h-full w-full border-0 grayscale-[35%]" loading="lazy" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <Reveal delay={0.2}>
            <div className="border border-gold/30 p-10 lg:p-14">
              <p className="eyebrow text-gold-light">Reservations</p>
              <h3 className="font-display mt-5 text-4xl font-light text-cream">{c.contactFormTitle}</h3>
              <p className="mt-4 text-sm font-light text-cream/60">{c.contactFormIntro}</p>
              <form onSubmit={submit} className="mt-10 space-y-8">
                <div>
                  <label className="text-[0.62rem] uppercase tracking-[0.3em] text-cream/45">Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[0.62rem] uppercase tracking-[0.3em] text-cream/45">Check-in</label>
                    <input type="date" value={form.checkin} onChange={(e) => setForm({ ...form, checkin: e.target.value })} className={`${inputCls} [color-scheme:dark]`} />
                  </div>
                  <div>
                    <label className="text-[0.62rem] uppercase tracking-[0.3em] text-cream/45">Nights</label>
                    <select value={form.nights} onChange={(e) => setForm({ ...form, nights: e.target.value })} className={`${inputCls} appearance-none`}>
                      {[1,2,3,4,5,6,7].map((n) => <option key={n} value={n} className="bg-navy-deep">{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[0.62rem] uppercase tracking-[0.3em] text-cream/45">Guests</label>
                    <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className={`${inputCls} appearance-none`}>
                      {[1,2,3,4,5,6].map((n) => <option key={n} value={n} className="bg-navy-deep">{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.62rem] uppercase tracking-[0.3em] text-cream/45">Room</label>
                    <select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} className={`${inputCls} appearance-none`}>
                      {data.rooms.map((r) => <option key={r.name} className="bg-navy-deep">{r.name}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-split solid w-full"><span>Send via WhatsApp</span></button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
