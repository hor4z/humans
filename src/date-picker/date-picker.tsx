import cls from './date-picker.module.css'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useField } from '../lib/field-ctx'
import { Icon } from '../icon/icon'
import { fieldSizes } from '../lib/control'
import { cx } from '../lib/cx'
import { useEscape } from '../lib/esc'
import { useAnchor } from '../lib/anchor'
import { useDismiss } from '../lib/dismiss'
import { useFocusTrap } from '../lib/overlay-hooks'
import { Portal } from '../portal/portal'

const DAYS = ['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do']

const parts = (iso: string) => iso.split('-').map(Number) as [number, number, number]
const text = (y: number, m: number, d: number) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
const today = () => {
  const d = new Date()
  return text(d.getFullYear(), d.getMonth() + 1, d.getDate())
}

/** Cuántos días tiene el mes. El día 0 del siguiente es el último de este. */
const long = (y: number, m: number) => new Date(y, m, 0).getDate()

/** Lunes es 0: la semana empieza el lunes y no el domingo, como en el aula. */
const firstDay = (y: number, m: number) => (new Date(y, m - 1, 1).getDay() + 6) % 7

const monthLong = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' })
const dayLong = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const inWords = (iso: string) => {
  const [y, m, d] = parts(iso)
  return dayLong.format(new Date(y, m - 1, d))
}

/** Elegir una fecha: un campo que abre un mes. */
export function DatePicker({ value, onValueChange, min, max, placeholder = 'Elegir fecha', label, size = 'md', width, disabled }: {
  /** La fecha elegida como `AAAA-MM-DD`, o vacío. */
  value: string
  /** Recibe la fecha nueva en el mismo formato. */
  onValueChange: (v: string) => void
  /** Nada antes de este día. Para un vencimiento, el de hoy. */
  min?: string
  /** Nada después de este día. */
  max?: string
  /** Lo que dice el campo mientras no hay fecha. */
  placeholder?: string
  /** De qué es la fecha. Sin esto lo pone el `Field` de alrededor. */
  label?: string
  /** 36 · 40 · 44, las de los demás campos. */
  size?: 'sm' | 'md' | 'lg'
  /** Sin esto toma el ancho del contenido. */
  width?: number
  /** Apagado no abre ni recibe el foco. */
  disabled?: boolean
}) {
  const field = useField()
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(() => value || today())
  const btn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const gridId = useId()
  const titleId = useId()

  const close = () => { setOpen(false); btn.current?.focus() }
  useEscape(open, close)
  useFocusTrap(open, panel)

  useEffect(() => { if (open) setCursor(value || today()) }, [open, value])

  const pos = useAnchor(open, btn, panel, {}, [cursor])

  useDismiss(open, () => setOpen(false), [panel, btn])

  const [ay, am] = parts(cursor)
  const weeks = useMemo(() => {
    const blanks = firstDay(ay, am)
    const total = long(ay, am)
    const cells: (string | null)[] = Array(blanks).fill(null)
    for (let d = 1; d <= total; d++) cells.push(text(ay, am, d))
    while (cells.length % 7) cells.push(null)
    return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7))
  }, [ay, am])

  const isOutOfRange = (iso: string) => (min ? iso < min : false) || (max ? iso > max : false)

  const move = (step: number) => {
    const [y, m, d] = parts(cursor)
    const target = new Date(y, m - 1, d + step)
    setCursor(text(target.getFullYear(), target.getMonth() + 1, target.getDate()))
  }
  const moveMonth = (step: number) => {
    const [y, m, d] = parts(cursor)
    const target = new Date(y, m - 1 + step, 1)
    const ny = target.getFullYear()
    const nm = target.getMonth() + 1
    setCursor(text(ny, nm, Math.min(d, long(ny, nm))))
  }

  const onKey = (e: React.KeyboardEvent) => {
    const jumps: Record<string, () => void> = {
      ArrowLeft: () => move(-1),
      ArrowRight: () => move(1),
      ArrowUp: () => move(-7),
      ArrowDown: () => move(7),
      PageUp: () => moveMonth(e.shiftKey ? -12 : -1),
      PageDown: () => moveMonth(e.shiftKey ? 12 : 1),
      Home: () => move(-((parts(cursor)[2] + firstDay(ay, am) - 1) % 7)),
      End: () => move(6 - ((parts(cursor)[2] + firstDay(ay, am) - 1) % 7)),
    }
    const jump = jumps[e.key]
    if (jump) { e.preventDefault(); jump(); return }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!isOutOfRange(cursor)) { onValueChange(cursor); close() }
    }
  }

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector<HTMLElement>('[data-cursor="true"]')?.focus({ preventScroll: true })
  }, [open, cursor])

  return (
    <>
      <button
        ref={btn}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        {...field}
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        style={{ width }}
        className={cx(cls.root, fieldSizes[size], 'field-focus')}
      >
        <span className={cx(cls.value, !value && cls.placeholder)}>
          {value ? inWords(value) : placeholder}
        </span>
        <Icon name="calendar_month" size={16} className={`${cls.calendarIcon} icon-muted`} />
      </button>

      {open && (
        <Portal>
          <div
            ref={panel}
            role="dialog"
            aria-labelledby={titleId}
            tabIndex={-1}
            style={{ top: pos.top, left: pos.left }}
            className={`${cls.panel} ui-pop bg-popover`}
          >
            <div className={cls.header}>
              <button
                type="button"
                onClick={() => moveMonth(-1)}
                aria-label="Mes anterior"
                className={cls.prev}
              >
                <Icon name="chevron_left" size={18} className="icon-muted" />
              </button>
              <span id={titleId} aria-live="polite" className={cls.monthName}>
                {monthLong.format(new Date(ay, am - 1, 1))}
              </span>
              <button
                type="button"
                onClick={() => moveMonth(1)}
                aria-label="Mes siguiente"
                className={cls.next}
              >
                <Icon name="chevron_right" size={18} className="icon-muted" />
              </button>
            </div>

            <div role="grid" id={gridId} aria-labelledby={titleId} className={cls.grid}>
              <div role="row" className={cls.weekdays}>
                {DAYS.map(d => (
                  <span key={d} role="columnheader" aria-label={d} className={cls.weekday}>
                    {d}
                  </span>
                ))}
              </div>
              {weeks.map((week, s) => (
                <div key={s} role="row" className={cls.week}>
                  {week.map((iso, i) => {
                    if (!iso) return <span key={`h${i}`} role="gridcell" />
                    const isSelected = iso === value
                    const isToday = iso === today()
                    const isBlocked = isOutOfRange(iso)
                    return (
                      <button
                        key={iso}
                        type="button"
                        role="gridcell"
                        data-cursor={iso === cursor}
                        data-autofocus={iso === cursor ? true : undefined}
                        tabIndex={iso === cursor ? 0 : -1}
                        aria-selected={isSelected}
                        aria-disabled={isBlocked || undefined}
                        aria-label={`${inWords(iso)}${isToday ? ', hoy' : ''}`}
                        onKeyDown={onKey}
                        onClick={() => { if (!isBlocked) { onValueChange(iso); close() } }}
                        className={cx(
                          cls.day,
                          isSelected ? cls.selected
                            : isBlocked ? cls.blocked
                              : cls.plain,
                        )}
                      >
                        {parts(iso)[2]}
                        {isToday && !isSelected && (
                          <span aria-hidden="true" className={cls.today} />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
