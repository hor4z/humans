import { render, screen, act } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PrefsProvider } from '../demo/prefs/prefs'
import { App } from '../app'

const app = readFileSync(join(import.meta.dirname, '../app.tsx'), 'utf8')
const entries = [...app.matchAll(/id: '([\w-]+)',\s*label: '([^']*)'/g)].map(m => ({ id: m[1], label: m[2] }))
const loose = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'documento', label: 'Documento' },
]

const goTo = (id: string) => act(() => {
  location.hash = id
  dispatchEvent(new HashChangeEvent('hashchange'))
})

beforeAll(() => {
  if (!window.scrollTo) window.scrollTo = () => {}
})

describe('el sitio entero', () => {
  it('encuentra todas las entradas del riel', () => {
    expect(entries.length).toBeGreaterThan(60)
  })

  it('la portada se dibuja', () => {
    location.hash = ''
    render(<PrefsProvider><App /></PrefsProvider>)
    expect(screen.getByRole('heading', { name: /Ideas para explorar\. Proyectos para compartir\./ })).toBeInTheDocument()
  })

  it('la portada no manda a ninguna vista que no exista', () => {
    const ids = new Set([...entries.map(e => e.id), ...loose.map(s => s.id)])
    const intro = readFileSync(join(import.meta.dirname, '../intro.tsx'), 'utf8')
    const targets = [
      ...[...intro.matchAll(/go\('([\w-]+)'\)/g)].map(m => m[1]),
      ...[...intro.matchAll(/\{ id: '([\w-]+)',/g)].map(m => m[1]),
    ].filter(d => d !== 'intro')
    expect(targets.length).toBeGreaterThan(3)
    expect(targets.filter(d => !ids.has(d))).toEqual([])
  })

  for (const { id, label } of [...entries, ...loose]) {
    it(`#${id} abre ${label}`, () => {
      location.hash = ''
      render(<PrefsProvider><App /></PrefsProvider>)
      goTo(id)
      expect(
        screen.queryByText('Esa vista ya no está acá'),
        `#${id} no resuelve a ninguna vista`,
      ).toBeNull()
      expect(document.querySelectorAll('main h1, main h2').length).toBeGreaterThan(0)
    })
  }
})
