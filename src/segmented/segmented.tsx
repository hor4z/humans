import s from './segmented.module.css'
import { Icon, type IconName } from '../icon/icon'
import { useFieldGroup } from '../lib/field-ctx'
import { cx } from '../lib/cx'
import { useRovingRadio } from '../lib/roving'
import { Tooltip } from '../tooltip/tooltip'

type SegmentedOption<T extends string> = {
  value: T
  /** Con `label` la opción es de texto; sin él, cuadrada con solo el icono. */
  label?: string
  icon?: IconName
  /** Un punto verde al lado: hay algo nuevo en esa opción. */
  dot?: boolean
  /** En las opciones que solo tienen icono: es su nombre y su ayuda. */
  title?: string
  disabled?: boolean
}

/** Un solo segmented para todo: el de texto ("Todas · Abiertas") y el de iconos (grilla · lista) son el mismo componente con distintas opciones. */
export function Segmented<T extends string>({
  value, onValueChange, options, size = 'md', compact, label, disabled,
}: {
  /** La opción elegida: es controlado. */
  value: T
  /** Recibe el valor nuevo. */
  onValueChange: (v: T) => void
  /** Sin label la opción queda cuadrada, solo icono, y title pasa a obligatorio. */
  options: SegmentedOption<T>[]
  /** 36 · 40, las de los controles. */
  size?: 'sm' | 'md'
  /** De 28 y sin pista, para el header de un panel: una pista gris sobre fondo gris agrega una caja que no hace falta. Le gana a `size`. */
  compact?: boolean
  /** Cómo se llama el grupo. Adentro de un `Field` lo toma de la etiqueta. */
  label?: string
  /** Apaga todas las opciones juntas. */
  disabled?: boolean
}) {
  const roving = useRovingRadio(value, onValueChange, options)
  const group = useFieldGroup()

  return (
    <div
      role="radiogroup"
      aria-label={label}
      {...(label ? {} : group)}
      onKeyDown={roving.onKeyDown}
      className={cx(
        s.root,
        compact ? s.railCompact : s.rail,
        !compact && (size === 'sm' ? s.railSm : s.railMd),
      )}
    >
      {options.map(o => {
        const selected = o.value === value
        const iconOnly = !o.label && !!o.icon
        const option = (
          <button
            key={o.value}
            ref={roving.ref(o.value)}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={iconOnly ? o.title : undefined}
            disabled={disabled || o.disabled}
            tabIndex={roving.tabIndex(o.value)}
            onClick={() => onValueChange(o.value)}
            className={cx(
              s.option,
              s.optionMotion,
              s.disabled,
              compact ? s.optionCompact : size === 'sm' ? s.optionSm : s.optionMd,
              iconOnly
                ? (compact ? s.iconOnlyCompact : size === 'sm' ? s.iconOnlySm : s.iconOnlyMd)
                : (compact ? s.padCompact : size === 'sm' ? s.padSm : s.padMd),
              selected
                ? (compact ? s.selectedCompact : s.selected)
                : s.plain,
            )}
          >
            {o.icon && <Icon name={o.icon} size={!compact && size === 'md' ? 20 : 16} />}
            {o.label && <span className="weight-steady"><span>{o.label}</span><span aria-hidden="true">{o.label}</span></span>}
            {o.dot && <span className={s.dot} />}
          </button>
        )
        return iconOnly && o.title
          ? <Tooltip key={o.value} label={o.title}>{option}</Tooltip>
          : option
      })}
    </div>
  )
}
