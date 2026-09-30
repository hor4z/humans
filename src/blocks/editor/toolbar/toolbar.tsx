import s from './toolbar.module.css'
import { useLayoutEffect, type FocusEvent, type ReactNode } from 'react'
import { IconButton } from '../../../icon-button/icon-button'
import type { IconName } from '../../../icon/icon'
import { cx } from '../../../lib/cx'
import { useRovingFocus } from '../../../lib/roving'
import { ToggleButton } from '../../../toggle-button/toggle-button'

function Root({ label, children, className }: {
  /** Qué controla esta barra. Dos barras sin nombre en una pantalla se leen como una sola. */
  label: string
  children: ReactNode
  className?: string
}) {
  const rove = useRovingFocus<HTMLDivElement>('button:not(:disabled)', 'horizontal')
  const enabledButtons = () => [...(rove.ref.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])]

  const roveTo = (active?: HTMLButtonElement) => {
    const enabled = enabledButtons()
    if (!enabled.length) return
    const target = active && enabled.includes(active) ? active : enabled[0]
    for (const b of enabled) b.tabIndex = b === target ? 0 : -1
  }

  useLayoutEffect(() => { roveTo() })

  return (
    <div
      ref={rove.ref}
      role="toolbar"
      aria-label={label}
      onKeyDown={rove.onKeyDown}
      onFocus={(e: FocusEvent<HTMLDivElement>) => roveTo(e.target.closest('button') ?? undefined)}
      className={cx(`${s.root} bg-popover`, className)}
    >
      {children}
    </div>
  )
}

/** El botón de la barra: siempre un glifo solo, y siempre `sm`. Con `pressed` es un interruptor y lo dice ("negrita, activado"); sin él, una acción que pasa y no queda. */
function Button({ icon, label, pressed, onPressedChange, disabled, onClick }: {
  icon: IconName
  /** Sin esto el botón no dice nada: adentro solo hay un glifo. */
  label: string
  /** Presente lo vuelve un interruptor. Ausente es una acción que pasa y no queda. */
  pressed?: boolean
  /** Recibe el estado nuevo del interruptor. */
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  /** La acción, cuando no es un interruptor. */
  onClick?: () => void
}) {
  if (pressed === undefined) {
    return (
      <IconButton
        icon={icon}
        label={label}
        size="sm"
        disabled={disabled}
        onClick={onClick}
        className={s.button}
      />
    )
  }
  return (
    <ToggleButton
      size="sm"
      icon={icon}
      label={label}
      pressed={pressed}
      disabled={disabled}
      onPressedChange={onPressedChange}
      className={s.button}
    />
  )
}

/** El corte entre dos grupos de la barra. */
function Separator() {
  return <span aria-hidden className={s.separator} />
}

/** La barra de herramientas: una sola parada de tabulación y flechas adentro, como manda un `toolbar`. */
export const Toolbar = Object.assign(Root, { Button, Separator })
