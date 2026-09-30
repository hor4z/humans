/** Cuántas filas caen en cada valor de una columna: lo que muestra cada opción de un filtro. */
export function facets<T>(rows: T[], of: (row: T) => string | undefined | null): Record<string, number> {
  const tally: Record<string, number> = {}
  for (const row of rows) {
    const k = of(row)
    if (k == null) continue
    tally[k] = (tally[k] ?? 0) + 1
  }
  return tally
}
