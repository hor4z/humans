import s from './dialog.module.css'
import { useId, useRef, type CSSProperties, type ReactNode } from 'react'
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
  const titleId = useId()
  useScrollLock(open)
  useEscape(open, onClose)
  useFocusTrap(open, panel)
  if (!open) return null
  return (
    <Portal>
      <div className={cx(s.viewport, centered && s.centered)}>
        <div className={cx(s.veil, blurred && s.blur, 'ui-fade')} onClick={onClose} />
        <div
          ref={panel}
          role={role}
          aria-modal="true"
          aria-label={label}
          aria-labelledby={label ? undefined : titleId}
          tabIndex={-1}
          style={panelStyle}
          className={panelClass}
        >
          {children(titleId)}
        </div>
      </div>
    </Portal>
  )
}
