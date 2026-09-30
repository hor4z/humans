import { useMemo, useState } from 'react'
import { fold } from './cx'

export type TableSort = { key: string; direction: 'asc' | 'desc' }
export type TableFilters = Record<string, string[]>

/** Búsqueda, filtros combinables, orden estable y paginación para tablas en memoria. */
export function useTable<T>({ rows, search, fields = {}, sorters = {}, pageSize = 10, initialSort }: {
  rows: readonly T[]
  search: (row: T) => string
  fields?: Record<string, (row: T) => string | string[]>
  sorters?: Record<string, (a: T, b: T) => number>
  pageSize?: number
  initialSort?: TableSort
}) {
  const [query, updateQuery] = useState('')
  const [filters, updateFilters] = useState<TableFilters>({})
  const [sort, updateSort] = useState<TableSort | undefined>(initialSort)
  const [page, updatePage] = useState(0)
  const size = Math.max(1, Math.floor(pageSize) || 1)
  const searched = useMemo(() => {
    const q = fold(query.trim())
    return q ? rows.filter(row => fold(search(row)).includes(q)) : [...rows]
  }, [rows, search, query])
  const matches = (row: T, except?: string) => Object.entries(filters).every(([key, selected]) => {
    if (key === except || !selected.length || !fields[key]) return true
    const value = fields[key](row)
    return selected.some(item => Array.isArray(value) ? value.includes(item) : item === value)
  })
  const filtered = useMemo(() => searched.filter(row => matches(row)), [searched, filters, fields])
  const sorted = useMemo(() => {
    const compare = sort && sorters[sort.key]
    return compare ? [...filtered].sort((a, b) => compare(a, b) * (sort.direction === 'asc' ? 1 : -1)) : filtered
  }, [filtered, sort, sorters])
  const pageCount = Math.max(1, Math.ceil(sorted.length / size))
  const currentPage = Math.min(page, pageCount - 1)
  const pageRows = useMemo(() => sorted.slice(currentPage * size, (currentPage + 1) * size), [sorted, currentPage, size])
  const counts = (key: string) => {
    const result: Record<string, number> = {}
    if (!fields[key]) return result
    for (const row of searched) {
      if (!matches(row, key)) continue
      const value = fields[key](row)
      for (const item of new Set(Array.isArray(value) ? value : [value])) result[item] = (result[item] ?? 0) + 1
    }
    return result
  }
  return {
    query, filters, sort, page: currentPage, pageCount, rows: pageRows, filteredRows: sorted, total: sorted.length,
    from: sorted.length ? currentPage * size + 1 : 0, to: Math.min((currentPage + 1) * size, sorted.length), counts,
    setQuery: (value: string) => { updateQuery(value); updatePage(0) },
    setFilters: (value: TableFilters) => { updateFilters(value); updatePage(0) },
    setSort: (value: TableSort | undefined) => { updateSort(value); updatePage(0) },
    toggleSort: (key: string) => { updateSort(current => ({ key, direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc' })); updatePage(0) },
    setPage: (value: number) => updatePage(Math.max(0, Math.min(Math.floor(value) || 0, pageCount - 1))),
    clear: () => { updateQuery(''); updateFilters({}); updatePage(0) },
  }
}
