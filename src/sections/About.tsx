import Reveal from '@/components/Reveal'
import { useCms } from '@/cms/store'

export default function About() {
  const { data } = useCms()
  const c = data.content
  const img = data.images
  return (
    <section className="relative overflow-hidden bg-cream py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-gold">{c.aboutEyebrow}</p>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-ink lg:text-6xl">{c.aboutTitle}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 text-base font-light leading-[1.9] text-ink/75">{c.aboutP1}</p>
            <p className="mt-6 text-base font-light leading-[1.9] text-ink/75">{c.aboutP2}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex items-center gap-10">
              <div>
                <p className="font-display text-5xl font-light text-gold">{c.rating}</p>
                <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-ink/55">{c.ratingSource} Rating</p>
              </div>
              <div className="h-12 w-px bg-gold/40" />
              <div>
                <p className="font-display text-5xl font-light text-gold">{c.reviewCount}</p>
                <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-ink/55">Guest Reviews</p>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.2} className="relative">
            <div className="frame-gold img-zoom relative z-10 ml-auto aspect-[4/5] max-w-md lg:mr-16">
              <img src={img.aboutLobby} alt="Lobby" className="h-full w-full object-cover" />
            </div>
            <div className="img-zoom absolute -bottom-12 left-0 z-20 hidden aspect-[4/3] w-72 shadow-2xl sm:block lg:-left-4 lg:w-96">
              <img src={img.aboutCuisine} alt="Cuisine" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
