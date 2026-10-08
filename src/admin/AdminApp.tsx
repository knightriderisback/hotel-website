import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useCms } from '@/cms/store'
import { ContentPanel, RoomsPanel, ImagesPanel } from './panelsA'
import { ThemePanel, RestPanels } from './panelsB'

type Tab = 'dashboard' | 'content' | 'rooms' | 'amenities' | 'images' | 'theme' | 'buttons' | 'social' | 'sections' | 'settings'
const TABS: { id: Tab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' }, { id: 'content', label: 'Text Content' },
  { id: 'rooms', label: 'Rooms' }, { id: 'amenities', label: 'Amenities' },
  { id: 'images', label: 'Images' }, { id: 'theme', label: 'Theme' },
  { id: 'buttons', label: 'Buttons' }, { id: 'social', label: 'Social' },
  { id: 'sections', label: 'Sections' }, { id: 'settings', label: 'Settings' },
]

export default function AdminApp() {
  const cms = useCms()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [msg, setMsg] = useState('')
  const [curPass, setCurPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newEmail, setNewEmail] = useState(cms.adminEmail)
  useEffect(() => { setNewEmail(cms.adminEmail) }, [cms.adminEmail])
  if (!cms.isAuthenticated) return <Navigate to="/admin/login" replace />
  const { data } = cms
  const flash = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 2500) }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="flex w-56 shrink-0 flex-col bg-slate-900 text-slate-100">
        <div className="border-b border-slate-700 px-4 py-4">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-amber-400">CMS</p>
          <h1 className="mt-1 text-lg font-semibold">Steel City Admin</h1>
        </div>
        <nav className="flex-1 space-y-0.5 p-2">
          {TABS.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              className={`block w-full rounded px-3 py-2 text-left text-sm ${tab === t.id ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="space-y-2 border-t border-slate-700 p-3 text-sm">
          <Link to="/" target="_blank" className="block text-amber-400 hover:underline">View website ↗</Link>
          <button type="button" onClick={() => { cms.logout(); navigate('/admin/login') }} className="text-slate-400 hover:text-white">Sign out</button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        {msg && <div className="mb-4 rounded bg-emerald-600 px-4 py-2 text-sm text-white">{msg}</div>}
        {tab === 'dashboard' && (
          <section>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="mt-2 text-slate-600">Changes auto-save in this browser. Export for backup.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[['Sections', Object.values(data.sections).filter(Boolean).length],['Rooms', data.rooms.length],['Gallery', data.images.gallery.length],['Buttons', data.buttons.style]].map(([k,v]) => (
                <div key={String(k)} className="rounded-xl bg-white p-4 shadow-sm"><p className="text-xs uppercase text-slate-400">{k}</p><p className="mt-1 text-2xl font-semibold">{v}</p></div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="rounded bg-slate-900 px-4 py-2 text-sm text-white" onClick={() => {
                const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([cms.exportJson()], { type: 'application/json' })); a.download = 'hotel-cms-backup.json'; a.click(); flash('Exported')
              }}>Export</button>
              <label className="cursor-pointer rounded border bg-white px-4 py-2 text-sm">Import
                <input type="file" accept="application/json" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) flash(cms.importJson(await f.text()) ? 'Imported' : 'Invalid') }} />
              </label>
              <button type="button" className="rounded border border-red-300 px-4 py-2 text-sm text-red-600" onClick={() => { if (confirm('Reset?')) { cms.resetToDefaults(); flash('Reset') } }}>Reset</button>
            </div>
          </section>
        )}
        {tab === 'content' && <ContentPanel />}
        {tab === 'rooms' && <RoomsPanel />}
        {tab === 'images' && <ImagesPanel />}
        {tab === 'theme' && <ThemePanel />}
        {(tab === 'amenities' || tab === 'buttons' || tab === 'social' || tab === 'sections' || tab === 'settings') && (
          <RestPanels tab={tab} curPass={curPass} setCurPass={setCurPass} newPass={newPass} setNewPass={setNewPass} newEmail={newEmail} setNewEmail={setNewEmail} flash={flash} />
        )}
      </main>
    </div>
  )
}
