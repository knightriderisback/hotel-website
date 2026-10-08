import Reveal from '@/components/Reveal'
import { useCms } from '@/cms/store'

export default function Banquet() {
  const { data } = useCms()
  const c = data.content
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="img-zoom relative min-h-[70vh]">
        <img src={data.images.banquet} alt="Banquet" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy-deep/55" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
          <Reveal>
            <p className="eyebrow text-gold-light">{c.banquetEyebrow}</p>
            <h2 className="font-display mt-6 text-5xl font-light leading-[1.05] text-cream lg:text-7xl">{c.banquetTitle}</h2>
            <p className="mx-auto mt-8 max-w-xl text-base font-light leading-[1.9] text-cream/75">{c.banquetBody}</p>
            <a href={`https://wa.me/${c.receptionRaw}?text=${encodeURIComponent(`Hello ${c.hotelName}, banquet enquiry.`)}`} target="_blank" rel="noreferrer" className="btn-split mt-12">
              <span>{c.banquetCta}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
