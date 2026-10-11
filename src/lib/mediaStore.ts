/** IndexedDB blob store for large images/videos (avoids localStorage crash). */

const DB_NAME = 'hotel-cms-media'
const STORE = 'blobs'
const DB_VER = 1

export const IDB_PREFIX = 'idb:'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error || new Error('idb open failed'))
  })
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function isIdbSrc(src?: string | null): boolean {
  return !!src && src.startsWith(IDB_PREFIX)
}

export function idbKeyFromSrc(src: string): string {
  return src.slice(IDB_PREFIX.length)
}

export async function saveMediaBlob(file: Blob): Promise<string> {
  const key = uuid()
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(file, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error || new Error('idb put failed'))
  })
  db.close()
  return `${IDB_PREFIX}${key}`
}

export async function getMediaBlob(src: string): Promise<Blob | null> {
  if (!isIdbSrc(src)) return null
  const key = idbKeyFromSrc(src)
  const db = await openDb()
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).get(key)
    req.onsuccess = () => resolve((req.result as Blob) || null)
    req.onerror = () => reject(req.error || new Error('idb get failed'))
  })
  db.close()
  return blob
}

export async function deleteMediaBlob(src: string): Promise<void> {
  if (!isIdbSrc(src)) return
  const key = idbKeyFromSrc(src)
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error || new Error('idb delete failed'))
  })
  db.close()
}

export async function resolveMediaUrl(src: string): Promise<string | null> {
  if (!src) return null
  if (isIdbSrc(src)) {
    const blob = await getMediaBlob(src)
    if (!blob) return null
    return URL.createObjectURL(blob)
  }
  return src
}

/** Single read: blob URL + mime (avoids extra fetch for type detection). */
export async function resolveMedia(
  src: string,
): Promise<{ url: string; type: string; revoke?: () => void } | null> {
  if (!src) return null
  if (isIdbSrc(src)) {
    const blob = await getMediaBlob(src)
    if (!blob) return null
    const url = URL.createObjectURL(blob)
    return {
      url,
      type: blob.type || '',
      revoke: () => URL.revokeObjectURL(url),
    }
  }
  return { url: src, type: '' }
}
