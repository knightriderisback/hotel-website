import { useState, type FormEvent } from 'react'
import { useCms } from '@/cms/store'
import { Field, ImageField } from './fields'
import { SocialPanel } from './panelsSocial'

export function ThemePanel() {
  const cms = useCms()
  const { data } = cms
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Theme</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {([['navy','Navy'],['navyDeep','Navy deep'],['gold','Gold'],['goldLight','Gold light'],['cream','Cream'],['creamSoft','Cream soft'],['ink','Ink']] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
            <input type="color" value={data.theme[key]} onChange={(e) => cms.updateTheme({ [key]: e.target.value })} className="h-10 w-12" />
            <span className="text-sm">{label}<br /><span className="font-mono text-xs text-slate-500">{data.theme[key]}</span></span>
          </label>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="rounded-xl bg-white p-3 shadow-sm"><span className="text-xs uppercase text-slate-500">Header</span>
          <select value={data.theme.headerStyle} onChange={(e) => cms.updateTheme({ headerStyle: e.target.value as typeof data.theme.headerStyle })} className="mt-1 w-full rounded border px-2 py-1.5 text-sm">
            <option value="transparent">Transparent</option><option value="solid">Solid</option><option value="glass">Glass</option>
          </select>
        </label>
        <label className="rounded-xl bg-white p-3 shadow-sm"><span className="text-xs uppercase text-slate-500">Footer</span>
          <select value={data.theme.footerStyle} onChange={(e) => cms.updateTheme({ footerStyle: e.target.value as typeof data.theme.footerStyle })} className="mt-1 w-full rounded border px-2 py-1.5 text-sm">
            <option value="dark">Dark</option><option value="navy">Navy</option><option value="minimal">Minimal</option>
          </select>
        </label>
      </div>
    </section>
  )
}

export function RestPanels({ tab, curPass, setCurPass, newPass, setNewPass, newEmail, setNewEmail, flash }: {
  tab: string
  curPass: string; setCurPass: (v: string) => void
  newPass: string; setNewPass: (v: string) => void
  newEmail: string; setNewEmail: (v: string) => void
  flash: (t: string) => void
}) {
  const cms = useCms()
  const { data } = cms

  if (tab === 'amenities') return (
    <section className="space-y-4">
      <div className="flex justify-between"><h2 className="text-2xl font-semibold">Amenities</h2>
        <button type="button" className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={() => cms.setAmenities([...data.amenities, { title: 'New', note: '' }])}>+ Add</button></div>
      {data.amenities.map((a, i) => (
        <div key={i} className="grid gap-2 rounded-xl bg-white p-4 shadow-sm md:grid-cols-2">
          <Field label="Title" value={a.title} onChange={(v) => { const n = [...data.amenities]; n[i] = { ...a, title: v }; cms.setAmenities(n) }} />
          <Field label="Note" value={a.note} onChange={(v) => { const n = [...data.amenities]; n[i] = { ...a, note: v }; cms.setAmenities(n) }} />
          <button type="button" className="text-left text-sm text-red-600" onClick={() => cms.setAmenities(data.amenities.filter((_, j) => j !== i))}>Remove</button>
        </div>
      ))}
    </section>
  )

  if (tab === 'buttons') return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Buttons</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="rounded-xl bg-white p-3 shadow-sm"><span className="text-xs uppercase text-slate-500">Style</span>
          <select value={data.buttons.style} onChange={(e) => cms.updateButtons({ style: e.target.value as typeof data.buttons.style })} className="mt-1 w-full rounded border px-2 py-1.5 text-sm">
            <option value="steel">Steel</option><option value="gold">Gold</option><option value="outline">Outline</option><option value="soft">Soft</option>
          </select>
        </label>
        <label className="rounded-xl bg-white p-3 shadow-sm"><span className="text-xs uppercase text-slate-500">Animation</span>
          <select value={data.buttons.animation} onChange={(e) => cms.updateButtons({ animation: e.target.value as typeof data.buttons.animation })} className="mt-1 w-full rounded border px-2 py-1.5 text-sm">
            <option value="shine">Shine</option><option value="lift">Lift</option><option value="pulse">Pulse</option><option value="none">None</option>
          </select>
        </label>
        <label className="rounded-xl bg-white p-3 shadow-sm"><span className="text-xs uppercase text-slate-500">Corners</span>
          <select value={data.buttons.radius} onChange={(e) => cms.updateButtons({ radius: e.target.value as typeof data.buttons.radius })} className="mt-1 w-full rounded border px-2 py-1.5 text-sm">
            <option value="sharp">Sharp</option><option value="soft">Soft</option><option value="pill">Pill</option>
          </select>
        </label>
      </div>
      <div className="rounded-xl bg-slate-900 p-6"><div className="flex gap-3"><button type="button" className="btn-split solid"><span>Primary</span></button><button type="button" className="btn-split"><span>Secondary</span></button></div></div>
    </section>
  )

  if (tab === 'social') return <SocialPanel flash={flash} />

  if (tab === 'sections') return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">Sections</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {(Object.keys(data.sections) as (keyof typeof data.sections)[]).map((key) => (
          <label key={key} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm capitalize">
            {key}<input type="checkbox" checked={data.sections[key]} onChange={(e) => cms.updateSections({ [key]: e.target.checked })} />
          </label>
        ))}
      </div>
    </section>
  )

  return (
    <section className="max-w-lg space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <form onSubmit={(e) => { e.preventDefault(); cms.changeEmail(newEmail); flash('Email updated') }} className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h3 className="font-medium">Admin email</h3>
        <Field label="Login email" value={newEmail} onChange={setNewEmail} type="email" />
        <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-sm text-white">Save email</button>
      </form>
      <form onSubmit={async (e: FormEvent) => { e.preventDefault(); const r = await cms.changePassword(curPass, newPass); if (r.ok) { setCurPass(''); setNewPass(''); flash('Password updated') } else flash(r.error || 'Failed') }} className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h3 className="font-medium">Password reset</h3>
        <Field label="Current password" value={curPass} onChange={setCurPass} type="password" />
        <Field label="New password" value={newPass} onChange={setNewPass} type="password" />
        <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-sm text-white">Update password</button>
      </form>
    </section>
  )
}
