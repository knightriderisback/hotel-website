import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useCms } from '@/cms/store'
import type { EmbedPlatform, FeedAccount } from '@/cms/types'
import { parseAccount, youtubeRss } from '@/lib/feedAccount'

const LABEL: Record<EmbedPlatform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X',
}

type Card = { id: string; title: string; link: string; thumb: string; platform: EmbedPlatform }

function useYouTubeCards(account: FeedAccount): { cards: Card[]; status: 'loading' | 'ready' | 'need-id' | 'empty' } {
  const [cards, setCards] = useState<Card[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'need-id' | 'empty'>('loading')
  const rss = account.platform === 'youtube' ? youtubeRss(account) : null

  useEffect(() => {
    if (account.platform !== 'youtube') return
    if (!rss) {
      setStatus('need-id')
      return
    }
    let cancel = false
    setStatus('loading')
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancel) return
        const items = (data?.items || []).slice(0, 15).map((item: { guid?: string; title?: string; link?: string; thumbnail?: string }) => {
          const id = ((item.link || '').split('v=')[1] || '').split('&')[0] || item.guid || item.link || ''
          return {
            id,
            title: item.title || 'Video',
            link: item.link || `https://www.youtube.com/watch?v=${id}`,
            thumb: item.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            platform: 'youtube' as const,
          }
        })
        setCards(items)
        setStatus(items.length ? 'ready' : 'empty')
      })
      .catch(() => { if (!cancel) setStatus('empty') })
    return () => { cancel = true }
  }, [rss, account.platform])

  return { cards, status }
}

function CardRail({ cards, label }: { cards: Card[]; label: string }) {
  const scroller = useRef<HTMLDivElement>(null)
  const slide = (dir: number) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button type="button" aria-label="Previous" onClick={() => slide(-1)} className="absolute left-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream md:flex">‹</button>
      <button type="button" aria-label="Next" onClick={() => slide(1)} className="absolute right-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream md:flex">›</button>
      <div ref={scroller} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card, i) => (
          <motion.a
            key={card.id || i}
            href={card.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 6) * 0.05 }}
            className="w-[78%] shrink-0 snap-center overflow-hidden border border-ink/10 bg-white shadow-sm sm:w-[46%] lg:w-[31%]"
          >
            <div className="relative aspect-[4/5] bg-slate-200 sm:aspect-video">
              <img src={card.thumb} alt="" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3 bg-ink/75 px-2 py-1 text-[0.58rem] uppercase tracking-[0.22em] text-cream">{label}</span>
              {card.platform === 'youtube' && (
                <span className="absolute inset-0 flex items-center justify-center text-4xl text-white/90">▶</span>
              )}
            </div>
            <p className="line-clamp-2 px-3 py-3 text-sm font-light text-ink">{card.title}</p>
          </motion.a>
        ))}
      </div>
      <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.22em] text-ink/40">Slide to see posts</p>
    </div>
  )
}

function AccountRow({ account }: { account: FeedAccount }) {
  const parsed = parseAccount(account.platform, account.handle)
  const yt = useYouTubeCards(account)
  if (!parsed) return null
  const showCards = account.platform === 'youtube' && yt.status === 'ready'

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold">{LABEL[account.platform]}</p>
          <h3 className="font-serif text-2xl font-light text-ink">{account.label || parsed.handle}</h3>
        </div>
        <a href={parsed.href} target="_blank" rel="noreferrer" className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">Open ↗</a>
      </div>
      {showCards && <CardRail cards={yt.cards} label={LABEL[account.platform]} />}
      {account.platform === 'youtube' && yt.status === 'need-id' && (
        <p className="text-sm text-ink/60">YouTube channel ID chahiye (youtube.com/channel/UC…) taaki saare videos cards mein aayein.</p>
      )}
      {account.platform === 'youtube' && yt.status === 'loading' && <p className="text-sm text-ink/50">Posts load ho rahe hain…</p>}
      {account.platform !== 'youtube' && (
        <p className="max-w-xl text-sm font-light text-ink/60">
          {LABEL[account.platform]} individual posts list karne ke liye unka official API token maangta hai. Bina token ke saare posts cards mein nahi aa sakte. YouTube channel (UC…) automatic card slider deta hai.
        </p>
      )}
    </div>
  )
}

export default function SocialEmbeds() {
  const { data } = useCms()
  const e = data.embeds
  const accounts = e?.accounts || []
  if (!e?.enabled || !accounts.length) return null
  return (
    <section id="social" className="overflow-hidden bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          {e.eyebrow && <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">{e.eyebrow}</p>}
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">{e.title}</h2>
          {e.intro && <p className="mt-4 text-sm font-light leading-relaxed text-ink/70 md:text-base">{e.intro}</p>}
        </motion.div>
        {accounts.map((account) => (
          <AccountRow key={account.id} account={account} />
        ))}
      </div>
    </section>
  )
}
