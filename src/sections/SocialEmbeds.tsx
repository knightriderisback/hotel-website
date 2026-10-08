import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useCms } from '@/cms/store'
import type { EmbedItem, EmbedPlatform, FeedAccount } from '@/cms/types'
import { parseAccount, parsePostUrl } from '@/lib/feedAccount'

const LABEL: Record<EmbedPlatform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X',
}

function IgProfileCard({ account }: { account: FeedAccount }) {
  const parsed = parseAccount('instagram', account.handle)
  if (!parsed) return null
  const name = account.label || parsed.handle
  const initial = name.slice(0, 1).toUpperCase()

  return (
    <motion.a
      href={parsed.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group mx-auto block w-[280px] shrink-0"
    >
      <div className="overflow-hidden rounded-[2rem] border-[6px] border-zinc-900 bg-black shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between bg-black px-4 pt-2 text-[10px] text-white">
          <span>9:41</span>
          <div className="flex gap-1 opacity-80">
            <span>WiFi</span>
            <span>100%</span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-black px-3 py-2 text-white">
          <span className="text-lg font-semibold tracking-tight">{parsed.handle}</span>
          <span className="text-xl leading-none">...</span>
        </div>
        <div className="bg-black px-4 pb-3 pt-1 text-white">
          <div className="flex items-center gap-4">
            <div className="relative h-[74px] w-[74px] shrink-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[3px]">
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-black bg-zinc-800 text-2xl font-semibold">
                {initial}
              </div>
            </div>
            <div className="flex flex-1 justify-around text-center text-[13px]">
              <div>
                <p className="text-base font-semibold">—</p>
                <p className="text-[11px] text-white/70">posts</p>
              </div>
              <div>
                <p className="text-base font-semibold">—</p>
                <p className="text-[11px] text-white/70">followers</p>
              </div>
              <div>
                <p className="text-base font-semibold">—</p>
                <p className="text-[11px] text-white/70">following</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] font-semibold">{name}</p>
          <p className="text-[12px] leading-snug text-white/75">View full profile on Instagram</p>
          <div className="mt-3 flex gap-1.5">
            <span className="flex-1 rounded-lg bg-[#0095f6] py-1.5 text-center text-[12px] font-semibold text-white group-hover:bg-[#1877f2]">
              Follow
            </span>
            <span className="flex-1 rounded-lg bg-zinc-800 py-1.5 text-center text-[12px] font-semibold text-white">Message</span>
            <span className="rounded-lg bg-zinc-800 px-2.5 py-1.5 text-[12px] text-white">v</span>
          </div>
        </div>
        <div className="flex border-t border-white/10 bg-black text-center text-white/50">
          {['Grid', 'Reels', 'Tagged'].map((lab, i) => (
            <span key={lab} className={`flex-1 py-2 text-[11px] ${i === 0 ? 'border-t-2 border-white text-white' : ''}`}>{lab}</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-[1px] bg-zinc-900">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900" style={{ opacity: 0.85 - i * 0.08 }} />
          ))}
        </div>
        <div className="flex justify-around bg-black py-2.5 text-sm text-white">
          <span>Home</span>
          <span>Search</span>
          <span>+</span>
          <span>Reels</span>
          <span className="inline-block h-5 w-5 rounded-full bg-zinc-600" />
        </div>
      </div>
      <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.2em] text-ink/45">Instagram profile</p>
    </motion.a>
  )
}

function IgPostCard({ item }: { item: EmbedItem }) {
  const parsed = parsePostUrl('instagram', item.url)
  const href = parsed?.href || item.url
  const title = item.title || 'Instagram post'

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="block w-[300px] shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg shadow-black/10"
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px]">
          <div className="h-full w-full rounded-full border border-white bg-zinc-200" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-zinc-900">{title.slice(0, 28)}</p>
          <p className="text-[11px] text-zinc-500">Instagram · Tap to open</p>
        </div>
        <span className="text-zinc-400">...</span>
      </div>
      <div className="relative aspect-square bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400">
          <span className="text-4xl">{parsed?.isShort ? 'Play' : 'Photo'}</span>
          <span className="text-[11px] uppercase tracking-wider">{parsed?.isShort ? 'Reel' : 'Post'}</span>
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
          Open on Instagram
        </div>
      </div>
      <div className="flex items-center gap-4 px-3 py-2.5 text-[13px] text-zinc-800">
        <span>Like</span>
        <span>Comment</span>
        <span>Share</span>
        <span className="ml-auto">Save</span>
      </div>
      <div className="px-3 pb-3">
        <p className="text-[12px] leading-snug text-zinc-700">{title}</p>
      </div>
    </motion.a>
  )
}

