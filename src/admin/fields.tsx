import { type ChangeEvent } from 'react'

export function Field({ label, value, onChange, multiline, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-600" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-600" />
      )}
    </label>
  )
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2_500_000) { alert('Max 2.5MB'); return }
    const reader = new FileReader()
    reader.onload = () => onChange(String(reader.result || ''))
    reader.readAsDataURL(file)
  }
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      {value ? <img src={value} alt="" className="mt-2 h-24 w-full rounded object-cover" /> : <div className="mt-2 flex h-24 items-center justify-center rounded bg-slate-100 text-xs text-slate-400">No image</div>}
      <input type="url" placeholder="Image URL" value={value.startsWith('data:') ? '' : value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded border px-2 py-1.5 text-sm" />
      <input type="file" accept="image/*" onChange={onFile} className="mt-1 block w-full text-xs" />
    </div>
  )
}
