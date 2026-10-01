import s from './radio.module.css'
import type { ReactNode, Ref } from 'react'
import { cx } from '../lib/cx'
import { useFieldGroup } from '../lib/field-ctx'
import { InlineLabel } from '../lib/inline-label'
import { useRovingRadio } from '../lib/roving'

function Root({
  checked, onCheckedChange, label, disabled, id, tabIndex, ref, size = 'md', children,
}: {
  /** Es controlado. */
  checked: boolean
  /** Un radio solo se prende, así que siempre recibe `true`. */
  onCheckedChange: (checked: boolean) => void
  /** Va al `aria-label`, para cuando no hay texto que se vea. Con hijos sobra. */
  label?: string
  /** Apagado no se elige ni recibe el foco. */
  disabled?: boolean
  /** Para atarlo a una etiqueta de afuera. */
  id?: string
  /** Lo pone `Group` para dejar una sola parada de tabulación. */
  tabIndex?: number
  /** Lo usa `Group` para mover el foco con las flechas. */
  ref?: Ref<HTMLButtonElement>
  /** 16 · 20 · 24: el interlineado del texto de al lado. */
  size?: 'sm' | 'md' | 'lg'
  /** El texto que se ve al lado. El radio lo envuelve en su `<label>` y se centra contra el primer renglón. */
  children?: ReactNode
}) {
  const ring = (
    <button
      ref={ref}
      id={id}
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={children != null ? undefined : label}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={() => onCheckedChange(true)}
      className={cx(s.root, size === 'sm' ? s.rootSm : size === 'lg' ? s.rootLg : s.rootMd, s.disabled)}
    >
      <span className={cx(s.control, s.motion, checked ? s.on : s.off)}>
        <span
          className={cx(
            s.dot,
            checked ? s.dotOn : s.dotOff,
          )}
        />
      </span>
    </button>
  )
  return children == null ? ring : <InlineLabel size={size} control={ring}>{children}</InlineLabel>
}

/** El grupo va suelto: las opciones sobre el papel, cada una con su etiqueta al lado. */
function Group<T extends string>({
  value, onValueChange, options, label, disabled, size, className,
}: {
  /** El valor elegido: es controlado. */
  value: T
  /** Recibe el valor nuevo. */
  onValueChange: (v: T) => void
  /** Las opciones, con su etiqueta. */
  options: readonly { value: T; label: string; disabled?: boolean }[]
  /** Al aria-label del grupo. */
  label?: string
  /** Apaga todas las opciones juntas. */
  disabled?: boolean
  /** El de cada radio. */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const roving = useRovingRadio(value, onValueChange, options)
  const group = useFieldGroup()
  return (
    <div
      role="radiogroup"
      aria-label={label}
      {...(label ? {} : group)}
      onKeyDown={roving.onKeyDown}
      className={cx(s.row, className)}
    >
      {options.map(o => (
        <Root
          key={o.value}
          ref={roving.ref(o.value)}
          checked={o.value === value}
          onCheckedChange={() => onValueChange(o.value)}
          disabled={disabled || o.disabled}
          size={size}
          tabIndex={roving.tabIndex(o.value)}
        >
          {o.label}
        </Root>
      ))}
    </div>
  )
}

/** La elección de una entre varias. */
export const Radio = Object.assign(Root, { Group })
