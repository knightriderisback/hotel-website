import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useCms } from '@/cms/store'
import type { EmbedItem, FeedAccount } from '@/cms/types'
import { parseAccount, parsePostUrl } from '@/lib/feedAccount'

function useInstagramEmbed(deps: unknown) {
  useEffect(() => {
    const run = () => {
      const w = window as unknown as { instgrm?: { Embeds: { process: () => void } } }
      w.instgrm?.Embeds?.process()
    }
    let s = document.getElementById('ig-embed-js') as HTMLScriptElement | null
    if (!s) {
      s = document.createElement('script')
      s.id = 'ig-embed-js'
      s.async = true
      s.src = 'https://www.instagram.com/embed.js'
      s.onload = run
      document.body.appendChild(s)
    } else {
      run()
      const t = window.setTimeout(run, 400)
      return () => window.clearTimeout(t)
    }
  }, [deps])
}

function Rail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const slide = (d: number) => ref.current?.scrollBy({ left: d * 320, behavior: 'smooth' })
  return (
    <div className="relative">
      <button type="button" aria-label="Prev" onClick={() => slide(-1)} className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream md:flex">‹</button>
      <button type="button" aria-label="Next" onClick={() => slide(1)} className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream md:flex">›</button>
      <div ref={ref} className="flex gap-5 overflow-x-auto scroll-smooth px-1 pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
    </div>
  )
}

function IgLivePost({ item }: { item: EmbedItem }) {
  const parsed = parsePostUrl('instagram', item.url)
  const href = (parsed?.href || item.url).replace(/\?.*$/, '')
  useInstagramEmbed(href)
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[328px] shrink-0 overflow-hidden rounded-xl bg-white shadow-lg shadow-black/10">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={href}
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, margin: 0, maxWidth: '540px', minWidth: '280px', padding: 0, width: '100%' }}
      >
        <a href={href} target="_blank" rel="noreferrer">{item.title || 'View on Instagram'}</a>
      </blockquote>
    </motion.div>
  )
}

function IgLiveProfile({ account }: { account: FeedAccount }) {
  const parsed = parseAccount('instagram', account.handle)
  if (!parsed) return null
  const href = parsed.href
  useInstagramEmbed(href)
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[328px] shrink-0 overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="border-b border-zinc-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        @{parsed.handle} · Instagram
      </div>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={href}
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, margin: 0, maxWidth: '540px', minWidth: '280px', padding: 0, width: '100%' }}
      >
        <a href={href} target="_blank" rel="noreferrer">@{parsed.handle}</a>
      </blockquote>
    </motion.div>
  )
}

function YtLiveVideo({ item }: { item: EmbedItem }) {
  const parsed = parsePostUrl('youtube', item.url)
  if (!parsed?.embedUrl) {
    return (
      <a href={item.url} className="text-sm text-gold underline" target="_blank" rel="noreferrer">{item.title || item.url}</a>
    )
  }
  const isShort = !!parsed.isShort || /shorts/i.test(item.url)
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={isShort ? 'w-[260px] shrink-0' : 'w-[min(100%,360px)] shrink-0 sm:w-[360px]'}>
      <div className={isShort ? 'relative overflow-hidden rounded-[1.6rem] border-[5px] border-zinc-900 bg-black shadow-2xl' : 'overflow-hidden rounded-xl border border-ink/10 bg-black shadow-lg'}>
        {isShort && (
          <div className="absolute left-0 right-0 top-0 z-10 flex justify-between px-3 pt-2 text-[9px] text-white/90">
            <span>Shorts</span>
            <span>Live</span>
          </div>
        )}
        <div className={isShort ? 'relative aspect-[9/16]' : 'relative aspect-video'}>
          <iframe
            title={item.title || 'YouTube'}
            src={parsed.embedUrl}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
      {item.title && <p className="mt-2 line-clamp-2 text-center text-sm font-light text-ink">{item.title}</p>}
    </motion.div>
  )
}

