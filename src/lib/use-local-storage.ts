import { useCallback, useEffect, useState } from 'react'

/** Un estado que sobrevive al refresh, y que se entera si otra pestaña lo cambia. Si el navegador no deja escribir, funciona igual en memoria. */
export function useLocalStorage<T>(key: string, inicial: T) {
  const read = useCallback((): T => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? inicial : JSON.parse(raw) as T
    } catch { return inicial }
  }, [key, inicial])

  const [value, setValue] = useState<T>(read)

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { return }
  }, [key, value])

  useEffect(() => {
    const other = (e: StorageEvent) => { if (e.key === key) setValue(read()) }
    window.addEventListener('storage', other)
    return () => window.removeEventListener('storage', other)
  }, [key, read])

  return [value, setValue] as const
}
