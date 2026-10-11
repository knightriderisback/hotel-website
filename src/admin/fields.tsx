import { type ChangeEvent, useEffect, useState } from 'react'
import { isVideoSrc } from '@/lib/media'
import { deleteMediaBlob, isIdbSrc, resolveMedia, saveMediaBlob } from '@/lib/mediaStore'

export function Field({
  label,
  value,
  onChange,
  multiline,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  type?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-600"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-600"
        />
      )}
    </label>
  )
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [previewVideo, setPreviewVideo] = useState(false)

  useEffect(() => {
    let alive = true
    let revoke: (() => void) | undefined

    if (!value) {
      setPreview(null)
      setPreviewVideo(false)
      return
    }

    if (isVideoSrc(value)) setPreviewVideo(true)
    else setPreviewVideo(false)

    if (isIdbSrc(value)) {
      setPreview(null)
      resolveMedia(value)
        .then((res) => {
          if (!alive) {
            res?.revoke?.()
            return
          }
          if (!res) return
          revoke = res.revoke
          if (res.type.startsWith('video/')) setPreviewVideo(true)
          else if (res.type.startsWith('image/')) setPreviewVideo(false)
          setPreview(res.url)
        })
        .catch(() => {
          if (alive) setPreview(null)
        })
    } else {
      setPreview(value)
    }

    return () => {
      alive = false
      revoke?.()
    }
  }, [value])

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErr('')
    setBusy(true)
    try {
      const prev = value
      const ref = await saveMediaBlob(file)
      onChange(ref)
      if (prev && isIdbSrc(prev)) {
        deleteMediaBlob(prev).catch(() => {})
      }
    } catch (ex) {
      console.error(ex)
      setErr('Upload fail — browser storage blocked or full. URL paste try karo.')
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  const clear = () => {
    setErr('')
    if (value && isIdbSrc(value)) deleteMediaBlob(value).catch(() => {})
    onChange('')
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-0.5 text-[10px] text-slate-400">
        Image ya video · koi size limit nahi · auto fit · file IndexedDB mein save
      </p>
      {preview ? (
        <div className="mt-2 h-28 w-full overflow-hidden rounded bg-slate-100">
          {previewVideo ? (
            <video src={preview} className="h-full w-full object-cover" muted playsInline controls preload="metadata" />
          ) : (
            <img src={preview} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          )}
        </div>
      ) : value ? (
        <div className="mt-2 flex h-28 items-center justify-center rounded bg-slate-100 text-xs text-slate-400">
          {busy ? 'Saving…' : 'Loading preview…'}
        </div>
      ) : (
        <div className="mt-2 flex h-28 items-center justify-center rounded bg-slate-100 text-xs text-slate-400">
          No media
        </div>
      )}
      <input
        type="url"
        placeholder="Image / video URL"
        value={value.startsWith('data:') || isIdbSrc(value) ? '' : value}
        onChange={(e) => {
          setErr('')
          onChange(e.target.value)
        }}
        className="mt-2 w-full rounded border px-2 py-1.5 text-sm"
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={onFile}
        disabled={busy}
        className="mt-1 block w-full text-xs disabled:opacity-50"
      />
      {busy && <p className="mt-1 text-[11px] text-slate-500">Uploading…</p>}
      {err && <p className="mt-1 text-[11px] text-red-600">{err}</p>}
      {value && (
        <button type="button" className="mt-1 text-[11px] text-slate-500 underline" onClick={clear}>
          Clear
        </button>
      )}
    </div>
  )
}

export const MediaField = ImageField
