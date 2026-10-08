import Reveal from '@/components/Reveal'
import { useCms } from '@/cms/store'

export default function Gallery() {
  const { data } = useCms()
  const c = data.content
  return (
    <section id="gallery" className="overflow-hidden bg-navy py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-gold-light">{c.galleryEyebrow}</p>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-cream lg:text-6xl">{c.galleryTitle}</h2>
          </div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-cream/50">Scroll sideways →</p>
        </Reveal>
      </div>
      <Reveal y={30}>
        <div className="gallery-track px-6 lg:px-10">
          {data.images.gallery.map((it, i) => (
            <figure key={it.src + it.caption + i} className="img-zoom relative">
              <img src={it.src} alt={it.caption} className={`object-cover ${it.portrait ? 'h-[440px] w-[300px]' : 'h-[440px] w-[560px]'}`} />
              <figcaption className="absolute bottom-0 left-0 bg-navy-deep/70 px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-cream/85 backdrop-blur-sm">{it.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
