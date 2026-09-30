import cls from './nav.module.css'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cx } from '../lib/cx'
import { Icon, type IconName } from '../icon/icon'

type ItemState = {
  /** Dónde estás parado: la barra de la izquierda y el `aria-current`. */
  current?: boolean
  /** El riel de 72: queda el icono y nada más. */
  collapsed?: boolean
  /** El caso aparte que sí se apaga, como un item que todavía no se puede abrir. */
  muted?: boolean
}

/** Las clases del item, para quien lo dibuja con su propio elemento: el `NavLink` de un router. */
function itemClass({ current, collapsed, muted }: ItemState = {}) {
  return cx(
    cls.item,
    cls.motion,
    collapsed ? cls.collapsed : cls.expanded,
    current ? cls.current : muted ? cls.muted : cls.plain,
  )
}

/** Las clases del subitem: la sangría es la columna del texto del padre, no un valor nuevo. */
function subItemClass({ current }: Pick<ItemState, 'current'> = {}) {
  return cx(cls.subitem, cls.subitemMotion, current ? cls.subitemCurrent : cls.subitemPlain)
}

type BodyProps = {
  /** El glifo del set; para uno propio va `glyph`. */
  icon?: IconName
  /** Para cuando el glifo no sale del set: la carpeta de color de un espacio. */
  glyph?: ReactNode
  /** Hundido como un kbd: un contador no es accionable. */
  badge?: string
  /** El riel de 72: queda el icono y nada más. */
  collapsed?: boolean
  /** El texto del item, que se esconde al contraerse. */
  children: ReactNode
}

/** Lo de adentro del item: el glifo, el texto y el contador. */
function Body({ icon, glyph, badge, collapsed, children }: BodyProps) {
  return (
    <>
      <span className={cls.glyphSlot}>
        <span className={cls.glyph}>
          {glyph ?? (icon && <Icon name={icon} size={20} className={cls.icon} />)}
        </span>
      </span>
      {!collapsed && <span className={cls.label}>{children}</span>}
      {!collapsed && badge && <span className={`${cls.count} inset-relief tabular`}>{badge}</span>}
    </>
  )
}

/** Un item del riel. Es un botón; para un link de router van `Nav.itemClass` y `Nav.Body`. */
function Item({ current, collapsed, muted, icon, glyph, badge, children, className, ...props }:
  ItemState & Omit<BodyProps, 'collapsed'> & Omit<ComponentPropsWithoutRef<'button'>, 'children'>) {
  return (
    <button
      type="button"
      aria-current={current ? 'page' : undefined}
      title={collapsed && typeof children === 'string' ? children : undefined}
      className={cx(itemClass({ current, collapsed, muted }), className)}
      {...props}
    >
      <Body icon={icon} glyph={glyph} badge={badge} collapsed={collapsed}>{children}</Body>
    </button>
  )
}

/** Un subitem, debajo de su padre. */
function SubItem({ current, className, ...props }: Pick<ItemState, 'current'> & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      aria-current={current ? 'page' : undefined}
      className={cx(subItemClass({ current }), className)}
      {...props}
    />
  )
}

/** El riel: un `<nav>` con su nombre, y los items uno debajo del otro. */
function Root({ label, className, ...props }: {
  /** Va al `aria-label`: con dos navegaciones en la página, es lo que las distingue. */
  label: string
} & ComponentPropsWithoutRef<'nav'>) {
  return <nav aria-label={label} className={cx(cls.root, className)} {...props} />
}

/** La navegación de una app: el riel y sus items. */
export const Nav = Object.assign(Root, { Item, SubItem, Body, itemClass, subItemClass })
