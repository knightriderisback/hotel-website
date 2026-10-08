import type { EmbedPlatform, FeedAccount } from '@/cms/types'

export function parseAccount(platform: EmbedPlatform, raw: string): { handle: string; href: string } | null {
  const input = raw.trim().replace(/^@/, '')
  if (!input) return null

  if (platform === 'youtube') {
    const channel = input.match(/channel\/(UC[\w-]{10,})/i)
    if (channel) return { handle: channel[1], href: `https://www.youtube.com/channel/${channel[1]}` }
    const at = input.match(/youtube\.com\/@([\w.-]+)/i)
    if (at) return { handle: at[1], href: `https://www.youtube.com/@${at[1]}` }
    if (/^UC[\w-]{10,}$/.test(input)) return { handle: input, href: `https://www.youtube.com/channel/${input}` }
    return { handle: input.replace(/^@/, ''), href: `https://www.youtube.com/@${input.replace(/^@/, '')}` }
  }

  if (platform === 'instagram') {
    const m = input.match(/instagram\.com\/([A-Za-z0-9._]+)/i)
    const handle = (m ? m[1] : input).replace(/\/$/, '')
    if (!handle || ['p', 'reel', 'tv', 'explore', 'stories'].includes(handle)) return null
    return { handle, href: `https://www.instagram.com/${handle}/` }
  }

  if (platform === 'facebook') {
    if (input.startsWith('http')) return { handle: input, href: input.split('?')[0] }
    return { handle: input, href: `https://www.facebook.com/${input}` }
  }

  const m = input.match(/(?:twitter|x)\.com\/([A-Za-z0-9_]+)/i)
  const handle = (m ? m[1] : input).replace(/^@/, '')
  if (!handle) return null
  return { handle, href: `https://x.com/${handle}` }
}

export function youtubeRss(account: FeedAccount): string | null {
  const parsed = parseAccount('youtube', account.handle)
  if (!parsed) return null
  if (parsed.handle.startsWith('UC')) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${parsed.handle}`
  }
  return null
}

export function youtubeUploadsEmbed(account: FeedAccount): string | null {
  const parsed = parseAccount('youtube', account.handle)
  if (!parsed) return null
  if (parsed.handle.startsWith('UC')) {
    const list = 'UU' + parsed.handle.slice(2)
    return `https://www.youtube.com/embed/videoseries?list=${list}`
  }
  return null
}

export function parsePostUrl(platform: EmbedPlatform, url: string): {
  id: string
  embedUrl?: string
  href: string
  isShort?: boolean
} | null {
  const raw = url.trim()
  if (!raw) return null

  if (platform === 'youtube') {
    const short = raw.match(/youtube\.com\/shorts\/([\w-]{6,})/i)
    if (short) {
      return {
        id: short[1],
        embedUrl: `https://www.youtube.com/embed/${short[1]}?playsinline=1&rel=0`,
        href: `https://www.youtube.com/shorts/${short[1]}`,
        isShort: true,
      }
    }
    const v = raw.match(/[?&]v=([\w-]{6,})/) || raw.match(/youtu\.be\/([\w-]{6,})/) || raw.match(/youtube\.com\/embed\/([\w-]{6,})/)
    if (v) {
      return {
        id: v[1],
        embedUrl: `https://www.youtube.com/embed/${v[1]}?playsinline=1&rel=0`,
        href: `https://www.youtube.com/watch?v=${v[1]}`,
        isShort: false,
      }
    }
    return null
  }

  if (platform === 'instagram') {
    const m = raw.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/i)
    if (m) {
      return {
        id: m[2],
        href: `https://www.instagram.com/${m[1]}/${m[2]}/`,
        isShort: m[1].toLowerCase() === 'reel',
      }
    }
    return null
  }

  if (platform === 'facebook') {
    if (/facebook\.com\//i.test(raw) || /fb\.watch\//i.test(raw)) {
      return { id: raw, href: raw.split('?')[0] }
    }
    return null
  }

  const t = raw.match(/(?:twitter|x)\.com\/\w+\/status\/(\d+)/i)
  if (t) return { id: t[1], href: raw.split('?')[0] }
  return null
}

export function detectPlatformFromUrl(url: string): EmbedPlatform | null {
  const u = url.toLowerCase()
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube'
  if (u.includes('instagram.com')) return 'instagram'
  if (u.includes('facebook.com') || u.includes('fb.watch')) return 'facebook'
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter'
  return null
}
