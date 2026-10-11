import { isVideoSrc } from '@/lib/media'

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
  if (!src) return null
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        className={`${fitClass} ${className}`.trim()}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
      />
    )
  }

  return <img src={src} alt={alt} className={`${fitClass} ${className}`.trim()} loading="lazy" />
}
