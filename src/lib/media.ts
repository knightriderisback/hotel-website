/** Detect image vs video from URL or data: URI */
export function isVideoSrc(src?: string | null): boolean {
  if (!src) return false
  const s = src.trim().toLowerCase()
  if (s.startsWith('data:video/')) return true
  if (s.startsWith('data:image/')) return false
  const path = s.split('?')[0].split('#')[0]
  return /\.(mp4|webm|ogg|ogv|mov|m4v|avi|mkv)(\s|$)/i.test(path)
}

export function isImageSrc(src?: string | null): boolean {
  if (!src) return false
  if (isVideoSrc(src)) return false
  const s = src.trim().toLowerCase()
  if (s.startsWith('data:image/')) return true
  if (s.startsWith('data:')) return false
  const path = s.split('?')[0].split('#')[0]
  if (/\.(jpe?g|png|gif|webp|avif|svg|bmp)(\s|$)/i.test(path)) return true
  return true
}
