import { useState } from 'react'
import { useCms } from '@/cms/store'
import { Field } from './fields'
import type { EmbedItem, EmbedPlatform, FeedAccount } from '@/cms/types'
import { detectPlatformFromUrl, parseAccount, parsePostUrl } from '@/lib/feedAccount'

export function SocialPanel({ flash }: { flash: (t: string) => void }) {
  const cms = useCms()
  const { data } = cms
  const embeds = data.embeds ?? { enabled: true, eyebrow: '', title: '', intro: '', items: [], accounts: [] }
  const accounts = embeds.accounts || []
  const items = embeds.items || []

  const [handle, setHandle] = useState('')
  const [label, setLabel] = useState('')
  const [platform, setPlatform] = useState<EmbedPlatform>('instagram')

  const [postUrl, setPostUrl] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postPlatform, setPostPlatform] = useState<EmbedPlatform>('instagram')

  const addAccount = () => {
    const parsed = parseAccount(platform, handle)
    if (!parsed) {
      flash('Valid profile URL ya username do')
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
    flash('Profile connected')
  }

  const addPost = () => {
    const detected = detectPlatformFromUrl(postUrl) || postPlatform
    const parsed = parsePostUrl(detected, postUrl)
    if (!parsed && detected !== 'facebook') {
      flash('Valid post / video / short URL do')
      return
    }
    const item: EmbedItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      platform: detected,
      url: postUrl.trim(),
      title: postTitle.trim() || parsed?.id || 'Post',
    }
    cms.updateEmbeds({ items: [...items, item] })
    setPostUrl('')
    setPostTitle('')
    flash('Post added')
  }

  const removeAccount = (id: string) => cms.updateEmbeds({ accounts: accounts.filter((a) => a.id !== id) })
  const removeItem = (id: string) => cms.updateEmbeds({ items: items.filter((a) => a.id !== id) })

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Social links</h2>
        <p className="mt-1 text-sm text-slate-500">Footer profile links.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {(
            [
              ['instagram', 'Instagram'],
              ['facebook', 'Facebook'],
              ['twitter', 'Twitter / X'],
              ['youtube', 'YouTube'],
              ['whatsapp', 'WhatsApp'],
              ['linkedin', 'LinkedIn'],
            ] as const
          ).map(([k, l]) => (
            <Field key={k} label={l} value={data.social[k]} onChange={(v) => cms.updateSocial({ [k]: v })} />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Live social section</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Profile cards (Instagram / YouTube app-style) + manual single posts / Shorts.
            </p>
          </div>
          <label className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow-sm">
            <input
              type="checkbox"
              checked={!!embeds.enabled}
              onChange={(e) => cms.updateEmbeds({ enabled: e.target.checked })}
            />
            Show section
          </label>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Field label="Eyebrow" value={embeds.eyebrow || ''} onChange={(v) => cms.updateEmbeds({ eyebrow: v })} />
          <Field label="Title" value={embeds.title || ''} onChange={(v) => cms.updateEmbeds({ title: v })} />
          <Field label="Intro" value={embeds.intro || ''} onChange={(v) => cms.updateEmbeds({ intro: v })} />
        </div>

        <div className="mt-6 space-y-3 rounded-xl bg-white p-4 shadow-sm">
          <h3 className="font-medium">1) Connect profile</h3>
          <p className="text-xs text-slate-500">
            Instagram → Android app style phone UI. YouTube → Shorts-style channel card.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Platform</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as EmbedPlatform)}
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">X / Twitter</option>
              </select>
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Username / profile URL</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="hotelsteelcity  ·  @knewthis  ·  UC…"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="block flex-1 text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Display name (optional)</span>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="Hotel Steel City"
              />
            </label>
            <button type="button" onClick={addAccount} className="rounded bg-slate-900 px-4 py-2 text-sm text-white">
              Add profile
            </button>
          </div>
          <ul className="space-y-2">
            {accounts.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] uppercase">{a.platform}</span>
                <span className="font-medium">{a.label || a.handle}</span>
                <span className="text-xs text-slate-400">{a.handle}</span>
                <button type="button" onClick={() => removeAccount(a.id)} className="ml-auto text-xs text-red-600">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 space-y-3 rounded-xl bg-white p-4 shadow-sm">
          <h3 className="font-medium">2) Add single post / Short / Reel</h3>
          <p className="text-xs text-slate-500">
            Instagram post/reel URL → feed-card UI. YouTube video/Shorts URL → Shorts phone player.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Platform (auto-detect bhi)</span>
              <select
                value={postPlatform}
                onChange={(e) => setPostPlatform(e.target.value as EmbedPlatform)}
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">X / Twitter</option>
              </select>
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Post / Shorts / Reel URL</span>
              <input
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/…  ·  youtube.com/shorts/…"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="block flex-1 text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Caption / title (optional)</span>
              <input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="Room tour reel"
              />
            </label>
            <button type="button" onClick={addPost} className="rounded bg-slate-900 px-4 py-2 text-sm text-white">
              Add post
            </button>
          </div>
          <ul className="space-y-2">
            {items.length === 0 && (
              <li className="rounded-lg border border-dashed border-slate-200 px-3 py-4 text-center text-xs text-slate-400">
                Abhi koi single post nahi
              </li>
            )}
            {items.map((it) => (
              <li key={it.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] uppercase">{it.platform}</span>
                <span className="max-w-[200px] truncate font-medium">{it.title}</span>
                <span className="max-w-[180px] truncate text-xs text-slate-400">{it.url}</span>
                <button type="button" onClick={() => removeItem(it.id)} className="ml-auto text-xs text-red-600">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
