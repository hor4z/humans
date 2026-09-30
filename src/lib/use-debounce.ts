import { useEffect, useState } from 'react'

/** El mismo valor, pero recién después de que dejó de cambiar por `ms`. Para no filtrar una lista en cada tecla. */
export function useDebounce<T>(value: T, ms = 250) {
  const [still, setStill] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setStill(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return still
}
