import s from './switch.module.css'
import type { ReactNode } from 'react'
import { useField } from '../lib/field-ctx'
import { InlineLabel } from '../lib/inline-label'
import { cx } from '../lib/cx'

/** El switch: pista de 40×24 con 3 de padding, así que el pulgar es de 18 y viaja 16. Mide 24 de alto porque es el mínimo de WCAG 2.2 para lo que se toca. */
export function Switch({
  checked, onCheckedChange, label, disabled, id, children,
}: {
  /** Es controlado: el estado lo lleva quien lo usa. */
  checked: boolean
  /** Recibe el valor nuevo, no el evento. */
  onCheckedChange: (v: boolean) => void
  /** Va al `aria-label`. Adentro de un `Field` o de un `Row` sobra: el nombre sale de la etiqueta. */
  label?: string
  /** Apagado no se toca ni recibe el foco. */
  disabled?: boolean
  /** Para atarlo a una etiqueta de afuera. Adentro de un `Field` lo toma solo. */
  id?: string
  /** El texto que se ve al lado. El switch lo envuelve en su `<label>` y se centra contra el primer renglón. */
  children?: ReactNode
}) {
  const field = useField()
  const track = (
    <button
      {...field}
      id={id ?? field.id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={field.id || children != null ? undefined : label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cx(
        s.root,
        s.motion,
        s.disabled,
        children != null && s.inLabel,
        checked ? 'switch-track-on' : 'switch-track-off',
      )}
    >
      <span
        className={cx(
          `${s.thumb} switch-thumb`,
          s.thumbMotion,
          checked ? s.thumbOn : s.thumbOff,
        )}
      />
    </button>
  )
  return children == null ? track : <InlineLabel control={track}>{children}</InlineLabel>
}