function YtShortsCard({ item }: { item: EmbedItem }) {
  const parsed = parsePostUrl('youtube', item.url)
  if (!parsed?.embedUrl) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer" className="text-sm text-gold underline">
        {item.title || item.url}
      </a>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto w-[260px] shrink-0"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border-[5px] border-zinc-900 bg-black shadow-2xl shadow-black/50">
        <div className="absolute left-0 right-0 top-0 z-20 flex justify-between px-3 pt-2 text-[9px] text-white/90">
          <span>9:41</span>
          <span>Shorts</span>
          <span>WiFi</span>
        </div>
        <div className="relative aspect-[9/16] bg-black">
          <iframe
            title={item.title || 'YouTube Short'}
            src={parsed.embedUrl}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="pointer-events-none absolute bottom-20 right-2 z-10 flex flex-col items-center gap-3 text-white drop-shadow-lg">
            {['Like', 'Dislike', 'Chat', 'Share', 'Remix'].map((lab) => (
              <div key={lab} className="flex flex-col items-center">
                <span className="text-[10px] opacity-90">{lab}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-12 z-10 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10">
            <p className="line-clamp-2 text-[12px] font-medium text-white">{item.title || 'YouTube Short'}</p>
            <p className="mt-1 text-[10px] text-white/70">@channel · Shorts</p>
          </div>
        </div>
      </div>
      <a
        href={parsed.href}
        target="_blank"
        rel="noreferrer"
        className="mt-2 block text-center text-[0.65rem] uppercase tracking-[0.2em] text-ink/45 hover:text-gold"
      >
        Open on YouTube
      </a>
    </motion.div>
  )
}

function YtChannelCard({ account }: { account: FeedAccount }) {
  const parsed = parseAccount('youtube', account.handle)
  if (!parsed) return null
  const isUc = parsed.handle.startsWith('UC')
  const shortsSearch = isUc
    ? `https://www.youtube.com/channel/${parsed.handle}/shorts`
    : `https://www.youtube.com/@${parsed.handle}/shorts`

  return (
    <motion.a
      href={shortsSearch}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group mx-auto block w-[260px] shrink-0"
    >
      <div className="overflow-hidden rounded-[1.75rem] border-[5px] border-zinc-900 bg-zinc-950 shadow-2xl">
        <div className="aspect-[9/16] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-4 text-white">
          <div className="flex items-center justify-between text-[10px] text-white/70">
            <span>Shorts</span>
            <span>...</span>
          </div>
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-2xl font-bold shadow-lg shadow-red-900/40">
              Play
            </div>
            <p className="mt-4 text-lg font-semibold">{account.label || parsed.handle}</p>
            <p className="mt-1 text-xs text-white/60">YouTube channel</p>
            <span className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 group-hover:bg-red-600 group-hover:text-white">
              View Shorts
            </span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.2em] text-ink/45">YouTube profile</p>
    </motion.a>
  )
}

function GenericProfileCard({ account }: { account: FeedAccount }) {
  const parsed = parseAccount(account.platform, account.handle)
  if (!parsed) return null
  return (
    <motion.a
      href={parsed.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex w-[240px] shrink-0 flex-col items-center rounded-2xl border border-ink/10 bg-white p-6 shadow-md"
    >
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">{LABEL[account.platform]}</span>
      <p className="mt-2 font-serif text-xl text-ink">{account.label || parsed.handle}</p>
      <span className="mt-4 rounded-full bg-ink px-4 py-1.5 text-xs text-cream">Open profile</span>
    </motion.a>
  )
}

function GenericPostCard({ item }: { item: EmbedItem }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="block w-[260px] shrink-0 rounded-xl border border-ink/10 bg-white p-4 shadow-md"
    >
      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">{LABEL[item.platform]}</p>
      <p className="mt-2 line-clamp-3 text-sm text-ink">{item.title || item.url}</p>
      <span className="mt-3 inline-block text-xs text-gold">Open</span>
    </motion.a>
  )
}

function Rail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const slide = (d: number) => ref.current?.scrollBy({ left: d * 280, behavior: 'smooth' })
  return (
    <div className="relative">
      <button type="button" aria-label="Prev" onClick={() => slide(-1)} className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream md:flex">‹</button>
      <button type="button" aria-label="Next" onClick={() => slide(1)} className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream md:flex">›</button>
      <div ref={ref} className="flex gap-5 overflow-x-auto scroll-smooth px-1 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  )
}

export default function SocialEmbeds() {
  const { data } = useCms()
  const e = data.embeds
  const accounts = e?.accounts || []
  const items = e?.items || []
  if (!e?.enabled || (!accounts.length && !items.length)) return null

  return (
    <section id="social" className="overflow-hidden bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          {e.eyebrow && <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">{e.eyebrow}</p>}
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">{e.title}</h2>
          {e.intro && <p className="mt-4 text-sm font-light leading-relaxed text-ink/70 md:text-base">{e.intro}</p>}
        </motion.div>

        {accounts.length > 0 && (
          <div className="mt-12">
            <p className="mb-4 text-center text-[0.62rem] uppercase tracking-[0.32em] text-ink/40">Profiles</p>
            <Rail>
              {accounts.map((a) => {
                if (a.platform === 'instagram') return <IgProfileCard key={a.id} account={a} />
                if (a.platform === 'youtube') return <YtChannelCard key={a.id} account={a} />
                return <GenericProfileCard key={a.id} account={a} />
              })}
            </Rail>
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-14">
            <p className="mb-4 text-center text-[0.62rem] uppercase tracking-[0.32em] text-ink/40">Posts & Shorts</p>
            <Rail>
              {items.map((item) => {
                if (item.platform === 'instagram') return <IgPostCard key={item.id} item={item} />
                if (item.platform === 'youtube') return <YtShortsCard key={item.id} item={item} />
                return <GenericPostCard key={item.id} item={item} />
              })}
            </Rail>
          </div>
        )}
      </div>
    </section>
  )
}
