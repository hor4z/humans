import s from './slider.module.css'
import { useState, type CSSProperties } from 'react'
import { useControlId, useField } from '../lib/field-ctx'
import { cx } from '../lib/cx'

/** Un valor en un rango. */
export function Slider({
  value, onValueChange, min = 0, max = 100, step = 1, disabled, label, id, className,
}: {
  /** Es controlado. */
  value: number
  /** Recibe el número nuevo. */
  onValueChange: (v: number) => void
  /** El extremo de la izquierda. */
  min?: number
  /** El extremo de la derecha. */
  max?: number
  /** El salto entre dos valores. */
  step?: number
  /** Apagado no se arrastra ni recibe el foco. */
  disabled?: boolean
  /** Va al aria-label del input. */
  label?: string
  /** Para atarlo a una etiqueta de afuera. */
  id?: string
  /** El ancho se pone desde afuera. */
  className?: string
}) {
  const field = useField()
  const inputId = useControlId(id)
  const t = max === min ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min)))
  const thumbAt = 'calc(var(--t) * (100% - 24px) + 12px)'
  const fillTo = 'calc(var(--t) * (100% - 24px) + 24px)'
  const [dragging, setDragging] = useState(false)
  const move = dragging ? '' : s.move
  return (
    <span
      className={cx(s.root, disabled && s.disabled, className)}
      style={{ '--t': t } as CSSProperties}
    >
      <span className={`${s.track} switch-track-off`} />
      <span
        className={cx(`${s.fill} switch-track-on`, move)}
        style={{ width: fillTo }}
      />
      <input
        type="range"
        {...field}
        id={inputId}
        aria-label={field.id ? undefined : label}
        min={min} max={max} step={step} value={value}
        disabled={disabled}
        onChange={e => onValueChange(Number(e.target.value))}
        onPointerDown={() => setDragging(true)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onBlur={() => setDragging(false)}
        className={`${s.input} peer`}
      />
      <span
        className={cx(
          `${s.thumb} switch-thumb`,
          s.thumbBody,
          move,
          s.thumbFocus,
        )}
        style={{ left: thumbAt }}
      >
        <span
          className={cx(
            s.dot,
            dragging ? s.dotDragging : s.dotResting,
          )}
        />
      </span>
    </span>
  )
}
