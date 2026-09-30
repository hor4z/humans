import s from './text-field.module.css'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { useControlId, useField } from '../lib/field-ctx'
import { Icon, type IconName } from '../icon/icon'
import { fieldSizes } from '../lib/control'
import { cx } from '../lib/cx'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** A la izquierda, en gris. */
  icon?: IconName
  /** A la derecha: una unidad, un kbd, un botón. */
  suffix?: ReactNode
  /** 36 · 40 · 44, las del Button. */
  size?: 'sm' | 'md' | 'lg'
  /** Va al contenedor, que es lo que mide y lo que se enfoca. */
  ref?: Ref<HTMLDivElement>
  /** Va al `input` de adentro, para quien necesita enfocarlo desde afuera: un atajo de teclado. */
  inputRef?: Ref<HTMLInputElement>
  /** Recibe el texto nuevo, no el evento. El `onChange` nativo sigue andando. */
  onValueChange?: (v: string) => void
}

/** El campo de texto. */
export function TextField({ icon, suffix, size = 'md', className, ref, inputRef, onChange, onValueChange, ...rest }: TextFieldProps) {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 18 : 20
  const field = useField()
  const id = useControlId(rest.id)
  return (
    <div
      ref={ref}
      onPointerDown={e => {
        if ((e.target as HTMLElement).closest('button, a, input, textarea')) return
        e.preventDefault()
        e.currentTarget.querySelector('input')?.focus()
      }}
      className={cx(
        `${s.root} field`,
        s.disabled,
        fieldSizes[size], className,
      )}
    >
      {icon && <Icon name={icon} size={iconSize} className={`${s.icon} icon-muted`} />}
      <input
        ref={inputRef}
        className={cx(
          s.input,
          s.inputPad,
        )}
        {...field}
        {...rest}
        id={id}
        onChange={e => { onChange?.(e); onValueChange?.(e.target.value) }}
      />
      {suffix}
    </div>
  )
}
