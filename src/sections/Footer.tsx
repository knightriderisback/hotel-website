import { useCms } from '@/cms/store'

export default function Footer() {
  const { data } = useCms()
  const c = data.content
  const social = data.social
  const footerBg =
    data.theme.footerStyle === 'minimal'
      ? 'bg-cream border-t border-ink/10 text-ink'
      : data.theme.footerStyle === 'navy'
        ? 'bg-navy border-t border-gold/20'
        : 'bg-navy-deep border-t border-gold/20'
  const muted = data.theme.footerStyle === 'minimal' ? 'text-ink/50' : 'text-cream/40'
  const body = data.theme.footerStyle === 'minimal' ? 'text-ink/70' : 'text-cream/70'
  const title = data.theme.footerStyle === 'minimal' ? 'text-ink' : 'text-cream'

  return (
    <footer className={footerBg}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div>
            <p className={`font-display text-3xl font-light ${title}`}>{c.hotelName}</p>
            <p className="mt-2 text-[0.62rem] uppercase tracking-[0.5em] text-gold-light">{c.town} · Chhattisgarh</p>
            <p className={`mt-6 max-w-xs text-sm font-light leading-relaxed ${body}`}>{c.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <p className={`col-span-2 text-[0.62rem] uppercase tracking-[0.3em] ${muted}`}>Explore</p>
            {[
              data.sections.rooms && ['Rooms', '#rooms'],
              data.sections.dining && ['Dining', '#dining'],
              data.sections.amenities && ['Amenities', '#amenities'],
              data.sections.gallery && ['Gallery', '#gallery'],
              data.sections.contact && ['Contact', '#contact'],
            ].filter(Boolean).map((item) => {
              const [label, href] = item as [string, string]
              return (
                <a key={href} href={href} className={`text-sm font-light ${body} transition-colors hover:text-gold-light`}>{label}</a>
              )
            })}
          </div>
          <div className="space-y-3">
            <p className={`text-[0.62rem] uppercase tracking-[0.3em] ${muted}`}>Connect</p>
            <a href={`tel:${c.reception.replace(/\s/g, '')}`} className={`block text-sm font-light ${body} hover:text-gold-light`}>{c.reception}</a>
            {social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer" className={`block text-sm font-light ${body} hover:text-gold-light`}>Instagram</a>}
            {social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer" className={`block text-sm font-light ${body} hover:text-gold-light`}>Facebook</a>}
            {social.twitter && <a href={social.twitter} target="_blank" rel="noreferrer" className={`block text-sm font-light ${body} hover:text-gold-light`}>Twitter / X</a>}
            {social.youtube && <a href={social.youtube} target="_blank" rel="noreferrer" className={`block text-sm font-light ${body} hover:text-gold-light`}>YouTube</a>}
            {social.whatsapp && <a href={social.whatsapp} target="_blank" rel="noreferrer" className={`block text-sm font-light ${body} hover:text-gold-light`}>WhatsApp</a>}
            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noreferrer" className={`block text-sm font-light ${body} hover:text-gold-light`}>LinkedIn</a>}
          </div>
        </div>
        <div className={`mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-[0.62rem] uppercase tracking-[0.28em] ${muted} sm:flex-row`}>
          <span>© {new Date().getFullYear()} {c.hotelName}, {c.town}</span>
          <span>{c.website}</span>
        </div>
      </div>
    </footer>
  )
}
