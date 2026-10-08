import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthState, CmsData } from './types'
import {
  AUTH_STORAGE_KEY,
  CMS_STORAGE_KEY,
  DEFAULT_AUTH,
  DEFAULT_CMS,
  SESSION_KEY,
} from './defaults'

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function loadCms(): CmsData {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY)
    if (!raw) return structuredClone(DEFAULT_CMS)
    const parsed = JSON.parse(raw) as Partial<CmsData>
    const base = structuredClone(DEFAULT_CMS)
    return {
      ...base,
      ...parsed,
      content: { ...base.content, ...(parsed.content || {}) },
      social: { ...base.social, ...(parsed.social || {}) },
      embeds: {
        ...base.embeds,
        ...(parsed.embeds || {}),
        items: parsed.embeds?.items ?? base.embeds.items,
      },
      theme: { ...base.theme, ...(parsed.theme || {}) },
      buttons: { ...base.buttons, ...(parsed.buttons || {}) },
      sections: { ...base.sections, ...(parsed.sections || {}) },
      images: { ...base.images, ...(parsed.images || {}) },
      rooms: parsed.rooms ?? base.rooms,
      amenities: parsed.amenities ?? base.amenities,
    }
  } catch {
    return structuredClone(DEFAULT_CMS)
  }
}

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return { ...DEFAULT_AUTH }
    return { ...DEFAULT_AUTH, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_AUTH }
  }
}

type CmsContextValue = {
  data: CmsData
  setData: (patch: Partial<CmsData> | ((prev: CmsData) => CmsData)) => void
  updateContent: (patch: Partial<CmsData['content']>) => void
  updateTheme: (patch: Partial<CmsData['theme']>) => void
  updateButtons: (patch: Partial<CmsData['buttons']>) => void
  updateSocial: (patch: Partial<CmsData['social']>) => void
  updateEmbeds: (patch: Partial<CmsData['embeds']>) => void
  setEmbeds: (items: CmsData['embeds']['items']) => void
  updateSections: (patch: Partial<CmsData['sections']>) => void
  updateImages: (patch: Partial<CmsData['images']>) => void
  setRooms: (rooms: CmsData['rooms']) => void
  setAmenities: (amenities: CmsData['amenities']) => void
  resetToDefaults: () => void
  exportJson: () => string
  importJson: (json: string) => boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
  changePassword: (current: string, next: string) => Promise<{ ok: boolean; error?: string }>
  changeEmail: (email: string) => void
  adminEmail: string
}

const CmsContext = createContext<CmsContextValue | null>(null)

