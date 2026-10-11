import Media from '@/components/Media'
import Reveal from '@/components/Reveal'
import { useCms } from '@/cms/store'

export default function Dining() {
  const { data } = useCms()
  const c = data.content

  return (
    <section id="dining" className="relative overflow-hidden bg-cream py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal className="relative aspect-[4/5] overflow-hidden shadow-xl lg:aspect-[5/6]">
          <Media src={data.images.restaurant} alt="Restaurant" className="absolute inset-0 h-full w-full" />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="eyebrow text-gold">{c.diningEyebrow}</p>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-ink lg:text-6xl">{c.diningTitle}</h2>
          <p className="mt-8 text-base font-light leading-[1.9] text-ink/75">{c.diningBody}</p>
        </Reveal>
      </div>
    </section>
  )
}
