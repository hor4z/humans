import s from './divider.module.css'
import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

/** La línea que separa. Con texto, el texto se lee y la línea lo acompaña: un lector anuncia el corte y después lo que dice. */
export function Divider({ orientation = 'horizontal', align = 'center', className, children }: {
  /** El vertical se estira solo: en una fila que centra a sus hijos mediría cero. */
  orientation?: 'horizontal' | 'vertical'
  /** Dónde va el texto: al medio, con línea a los dos lados, o al principio, con la línea después. */
  align?: 'center' | 'start'
  /** Para el margen, que depende de dónde esté. */
  className?: string
  /** El texto que corta la línea: "o", "Hoy", el nombre de un grupo. Solo en horizontal. */
  children?: ReactNode
}) {
  if (children == null || orientation === 'vertical') {
    return (
      <div
        data-divider=""
        role="separator"
        aria-orientation={orientation}
        className={cx(
          s.root,
          orientation === 'horizontal' ? s.horizontal : s.vertical,
          className,
        )}
      />
    )
  }
  return (
    <div data-divider="" className={cx(s.labeled, className)}>
      {align === 'center' && <span role="separator" aria-orientation="horizontal" className={cx(s.root, s.horizontal, s.segment)} />}
      <span className={s.text}>{children}</span>
      <span
        {...(align === 'start' ? { role: 'separator', 'aria-orientation': 'horizontal' as const } : { 'aria-hidden': true })}
        className={cx(s.root, s.horizontal, s.segment)}
      />
    </div>
  )
}
