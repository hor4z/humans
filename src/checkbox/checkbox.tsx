import s from './checkbox.module.css'
import type { ReactNode } from 'react'
import { useField } from '../lib/field-ctx'
import { InlineLabel } from '../lib/inline-label'
import { Icon } from '../icon/icon'
import { cx } from '../lib/cx'

/** La caja mide el interlineado del texto que acompaña: 16 · 20 · 24. Se toca en 24 como mínimo, que es lo que pide WCAG 2.2, sin mover el renglón. */
export function Checkbox({
  checked, onCheckedChange, label, disabled, id, indeterminate, size = 'md', children,
}: {
  /** Es controlado: el estado lo lleva quien lo usa. */
  checked: boolean
  /** Recibe el valor nuevo, no el evento. */
  onCheckedChange: (v: boolean) => void
  /** Al `aria-label`, para cuando no hay texto que se vea. Con hijos sobra. */
  label?: string
  /** Apagado no se toca ni recibe el foco. */
  disabled?: boolean
  /** Para atarlo a una etiqueta de afuera. Adentro de un `Field` lo toma solo. */
  id?: string
  /** Pinta la raya y manda aria-checked="mixed". */
  indeterminate?: boolean
  /** 16 · 20 · 24: el interlineado del texto de al lado. */
  size?: 'sm' | 'md' | 'lg'
  /** El texto que se ve al lado. La casilla lo envuelve en su `<label>` y se centra contra el primer renglón. */
  children?: ReactNode
}) {
  const on = checked || indeterminate
  const field = useField()
  const box = (
    <button
      {...field}
      id={id ?? field.id}
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={field.id || children != null ? undefined : label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cx(s.root, size === 'sm' ? s.rootSm : size === 'lg' ? s.rootLg : s.rootMd, s.disabled)}
    >
      <span className={cx(s.control, s.motion, on ? s.on : s.off)}>
        <span
          className={cx(
            s.glyph,
            on ? s.glyphOn : s.glyphOff,
          )}
        >
          {indeterminate
            ? <span className={s.dash} />
            : <Icon name="check" size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16} weight={700} />}
        </span>
      </span>
    </button>
  )
  return children == null ? box : <InlineLabel size={size} control={box}>{children}</InlineLabel>
}
