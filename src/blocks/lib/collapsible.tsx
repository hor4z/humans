import s from './collapsible.module.css'
import type { ReactNode } from 'react'
import { Icon } from '../../icon/icon'
import { cx } from '../../lib/cx'

/** El cuerpo que se abre y se cierra animado. Cerrado queda `inert`: no se enfoca ni se lee, pero conserva su alto para animar. */
function Root({ open, id, className, children }: {
  /** Si se ve. */
  open: boolean
  /** El id que nombra el `aria-controls` del botón que lo abre. */
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cx(s.root, open && s.open)}>
      <div id={id} inert={!open} className={cx(s.body, className)}>{children}</div>
    </div>
  )
}

/** La flecha del botón que abre: hacia la derecha cerrado, hacia abajo abierto. */
function Chevron({ open, size = 20 }: {
  /** Si lo que abre está abierto. */
  open: boolean
  /** 16 · 20 · 24, como todo icono. */
  size?: 16 | 20 | 24
}) {
  return <Icon name="keyboard_arrow_down" size={size} className={cx(s.chevron, open && s.chevronOpen, 'icon-muted')} />
}

/** Un cuerpo plegable con su flecha. El botón lo pone quien lo usa, porque cada uno lo dibuja distinto. */
export const Collapsible = Object.assign(Root, { Chevron })
