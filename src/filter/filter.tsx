import { Icon, type IconName } from '../icon/icon'
import s from './filter.module.css'
import type { ComponentPropsWithoutRef } from 'react'
import { Avatar } from '../avatar/avatar'
import { Button } from '../button/button'
import { Checkbox } from '../checkbox/checkbox'
import { IconButton } from '../icon-button/icon-button'
import { cx } from '../lib/cx'
import { Popover } from '../popover/popover'

/** La barra de arriba de una tabla: el buscador y los filtros, en una línea. */
function Bar({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cx(s.bar, className)} {...props} />
}

type FilterOption = {
  value: string
  /** Lo que se lee, cuando el valor es un id. Sin esto se lee el valor. */
  label?: string
  /** Se ve tildada y no se puede sacar. */
  locked?: boolean
  /** En cuántas filas cae, contado sobre lo que los otros filtros dejaron. */
  count?: number
  /** La persona, cuando el filtro es de personas. */
  person?: { name: string; src?: string }
}

type FilterProps = {
  /** El rótulo: qué filtra. */
  label: string
  /** Las opciones, con cuántas filas cae en cada una. */
  options: FilterOption[]
  /** Lo elegido. */
  value: string[]
  /** Recibe la lista nueva de valores elegidos. */
  onValueChange: (v: string[]) => void
  /** Con un glifo el disparador es un botón de solo icono, con el rótulo como nombre y como encabezado del panel: para elegir qué se ve y no qué se filtra. */
  icon?: IconName
  className?: string
}

/** Un filtro: un botón que dice qué filtra, y un panel para elegir. */
function Root({ label, options, value, onValueChange, icon, className }: FilterProps) {
  const toggle = (v: string) =>
    onValueChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])

  const faces = options.filter(o => o.person && value.includes(o.value)).map(o => o.person!)

  return (
    <Popover
      align={icon ? 'end' : 'start'}
      width={220}
      trigger={({ onClick, ref, ...rest }) => icon ? (
        <IconButton ref={ref} onClick={onClick} {...rest} icon={icon} label={label} size="sm" variant="muted" className={cx(s.iconTrigger, className)} />
      ) : (
        <Button
          ref={ref}
          onClick={onClick}
          {...rest}
          variant={value.length ? 'brand' : 'muted'}
          size="sm"
          iconEnd={<Icon name="keyboard_arrow_down" />}
        >
          {faces.length > 0 && <Avatar.Group people={faces} size={18} max={3} ring="var(--brand)" className={s.barFaces} />}
          {label}{value.length > 0 && faces.length === 0 && ` · ${value.length}`}
        </Button>
      )}
    >
      {() => (
        <div className={`${s.panel} ui-pop bg-popover`}>
          {icon && <p className={s.panelLabel}>{label}</p>}
          {options.map(o => (
            <label
              key={o.value}
              className={cx(
                s.option,
                o.person ? s.personOption : s.plainOption,
                o.locked && s.locked,
              )}
            >
              <Checkbox
                label={o.count === undefined ? (o.label ?? o.value) : `${o.label ?? o.value}, ${o.count}`}
                checked={o.locked || value.includes(o.value)}
                onCheckedChange={() => !o.locked && toggle(o.value)}
                disabled={o.locked}
              />
              {o.person && <Avatar name={o.person.name} src={o.person.src} size={22} className={s.avatar} />}
              <span aria-hidden="true" className={s.optionLabel}>{o.label ?? o.value}</span>
              {o.count !== undefined && (
                <span aria-hidden="true" className={`${s.optionCount} tabular`}>{o.count}</span>
              )}
            </label>
          ))}
          {!icon && value.length > 0 && (
            <button
              type="button"
              onClick={() => onValueChange([])}
              className={s.clearAll}
            >
              Quitar este filtro
            </button>
          )}
        </div>
      )}
    </Popover>
  )
}

/** El botón que devuelve la tabla a como estaba. */
function Reset({ className, children = 'Limpiar', ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <Button type="button" variant="ghost" size="sm" className={className} {...props}>
      {children}
    </Button>
  )
}

/** Los filtros de una tabla: la barra, cada filtro y el botón que los limpia. */
export const Filter = Object.assign(Root, { Bar, Reset })
