import s from './dialog.module.css'
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Portal } from '../portal/portal'
import { cx } from './cx'
import { useEscape } from './esc'
import { useFocusTrap, useScrollLock } from './overlay-hooks'

/** El esqueleto que comparten `Modal`, `Sheet` y `ConfirmDialog`: portal, velo, panel enfocado y atrapado, Escape y bloqueo de scroll. Cada pieza pone su panel y sus partes. */
export function Dialog({ open, onClose, role = 'dialog', label, centered, blurred, panelClass, panelStyle, children }: {
  open: boolean
  onClose: () => void
  role?: 'dialog' | 'alertdialog'
  /** Solo si no hay título: con título, el nombre sale de ahí. */
  label?: string
  /** Panel al centro del viewport; sin esto lo ubica el CSS del panel. */
  centered?: boolean
  /** El velo desenfoca lo de atrás. */
  blurred?: boolean
  panelClass: string
  panelStyle?: CSSProperties
  /** Recibe el id que ata el título al panel. */
  children: (titleId: string) => ReactNode
}) {
  const panel = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const [mounted, setMounted] = useState(open)
  if (open && !mounted) setMounted(true)
  const closing = mounted && !open
  useScrollLock(mounted)
  useEscape(open, onClose)
  useFocusTrap(open, panel)
  useEffect(() => {
    if (!closing) return
    const running = [veil.current, panel.current].flatMap(el => el?.getAnimations?.() ?? [])
    if (!running.length) { setMounted(false); return }
    let live = true
    Promise.allSettled(running.map(a => a.finished)).then(() => live && setMounted(false))
    return () => { live = false }
  }, [closing])
  if (!mounted) return null
  return (
    <Portal>
      <div className={cx(s.viewport, centered && s.centered)} data-closing={closing || undefined} aria-hidden={closing || undefined}>
        <div ref={veil} className={cx(s.veil, blurred && s.blur)} onClick={onClose} />
        <div
          ref={panel}
          role={role}
          aria-modal="true"
          aria-label={label}
          aria-labelledby={label ? undefined : titleId}
          tabIndex={-1}
          style={panelStyle}
          className={cx(s.panel, panelClass)}
        >
          {children(titleId)}
        </div>
      </div>
    </Portal>
  )
}
