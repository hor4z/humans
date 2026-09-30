import s from './self-assessment.module.css'
import { useId, useState, type ReactNode } from 'react'
import { Collapsible } from '../../../collapsible/collapsible'
import { CriterionCard, namesFor, type Criterion } from '../criterion-card/criterion-card'
import { Progress } from '../../../progress/progress'
import { cx } from '../../../lib/cx'
import { counted } from '../../../lib/number'
import { useDisclosure } from '../../../lib/use-disclosure'
import { takePart } from '../../../lib/parts'

export type { Criterion }

/** Cómo se llama la autoevaluación, en la cabecera. */
function Title({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/** Dónde se ubica quien entrega, aspecto por aspecto, contra la rúbrica con la que lo van a mirar. Es la misma tarjeta que usa quien corrige, así que lo que el docente escribe es lo que el estudiante lee. Los niveles son excluyentes: va uno solo, porque son descripciones del mismo estado. */
function Root({ criteria, value, onValueChange, defaultOpen = true, children, className }: {
  /** Los aspectos de la rúbrica, en su orden. */
  criteria: Criterion[]
  /** En qué nivel se ubicó cada aspecto, por id. */
  value: Record<string, number>
  /** Recibe todos los niveles, con el que se acaba de elegir adentro. */
  onValueChange: (next: Record<string, number>) => void
  /** Arranca abierta. Plegada deja a la vista el nombre, lo que falta y la barra. */
  defaultOpen?: boolean
  /** El `SelfAssessment.Title`. */
  children: ReactNode
  className?: string
}) {
  const [openCard, setOpenCard] = useState<string | null>(criteria[0]?.id ?? null)
  const panel = useDisclosure(defaultOpen)
  const id = useId()
  const titleId = `${id}-title`
  const bodyId = `${id}-body`

  const [title] = takePart(children, Title)
  const total = criteria.reduce((sum, c) => sum + c.weight, 0)
  const placed = criteria.filter(c => value[c.id] !== undefined).length
  const missing = criteria.length - placed

  const level = (c: Criterion) => {
    const level = value[c.id]
    if (level === undefined) return 'sin ubicar'
    return namesFor(c)?.[level] ?? `nivel ${level + 1}`
  }

  return (
    <section aria-labelledby={titleId} className={cx(s.root, className)}>
      <div className={s.header}>
        <button
          type="button"
          aria-expanded={panel.open}
          aria-controls={bodyId}
          aria-labelledby={titleId}
          onClick={panel.onToggle}
          className={s.trigger}
        >
          <Collapsible.Chevron open={panel.open} />
        </button>
        <p id={titleId} className={s.title}>{title}</p>
        <span className={`${s.count} tabular`}>
          {missing === 0 ? 'lista' : counted(missing, ['aspecto', 'aspectos'])}
        </span>
      </div>

      <Progress value={placed} max={criteria.length} label="Aspectos resueltos" className={s.progress} />

      <Collapsible open={panel.open} id={bodyId}>
          <ul className={s.items}>
            {criteria.map(c => (
              <li key={c.id}>
                <CriterionCard
                  criterion={c}
                  total={total}
                  value={value[c.id]}
                  onValueChange={level => onValueChange({ ...value, [c.id]: level })}
                  meta={level(c)}
                  open={openCard === c.id}
                  onOpenChange={next => setOpenCard(next ? c.id : null)}
                />
              </li>
            ))}
          </ul>
      </Collapsible>
    </section>
  )
}

export const SelfAssessment = Object.assign(Root, { Title })
