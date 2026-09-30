import { describe, expect, it } from 'vitest'
import { facets } from './facets'

describe('facets', () => {
  it('cuenta por clave y saltea nulos', () => {
    const rows = [{ e: 'a' }, { e: 'b' }, { e: 'a' }, { e: undefined }]
    expect(facets(rows, f => f.e)).toEqual({ a: 2, b: 1 })
  })
})
