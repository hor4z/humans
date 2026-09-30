import s from './progress.module.css'
import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { takePart } from '../lib/parts'

type ProgressProps = ComponentPropsWithoutRef<'div'> & {
  /** El `Progress.Label` con lo que mide y el `Progress.Hint` con el número. */
  children?: ReactNode
  /** Lo hecho, en las unidades de max. */
  value: number
  /** El total contra el que se mide. */
  max?: number
  /** Solo si no hay `Progress.Label`: el nombre de la barra para quien no la ve. */
  label?: string
  /** `brand` para lo que avanza y `ok` para lo que terminó; `warn` y `bad` solo cuando llenar la barra es el problema. */
  tone?: 'brand' | 'ok' | 'warn' | 'bad'
  /** `sm` es la barra fina, para la que va pegada a un encabezado. */
  size?: 'sm' | 'md'
}

const fillTone = { brand: s.fillBrand, ok: s.fillOk, warn: s.fillWarn, bad: s.fillBad }

/** Qué mide, arriba a la izquierda. Es el nombre de la barra. */
function Label({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/** El número al costado. */
function Hint({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function Root({ value, max = 100, label, tone = 'brand', size = 'md', className, children, ...props }: ProgressProps) {
  const [shown, rest] = takePart(children, Label)
  const [hint] = takePart(rest, Hint)
  const clamped = Math.min(max, Math.max(0, value))
  const pct = (clamped / (max || 1)) * 100
  const id = useId()
  return (
    <div className={cx(s.root, className)} {...props}>
      {(shown.length > 0 || hint.length > 0) && (
        <div className={s.header}>
          <span id={id} className={s.label}>{shown}</span>
          {hint.length > 0 && <span className={`${s.hint} tabular`}>{hint}</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-labelledby={shown.length > 0 ? id : undefined}
        aria-label={shown.length > 0 ? undefined : label}
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cx(s.track, size === 'sm' && s.thin)}
      >
        <div className={cx(s.fill, fillTone[tone])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

/** Cuánto de algo va hecho. La pista es el resto, no un segundo dato. */
export const Progress = Object.assign(Root, { Label, Hint })
