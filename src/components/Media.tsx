import { memo, useEffect, useState } from 'react'
import { isVideoSrc } from '@/lib/media'
import { isIdbSrc, resolveMedia } from '@/lib/mediaStore'

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
  active?: boolean
}

function MediaInner({
  src,
  alt = '',
  className = '',
  fit = 'cover',
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  playsInline = true,
  active = true,
}: Props) {
  const [resolved, setResolved] = useState<string | null>(null)
  const [kind, setKind] = useState<'image' | 'video'>('image')

  useEffect(() => {
    if (!src || !active) {
      setResolved(null)
      return
    }

    let revoke: (() => void) | undefined
    let alive = true

    if (isVideoSrc(src)) setKind('video')
    else if (!isIdbSrc(src)) setKind('image')

    if (!isIdbSrc(src)) {
      setResolved(src)
      return
    }

    setResolved(null)
    resolveMedia(src)
      .then((res) => {
        if (!alive) {
          res?.revoke?.()
          return
        }
        if (!res) return
        revoke = res.revoke
        if (res.type.startsWith('video/')) setKind('video')
        else if (res.type.startsWith('image/')) setKind('image')
        setResolved(res.url)
      })
      .catch(() => {
        if (alive) setResolved(null)
      })

    return () => {
      alive = false
      revoke?.()
    }
  }, [src, active])

  if (!src || !active) return null

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'
  const cls = `${fitClass} ${className}`.trim()

  if (!resolved) {
    return <div className={`bg-black/5 ${className}`.trim()} aria-hidden />
  }

  if (kind === 'video' || isVideoSrc(src) || isVideoSrc(resolved)) {
    return (
      <video
        src={resolved}
        className={cls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        preload="metadata"
      />
    )
  }

  return <img src={resolved} alt={alt} className={cls} loading="lazy" decoding="async" />
}

export default memo(MediaInner)
