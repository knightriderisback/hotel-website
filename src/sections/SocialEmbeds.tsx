import { useCms } from '@/cms/store'
import { toEmbedSrc } from '@/lib/embedUrl'
import type { EmbedPlatform } from '@/cms/types'

const PLATFORM_LABEL: Record<EmbedPlatform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X / Twitter',
}

export default function SocialEmbeds() {
  const { data } = useCms()
  const e = data.embeds
  if (!e?.enabled || !e.items?.length) return null

  return (
    <section id="social" className="bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {e.eyebrow && (
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">{e.eyebrow}</p>
          )}
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">{e.title}</h2>
          {e.intro && (
            <p className="mt-4 text-sm font-light leading-relaxed text-ink/70 md:text-base">
              {e.intro}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {e.items.map((item) => {
            const src = toEmbedSrc(item.platform, item.url)
            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-ink/5 px-4 py-2.5">
                  <span className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">
                    {PLATFORM_LABEL[item.platform]}
                  </span>
                  {item.title && (
                    <span className="truncate pl-3 text-xs font-light text-ink/60">{item.title}</span>
                  )}
                </div>
                <div className="relative aspect-[4/5] w-full bg-slate-100 sm:aspect-square">
                  {src ? (
                    <iframe
                      title={item.title || PLATFORM_LABEL[item.platform]}
                      src={src}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center text-sm text-ink/50">
                      Invalid or unsupported URL
                    </div>
                  )}
                </div>
                <div className="border-t border-ink/5 px-4 py-2 text-right">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.65rem] uppercase tracking-[0.2em] text-gold hover:text-ink"
                  >
                    Open ↗
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
