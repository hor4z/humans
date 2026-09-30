import s from './copy-button.module.css'
import { IconButton } from '../icon-button/icon-button'
import { cx } from '../lib/cx'
import { useAnnounce } from '../lib/use-announce'
import { useClipboard } from '../lib/use-clipboard'

/** Copiar un texto al portapapeles, con el tilde que avisa que salió bien. El aviso también se anuncia: el cambio de glifo no lo ve quien escucha la pantalla. */
export function CopyButton({ value, label = 'Copiar', copiedLabel = 'Copiado', size = 'md', className }: {
  /** Lo que se copia. */
  value: string
  /** Qué se copia, para quien no ve el glifo. */
  label?: string
  /** Lo que se dice cuando ya está. */
  copiedLabel?: string
  /** La escalera de siempre. */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const { copied, copy } = useClipboard()
  const announce = useAnnounce()
  return (
    <IconButton
      icon={copied ? 'check' : 'content_copy'}
      label={copied ? copiedLabel : label}
      size={size}
      onClick={async () => { if (await copy(value)) announce(copiedLabel) }}
      className={cx(copied && s.done, className)}
    />
  )
}
