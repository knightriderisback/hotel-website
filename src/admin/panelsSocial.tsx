import { useState } from 'react'
import { useCms } from '@/cms/store'
import { Field } from './fields'
import { detectPlatform } from '@/lib/embedUrl'
import type { EmbedItem, EmbedPlatform } from '@/cms/types'

export function SocialPanel({ flash }: { flash: (t: string) => void }) {
  const cms = useCms()
  const { data } = cms
  const embeds = data.embeds ?? { enabled: true, eyebrow: '', title: '', intro: '', items: [] }
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState<EmbedPlatform | 'auto'>('auto')

  const addEmbed = () => {
    const trimmed = url.trim()
    if (!trimmed) {
      flash('Paste a post or video URL')
      return
    }
    const detected = detectPlatform(trimmed)
    const plat = platform === 'auto' ? detected : platform
    if (!plat) {
      flash('Could not detect platform — pick one manually')
      return
    }
    const item: EmbedItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      platform: plat,
      url: trimmed,
      title: title.trim(),
    }
    cms.setEmbeds([...(embeds.items || []), item])
    setUrl('')
    setTitle('')
    setPlatform('auto')
    flash('Embed added')
  }

  const removeEmbed = (id: string) => {
    cms.setEmbeds((embeds.items || []).filter((i) => i.id !== id))
    flash('Embed removed')
  }

  const move = (id: string, dir: -1 | 1) => {
    const items = [...(embeds.items || [])]
    const idx = items.findIndex((i) => i.id === id)
    if (idx < 0) return
    const next = idx + dir
    if (next < 0 || next >= items.length) return
    ;[items[idx], items[next]] = [items[next], items[idx]]
    cms.setEmbeds(items)
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Social links</h2>
        <p className="mt-1 text-sm text-slate-500">Profile links shown in the footer.</p>
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
            <h2 className="text-2xl font-semibold">Live embeds</h2>
            <p className="mt-1 text-sm text-slate-500">
              Paste Instagram / Facebook / YouTube / X post URLs. They render live on the website.
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
          <h3 className="font-medium">Add embed</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Post / video URL</span>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/… or youtube.com/watch?v=…"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Title (optional)</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lobby evening"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="block text-sm">
              <span className="text-xs uppercase tracking-wide text-slate-500">Platform</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as EmbedPlatform | 'auto')}
                className="mt-1 block rounded border px-3 py-2 text-sm"
              >
                <option value="auto">Auto-detect</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">X / Twitter</option>
              </select>
            </label>
            <button type="button" onClick={addEmbed} className="rounded bg-slate-900 px-4 py-2 text-sm text-white">
              Add embed
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Tips: Instagram post/reel link · Facebook post link · YouTube watch or youtu.be · X status URL
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          {(embeds.items || []).length === 0 && (
            <li className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-400">
              No embeds yet — add a URL above
            </li>
          )}
          {(embeds.items || []).map((item, i) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
            >
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-slate-600">
                {item.platform}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title || 'Untitled'}</p>
                <p className="truncate text-xs text-slate-400">{item.url}</p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => move(item.id, -1)}
                  className="rounded border px-2 py-1 text-xs disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === (embeds.items || []).length - 1}
                  onClick={() => move(item.id, 1)}
                  className="rounded border px-2 py-1 text-xs disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeEmbed(item.id)}
                  className="rounded border border-red-200 px-2 py-1 text-xs text-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
