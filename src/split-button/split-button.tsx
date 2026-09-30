import s from './split-button.module.css'
import { createContext, useContext, type ReactNode } from 'react'
import { Button } from '../button/button'
import { Icon, type IconName } from '../icon/icon'
import { Menu } from '../menu/menu'
import { Popover } from '../popover/popover'
import { cx } from '../lib/cx'
import { takePart } from '../lib/parts'
import { control } from '../lib/control'

const chevronWidth = { sm: s.sm, md: s.md, lg: s.lg }

const panelWidth = 220

type Ctx = { variant: Variant; size: Size; disabled?: boolean; close: () => void }
const SplitContext = createContext<Ctx | null>(null)

type Variant = 'brand' | 'solid' | 'muted' | 'ghost' | 'bad'
type Size = 'sm' | 'md' | 'lg'

/** La acción que se hace casi siempre: la mitad ancha, la que se toca directo. */
function Action({ onClick, children }: {
  /** Lo que hace la acción principal. */
  onClick?: () => void
  children: ReactNode
}) {
  const ctx = useContext(SplitContext)
  return (
    <Button variant={ctx?.variant} size={ctx?.size} disabled={ctx?.disabled} onClick={onClick}>
      {children}
    </Button>
  )
}

/** Una de las que casi nunca: van adentro del menú que abre la flecha. */
function Item({ icon, danger, disabled, onSelect, children }: {
  /** A la izquierda, en gris. */
  icon?: IconName
  /** Borrar, descartar: lo que no se deshace. */
  danger?: boolean
  disabled?: boolean
  /** Cerrar el menú lo hace la pieza. */
  onSelect?: () => void
  children: ReactNode
}) {
  const ctx = useContext(SplitContext)
  return (
    <Menu.Item icon={icon} danger={danger} disabled={disabled} onSelect={() => { onSelect?.(); ctx?.close() }}>
      {children}
    </Menu.Item>
  )
}

/** La acción que se hace casi siempre, y al lado las que casi nunca. Es lo que evita una fila de cinco botones donde cuatro no se tocan nunca. */
function Root({ variant = 'brand', size = 'md', disabled, menuLabel, children }: {
  /** El mismo juego que `Button`, y vale para las dos mitades. */
  variant?: Variant
  /** La escalera de siempre. */
  size?: Size
  disabled?: boolean
  /** Qué hay en el menú, para quien lo escucha. Sin esto, "Más opciones". */
  menuLabel?: string
  /** El `SplitButton.Action` y los `SplitButton.Item` que van en el menú. */
  children: ReactNode
}) {
  const [action, rest] = takePart(children, Action)
  const [items] = takePart(rest, Item)
  const name = typeof (action[0] as { props?: { children?: unknown } })?.props?.children === 'string'
    ? String((action[0] as { props: { children: string } }).props.children)
    : undefined
  const moreLabel = menuLabel ?? (name ? `Más opciones de ${name}` : 'Más opciones')

  return (
    <div role="group" aria-label={name ?? moreLabel} className={s.root}>
      <SplitContext.Provider value={{ variant, size, disabled, close: () => {} }}>
        {action}
      </SplitContext.Provider>
      <Popover
        width={panelWidth}
        align="end"
        trigger={({ onClick, ref, 'aria-expanded': expanded }) => (
          <Button
            ref={ref}
            variant={variant}
            size={size}
            disabled={disabled}
            aria-label={moreLabel}
            aria-expanded={expanded}
            aria-haspopup="menu"
            onClick={onClick}
            className={cx(s.chevron, chevronWidth[size])}
          >
            <Icon name="keyboard_arrow_down" size={control[size].icon} />
          </Button>
        )}
      >
        {close => (
          <Menu label={moreLabel}>
            <SplitContext.Provider value={{ variant, size, disabled, close }}>
              {items}
            </SplitContext.Provider>
          </Menu>
        )}
      </Popover>
    </div>
  )
}

export const SplitButton = Object.assign(Root, { Action, Item })
