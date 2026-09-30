import cls from './confirm-dialog.module.css'
import { createContext, useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Button } from '../button/button'
import { cx } from '../lib/cx'
import { Dialog } from '../lib/dialog'

type Ctx = {
  onCancel: () => void
  onConfirm: () => void
  tone: 'neutral' | 'bad'
  titleId: string
}
const ConfirmContext = createContext<Ctx | null>(null)

function Root({
  open, onOpenChange, onConfirm, children, tone = 'neutral',
}: {
  /** Cerrado no monta nada. */
  open: boolean
  /** Recibe `false` desde el botón de cancelar, el velo y Escape. */
  onOpenChange: (open: boolean) => void
  /** Lo que pasa si dice que sí. */
  onConfirm: () => void
  children: ReactNode
  /** Bad pinta el botón de confirmar y arranca el foco en cancelar. */
  tone?: 'neutral' | 'bad'
}) {
  const onCancel = () => onOpenChange(false)
  return (
    <Dialog open={open} onClose={onCancel} role="alertdialog" centered blurred panelClass={`${cls.panel} ui-zoom bg-surface`}>
      {titleId => (
        <ConfirmContext.Provider value={{ onCancel, onConfirm, tone, titleId }}>
          {children}
        </ConfirmContext.Provider>
      )}
    </Dialog>
  )
}

type PartProps = ComponentPropsWithoutRef<'div'>

/** La cabecera. No lleva X: la salida segura es el botón de cancelar, que ya está a la vista. */
function Header({ className, ...rest }: PartProps) {
  return <div className={cx(cls.header, className)} {...rest} />
}

/** La pregunta, con el nombre de lo que se va a tocar adentro. Es el nombre que anuncia el lector. */
function Title({ className, id, ...rest }: ComponentPropsWithoutRef<'h2'>) {
  const ctx = useContext(ConfirmContext)
  return <h2 id={id ?? ctx?.titleId} className={cx(cls.title, className)} {...rest} />
}

/** Qué más se lleva puesto. */
function Body({ className, ...rest }: PartProps) {
  return <div className={cx(cls.body, className)} {...rest} />
}

/** La fila de los dos botones, contra el borde derecho. */
function Footer({ className, ...rest }: PartProps) {
  return <div className={cx(cls.footer, className)} {...rest} />
}

/** La salida segura. Con `tone="bad"` arranca con el foco. */
function Cancel({ children = 'Cancelar' }: { children?: ReactNode }) {
  const ctx = useContext(ConfirmContext)
  return (
    <Button
      variant="ghost"
      size="sm"
      data-autofocus={ctx?.tone === 'bad' || undefined}
      onClick={ctx?.onCancel}
    >
      {children}
    </Button>
  )
}

/** El verbo de lo que va a pasar, no "Sí". Con `tone="bad"` se pinta y cede el foco. */
function Confirm({ children = 'Aceptar' }: { children?: ReactNode }) {
  const ctx = useContext(ConfirmContext)
  return (
    <Button
      variant={ctx?.tone === 'bad' ? 'bad' : 'brand'}
      size="sm"
      data-autofocus={ctx?.tone === 'bad' ? undefined : true}
      onClick={ctx?.onConfirm}
    >
      {children}
    </Button>
  )
}

/** El diálogo que pregunta antes de algo que no se puede deshacer. Se arma con sus partes, igual que el `Modal`. */
export const ConfirmDialog = Object.assign(Root, { Header, Title, Body, Footer, Cancel, Confirm })
