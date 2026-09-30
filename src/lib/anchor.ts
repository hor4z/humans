import { useLayoutEffect, useState, type RefObject } from 'react'

type Options = {
  /** Contra qué borde del disparador se alinea el panel. */
  align?: 'start' | 'end' | 'center'
  /** Cuánto se separa del disparador, en px. */
  gap?: number
  /** De qué lado va si entra de los dos. */
  prefer?: 'below' | 'above' | 'left' | 'right'
  /** El ancho del panel, si se conoce antes de medirlo. */
  width?: number
}

/** Dónde cae un panel de `w` por `h` contra la caja de su disparador: del lado que prefiera si entra, del otro si no, y siempre a 8px del borde de la ventana. */
export function place(r: DOMRect, w: number, h: number, { align = 'start', gap = 8, prefer = 'below' }: Options = {}) {
  const clampX = (x: number) => Math.max(8, Math.min(x, window.innerWidth - w - 8))
  const clampY = (y: number) => Math.max(8, Math.min(y, window.innerHeight - h - 8))
  if (prefer === 'left' || prefer === 'right') {
    const fitsRight = r.right + gap + w <= window.innerWidth - 8
    const fitsLeft = r.left - gap - w >= 8
    const leftward = prefer === 'left' ? fitsLeft || !fitsRight : !fitsRight && fitsLeft
    const top = align === 'end' ? r.bottom - h : align === 'center' ? r.top + r.height / 2 - h / 2 : r.top
    return { top: clampY(top), left: clampX(leftward ? r.left - gap - w : r.right + gap) }
  }
  const fitsBelow = r.bottom + gap + h <= window.innerHeight - 8
  const fitsAbove = r.top - gap - h >= 8
  const above = prefer === 'above' ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove
  const left = align === 'end' ? r.right - w : align === 'center' ? r.left + r.width / 2 - w / 2 : r.left
  return { top: clampY(above ? r.top - gap - h : r.bottom + gap), left: clampX(left) }

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
    const measure = () => {
      if (!anchor.current) return
      const w = width ?? panel.current?.offsetWidth ?? 0
      const h = panel.current?.offsetHeight ?? 0
      const next = place(anchor.current.getBoundingClientRect(), w, h, { align, gap, prefer })
      setPos(previous => previous.top === next.top && previous.left === next.left ? previous : next)
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(anchor.current)
    if (panel.current) observer?.observe(panel.current)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
      observer?.disconnect()
    }
  }, [open, align, gap, prefer, width, ...deps])
  return pos
}
