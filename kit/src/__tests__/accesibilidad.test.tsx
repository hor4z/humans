import { render } from '@testing-library/react'
import axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import type { ComponentType } from 'react'
import { ToastProvider } from '@humans/ui/toast'

const modules = import.meta.glob('../{stories,foundations}/*.tsx', { eager: true }) as
  Record<string, Record<string, unknown>>

const views: [string, ComponentType][] = []
for (const [path, mod] of Object.entries(modules)) {
  for (const [name, value] of Object.entries(mod)) {
    if (typeof value !== 'function') continue
    if (!/(Story|Section)$/.test(name)) continue
    views.push([`${path.split('/').pop()} · ${name}`, value as ComponentType])
  }
}

const needsLayout = ['color-contrast', 'target-size', 'scrollable-region-focusable']
const needsPage = ['region', 'landmark-one-main', 'page-has-heading-one', 'bypass', 'html-has-lang', 'document-title', 'landmark-complementary-is-top-level', 'landmark-banner-is-top-level', 'landmark-contentinfo-is-top-level']

const rules = Object.fromEntries([...needsLayout, ...needsPage].map(id => [id, { enabled: false }]))

describe('cada vista pasa axe', () => {
  it('encuentra todas las vistas', () => {
    expect(views.length).toBeGreaterThan(60)
  })

  for (const [name, View] of views) {
    it(`${name} no tiene violaciones de WCAG 2.2 AA`, async () => {
      const { container } = render(<ToastProvider><View /></ToastProvider>)
      const result = await axe.run(container, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
        rules,
        resultTypes: ['violations'],
      })
      const found = result.violations.map(v => `${v.id}: ${v.nodes.slice(0, 2).map(n => n.target.join(' ')).join(', ')}`)
      expect(found, 'el contraste, el blanco de toque y el scroll los mide la auditoría en el navegador; esto es lo que se ve sin layout').toEqual([])
    }, 20000)
  }
})
