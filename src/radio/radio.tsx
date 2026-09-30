import s from './radio.module.css'
import type { Ref } from 'react'
import { cx } from '../lib/cx'
import { useRovingRadio } from '../lib/roving'

function Root({
  checked, onCheckedChange, label, disabled, id, tabIndex, ref,
}: {
  /** Es controlado. */
  checked: boolean
  /** Un radio solo se prende, así que siempre recibe `true`. */
  onCheckedChange: (checked: boolean) => void
  /** Va al `aria-label`. */
  label?: string
  /** Apagado no se elige ni recibe el foco. */
  disabled?: boolean
  /** Para atarlo a una etiqueta de afuera. */
  id?: string
  /** Lo pone `Group` para dejar una sola parada de tabulación. */
  tabIndex?: number
  /** Lo usa `Group` para mover el foco con las flechas. */
  ref?: Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={() => onCheckedChange(true)}
      className={cx(
        s.root,
        s.motion,
        s.disabled,
        checked ? s.on : s.off,
      )}
    >
      <span
        className={cx(
          s.dot,
          checked ? s.dotOn : s.dotOff,
        )}
      />
    </button>
  )
}

/** El grupo va suelto: las opciones sobre el papel, cada una con su etiqueta al lado. */
function Group<T extends string>({
  value, onValueChange, options, label, className,
}: {
  /** El valor elegido: es controlado. */
  value: T
  /** Recibe el valor nuevo. */
  onValueChange: (v: T) => void
  /** Las opciones, con su etiqueta. */
  options: readonly { value: T; label: string; disabled?: boolean }[]
  /** Al aria-label del grupo. */
  label?: string
  className?: string
}) {
  const roving = useRovingRadio(value, onValueChange, options)
  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={roving.onKeyDown}
      className={cx(s.row, className)}
    >
      {options.map(o => (
        <Root
          key={o.value}
          ref={roving.ref(o.value)}
          checked={o.value === value}
          onCheckedChange={() => onValueChange(o.value)}
          label={o.label}
          disabled={o.disabled}
          tabIndex={roving.tabIndex(o.value)}
        />
      ))}
    </div>
  )
}

/** La elección de una entre varias. */
export const Radio = Object.assign(Root, { Group })
