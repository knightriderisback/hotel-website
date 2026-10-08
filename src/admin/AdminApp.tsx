import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import {
  LayoutDashboard,
  FileText,
  BedDouble,
  Sparkles,
  Image,
  Palette,
  MousePointerClick,
  Share2,
  LayoutGrid,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react'
import { useCms } from '@/cms/store'
import { ContentPanel, RoomsPanel, ImagesPanel } from './panelsA'
import { ThemePanel, RestPanels } from './panelsB'

type Tab =
  | 'dashboard'
  | 'content'
  | 'rooms'
  | 'amenities'
  | 'images'
  | 'theme'
  | 'buttons'
  | 'social'
  | 'sections'
  | 'settings'

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'content', label: 'Text Content', icon: FileText },
  { id: 'rooms', label: 'Rooms', icon: BedDouble },
  { id: 'amenities', label: 'Amenities', icon: Sparkles },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'buttons', label: 'Buttons', icon: MousePointerClick },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'sections', label: 'Sections', icon: LayoutGrid },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminApp() {
  const cms = useCms()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [msg, setMsg] = useState('')
  const [curPass, setCurPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newEmail, setNewEmail] = useState(cms.adminEmail)

  useEffect(() => {
    setNewEmail(cms.adminEmail)
  }, [cms.adminEmail])

  if (!cms.isAuthenticated) return <Navigate to="/admin/login" replace />

  const { data } = cms
  const flash = (t: string) => {
    setMsg(t)
    setTimeout(() => setMsg(''), 2500)
  }

  const activeLabel = TABS.find((t) => t.id === tab)?.label ?? 'Admin'

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col bg-slate-900 text-slate-100 md:flex">
        <div className="border-b border-slate-700 px-4 py-4">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-amber-400">CMS</p>
          <h1 className="mt-1 text-lg font-semibold">Steel City Admin</h1>
        </div>
        <nav className="flex-1 space-y-0.5 p-2">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-2.5 rounded px-3 py-2 text-left text-sm ${
                  tab === t.id ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                {t.label}
              </button>
            )
          })}
        </nav>
        <div className="space-y-2 border-t border-slate-700 p-3 text-sm">
          <Link to="/" target="_blank" className="flex items-center gap-2 text-amber-400 hover:underline">
            <ExternalLink className="h-3.5 w-3.5" /> View website
          </Link>
          <button
            type="button"
            onClick={() => {
              cms.logout()
              navigate('/admin/login')
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-3 text-slate-100 md:hidden">
          <div>
            <p className="text-[0.55rem] uppercase tracking-[0.3em] text-amber-400">CMS</p>
            <h1 className="text-sm font-semibold leading-tight">{activeLabel}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" aria-label="View website" className="text-amber-400">
              <ExternalLink className="h-5 w-5" />
            </Link>
            <button
              type="button"
              aria-label="Sign out"
              onClick={() => {
                cms.logout()
                navigate('/admin/login')
              }}
              className="text-slate-400"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 pb-24 md:p-6 md:pb-8 lg:p-8">
          {msg && (
            <div className="mb-4 rounded bg-emerald-600 px-4 py-2 text-sm text-white">{msg}</div>
          )}

          {tab === 'dashboard' && (
            <section>
              <h2 className="hidden text-2xl font-semibold md:block">Dashboard</h2>
              <p className="mt-0 text-sm text-slate-600 md:mt-2">
                Changes auto-save in this browser. Export for backup.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {(
                  [
                    ['Sections', Object.values(data.sections).filter(Boolean).length],
                    ['Rooms', data.rooms.length],
                    ['Gallery', data.images.gallery.length],
                    ['Buttons', data.buttons.style],
                  ] as const
                ).map(([k, v]) => (
                  <div key={String(k)} className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase text-slate-400">{k}</p>
                    <p className="mt-1 text-xl font-semibold md:text-2xl">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
                  onClick={() => {
                    const a = document.createElement('a')
                    a.href = URL.createObjectURL(
                      new Blob([cms.exportJson()], { type: 'application/json' }),
                    )
                    a.download = 'hotel-cms-backup.json'
                    a.click()
                    flash('Exported')
                  }}
                >
                  Export
                </button>
                <label className="cursor-pointer rounded border bg-white px-4 py-2 text-sm">
                  Import
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0]
                      if (f) flash(cms.importJson(await f.text()) ? 'Imported' : 'Invalid')
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="rounded border border-red-300 px-4 py-2 text-sm text-red-600"
                  onClick={() => {
                    if (confirm('Reset?')) {
                      cms.resetToDefaults()
                      flash('Reset')
                    }
                  }}
                >
                  Reset
                </button>
              </div>
            </section>
          )}

          {tab === 'content' && <ContentPanel />}
          {tab === 'rooms' && <RoomsPanel />}
          {tab === 'images' && <ImagesPanel />}
          {tab === 'theme' && <ThemePanel />}
          {(tab === 'amenities' ||
            tab === 'buttons' ||
            tab === 'social' ||
            tab === 'sections' ||
            tab === 'settings') && (
            <RestPanels
              tab={tab}
              curPass={curPass}
              setCurPass={setCurPass}
              newPass={newPass}
              setNewPass={setNewPass}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              flash={flash}
            />
          )}
        </main>

        {/* Mobile bottom footer — icons only */}
        <nav
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-700 bg-slate-900 md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          aria-label="CMS navigation"
        >
          <div className="grid grid-cols-5 gap-0">
            {TABS.map((t) => {
              const Icon = t.icon
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-label={t.label}
                  title={t.label}
                  className={`flex h-14 flex-col items-center justify-center ${
                    active ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
                  {active && (
                    <span className="mt-0.5 h-1 w-1 rounded-full bg-amber-400" aria-hidden />
                  )}
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
