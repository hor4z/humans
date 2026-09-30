import cls from './table.module.css'
import { Children, isValidElement, useState, useRef, useEffect, type ReactNode, type ThHTMLAttributes, type TdHTMLAttributes } from 'react'
import { Icon } from '../icon/icon'
import { Button } from '../button/button'
import { Checkbox } from '../checkbox/checkbox'
import { Popover } from '../popover/popover'
import { Search } from '../search/search'
import { fold } from '../lib/cx'
import { cx } from '../lib/cx'
import { useSideScroll } from '../lib/side-scroll'

function Root({ children, label, minWidth = 640, className }: {
  children: ReactNode
  /** De qué es la tabla. Cuando scrollea se vuelve una región enfocable, y dos regiones que se llaman igual se leen como una sola. */
  label?: string
  /** Abajo de esto la tabla scrollea en vez de apretar las columnas. */
  minWidth?: number
  className?: string
}) {
  const all = Children.toArray(children)
  const footer = all.filter(c => isValidElement(c) && c.type === Footer)
  const body = all.filter(c => !(isValidElement(c) && c.type === Footer))
  const { ref: scroller, scrolls, clipped } = useSideScroll<HTMLDivElement>(body)

  return (
    <div className={cx(`${cls.root} bg-surface`, className)}>
      <div
        ref={scroller}
        tabIndex={scrolls ? 0 : undefined}
        role={scrolls ? 'region' : undefined}
        aria-label={scrolls ? `${label ?? 'Tabla'}, se desplaza de costado` : undefined}
        className={`${cls.scroller} zebra`}
      >
        <table aria-label={label} className={cls.table} style={{ minWidth }}>
          {body}
        </table>
      </div>
      {clipped && (
        <span
          aria-hidden="true"
          className={cls.clipShadow}
        />
      )}
      {scrolls && <p className={cls.scrollHint}><Icon name="compare_arrows" size={16} /> Deslizá para ver todas las columnas</p>}
      {footer}
    </div>
  )
}

/** La cabecera va sobre `--surface-muted` y no sobre el papel: es lo que la separa del cuerpo sin gastar un divisor más grueso. */
function Header({ children }: { children: ReactNode }) {
  return <thead className={cls.head}>{children}</thead>
}

/** El cuerpo de la tabla. */
function Body({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

/** La fila del total, abajo de todo. */
function Foot({ children }: { children: ReactNode }) {
  return (
    <tfoot className={cls.foot}>
      {children}
    </tfoot>
  )
}

/** La última fila se queda sin divisor: abajo ya está el borde de la tabla. */
function Row({ children, onClick, active, className }: {
  children: ReactNode
  /** Sin esto la fila no toma hover ni cursor. */
  onClick?: () => void
  /** Destaca la fila activa sin ocultar el foco del teclado. */
  active?: boolean
  className?: string
}) {
  return (
    <tr
      onClick={onClick ? e => {
        if ((e.target as HTMLElement).closest('button,a,input,select,textarea,[role="checkbox"],[role="switch"],[role="menuitem"],[role="menu"]')) return
        onClick()
      } : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick
        ? e => { if (e.target !== e.currentTarget) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }
        : undefined}
      className={cx(
        cls.row,
        active && cls.active,
        onClick && !active && cls.clickable,
        className,
      )}
    >
      {children}
    </tr>
  )
}

type CellProps = { children?: ReactNode; className?: string }

/** De qué lado del ancho se apoya lo que la celda dice. */
type Align = 'left' | 'right'

/** Un encabezado de columna: 11/600 con tracking, en tinta. */
function Head({ children, scope = 'col', align, className, sort, onSort, ...rest }: CellProps & {
  /** A la derecha cuando la columna es de números, para que el encabezado caiga sobre ellos. */
  align?: Align
  /** Dirección actual, o none si la columna todavía no ordena. */
  sort?: 'ascending' | 'descending' | 'none'
  /** Hace que el encabezado sea un control de orden. */
  onSort?: () => void
} & ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope={scope}
      aria-sort={sort}
      className={cx(cls.headCell, align === 'right' && cls.alignRight, className)}
      {...rest}
    >
      {onSort ? <button type="button" className={cls.sortButton} onClick={onSort}>
        {children}<Icon name={sort === 'ascending' ? 'arrow_upward' : sort === 'descending' ? 'arrow_downward' : 'sort'} size={16} />
        <span className="sr-only">{sort === 'ascending' ? ': ordenar de mayor a menor' : ': ordenar de menor a mayor'}</span>
      </button> : children}
    </th>
  )
}

/** Una celda: 12/500, con el alto de fila de 56. */
function Cell({ children, align, fit, className, ...rest }: CellProps & {
  /** A la derecha cuando lo que lleva se compara hacia abajo. */
  align?: Align
  /** La columna se achica a lo que lleva adentro: para la de acciones, que va al borde. */
  fit?: boolean
} & TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cx(cls.cell, align === 'right' && cls.alignRight, fit && cls.fitCell, className)} {...rest}>
      {children}
    </td>
  )
}

