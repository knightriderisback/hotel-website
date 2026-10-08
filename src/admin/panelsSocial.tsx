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
  const [accessToken, setAccessToken] = useState('')
  const [igUserId, setIgUserId] = useState('')

  const addAccount = () => {
    const parsed = parseAccount(platform, handle)
    if (!parsed) {
      flash('Valid account URL ya username do')
      return
    }
    if (platform === 'instagram' && !accessToken.trim()) {
      flash('Instagram ke liye Access Token zaroori hai')
      return
    }
    const item: FeedAccount = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      platform,
      handle: parsed.handle,
      label: label.trim(),
      accessToken: platform === 'instagram' ? accessToken.trim() : undefined,
      igUserId: platform === 'instagram' && igUserId.trim() ? igUserId.trim() : undefined,
    }
    cms.updateEmbeds({ accounts: [...accounts, item] })
    setHandle('')
    setLabel('')
    setAccessToken('')
    setIgUserId('')
    flash('Account connected')
  }

  const remove = (id: string) => cms.updateEmbeds({ accounts: accounts.filter((a) => a.id !== id) })

  const updateToken = (id: string, token: string) => {
    cms.updateEmbeds({
      accounts: accounts.map((a) => (a.id === id ? { ...a, accessToken: token } : a)),
    })
  }

  const updateIgUserId = (id: string, uid: string) => {
    cms.updateEmbeds({
      accounts: accounts.map((a) => (a.id === id ? { ...a, igUserId: uid } : a)),
    })
  }

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
              YouTube: UC channel ID. Instagram: username + Meta Graph Access Token.
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
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook page</option>
                <option value="twitter">X / Twitter</option>
              </select>
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Username ya profile URL</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder={platform === 'youtube' ? 'UCxxxxxxxx' : platform === 'instagram' ? 'username' : 'Page name'}
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              />
            </label>
          </div>

          {platform === 'instagram' && (
            <div className="grid gap-3">
              <label className="block text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-500">Instagram Access Token *</span>
                <input
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Long-lived token from Meta Graph API"
                  className="mt-1 w-full rounded border px-3 py-2 font-mono text-sm"
                />
              </label>
              <label className="block text-sm">
                <span className="text-xs uppercase tracking-wide text-slate-500">Instagram Business User ID (optional)</span>
                <input
                  value={igUserId}
                  onChange={(e) => setIgUserId(e.target.value)}
                  placeholder="Agar Page-based token hai to IG user id"
                  className="mt-1 w-full rounded border px-3 py-2 font-mono text-sm"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-end gap-3">
            <label className="block flex-1 text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Label (optional)</span>
              <input value={label} onChange={(e) => setLabel(e.target.value)} className="mt-1 w-full rounded border px-3 py-2 text-sm" placeholder="Hotel Steel City" />
            </label>
            <button type="button" onClick={addAccount} className="rounded bg-slate-900 px-4 py-2 text-sm text-white">
              Connect feed
            </button>
          </div>

          <div className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
            <p className="font-medium text-slate-800">Instagram token kaise lein</p>
            <ol className="mt-1 list-decimal space-y-1 pl-4">
              <li>Instagram → Professional (Business/Creator)</li>
              <li>Facebook Page se link karo</li>
              <li>
                <a className="text-blue-600 underline" href="https://developers.facebook.com" target="_blank" rel="noreferrer">
                  developers.facebook.com
                </a>{' '}
                → App → Instagram Graph API
              </li>
              <li>Graph API Explorer se long-lived token lo</li>
              <li>Yahan paste → Connect feed</li>
            </ol>
          </div>
        </div>

        <ul className="mt-4 space-y-3">
          {accounts.length === 0 && (
            <li className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-400">
              Koi account connected nahi
            </li>
          )}
          {accounts.map((a) => (
            <li key={a.id} className="space-y-2 rounded-xl bg-white px-4 py-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-slate-600">{a.platform}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.label || a.handle}</p>
                  <p className="truncate text-xs text-slate-400">{a.handle}</p>
                </div>
                <button type="button" onClick={() => remove(a.id)} className="rounded border border-red-200 px-2 py-1 text-xs text-red-600">
                  Remove
                </button>
              </div>
              {a.platform === 'instagram' && (
                <div className="grid gap-2 border-t border-slate-100 pt-2 md:grid-cols-2">
                  <label className="block text-xs">
                    <span className="text-slate-500">Access token</span>
                    <input
                      value={a.accessToken || ''}
                      onChange={(e) => updateToken(a.id, e.target.value)}
                      className="mt-1 w-full rounded border px-2 py-1.5 font-mono text-xs"
                      placeholder="Paste token"
                    />
                  </label>
                  <label className="block text-xs">
                    <span className="text-slate-500">IG User ID (optional)</span>
                    <input
                      value={a.igUserId || ''}
                      onChange={(e) => updateIgUserId(a.id, e.target.value)}
                      className="mt-1 w-full rounded border px-2 py-1.5 font-mono text-xs"
                      placeholder="17841…"
                    />
                  </label>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
