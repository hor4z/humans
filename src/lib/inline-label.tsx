import s from './inline-label.module.css'
import type { ReactNode } from 'react'
import { cx } from './cx'

/** El texto al lado de una casilla, un radio o un switch. Es un `<label>` de verdad: tocar el texto acciona el control, y el control toma su nombre de ahí. */
export function InlineLabel({ size = 'md', control, children }: {
  /** La letra que va con el control: `meta`, `body` o `reading`, cuyo interlineado mide lo mismo que la caja. */
  size?: 'sm' | 'md' | 'lg'
  /** El control, que va primero. */
  control: ReactNode
  /** El texto. */
  children: ReactNode
}) {
  return (
    <label className={cx(s.root, size === 'sm' ? s.rootSm : size === 'lg' ? s.rootLg : s.rootMd)}>
      {control}
      <span className={s.text}>{children}</span>
    </label>
  )
}
