import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCms } from '@/cms/store'
import type { EmbedPlatform, FeedAccount } from '@/cms/types'
import { parseAccount, youtubeRss, youtubeUploadsEmbed } from '@/lib/feedAccount'

const LABEL: Record<EmbedPlatform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X',
}

type YtVideo = { id: string; title: string; link: string; thumb: string }

function YouTubeLive({ account }: { account: FeedAccount }) {
  const [videos, setVideos] = useState<YtVideo[]>([])
  const [failed, setFailed] = useState(false)
  const rss = youtubeRss(account)
  const playlist = youtubeUploadsEmbed(account)
  const parsed = parseAccount('youtube', account.handle)

  useEffect(() => {
    if (!rss) return
    let cancel = false
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (cancel) return
        const items = (data?.items || []).slice(0, 8).map((item: { guid?: string; title?: string; link?: string; thumbnail?: string }) => {
          const id = (item.guid || item.link || '').split('v=')[1] || (item.link || '').split('/').pop() || ''
          return { id, title: item.title || 'Video', link: item.link || '', thumb: item.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }
        })
        if (!items.length) setFailed(true)
        setVideos(items)
      })
      .catch(() => { if (!cancel) setFailed(true) })
    return () => { cancel = true }
  }, [rss])

  if (playlist && (failed || !rss)) {
    return (
      <iframe title={account.label || 'YouTube'} src={playlist} className="h-[420px] w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    )
  }

  if (!videos.length) {
    return (
      <a href={parsed?.href} target="_blank" rel="noreferrer" className="flex h-48 items-center justify-center text-sm text-ink/50">Opening channel feed…</a>
    )
  }

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-4">
      {videos.map((v, i) => (
        <motion.a key={v.id || i} href={v.link} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="w-56 shrink-0">
          <div className="relative aspect-video overflow-hidden bg-slate-200">
            <img src={v.thumb} alt="" className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center text-3xl text-white/90">▶</span>
          </div>
          <p className="mt-2 line-clamp-2 text-xs font-light text-ink/80">{v.title}</p>
        </motion.a>
      ))}
    </div>
  )
}

function AccountFeed({ account }: { account: FeedAccount }) {
  const parsed = parseAccount(account.platform, account.handle)
  if (!parsed) return null
  return (
    <motion.article initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }} className="overflow-hidden border border-ink/10 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-ink/5 px-4 py-3">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold">{LABEL[account.platform]}</p>
          <p className="text-sm text-ink">{account.label || parsed.handle}</p>
        </div>
        <a href={parsed.href} target="_blank" rel="noreferrer" className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">Profile ↗</a>
      </div>
      {account.platform === 'youtube' && <YouTubeLive account={account} />}
      {account.platform === 'facebook' && (
        <iframe title={account.label || 'Facebook'} src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(parsed.href)}&tabs=timeline&width=500&height=520&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`} className="h-[520px] w-full border-0" loading="lazy" allow="encrypted-media" />
      )}
      {account.platform === 'twitter' && (
        <iframe title={account.label || 'X'} src={`https://syndication.twitter.com/srv/timeline-profile/screen-name/${encodeURIComponent(parsed.handle)}`} className="h-[520px] w-full border-0" loading="lazy" />
      )}
      {account.platform === 'instagram' && (
        <div className="space-y-3 p-4">
          <iframe title={account.label || 'Instagram'} src={`https://www.instagram.com/${encodeURIComponent(parsed.handle)}/embed`} className="h-[420px] w-full border-0" loading="lazy" />
          <p className="text-center text-[0.7rem] font-light text-ink/45">Instagram public profile embed. Naye posts usi account se aate hain jab platform allow kare.</p>
        </div>
      )}
    </motion.article>
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
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {accounts.map((account) => (
            <AccountFeed key={account.id} account={account} />
          ))}
        </div>
      </div>
    </section>
  )
}
