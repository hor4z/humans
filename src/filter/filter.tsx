import { Icon, type IconName } from '../icon/icon'
import s from './filter.module.css'
import { useState, type ComponentPropsWithoutRef } from 'react'
import { Avatar } from '../avatar/avatar'
import { Button } from '../button/button'
import { Checkbox } from '../checkbox/checkbox'
import { IconButton } from '../icon-button/icon-button'
import { cx } from '../lib/cx'
import { Search } from '../search/search'
import { fold } from '../lib/cx'
import { Popover } from '../popover/popover'

/** La barra de arriba de una tabla: el buscador y los filtros, en una línea. */
function Bar({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cx(s.bar, className)} {...props} />
}

export type FilterOption = {
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
  /** Resume los valores elegidos en el disparador. */
  summary?: boolean
}

/** Un filtro: un botón que dice qué filtra, y un panel para elegir. */
function Root({ label, options, value, onValueChange, icon, className, summary }: FilterProps) {
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
          variant="muted"
          size="sm"
          iconEnd={<Icon name="keyboard_arrow_down" />}
        >
          {faces.length > 0 && <Avatar.Group people={faces} size={18} max={3} ring="var(--brand)" className={s.barFaces} />}
          {label}{value.length > 0 && faces.length === 0 && (summary ? `: ${options.find(o => o.value === value[0])?.label ?? value[0]}${value.length > 1 ? ` +${value.length - 1}` : ''}` : ` · ${value.length}`)}
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

export type FilterDefinition = { key: string; label: string; options: FilterOption[] }

/** Agrega condiciones a demanda: valores alternativos dentro de cada filtro y combinación entre filtros. */
function Builder({ fields, value, onValueChange }: {
  fields: FilterDefinition[]
  value: Record<string, string[]>
  onValueChange: (value: Record<string, string[]>) => void
}) {
  const [adding, setAdding] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const selected = fields.filter(field => value[field.key]?.length)
  const available = fields.filter(field => !value[field.key]?.length)
  const field = fields.find(field => field.key === adding)
  const update = (key: string, values: string[]) => {
    const next = { ...value }
    if (values.length) next[key] = values
    else delete next[key]
    onValueChange(next)
  }
  return <div className={s.builder}>
    {selected.map(field => <div className={s.condition} key={field.key}>
      <Root label={field.label} summary options={field.options} value={value[field.key]} onValueChange={values => update(field.key, values)} />
      <IconButton icon="close" label={`Quitar filtro ${field.label}`} size="sm" onClick={() => update(field.key, [])} />
    </div>)}
    {<Popover align="start" width={280} onOpenChange={() => { setAdding(null); setQuery('') }} trigger={props => <Button {...props} size="sm" variant="ghost" iconStart={<Icon name="add" />}>Agregar filtro</Button>}>
      {close => <div className={`${s.panel} bg-popover`}>
        {field ? <>
          <div className={s.builderHeader}><IconButton icon="arrow_back" label="Volver a los filtros" size="sm" onClick={() => { setAdding(null); setQuery('') }} /><strong>{field.label}</strong></div>
          <Search autoFocus value={query} onValueChange={setQuery} placeholder="Buscar un valor" size="sm" block />
          <div className={s.optionList}>
            {field.options.filter(option => fold(option.label ?? option.value).includes(fold(query))).map(option => <label key={option.value} className={`${s.option} ${s.plainOption}`}>
              <Checkbox label={option.label ?? option.value} checked={value[field.key]?.includes(option.value) ?? false} onCheckedChange={checked => update(field.key, checked ? [...(value[field.key] ?? []), option.value] : (value[field.key] ?? []).filter(v => v !== option.value))} />
              <span className={s.optionLabel} aria-hidden="true">{option.label ?? option.value}</span>
              {option.count !== undefined && <span className={s.optionCount}>{option.count}</span>}
            </label>)}
            {!field.options.some(option => fold(option.label ?? option.value).includes(fold(query))) && <p className={s.panelLabel}>No hay valores con ese nombre.</p>}
          </div>
          <Button size="sm" block onClick={close}>Listo</Button>
        </> : <><p className={s.panelLabel}>Filtrar por</p>{available.map((option, index) => <button autoFocus={index === 0} type="button" key={option.key} className={`${s.option} ${s.plainOption}`} onClick={() => setAdding(option.key)}><span className={s.optionLabel}>{option.label}</span><Icon name="chevron_right" size={16} /></button>)}{!available.length && <p className={s.panelLabel}>Ya agregaste todos los filtros disponibles.</p>}</>}
      </div>}
    </Popover>}
    {selected.length > 1 && <Reset onClick={() => onValueChange({})}>Limpiar filtros</Reset>}
  </div>
}

/** Los filtros de una tabla: condiciones, barra y acciones de limpieza. */
export const Filter = Object.assign(Root, { Bar, Reset, Builder })