/** La fila entera cuando no hay ninguna: adentro va un `EmptyState`. */
function Empty({ children, colSpan, className }: CellProps & {
  /** Cuántas columnas tiene la tabla ahora mismo: la tabla no las sabe contar sola. */
  colSpan: number
}) {
  return (
    <tr>
      <td colSpan={colSpan} className={cx(cls.emptyCell, className)}>
        {children}
      </td>
    </tr>
  )
}

/** Lo que se lee primero de una fila. */
function Title({ children, className }: CellProps) {
  return <span className={cx(cls.cellTitle, className)}>{children}</span>
}

/** La línea de apoyo debajo del título, en gris. */
function Hint({ children, className }: CellProps) {
  return <span className={cx(cls.cellHint, className)}>{children}</span>
}

/** Una columna de números. */
function Num({ children, className, ...rest }: CellProps & TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cx(`${cls.numberCell} tabular`, className)} {...rest}>
      {children}
    </td>
  )
}

/** La franja de abajo: vive adentro del marco pero fuera del scroll, y ahí va la paginación. Solo marca el lugar, el estilo lo pone lo que va adentro. */
function Footer({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export type TableColumn = { id: string; label: string; locked?: boolean }

/** Configura las columnas visibles sin mezclar presentación y filtros de datos. */
function Columns({ columns, value, onValueChange, defaultValue }: {
  columns: TableColumn[]
  value: string[]
  onValueChange: (value: string[]) => void
  defaultValue?: string[]
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('input, button:not(:disabled)')?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [open])
  const visible = columns.filter(column => column.locked || value.includes(column.id))
  const options = columns.filter(column => fold(column.label).includes(fold(query)))
  const update = (ids: string[]) => onValueChange(columns.filter(column => column.locked || ids.includes(column.id)).map(column => column.id))
  return <Popover align="end" width={288} onOpenChange={open => { setOpen(open); setQuery('') }} trigger={props => <Button {...props} size="sm" variant="muted" iconStart={<Icon name="view_column" />}>Columnas <span className={cls.columnCount}>{visible.length}/{columns.length}</span></Button>}>
    {close => <div ref={panel} className={`${cls.columnPanel} bg-popover`}>
      <div className={cls.columnHeader}><strong>Columnas visibles</strong><span>Elegí los datos que necesitás comparar.</span></div>
      {columns.length > 5 && <Search size="sm" block placeholder="Buscar columna" value={query} onValueChange={setQuery} />}
      <div className={cls.columnOptions}>
        {options.map(column => <label key={column.id} className={cls.columnOption}>
          <Checkbox label={column.label} checked={column.locked || value.includes(column.id)} disabled={column.locked || (visible.length === 1 && value.includes(column.id))} onCheckedChange={checked => update(checked ? [...value, column.id] : value.filter(id => id !== column.id))} />
          <span aria-hidden="true">{column.label}</span>{column.locked && <span className={cls.columnRequired}>Fija</span>}
        </label>)}
        {!options.length && <p className={cls.columnRequired}>No hay columnas con ese nombre.</p>}
      </div>
      <div className={cls.columnActions}><Button size="sm" variant="ghost" onClick={() => update(defaultValue?.length ? defaultValue : columns.map(column => column.id))}>Restablecer</Button><Button size="sm" onClick={close}>Listo</Button></div>
    </div>}
  </Popover>
}

/** La tabla, en piezas. */
export const Table = Object.assign(Root, { Header, Footer, Body, Foot, Row, Head, Cell, Title, Hint, Num, Empty, Columns })
