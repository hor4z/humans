import { useRef } from 'react'

type Option<T extends string> = { value: T; disabled?: boolean }

/** La receta de un grupo donde se elige una opción: flechas para moverse y una sola parada de tabulación. */
export function useRovingRadio<T extends string>(
  value: T,
  onChange: (v: T) => void,
  options: readonly Option<T>[],
) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const live = options.filter(o => !o.disabled)

  const step = (dir: 1 | -1) => {
    if (!live.length) return
    const i = live.findIndex(o => o.value === value)
    const next = live[(i + dir + live.length) % live.length].value
    onChange(next)
    refs.current[next]?.focus()
  }

  return {
    onKeyDown(e: { key: string; preventDefault: () => void }) {
      const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
      if (!dir) return
      e.preventDefault()
      step(dir)
    },
    ref: (v: T) => (el: HTMLButtonElement | null) => { refs.current[v] = el },
    tabIndex: (v: T) =>
      v === value || (!live.some(l => l.value === value) && v === live[0]?.value) ? 0 : -1,
  }
}

/** Las flechas de una fila o columna de controles que ya existen en el DOM: se mueven entre los que casan con `selector`, dan la vuelta en los bordes, y Home y End van a las puntas. */
export function useRovingFocus<T extends HTMLElement>(selector: string, axis: 'horizontal' | 'vertical') {
  const ref = useRef<T>(null)
  const [next, prev] = axis === 'horizontal' ? ['ArrowRight', 'ArrowLeft'] : ['ArrowDown', 'ArrowUp']
  return {
    ref,
    onKeyDown(e: { key: string; preventDefault: () => void }) {
      const step = e.key === next ? 1 : e.key === prev ? -1 : 0
      const edge = e.key === 'Home' ? 0 : e.key === 'End' ? -1 : null
      if (!step && edge === null) return
      const items = [...(ref.current?.querySelectorAll<HTMLElement>(selector) ?? [])]
      if (!items.length) return
      const at = items.indexOf(document.activeElement as HTMLElement)
      if (edge === null && at < 0) return
      e.preventDefault()
      const target = edge !== null ? items.at(edge) : items[(at + step + items.length) % items.length]
      target?.focus()
    },
  }
}
