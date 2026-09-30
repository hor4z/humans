/** Saca la tabla de props de cada pieza del código: el tipo y el default del componente, la descripción del docblock de la prop. Con `--check` falla si lo escrito quedó viejo. */
import ts from 'typescript'
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { pieces, demos } from './pieces.mjs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const src = join(dirname(fileURLToPath(import.meta.url)), '../src')
const kitSrc = join(src, '../kit/src')
const out = join(src, 'props.gen.ts')
const siteOut = join(kitSrc, 'demo/props.gen.ts')

/** Lo que el kit necesita de una prop para dibujar su fila. */
const extract = (file) => {
  const text = readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const alias = new Map()
  const pieces = {}

  const clean = (s) => s.replace(/\s+/g, ' ').trim()

  const docDe = (node) => {
    const docs = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc)
    const text = docs.map(d => typeof d.comment === 'string' ? d.comment : (d.comment ?? []).map(c => c.text).join('')).join(' ')
    return clean(text)
  }

  const members = (type) => {
    if (!type) return []
    if (ts.isTypeLiteralNode(type)) return type.members
    if (ts.isIntersectionTypeNode(type)) return type.types.flatMap(members)
    if (ts.isTypeReferenceNode(type)) {
      const t = alias.get(type.typeName.getText(sf))
      return t ? members(t) : []
    }
    return []
  }

  /** Qué etiqueta nativa hereda la pieza: `ComponentPropsWithoutRef<'div'>` y sus primos. */
  const native = (type) => {
    if (!type) return undefined
    if (ts.isIntersectionTypeNode(type)) return type.types.map(native).find(Boolean)
    if (ts.isTypeReferenceNode(type)) {
      const name = type.typeName.getText(sf)
      const arg = type.typeArguments?.[0]?.getText(sf)?.replace(/['"]/g, '')
      if (/^(ComponentPropsWithoutRef|ComponentProps|HTMLAttributes)$/.test(name) && arg) return arg
      const m = name.match(/^(\w+?)HTMLAttributes$/)
      if (m) {
        const tags = { Button: 'button', Input: 'input', Textarea: 'textarea', Th: 'th', Td: 'td', Anchor: 'a' }
        return tags[m[1]] ?? m[1].toLowerCase()
      }
      const t = alias.get(name)
      return t ? native(t) : undefined
    }
    return undefined
  }

  ts.forEachChild(sf, (n) => {
    if (ts.isTypeAliasDeclaration(n)) alias.set(n.name.text, n.type)
  })

  /** Lo que el kit dibuja de una función: sus props, de qué etiqueta hereda y su docblock. */
  const read = (n) => {
    const param = n.parameters?.[0]
    if (!param) return null

    const defaults = new Map()
    if (param.name && ts.isObjectBindingPattern(param.name)) {
      for (const el of param.name.elements) {
        if (el.initializer) defaults.set(el.name.getText(sf), clean(el.initializer.getText(sf)))
      }
    }

    const rows = []
    for (const m of members(param.type)) {
      if (!ts.isPropertySignature(m) || !m.name) continue
      const prop = m.name.getText(sf)
      rows.push({
        name: prop,
        type: clean(m.type?.getText(sf) ?? 'unknown'),
        required: !m.questionToken,
        def: defaults.get(prop),
        doc: docDe(m) || undefined,
      })
    }
    const html = native(param.type)
    const doc = docDe(n)
    if (!rows.length && !html) return null
    return { props: rows, ...(html ? { html } : {}), ...(doc ? { doc } : {}) }
  }

  const locales = new Map()
  ts.forEachChild(sf, (n) => {
    if (ts.isFunctionDeclaration(n) && n.name) locales.set(n.name.text, n)
  })

  const enFamilia = new Set()
  ts.forEachChild(sf, (n) => {
    if (!ts.isVariableStatement(n)) return
    if (!n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) return
    for (const decl of n.declarationList.declarations) {
      const name = decl.name.getText(sf)
      if (!/^[A-Z]/.test(name)) continue
      const call = decl.initializer
      if (!call || !ts.isCallExpression(call)) continue
      if (call.expression.getText(sf) !== 'Object.assign') continue

      const [root, partes] = call.arguments
      const raizNode = locales.get(root?.getText(sf))
      if (raizNode) {
        enFamilia.add(root.getText(sf))
        const doc = docDe(n) || docDe(decl)
        const leido = read(raizNode)
        if (leido) pieces[name] = doc ? { ...leido, doc } : leido
      }
      if (!partes || !ts.isObjectLiteralExpression(partes)) continue
      for (const prop of partes.properties) {
        const alias = prop.name?.getText(sf)
        const destino = ts.isShorthandPropertyAssignment(prop)
          ? alias
          : ts.isPropertyAssignment(prop) ? prop.initializer.getText(sf) : null
        if (!alias || !destino) continue
        const parteNode = locales.get(destino)
        if (!parteNode) continue
        enFamilia.add(destino)
        const leido = read(parteNode)
        if (leido) pieces[`${name}.${alias}`] = leido
      }
    }
  })

  ts.forEachChild(sf, (n) => {
    if (!ts.isFunctionDeclaration(n) || !n.name) return
    if (!n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) return
    const name = n.name.text
    if (!/^[A-Z]/.test(name) || enFamilia.has(name)) return
    const leido = read(n)
    if (leido) pieces[name] = leido
  })

  ts.forEachChild(sf, (n) => {
    if (!ts.isTypeAliasDeclaration(n)) return
    if (!n.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) return
    const rows = []
    for (const m of members(n.type)) {
      if (!ts.isPropertySignature(m) || !m.name) continue
      rows.push({
        name: m.name.getText(sf),
        type: clean(m.type?.getText(sf) ?? 'unknown'),
        required: !m.questionToken,
        doc: docDe(m) || undefined,
      })
    }
    const doc = docDe(n)
    if (rows.length) pieces[n.name.text] = { props: rows, ...(doc ? { doc } : {}) }
  })

  return pieces
}

const all = {}
for (const p of pieces(src).sort((a, b) => a.name.localeCompare(b.name))) if (p.file?.endsWith('.tsx')) Object.assign(all, extract(p.file))

const site = {}
for (const d of demos(kitSrc)) {
  try { statSync(d.file) } catch { continue }
  Object.assign(site, extract(d.file))
}

const render = (map) => `/* Generado por scripts/props.mjs: no se edita a mano.
   La descripción de cada prop vive en su docblock, al lado del tipo. */

export type PropDoc = {
  name: string
  type: string
  required: boolean
  def?: string
  doc?: string
}

/** Lo propio de la pieza, y la etiqueta nativa cuyos atributos pasa de largo. */
export type ComponentDoc = {
  props: PropDoc[]
  html?: string
  doc?: string
}

export const propsByComponent: Record<string, ComponentDoc> = ${JSON.stringify(map, null, 2)}
`

const siteBody = `/* Generado por scripts/props.mjs: no se edita a mano. */

import type { ComponentDoc } from '@humans/ui/props'

export const sitePropsByComponent: Record<string, ComponentDoc> = ${JSON.stringify(site, null, 2)}
`
const outputs = [[out, render(all)], [siteOut, siteBody]]

if (process.argv.includes('--check')) {
  const stale = outputs.filter(([file, body]) => { try { return readFileSync(file, 'utf8') !== body } catch { return true } })
  if (stale.length) {
    console.error('✗ props.gen.ts quedó viejo: corré `npm run props`')
    process.exit(1)
  }
  console.log(`✓ props.gen.ts al día (${Object.keys(all).length} piezas, ${Object.keys(site).length} del sitio)`)
} else {
  for (const [file, body] of outputs) writeFileSync(file, body)
  console.log(`✓ ${Object.keys(all).length} piezas, ${Object.values(all).flatMap(p => p.props).length} props, ${Object.keys(site).length} del sitio`)
}
