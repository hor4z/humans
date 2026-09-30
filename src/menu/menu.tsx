import cls from './menu.module.css'
import type { ReactNode } from 'react'
import { cx } from '../lib/cx'
import { useRovingFocus } from '../lib/roving'
import { takePart } from '../lib/parts'
import { Kbd } from '../kbd/kbd'
import { Icon, type IconName } from '../icon/icon'

function Root({ children, label, width, className }: {
  children: ReactNode
  /** Qué menú es. Sin esto un lector lo anuncia como "menú" y nada más, y con dos abiertos en una pantalla no se distinguen. */
  label?: string
  /** Opcional: sin él, el panel mide lo que su contenido. */
  width?: number
  className?: string
}) {
  const rove = useRovingFocus<HTMLDivElement>('[role^="menuitem"]:not(:disabled)', 'vertical')

  return (
    <div
      ref={rove.ref}
      role="menu"
      aria-label={label}
      onKeyDown={rove.onKeyDown}
      style={width ? { width } : undefined}
      className={cx(
        `${cls.root} ui-pop bg-popover`,
        cls.separator,
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Una fila del menú. */
/** El atajo, a la derecha, en un `Kbd`. */
function Shortcut({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/** Una línea de apoyo a la derecha, en gris. */
function Hint({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function Item({
  children, icon, checked, submenu, danger, disabled, onSelect, className,
}: {
  children: ReactNode
  /** A la izquierda, en gris. */
  icon?: IconName
  /** El tilde de "esta es la que está puesta". */
  checked?: boolean
  /** El chevron de "hay otro nivel". */
  submenu?: boolean
  /** Borrar, salir, revocar: lo que no se deshace. */
  danger?: boolean
  /** Apagada y a la vista: las flechas la saltean. */
  disabled?: boolean
  /** Cerrar el panel es de quien lo abrió. */
  onSelect?: () => void
  className?: string
}) {
  const [shortcut, withoutShortcut] = takePart(children, Shortcut)
  const [hint, text] = takePart(withoutShortcut, Hint)
  return (
    <button
      type="button"
      disabled={disabled}
      role={checked === undefined ? 'menuitem' : 'menuitemradio'}
      aria-checked={checked}
      onClick={onSelect}
      className={cx(
        cls.item,
        cls.itemMotion,
        cls.disabled,
        danger ? cls.danger : cls.plain,
        className,
      )}
    >
      {icon && <Icon name={icon} size={20} weight={400} className={cls.icon} />}
      <span className={cls.label}>{text}</span>
      {shortcut.length > 0 && <Kbd>{shortcut}</Kbd>}
      {hint.length > 0 && <span className={cls.hint}>{hint}</span>}
      {checked && <Icon name="check" size={18} />}
      {submenu && <Icon name="chevron_right" size={18} className={`${cls.submenuChevron} icon-muted`} />}
    </button>
  )
}

/** El rótulo de un grupo de opciones. */
function Label({ children }: { children: ReactNode }) {
  return (
    <div role="presentation" className={cls.groupLabel}>
      {children}
    </div>
  )
}

/** El menú, en piezas. */
export const Menu = Object.assign(Root, { Item, Label, Shortcut, Hint })
