import cls from './task-list.module.css'
import { Checkbox } from '../../../checkbox/checkbox'
import { cx } from '../../../lib/cx'

export type Task = {
  /** Único en la lista. */
  id: string
  /** Lo que hay que hacer. */
  label: string
  done?: boolean
}

type TaskListProps = {
  /** Las tareas, en el orden en que van. */
  value: Task[]
  /** Recibe la lista entera, con la tarea recién marcada adentro. Sin esto se lee y no se toca. */
  onValueChange?: (next: Task[]) => void
  /** De qué es la lista. Sin esto un lector anuncia "lista, cuatro elementos" y nada más. */
  label: string
  /** Apagada se lee y no se toca: la consigna de otro, una entrega ya cerrada. */
  readOnly?: boolean
  className?: string
}

/** Cosas para hacer, que se marcan al hacerlas: los pasos de una entrega, lo que falta de una actividad. */
export function TaskList({ value, onValueChange, label, readOnly, className }: TaskListProps) {
  const still = readOnly || !onValueChange
  return (
    <ul aria-label={label} className={cx(cls.root, className)}>
      {value.map(t => (
        <li key={t.id}>
          <label className={cx(cls.item, !still && cls.editable)}>
            <span className={cls.control}>
              <Checkbox checked={!!t.done} disabled={still} onCheckedChange={done => onValueChange?.(value.map(x => (x.id === t.id ? { ...x, done } : x)))} />
            </span>
            <span className={cx(cls.text, t.done ? cls.doneText : cls.pendingText)}>{t.label}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}
