import { useState } from 'react'
import { useCms } from '@/cms/store'
import { Field } from './fields'
import type { EmbedPlatform, FeedAccount } from '@/cms/types'
import { parseAccount } from '@/lib/feedAccount'

export function SocialPanel({ flash }: { flash: (t: string) => void }) {
  const cms = useCms()
  const { data } = cms
  const embeds = data.embeds ?? { enabled: true, eyebrow: '', title: '', intro: '', items: [], accounts: [] }
  const accounts = embeds.accounts || []
  const [handle, setHandle] = useState('')
  const [label, setLabel] = useState('')
  const [platform, setPlatform] = useState<EmbedPlatform>('instagram')

  const addAccount = () => {
    const parsed = parseAccount(platform, handle)
    if (!parsed) {
      flash('Valid account URL ya username do')
      return
    }
    const item: FeedAccount = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      platform,
      handle: parsed.handle,
      label: label.trim(),
    }
    cms.updateEmbeds({ accounts: [...accounts, item] })
    setHandle('')
    setLabel('')
    flash('Account connected — feed live ho jayega')
  }

  const remove = (id: string) => cms.updateEmbeds({ accounts: accounts.filter((a) => a.id !== id) })

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Social links</h2>
        <p className="mt-1 text-sm text-slate-500">Footer profile links.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {([['instagram', 'Instagram'], ['facebook', 'Facebook'], ['twitter', 'Twitter / X'], ['youtube', 'YouTube'], ['whatsapp', 'WhatsApp'], ['linkedin', 'LinkedIn']] as const).map(
            ([k, l]) => (
              <Field key={k} label={l} value={data.social[k]} onChange={(v) => cms.updateSocial({ [k]: v })} />
            ),
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Live account feeds</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Ek baar account connect karo. Uske latest aur aane wale posts homepage pe automatically dikhenge — alag-alag post paste nahi karna.
            </p>
          </div>
          <label className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow-sm">
            <input type="checkbox" checked={!!embeds.enabled} onChange={(e) => cms.updateEmbeds({ enabled: e.target.checked })} />
            Show section
          </label>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Field label="Eyebrow" value={embeds.eyebrow || ''} onChange={(v) => cms.updateEmbeds({ eyebrow: v })} />
          <Field label="Title" value={embeds.title || ''} onChange={(v) => cms.updateEmbeds({ title: v })} />
          <Field label="Intro" value={embeds.intro || ''} onChange={(v) => cms.updateEmbeds({ intro: v })} />
        </div>

        <div className="mt-6 space-y-3 rounded-xl bg-white p-4 shadow-sm">
          <h3 className="font-medium">Connect account</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Platform</span>
              <select value={platform} onChange={(e) => setPlatform(e.target.value as EmbedPlatform)} className="mt-1 w-full rounded border px-3 py-2 text-sm">
                <option value="youtube">YouTube channel</option>
                <option value="facebook">Facebook page</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">X / Twitter</option>
              </select>
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Username ya profile URL</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="hotelsteelcity  ·  youtube.com/channel/UC…  ·  facebook.com/Page"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="block flex-1 text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Label (optional)</span>
              <input value={label} onChange={(e) => setLabel(e.target.value)} className="mt-1 w-full rounded border px-3 py-2 text-sm" placeholder="Hotel Steel City" />
            </label>
            <button type="button" onClick={addAccount} className="rounded bg-slate-900 px-4 py-2 text-sm text-white">Connect feed</button>
          </div>
          <p className="text-xs text-slate-400">
            YouTube: channel URL (UC…) best hai — naye videos auto. Facebook page timeline live. Instagram/X official profile feed use karte hain; private accounts nahi dikhte.
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          {accounts.length === 0 && (
            <li className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-400">
              Koi account connected nahi
            </li>
          )}
          {accounts.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-slate-600">{a.platform}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.label || a.handle}</p>
                <p className="truncate text-xs text-slate-400">{a.handle}</p>
              </div>
              <button type="button" onClick={() => remove(a.id)} className="rounded border border-red-200 px-2 py-1 text-xs text-red-600">Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
