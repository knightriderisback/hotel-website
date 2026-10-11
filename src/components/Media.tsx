import { useEffect, useState } from 'react'
import { isVideoSrc } from '@/lib/media'
import { isIdbSrc, resolveMediaUrl } from '@/lib/mediaStore'

type Props = {
  src?: string | null
  alt?: string
  className?: string
  fit?: 'cover' | 'contain'
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  playsInline?: boolean
}

export default function Media({
  src,
  alt = '',
  className = '',
  fit = 'cover',
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  playsInline = true,
}: Props) {
  const [resolved, setResolved] = useState<string | null>(null)
  const [kind, setKind] = useState<'image' | 'video' | 'unknown'>('unknown')

  useEffect(() => {
    let alive = true
    let blobUrl: string | null = null

    if (!src) {
      setResolved(null)
      setKind('unknown')
      return
    }

    if (isVideoSrc(src)) setKind('video')
    else if (src.startsWith('data:image/') || (!isIdbSrc(src) && !isVideoSrc(src))) setKind('image')
    else setKind('unknown')

    if (!isIdbSrc(src)) {
      setResolved(src)
      return
    }

    setResolved(null)
    resolveMediaUrl(src)
      .then(async (url) => {
        if (!alive) {
          if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
          return
        }
        blobUrl = url
        if (url?.startsWith('blob:')) {
          try {
            const blob = await fetch(url).then((r) => r.blob())
            if (!alive) return
            if (blob.type.startsWith('video/')) setKind('video')
            else if (blob.type.startsWith('image/')) setKind('image')
          } catch {
            /* keep unknown */
          }
        }
        setResolved(url)
      })
      .catch(() => {
        if (alive) setResolved(null)
      })

    return () => {
      alive = false
      if (blobUrl?.startsWith('blob:')) URL.revokeObjectURL(blobUrl)
    }
  }, [src])

  if (!src) return null

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'
  const cls = `${fitClass} ${className}`.trim()

  if (!resolved) {
    return <div className={`bg-black/5 ${className}`.trim()} aria-hidden />
  }

  const useVideo = kind === 'video' || (kind === 'unknown' && isVideoSrc(resolved))

  if (useVideo) {
    return (
      <video
        src={resolved}
        className={cls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
      />
    )
  }

  return <img src={resolved} alt={alt} className={cls} loading="lazy" />
}