function YtLiveChannel({ account }: { account: FeedAccount }) {
  const parsed = parseAccount('youtube', account.handle)
  if (!parsed) return null
  const isUc = parsed.handle.startsWith('UC')
  const listId = isUc ? 'UU' + parsed.handle.slice(2) : null
  const embed = listId ? `https://www.youtube.com/embed/videoseries?list=${listId}&rel=0` : null
  const channelUrl = isUc ? `https://www.youtube.com/channel/${parsed.handle}` : `https://www.youtube.com/@${parsed.handle}`
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-[min(100%,420px)] shrink-0 sm:w-[420px]">
      <div className="overflow-hidden rounded-xl border border-ink/10 bg-black shadow-lg">
        <div className="flex items-center justify-between bg-zinc-900 px-3 py-2 text-xs text-white">
          <span className="font-medium">{account.label || parsed.handle}</span>
          <a href={channelUrl} target="_blank" rel="noreferrer" className="text-red-400 hover:underline">Channel</a>
        </div>
        {embed ? (
          <div className="relative aspect-video">
            <iframe title={account.label || 'YouTube channel'} src={embed} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
          </div>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-zinc-950 p-6 text-center text-white">
            <p className="text-sm text-white/70">Channel embed ke liye UC… ID chahiye</p>
            <a href={channelUrl} target="_blank" rel="noreferrer" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold">Open channel</a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-5 text-center">
      <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold">{kicker}</p>
      <h3 className="mt-1 font-serif text-2xl font-light text-ink">{title}</h3>
    </div>
  )
}

function IgProcessTrigger({ signal }: { signal: string }) {
  useInstagramEmbed(signal)
  return null
}

export default function SocialEmbeds() {
  const { data } = useCms()
  const e = data.embeds
  const accounts = e?.accounts || []
  const items = e?.items || []
  if (!e?.enabled || (!accounts.length && !items.length)) return null

  const igProfiles = accounts.filter((a) => a.platform === 'instagram')
  const ytProfiles = accounts.filter((a) => a.platform === 'youtube')
  const otherProfiles = accounts.filter((a) => a.platform !== 'instagram' && a.platform !== 'youtube')
  const igPosts = items.filter((i) => i.platform === 'instagram')
  const ytPosts = items.filter((i) => i.platform === 'youtube')
  const otherPosts = items.filter((i) => i.platform !== 'instagram' && i.platform !== 'youtube')
  const igKey = igPosts.map((i) => i.url).join('|') + igProfiles.map((a) => a.handle).join('|')

  return (
    <section id="social" className="overflow-hidden bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          {e.eyebrow && <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">{e.eyebrow}</p>}
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">{e.title}</h2>
          {e.intro && <p className="mt-4 text-sm font-light leading-relaxed text-ink/70 md:text-base">{e.intro}</p>}
        </motion.div>

        {(igProfiles.length > 0 || igPosts.length > 0) && (
          <div className="mt-14">
            <SectionTitle kicker="Instagram" title="Live on Instagram" />
            <Rail>
              {igProfiles.map((a) => (
                <IgLiveProfile key={a.id} account={a} />
              ))}
              {igPosts.map((item) => (
                <IgLivePost key={item.id} item={item} />
              ))}
            </Rail>
            <IgProcessTrigger signal={igKey} />
          </div>
        )}

        {(ytProfiles.length > 0 || ytPosts.length > 0) && (
          <div className="mt-16">
            <SectionTitle kicker="YouTube" title="Videos & Shorts" />
            {ytProfiles.length > 0 && (
              <div className="mb-8">
                <p className="mb-3 text-center text-[0.6rem] uppercase tracking-[0.28em] text-ink/40">Channels</p>
                <Rail>
                  {ytProfiles.map((a) => (
                    <YtLiveChannel key={a.id} account={a} />
                  ))}
                </Rail>
              </div>
            )}
            {ytPosts.length > 0 && (
              <div>
                <p className="mb-3 text-center text-[0.6rem] uppercase tracking-[0.28em] text-ink/40">Videos & Shorts</p>
                <Rail>
                  {ytPosts.map((item) => (
                    <YtLiveVideo key={item.id} item={item} />
                  ))}
                </Rail>
              </div>
            )}
          </div>
        )}

        {(otherProfiles.length > 0 || otherPosts.length > 0) && (
          <div className="mt-16">
            <SectionTitle kicker="More" title="Other social" />
            <Rail>
              {otherProfiles.map((a) => {
                const p = parseAccount(a.platform, a.handle)
                if (!p) return null
                return (
                  <a key={a.id} href={p.href} target="_blank" rel="noreferrer" className="flex w-[240px] shrink-0 flex-col items-center rounded-2xl border border-ink/10 bg-white p-6 shadow-md">
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">{a.platform}</span>
                    <p className="mt-2 font-serif text-xl text-ink">{a.label || p.handle}</p>
                    <span className="mt-4 rounded-full bg-ink px-4 py-1.5 text-xs text-cream">Open</span>
                  </a>
                )
              })}
              {otherPosts.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="block w-[260px] shrink-0 rounded-xl border border-ink/10 bg-white p-4 shadow-md">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">{item.platform}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-ink">{item.title || item.url}</p>
                </a>
              ))}
            </Rail>
          </div>
        )}
      </div>
    </section>
  )
}
