import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useTable } from './use-table'

const rows = [
  { name: 'Álgebra', status: 'Abierta', subject: 'Matemática', total: 12 },
  { name: 'Biología', status: 'Abierta', subject: 'Ciencias', total: 4 },
  { name: 'Geometría', status: 'Borrador', subject: 'Matemática', total: 0 },
  { name: 'Química', status: 'Corregida', subject: 'Ciencias', total: 12 },
]
const options = { rows, search: (row: typeof rows[number]) => row.name, fields: { status: (row: typeof rows[number]) => row.status, subject: (row: typeof rows[number]) => row.subject }, sorters: { total: (a: typeof rows[number], b: typeof rows[number]) => a.total - b.total }, pageSize: 2 }

describe('useTable', () => {
  it('busca sin distinguir acentos y vuelve a la primera página', () => {
    const { result } = renderHook(() => useTable(options))
    act(() => result.current.setPage(1))
    act(() => result.current.setQuery(' algebra '))
    expect(result.current.rows.map(row => row.name)).toEqual(['Álgebra'])
    expect(result.current.page).toBe(0)
  })
  it('combina valores con OR y filtros con AND', () => {
    const { result } = renderHook(() => useTable(options))
    act(() => result.current.setFilters({ status: ['Abierta', 'Borrador'], subject: ['Matemática'] }))
    expect(result.current.filteredRows.map(row => row.name)).toEqual(['Álgebra', 'Geometría'])
    expect(result.current.counts('status')).toEqual({ Abierta: 1, Borrador: 1 })
    expect(result.current.counts('subject')).toEqual({ Matemática: 2, Ciencias: 1 })
  })
  it('ordena sin mutar los datos y conserva el orden de los empates', () => {
    const { result } = renderHook(() => useTable(options))
    act(() => result.current.toggleSort('total'))
    expect(result.current.filteredRows.map(row => row.name)).toEqual(['Geometría', 'Biología', 'Álgebra', 'Química'])
    act(() => result.current.toggleSort('total'))
    expect(result.current.filteredRows.map(row => row.name)).toEqual(['Álgebra', 'Química', 'Biología', 'Geometría'])
    expect(rows[0].name).toBe('Álgebra')
  })
  it('acota la página cuando cambia el conjunto de datos', () => {
    const { result, rerender } = renderHook(({ data }) => useTable({ ...options, rows: data }), { initialProps: { data: rows } })
    act(() => result.current.setPage(40))
    expect(result.current.page).toBe(1)
    rerender({ data: rows.slice(0, 1) })
    expect(result.current.page).toBe(0)
    expect(result.current.from).toBe(1)
    expect(result.current.to).toBe(1)
  })
  it('representa el vacío sin intervalos imposibles y permite restablecer', () => {
    const { result } = renderHook(() => useTable(options))
    act(() => result.current.setQuery('inexistente'))
    expect([result.current.from, result.current.to, result.current.total]).toEqual([0, 0, 0])
    act(() => result.current.clear())
    expect(result.current.total).toBe(4)
  })
})
