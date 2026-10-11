import { type ChangeEvent, useState } from 'react'
import { isVideoSrc } from '@/lib/media'

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

/** Image + video upload / URL. Any ratio is previewed with object-cover. */
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
  const video = isVideoSrc(value)

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErr('')
    const isVid = file.type.startsWith('video/')
    const max = isVid ? 8_000_000 : 3_500_000
    if (file.size > max) {
      setErr(
        isVid
          ? 'Video max ~8MB (local save). Badi video ke liye URL paste karo.'
          : 'Image max ~3.5MB. Badi file ke liye URL paste karo.',
      )
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange(String(reader.result || ''))
    reader.onerror = () => setErr('File read fail')
    reader.readAsDataURL(file)
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-0.5 text-[10px] text-slate-400">Image ya video · koi bhi ratio/format · auto fit</p>
      {value ? (
        <div className="mt-2 h-28 w-full overflow-hidden rounded bg-slate-100">
          {video ? (
            <video src={value} className="h-full w-full object-cover" muted playsInline controls />
          ) : (
            <img src={value} alt="" className="h-full w-full object-cover" />
          )}
        </div>
      ) : (
        <div className="mt-2 flex h-28 items-center justify-center rounded bg-slate-100 text-xs text-slate-400">
          No media
        </div>
      )}
      <input
        type="url"
        placeholder="Image / video URL"
        value={value.startsWith('data:') ? '' : value}
        onChange={(e) => {
          setErr('')
          onChange(e.target.value)
        }}
        className="mt-2 w-full rounded border px-2 py-1.5 text-sm"
      />
      <input type="file" accept="image/*,video/*" onChange={onFile} className="mt-1 block w-full text-xs" />
      {err && <p className="mt-1 text-[11px] text-red-600">{err}</p>}
      {value && (
        <button
          type="button"
          className="mt-1 text-[11px] text-slate-500 underline"
          onClick={() => {
            setErr('')
            onChange('')
          }}
        >
          Clear
        </button>
      )}
    </div>
  )
}

export const MediaField = ImageField
