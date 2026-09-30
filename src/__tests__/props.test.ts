import { describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { propsByComponent } from '../props.gen'
import { pieces } from '../../scripts/pieces.mjs'

const root = join(import.meta.dirname, '../..')

describe('la tabla de props sale del código', () => {
  it('props.gen.ts está al día', () => {
    expect(() => execFileSync('node', ['scripts/props.mjs', '--check'], { cwd: root, stdio: 'pipe' })).not.toThrow()
  })

  it('el paths de tsconfig.json y el exports de package.json están al día', () => {
    expect(() => execFileSync('node', ['scripts/paths.mjs', '--check'], { cwd: root, stdio: 'pipe' })).not.toThrow()
  })

  it('cada pieza que el kit documenta existe en el paquete', () => {
    const src = join(root, 'src')
    const declaredNames = new Set<string>()
    for (const dir of [...pieces(src).map(p => p.dir), join(src, 'lib')]) {
      for (const file of readdirSync(dir)) {
        if (!/\.tsx?$/.test(file) || file.endsWith('.test.ts') || file.endsWith('.test.tsx')) continue
        const text = readFileSync(join(dir, file), 'utf8')
        for (const m of text.matchAll(/^export (?:function|const|type) (\w+)/gm)) declaredNames.add(m[1])
      }
    }
    const outside = Object.keys(propsByComponent).filter(p => !declaredNames.has(p.split('.')[0]))
    expect(outside).toEqual([])
  })

  it('el handler se llama por lo que controla: value, checked, pressed, open', () => {
    const pairs: Record<string, string> = { value: 'onValueChange', checked: 'onCheckedChange', pressed: 'onPressedChange', open: 'onOpenChange' }
    const offenders: string[] = []
    for (const [comp, doc] of Object.entries(propsByComponent)) {
      const names = new Set(doc.props.map(p => p.name))
      if (names.has('onChange')) offenders.push(`${comp}: onChange, que es el nombre del evento nativo`)
      for (const [controlled, handler] of Object.entries(pairs)) {
        if (!names.has(controlled)) continue
        const others = [...names].filter(n => /^on[A-Z]\w*Change$/.test(n) && n !== handler && n !== 'onValueChange')
        for (const o of others) offenders.push(`${comp}: ${controlled} va con ${handler}, no con ${o}`)
      }
    }
    expect(offenders, 'un solo nombre por papel: el que lee la API no tiene que adivinar cuál de cuatro usa esta pieza').toEqual([])
  })

  it('lo que se documenta tiene tipo y obligatoriedad, no solo prosa', () => {
    const untyped = Object.entries(propsByComponent)
      .flatMap(([comp, doc]) => doc.props.filter(p => !p.type).map(p => `${comp}.${p.name}`))
    expect(untyped).toEqual([])
  })

  it('una pieza sin props propias dice de qué etiqueta hereda', () => {
    const undocumented = Object.entries(propsByComponent)
      .filter(([, doc]) => doc.props.length === 0 && !doc.html)
      .map(([comp]) => comp)
    expect(undocumented).toEqual([])
  })
})
