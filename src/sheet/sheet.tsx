import s from './sheet.module.css'
import { createContext, useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { IconButton } from '../icon-button/icon-button'
import { cx } from '../lib/cx'
import { Dialog } from '../lib/dialog'

type Ctx = { onClose: () => void; titleId: string }
const SheetContext = createContext<Ctx | null>(null)

function Root({
  open, onOpenChange, children, side = 'right', width = 460, label,
}: {
  /** Cerrado no monta nada. */
  open: boolean
  /** Recibe `false` desde Escape, el velo y la X del header. */
  onOpenChange: (open: boolean) => void
  children: ReactNode
  /** De qué lado entra. La derecha es de donde vienen las cosas nuevas. */
  side?: 'right' | 'left'
  /** El ancho del panel en px. */
  width?: number
  /** Solo si no hay `Sheet.Title`: con título, el nombre sale de ahí. */
  label?: string
}) {
  const onClose = () => onOpenChange(false)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      label={label}
      panelClass={cx(`${s.panel} ui-slide bg-surface`, side === 'right' ? s.right : s.left)}
      panelStyle={{ width, maxWidth: '100%', ['--slide-from' as string]: side === 'right' ? '100%' : '-100%' }}
    >
      {titleId => (
        <SheetContext.Provider value={{ onClose, titleId }}>
          {children}
        </SheetContext.Provider>
      )}
    </Dialog>
  )
}

/** La cabecera del panel: adentro va `Title`, y la X la pone ella. */
function Header({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
  const ctx = useContext(SheetContext)
  return (
    <div className={cx(s.header, className)} {...rest}>
      <div className={s.heading}>{children}</div>
      {ctx && (
        <IconButton icon="close" label="Cerrar" size="sm" variant="ghost" onClick={ctx.onClose} />
      )}
    </div>
  )
}

/** El título, y de paso el nombre que anuncia el lector: se ata solo. */
function Title({ className, id, ...rest }: ComponentPropsWithoutRef<'h2'>) {
  const ctx = useContext(SheetContext)
  return <h2 id={id ?? ctx?.titleId} className={cx(s.title, className)} {...rest} />
}

/** El cuerpo del panel: lo único que scrollea. */
function Body({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cx(s.body, className)} {...props} />
}

/** La fila de acciones, abajo y siempre a la vista. */
function Footer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cx(s.footer, className)} {...props} />
}

/** El panel que entra desde un costado: un formulario largo sin cambiar de pantalla. */
export const Sheet = Object.assign(Root, { Header, Title, Body, Footer })
