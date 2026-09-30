import s from './alert.module.css'
import type { ComponentPropsWithoutRef } from 'react'
import { IconButton } from '../icon-button/icon-button'
import { Icon, type IconName } from '../icon/icon'
import { labelSoft, type LabelColor } from '../lib/colors'
import { cx } from '../lib/cx'
import { type Tone, toneIcon, toneInk, toneSurface } from '../lib/tone'

type AlertProps = ComponentPropsWithoutRef<'div'> & {
  /** De acá salen el glifo, el color y la urgencia con que se anuncia. */
  tone?: Tone
  /** El papel de la familia de categorías, para un bloque de contenido que no avisa de nada: reemplaza al tono y trae el glifo solo si se lo pasan. */
  color?: LabelColor | 'neutral'
  /** Sin esto lo pone el tono; `null` lo saca. */
  icon?: IconName | null
  /** Agrega la X para cerrarlo; sin esto no se cierra. */
  onDismiss?: () => void
  /** `sm` para adentro de un panel denso, donde el de siempre se lee más grande que las filas de al lado. */
  size?: 'sm' | 'md'
}

function Root({ tone = 'info', color, icon, onDismiss, size = 'md', className, children, ...props }: AlertProps) {
  const glyph = icon === null ? null : icon ?? (color ? null : toneIcon[tone])
  const paper = color ? (color === 'neutral' ? s.neutral : labelSoft[color]) : toneSurface[tone]
  return (
    <div
      role={tone === 'bad' ? 'alert' : 'status'}
      className={cx(s.root, size === 'sm' && s.compact, paper, className)}
      {...props}
    >
      {glyph && (
        <span className={cx(s.icon, !color && toneInk[tone])}>
          <Icon name={glyph} size={size === 'sm' ? 16 : 18} />
        </span>
      )}
      <div className={s.body}>{children}</div>
      {onDismiss && (
        <IconButton icon="close" label="Descartar" size="sm" variant="ghost" onClick={onDismiss} className={s.dismiss} />
      )}
    </div>
  )
}

/** El renglón que nombra el aviso. */
function Title({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cx(s.title, className)} {...props} />
}

/** Qué pasó y qué se puede hacer. */
function Body({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cx(s.text, className)} {...props} />
}

/** La fila de botones del aviso. */
function Actions({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cx(s.actions, className)} {...props} />
}

/** Un aviso fijo en la página: algo pasó o algo hay que saber antes de seguir. */
export const Alert = Object.assign(Root, { Title, Body, Actions })
