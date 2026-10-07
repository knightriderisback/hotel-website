import Reveal from '@/components/Reveal'

const ITEMS = [
  { src: 'https://steelcity.kimi.page/images/hero-exterior.jpg', caption: 'The hotel at dusk' },
  { src: 'https://steelcity.kimi.page/images/room-executive.jpg', caption: 'Executive Suite' },
  { src: 'https://steelcity.kimi.page/images/cuisine.jpg', caption: 'Pure veg thali', portrait: true },
  { src: 'https://steelcity.kimi.page/images/restaurant.jpg', caption: 'City Lights restaurant' },
  { src: 'https://steelcity.kimi.page/images/room-deluxe.jpg', caption: 'Deluxe Room' },
  { src: 'https://steelcity.kimi.page/images/banquet.jpg', caption: 'Banquets & celebrations' },
  { src: 'https://steelcity.kimi.page/images/hero-lobby.jpg', caption: 'The lobby' },
  { src: 'https://steelcity.kimi.page/images/room-family.jpg', caption: 'Family Room' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="overflow-hidden bg-navy py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-gold-light">Gallery</p>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-cream lg:text-6xl">A look inside</h2>
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-cream/50">Scroll sideways →</p>
        </Reveal>
      </div>
      <Reveal y={30}>
        <div className="gallery-track px-6 lg:px-10">
          {ITEMS.map((it) => (
            <figure key={it.src + it.caption} className="img-zoom relative">
              <img src={it.src} alt={it.caption} className={`object-cover ${it.portrait ? 'h-[440px] w-[300px]' : 'h-[440px] w-[560px]'}`} />
              <figcaption className="absolute bottom-0 left-0 bg-navy-deep/70 px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-cream/85 backdrop-blur-sm">{it.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
