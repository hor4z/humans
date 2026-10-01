import s from './tabs.module.css'
import { createContext, useContext, useId, useState, type ComponentPropsWithoutRef } from 'react'
import { cx } from '../lib/cx'
import { useRovingFocus } from '../lib/roving'

type TabsCtx = { value: string; setValue: (v: string) => void; name: string }

const Ctx = createContext<TabsCtx | null>(null)

function useTabs(who: string) {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error(`${who} necesita un <Root> alrededor`)
  return ctx
}

type TabsProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  /** Controlado; sin esto usa defaultValue. */
  value?: string
  /** La solapa abierta al entrar. */
  defaultValue?: string
  /** Avisa qué solapa quedó abierta. */
  onValueChange?: (v: string) => void
}

function Root({ value, defaultValue, onValueChange, className, children, ...props }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const name = useId()
  const current = value ?? internal
  const setValue = (v: string) => {
    if (value === undefined) setInternal(v)
    onValueChange?.(v)
  }
  return (
    <Ctx.Provider value={{ value: current, setValue, name }}>
      <div className={cx(s.root, className)} {...props}>{children}</div>
    </Ctx.Provider>
  )
}

/** La fila de solapas. Las flechas se mueven entre ellas, como pide un tablist. */
function List({ label, className, children, ...props }: ComponentPropsWithoutRef<'div'> & {
  /** De qué son estas solapas. Sin esto un lector las anuncia como "lista de solapas" y con dos en una pantalla no se distinguen. */
  label?: string
}) {
  const rove = useRovingFocus<HTMLDivElement>('[role="tab"]', 'horizontal')
  return (
    <div
      ref={rove.ref}
      role="tablist"
      aria-label={label}
      onKeyDown={rove.onKeyDown}
      className={cx(s.list, className)}
      {...props}
    >
      {children}
    </div>
  )
}

/** Una solapa. El activo se marca con la línea y el azul primario. */
function Tab({ value, className, children, ...props }: ComponentPropsWithoutRef<'button'> & {
  /** Ata la solapa a su panel. */
  value: string
}) {
  const { value: current, setValue, name } = useTabs('Tab')
  const selected = current === value
  return (
    <button
      type="button"
      role="tab"
      id={`${name}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${name}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => setValue(value)}
      className={cx(
        s.tab,
        selected ? s.tabSelected : s.tabPlain,
        className,
      )}
      {...props}
    >
      <span className="weight-steady"><span>{children}</span><span aria-hidden="true">{children}</span></span>
      {selected && <span className={s.marker} />}
    </button>
  )
}

/** El contenido de una solapa. */
function Panel({ value, keepMounted, className, children, ...props }: ComponentPropsWithoutRef<'div'> & {
  /** El mismo valor que su solapa. */
  value: string
  /** Cerrado sigue montado y oculto, así conserva su estado: un formulario a medio llenar, un video. */
  keepMounted?: boolean
}) {
  const { value: current, name } = useTabs('Panel')
  const closed = current !== value
  if (closed && !keepMounted) return null
  return (
    <div
      hidden={closed}
      role="tabpanel"
      id={`${name}-panel-${value}`}
      aria-labelledby={`${name}-tab-${value}`}
      tabIndex={0}
      className={cx(s.panel, className)}
      {...props}
    >
      {children}
    </div>
  )
}

/** Paneles hermanos donde solo se ve uno. Controlado o no, como el resto. */
export const Tabs = Object.assign(Root, { List, Tab, Panel })
