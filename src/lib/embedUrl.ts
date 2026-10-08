import type { EmbedPlatform } from '@/cms/types'

/** Convert a public post/video URL into an iframe-friendly embed URL. */
export function toEmbedSrc(platform: EmbedPlatform, url: string): string | null {
  const u = url.trim()
  if (!u) return null

  try {
    if (platform === 'youtube') {
      const short = u.match(/youtu\.be\/([\w-]{6,})/i)
      if (short) return `https://www.youtube.com/embed/${short[1]}`
      const watch = u.match(/[?&]v=([\w-]{6,})/i)
      if (watch) return `https://www.youtube.com/embed/${watch[1]}`
      const embed = u.match(/youtube\.com\/embed\/([\w-]{6,})/i)
      if (embed) return `https://www.youtube.com/embed/${embed[1]}`
      const shorts = u.match(/youtube\.com\/shorts\/([\w-]{6,})/i)
      if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`
      return null
    }

    if (platform === 'instagram') {
      const m = u.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/i)
      if (m) return `https://www.instagram.com/${m[1]}/${m[2]}/embed`
      if (u.includes('/embed')) return u
      return null
    }

    if (platform === 'facebook') {
      const encoded = encodeURIComponent(u.split('?')[0])
      return `https://www.facebook.com/plugins/post.php?href=${encoded}&show_text=true&width=500`
    }

    if (platform === 'twitter') {
      const m = u.match(/(?:twitter|x)\.com\/\w+\/status\/(\d+)/i)
      if (m) return `https://platform.twitter.com/embed/Tweet.html?id=${m[1]}`
      return null
    }
  } catch {
    return null
  }
  return null
}

export function detectPlatform(url: string): EmbedPlatform | null {
  const u = url.toLowerCase()
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube'
  if (u.includes('instagram.com')) return 'instagram'
  if (u.includes('facebook.com') || u.includes('fb.watch')) return 'facebook'
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter'
  return null
}
