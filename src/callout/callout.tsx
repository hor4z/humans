import s from './callout.module.css'
import type { ComponentPropsWithoutRef } from 'react'
import { IconButton } from '../icon-button/icon-button'
import { Icon, type IconName } from '../icon/icon'
import { labelSoft, type LabelColor } from '../lib/colors'
import { cx } from '../lib/cx'
import { takePart } from '../lib/parts'
import { type Tone, toneIcon, toneInk, toneSurface } from '../lib/tone'

type CalloutProps = ComponentPropsWithoutRef<'div'> & {
  /** Para cuando avisa de algo que pasó: de acá salen el glifo, el papel y la urgencia con que se anuncia. Sin esto es un bloque de contenido. */
  tone?: Tone
  /** El papel de la familia de categorías, para un bloque que no avisa de nada. Pisa al tono. Sin tono ni color va gris. */
  color?: LabelColor | 'neutral'
  /** Sin esto lo pone el tono, y un bloque de color va sin glifo; `null` lo saca siempre. */
  icon?: IconName | null
  /** Agrega la X para cerrarlo; sin esto no se cierra. */
  onDismiss?: () => void
  /** `sm` para adentro de un panel denso, donde el de siempre se lee más grande que las filas de al lado. */
  size?: 'sm' | 'md'
}

/** El renglón que nombra el bloque. */
function Title({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cx(s.title, className)} {...props} />
}

/** La fila de botones: lo que se puede hacer al respecto. */
function Actions({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cx(s.actions, className)} {...props} />
}

function Root({ tone, color, icon, onDismiss, size = 'md', className, children, ...props }: CalloutProps) {
  const paint = color ?? (tone ? undefined : 'neutral')
  const glyph = icon === null ? null : icon ?? (paint || !tone ? null : toneIcon[tone])
  const paper = paint ? (paint === 'neutral' ? s.neutral : labelSoft[paint]) : toneSurface[tone!]
  const role = !tone ? 'note' : tone === 'bad' ? 'alert' : 'status'
  const [title, rest] = takePart(children, Title)
  const [actions, text] = takePart(rest, Actions)
  return (
    <div role={role} className={cx(s.root, size === 'sm' && s.compact, paper, className)} {...props}>
      {glyph && (
        <span className={cx(s.icon, !paint && tone && toneInk[tone])}>
          <Icon name={glyph} size={size === 'sm' ? 16 : 20} />
        </span>
      )}
      <div className={s.body}>
        {title}
        {text.length > 0 && <div className={s.text}>{text}</div>}
        {actions}
      </div>
      {onDismiss && (
        <IconButton icon="close" label="Cerrar el aviso" size="sm" variant="ghost" onClick={onDismiss} className={s.dismiss} />
      )}
    </div>
  )
}

/** Un bloque que pide detenerse: una aclaración o una pista de quien escribe el material, o un aviso fijo del sistema cuando lleva `tone`. */
export const Callout = Object.assign(Root, { Title, Actions })
