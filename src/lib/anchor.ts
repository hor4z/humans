import { useLayoutEffect, useState, type RefObject } from 'react'

type Options = {
  /** Contra qué borde del disparador se alinea el panel. */
  align?: 'start' | 'end' | 'center'
  /** Cuánto se separa del disparador, en px. */
  gap?: number
  /** De qué lado va si entra de los dos. */
  prefer?: 'below' | 'above'
  /** El ancho del panel, si se conoce antes de medirlo. */
  width?: number
}

/** Dónde cae un panel de `w` por `h` contra la caja de su disparador: del lado que prefiera si entra, del otro si no, y siempre a 8px del borde de la ventana. */
export function place(r: DOMRect, w: number, h: number, { align = 'start', gap = 8, prefer = 'below' }: Options = {}) {
  const fitsBelow = r.bottom + gap + h <= window.innerHeight - 8
  const fitsAbove = r.top - gap - h >= 8
  const above = prefer === 'above' ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove
  const left = align === 'end' ? r.right - w : align === 'center' ? r.left + r.width / 2 - w / 2 : r.left
  return {
    top: above ? r.top - gap - h : r.bottom + gap,
    left: Math.max(8, Math.min(left, window.innerWidth - w - 8)),
  }
}

/** La posición de un panel anclado a un disparador, medida al abrir y cada vez que cambia algo de `deps`. */
export function useAnchor(
  open: boolean,
  anchor: RefObject<HTMLElement | null>,
  panel: RefObject<HTMLElement | null>,
  options: Options = {},
  deps: unknown[] = [],
) {
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const { align, gap, prefer, width } = options
  useLayoutEffect(() => {
    if (!open || !anchor.current) return
    const w = width ?? panel.current?.offsetWidth ?? 0
    const h = panel.current?.offsetHeight ?? 0
    setPos(place(anchor.current.getBoundingClientRect(), w, h, { align, gap, prefer }))
  }, [open, align, gap, prefer, width, ...deps])
  return pos
}
