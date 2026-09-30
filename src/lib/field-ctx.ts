import { createContext, useContext, useId } from 'react'

/** Lo que una superficie de campo le cuenta al control que lleva adentro. */
export type FieldState = { id: string; labelId: string; describedBy?: string; invalid: boolean }

/** Lo comparten `Field` y `Row`, así que no es de ninguna de las dos. */
export const FieldCtx = createContext<FieldState | null>(null)

/** Lo que un grupo de opciones necesita: no toma el id, se nombra con la etiqueta. */
export function useFieldGroup() {
  const ctx = useContext(FieldCtx)
  if (!ctx) return { 'aria-labelledby': undefined, 'aria-describedby': undefined, 'aria-invalid': undefined }
  return {
    'aria-labelledby': ctx.labelId,
    'aria-describedby': ctx.describedBy,
    'aria-invalid': ctx.invalid || undefined,
  }
}

/** El id de un control: el que le pasan, el del `Field` que lo tiene adentro o uno propio. Un campo sin `id` ni `name` es un aviso en DevTools y no se puede atar a una etiqueta. */
export function useControlId(own?: string) {
  const ctx = useContext(FieldCtx)
  const auto = useId()
  return own ?? ctx?.id ?? auto
}

/** Lo que un control necesita para quedar bien atado a su etiqueta. */
export function useField() {
  const ctx = useContext(FieldCtx)
  if (!ctx) return { id: undefined, 'aria-describedby': undefined, 'aria-invalid': undefined }
  return {
    id: ctx.id,
    'aria-describedby': ctx.describedBy,
    'aria-invalid': ctx.invalid || undefined,
  }
}
