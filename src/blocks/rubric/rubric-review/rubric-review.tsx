import s from './rubric-review.module.css'
import { useId, useState, type ReactNode } from 'react'
import { Avatar } from '../../../avatar/avatar'
import { Button } from '../../../button/button'
import { Chip } from '../../../chip/chip'
import { CriterionCard, namesFor, type Criterion } from '../criterion-card/criterion-card'
import { Icon } from '../../../icon/icon'
import { IconButton } from '../../../icon-button/icon-button'
import { Textarea } from '../../../textarea/textarea'
import { Tooltip } from '../../../tooltip/tooltip'
import { cx } from '../../../lib/cx'
import { labelFill, labelSoft } from '../../../lib/colors'
import { counted } from '../../../lib/number'
import { takePart } from '../../../lib/parts'

export type { Criterion }

/** Quién escribió una devolución. Un agente firma igual que una persona: lo que cambia es el nombre, no lo que puede hacer. */
export type Reviewer = {
  /** Como se lo nombra en la firma. */
  name: string
  /** La foto, si es una persona. */
  src?: string
  /** Lo marca como asistente, para que no se confunda con alguien del curso. */
  assistant?: boolean
}

/** Lo que se dijo sobre un aspecto: uno solo, de quien lo escribió. */
export type Note = {
  by: Reviewer
  text: string
}

/** Cómo le fue a un trabajo en un aspecto. */
export type Mark = {
  /** En qué nivel quedó: el índice del renglón elegido. Los renglones son excluyentes, así que es uno solo. */
  level?: number
  /** El comentario del aspecto, si alguien lo escribió. */
  note?: Note
}

/** Cuánto del tramo se llena: hasta el nivel elegido. */
const part = (mark: Mark, c: Criterion) =>
  mark.level === undefined ? 0 : (mark.level + 1) / c.levels.length

const touched = (mark: Mark) => mark.level !== undefined || !!mark.note

/** Cómo se llama el nivel en el que quedó, para decirlo al costado del nombre. */
const level = (mark: Mark, c: Criterion) =>
  mark.level === undefined
    ? 'sin corregir'
    : namesFor(c)?.[mark.level] ?? `nivel ${mark.level + 1}`

/** Cómo se llama la devolución, en la cabecera. */
function Title({ children }: { children: ReactNode }) {
  return <>{children}</>
}

function Signature({ by }: { by: Reviewer }) {
  return (
    <span className={s.by}>
      {by.assistant
        ? <span aria-hidden className={`${s.bot} ${labelSoft.blue}`}><Icon name="smart_toy" size={14} /></span>
        : <Avatar name={by.name} src={by.src} size={20} />}
      <span className={s.byName}>{by.name}</span>
      {by.assistant && <Chip size="sm" color="blue">asistente</Chip>}
    </span>
  )
}

/** Cómo le fue a un trabajo contra su rúbrica: qué cumplió de cada aspecto y qué le dijeron. Sin `onValueChange` es la devolución que lee quien entregó; con él, la pantalla donde se corrige. */
function Root({ criteria, value, by, onValueChange, children, className }: {
  /** Los aspectos de la rúbrica, en su orden. */
  criteria: Criterion[]
  /** Lo corregido hasta ahora, por id de aspecto. */
  value: Record<string, Mark>
  /** Quién está corrigiendo ahora: firma lo que escriba. Sin esto se eligen niveles pero no se comenta. */
  by?: Reviewer
  /** Recibe todo lo corregido, con el nivel o el comentario nuevo adentro. Sin esto se lee y no se toca. */
  onValueChange?: (next: Record<string, Mark>) => void
  /** El `RubricReview.Title`. */
  children: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState<string | null>(criteria[0]?.id ?? null)
  const [draft, setDraft] = useState<Record<string, string>>({})
  const id = useId()
  const titleId = `${id}-title`

  const [title] = takePart(children, Title)
  const marks = value
  const change = (cid: string, mark: Mark) => onValueChange?.({ ...value, [cid]: mark })
  const total = criteria.reduce((sum, c) => sum + c.weight, 0)
  const ready = criteria.filter(c => touched(marks[c.id] ?? {})).length

  return (
    <section aria-labelledby={titleId} className={cx(s.root, className)}>
      <div className={s.header}>
        <p id={titleId} className={s.title}>{title}</p>
        <span className={`${s.count} tabular`}>
          {ready === criteria.length
            ? 'corregida'
            : `${ready} de ${counted(criteria.length, ['aspecto', 'aspectos'])}`}
        </span>
      </div>

      <div aria-hidden className={s.weights}>
        {criteria.map(c => {
          const mark = marks[c.id] ?? {}
          return (
            <span key={c.id} style={{ flexGrow: c.weight }} className={s.weight}>
              <span
                style={{ inlineSize: `${part(mark, c) * 100}%` }}
                className={`${s.fill} ${labelFill[c.color]}`}
              />
            </span>
          )
        })}
      </div>

      <div className={s.cards}>
        {criteria.map(c => {
          const mark = marks[c.id] ?? {}
          return (
            <CriterionCard
              key={c.id}
              criterion={c}
              total={total}
              value={mark.level}
              onValueChange={onValueChange && (level => change(c.id, { ...mark, level }))}
              meta={level(mark, c)}
              open={open === c.id}
              onOpenChange={next => setOpen(next ? c.id : null)}
            >
              {mark.note && (
                <div className={s.note}>
                  <div className={s.noteTop}>
                    <Signature by={mark.note.by} />
                    {onValueChange && (
                      <Tooltip label="Borrar el comentario">
                        <IconButton
                          icon="delete"
                          label={`Borrar el comentario de ${c.label}`}
                          size="sm"
                          variant="ghost"
                          onClick={() => change(c.id, { level: mark.level })}
                          className={s.noteRemove}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <p className={s.noteText}>{mark.note.text}</p>
                </div>
              )}

              {onValueChange && by && !mark.note && (
                <div className={s.write}>
                  <Textarea
                    value={draft[c.id] ?? ''}
                    placeholder={`Qué le decís sobre ${c.label.toLowerCase()}`}
                    aria-label={`Comentario sobre ${c.label}`}
                    onChange={e => setDraft(d => ({ ...d, [c.id]: e.target.value }))}
                  />
                  <div className={s.writeActions}>
                    <Signature by={by} />
                    <Button
                      size="sm"
                      variant="brand"
                      disabled={!(draft[c.id] ?? '').trim()}
                      onClick={() => {
                        change(c.id, { ...mark, note: { by, text: (draft[c.id] ?? '').trim() } })
                        setDraft(d => ({ ...d, [c.id]: '' }))
                      }}
                    >
                      Comentar
                    </Button>
                  </div>
                </div>
              )}
            </CriterionCard>
          )
        })}
      </div>
    </section>
  )
}

export const RubricReview = Object.assign(Root, { Title })
