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
    if (!handle || ['p', 'reel', 'tv', 'explore'].includes(handle)) return null
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