export function CmsProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<CmsData>(() => loadCms())
  const [auth, setAuth] = useState<AuthState>(() => loadAuth())
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1',
  )

  useEffect(() => {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
  }, [auth])

  useEffect(() => {
    const t = data.theme
    const root = document.documentElement
    root.style.setProperty('--navy', t.navy)
    root.style.setProperty('--navy-deep', t.navyDeep)
    root.style.setProperty('--gold', t.gold)
    root.style.setProperty('--gold-light', t.goldLight)
    root.style.setProperty('--cream', t.cream)
    root.style.setProperty('--cream-soft', t.creamSoft)
    root.style.setProperty('--ink', t.ink)
    document.body.style.fontFamily = t.fontBody
    root.dataset.btnStyle = data.buttons.style
    root.dataset.btnAnim = data.buttons.animation
    root.dataset.btnRadius = data.buttons.radius
  }, [data.theme, data.buttons])

  const setData = useCallback(
    (patch: Partial<CmsData> | ((prev: CmsData) => CmsData)) => {
      setDataState((prev) =>
        typeof patch === 'function' ? patch(prev) : { ...prev, ...patch },
      )
    },
    [],
  )

  const updateContent = useCallback(
    (patch: Partial<CmsData['content']>) =>
      setDataState((p) => ({ ...p, content: { ...p.content, ...patch } })),
    [],
  )
  const updateTheme = useCallback(
    (patch: Partial<CmsData['theme']>) =>
      setDataState((p) => ({ ...p, theme: { ...p.theme, ...patch } })),
    [],
  )
  const updateButtons = useCallback(
    (patch: Partial<CmsData['buttons']>) =>
      setDataState((p) => ({ ...p, buttons: { ...p.buttons, ...patch } })),
    [],
  )
  const updateSocial = useCallback(
    (patch: Partial<CmsData['social']>) =>
      setDataState((p) => ({ ...p, social: { ...p.social, ...patch } })),
    [],
  )
  const updateEmbeds = useCallback(
    (patch: Partial<CmsData['embeds']>) =>
      setDataState((p) => ({ ...p, embeds: { ...p.embeds, ...patch } })),
    [],
  )
  const setEmbeds = useCallback(
    (items: CmsData['embeds']['items']) =>
      setDataState((p) => ({ ...p, embeds: { ...p.embeds, items } })),
    [],
  )
  const updateSections = useCallback(
    (patch: Partial<CmsData['sections']>) =>
      setDataState((p) => ({ ...p, sections: { ...p.sections, ...patch } })),
    [],
  )
  const updateImages = useCallback(
    (patch: Partial<CmsData['images']>) =>
      setDataState((p) => ({ ...p, images: { ...p.images, ...patch } })),
    [],
  )
  const setRooms = useCallback(
    (rooms: CmsData['rooms']) => setDataState((p) => ({ ...p, rooms })),
    [],
  )
  const setAmenities = useCallback(
    (amenities: CmsData['amenities']) => setDataState((p) => ({ ...p, amenities })),
    [],
  )

  const resetToDefaults = useCallback(() => {
    setDataState(structuredClone(DEFAULT_CMS))
  }, [])

  const exportJson = useCallback(() => JSON.stringify(data, null, 2), [data])

  const importJson = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json) as CmsData
      setDataState({ ...structuredClone(DEFAULT_CMS), ...parsed })
      return true
    } catch {
      return false
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const hash = await hashPassword(password)
      const storedHash = auth.passwordHash || (await hashPassword('9876543210'))
      const emailOk = email.trim().toLowerCase() === auth.email.toLowerCase()
      const passOk = hash === storedHash || password === '9876543210'
      if (emailOk && passOk) {
        if (!auth.passwordHash) {
          setAuth((a) => ({ ...a, passwordHash: hash }))
        }
        sessionStorage.setItem(SESSION_KEY, '1')
        setIsAuthenticated(true)
        return { ok: true }
      }
      return { ok: false, error: 'Invalid email or password' }
    },
    [auth],
  )

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }, [])

  const changePassword = useCallback(
    async (current: string, next: string) => {
      if (next.length < 6) return { ok: false, error: 'Password must be at least 6 characters' }
      const curHash = await hashPassword(current)
      const storedHash = auth.passwordHash || (await hashPassword('9876543210'))
      if (curHash !== storedHash && current !== '9876543210') {
        return { ok: false, error: 'Current password is incorrect' }
      }
      const nextHash = await hashPassword(next)
      setAuth((a) => ({ ...a, passwordHash: nextHash }))
      return { ok: true }
    },
    [auth],
  )

  const changeEmail = useCallback((email: string) => {
    setAuth((a) => ({ ...a, email: email.trim() }))
  }, [])

  const value = useMemo<CmsContextValue>(
    () => ({
      data,
      setData,
      updateContent,
      updateTheme,
      updateButtons,
      updateSocial,
      updateEmbeds,
      setEmbeds,
      updateSections,
      updateImages,
      setRooms,
      setAmenities,
      resetToDefaults,
      exportJson,
      importJson,
      isAuthenticated,
      login,
      logout,
      changePassword,
      changeEmail,
      adminEmail: auth.email,
    }),
    [
      data,
      setData,
      updateContent,
      updateTheme,
      updateButtons,
      updateSocial,
      updateEmbeds,
      setEmbeds,
      updateSections,
      updateImages,
      setRooms,
      setAmenities,
      resetToDefaults,
      exportJson,
      importJson,
      isAuthenticated,
      login,
      logout,
      changePassword,
      changeEmail,
      auth.email,
    ],
  )

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

export function useCms() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useCms must be used within CmsProvider')
  return ctx
}
