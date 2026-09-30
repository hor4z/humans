import { describe, expect, it } from 'vitest'
import { highlight, type Lang, type TokenKind } from '../highlight'

const kinds = (code: string, lang?: Lang) => highlight(code, lang).flat()

const kindOf = (code: string, text: string, lang?: Lang): TokenKind | undefined => {
  const at = code.indexOf(text)
  let pos = 0
  for (const line of highlight(code, lang)) {
    for (const t of line) {
      if (at >= pos && at + text.length <= pos + t.text.length) return t.kind
      pos += t.text.length
    }
    pos += 1
  }
  return undefined
}

const joined = (code: string) => highlight(code).map(l => l.map(t => t.text).join('')).join('\n')

const sources = import.meta.glob('../{stories,foundations}/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const examples = Object.entries(sources).flatMap(([file, src]) =>
  [...src.matchAll(/code=\{`((?:[^`\\]|\\.)*)`\}/g)].map(m => [file, m[1].replace(/\\`/g, '`').replace(/\\\$/g, '$')] as const),
)

describe('highlight', () => {
  it('cada ejemplo del sitio sale igual a como entró', () => {
    expect(examples.length).toBeGreaterThan(100)
    for (const [file, code] of examples) expect(joined(code), file).toBe(code)
  })

  it('lo que sale es exactamente lo que entró, renglón por renglón', () => {
    const code = '<Button onClick={() => setOpen(v => !v)}>\n\n  Abrir\n</Button>'
    const lines = highlight(code)
    expect(lines).toHaveLength(4)
    expect(lines.map(l => l.map(t => t.text).join('')).join('\n')).toBe(code)
    expect(lines[1]).toEqual([])
  })

  it('el parámetro de una flecha es un parámetro, no una prop', () => {
    expect(kindOf('setOpen(v => !v)', 'v')).toBe('param')
    expect(kindOf('setOpen(v => !v)', 'setOpen')).toBe('fn')
    expect(kindOf('onValueChange={(query) => buscar(query)}', 'query')).toBe('param')
    expect(kindOf('const f = (v: string, total) => v', 'total')).toBe('param')
    expect(kindOf('const f = (v: string, n) => v', 'string')).toBe('plain')
  })

  it('las llaves tienen su propio tipo', () => {
    expect(kindOf('<Chip open={open} />', '{')).toBe('brace')
    expect(kindOf('<Chip open={open} />', '}')).toBe('brace')
    expect(kindOf("const a = { name: 'x' }", '{')).toBe('brace')
  })

  it('una prop con guion es una sola', () => {
    expect(kindOf('<button aria-expanded={open} />', 'aria-expanded')).toBe('attr')
    expect(kindOf('<button aria-expanded={open} />', 'button')).toBe('tag')
  })

  it('las comillas simples son strings, con sus números adentro', () => {
    expect(kindOf("const a = 'Ana Pérez'", "'Ana Pérez'")).toBe('string')
    expect(kindOf("<Avatar src={'/avatars/01.webp'} />", "'/avatars/01.webp'")).toBe('string')
  })

  it('el texto de un hijo no se pinta: ni sus comillas ni sus números', () => {
    const code = '<ConfirmDialog.Title>¿Borrar "Fracciones" y las 18 entregas?</ConfirmDialog.Title>'
    expect(kindOf(code, '¿Borrar "Fracciones" y las 18 entregas?')).toBe('plain')
    expect(kindOf(code, 'ConfirmDialog.Title')).toBe('component')
  })

  it('un template literal es un string con sus huecos en código', () => {
    const tokens = kinds('<Indicator label={`Avisos ${t}`} />')
    expect(tokens.find(t => t.text.startsWith('`Avisos'))?.kind).toBe('string')
    expect(tokens.find(t => t.text === '${')?.kind).toBe('brace')
    expect(tokens.find(t => t.text === 't')?.kind).toBe('plain')
  })

  it('una etiqueta en minúscula y un fragmento son etiquetas', () => {
    expect(kindOf('<label>Hola</label>', 'label')).toBe('tag')
    expect(kindOf('<>\n  <Chip />\n</>', 'Chip')).toBe('component')
    expect(joined('<>\n  <Chip />\n</>')).toBe('<>\n  <Chip />\n</>')
  })

  it('las claves de un objeto son propiedades, y el spread es puntuación', () => {
    expect(kindOf("<Icon style={{ '--icon-wght': weight }} />", "'--icon-wght'")).toBe('string')
    expect(kindOf("<Chip avatar={{ name: 'Ana' }} />", 'name')).toBe('property')
    expect(kindOf('<Button {...props} />', '...')).toBe('punct')
    expect(kindOf('const { open, onOpen } = useDisclosure()', 'onOpen')).toBe('property')
    expect(kindOf('f(a, b)', 'b')).toBe('plain')
    expect(kindOf('<Button {...props} />', 'Button')).toBe('component')
  })

  it('las palabras clave, las llamadas y los tipos', () => {
    const code = "import { timeAgo } from '@humans/ui/lib/time'\nconst week = [1, 2] as const"
    expect(kindOf(code, 'import')).toBe('keyword')
    expect(kindOf(code, 'from')).toBe('keyword')
    expect(kindOf(code, "'@humans/ui/lib/time'")).toBe('string')
    expect(kindOf(code, 'week')).toBe('plain')
    expect(kindOf(code, 'as')).toBe('keyword')
    expect(kindOf('const toast = useToast()', 'useToast')).toBe('fn')
  })

  it('una comparación no abre una etiqueta ni pinta una prop', () => {
    expect(kindOf("open={open === 'grafico'}", 'open')).toBe('plain')
    const code = 'const ok = n < 3'
    expect(kindOf(code, '<')).toBe('punct')
    expect(kindOf(code, '3')).toBe('number')
  })

  it('un número pegado a una palabra no es un número', () => {
    expect(kindOf('const h2 = true', 'h2')).toBe('plain')
    expect(kindOf('const h2 = true', 'true')).toBe('number')
  })

  it('un comando: el programa, sus banderas y lo demás', () => {
    const code = 'npm run icons -- add rocket_launch'
    expect(kindOf(code, 'npm', 'sh')).toBe('fn')
    expect(kindOf(code, '--', 'sh')).toBe('attr')
    expect(kindOf(code, 'rocket_launch', 'sh')).toBe('plain')
  })

  it('css: la custom property, la propiedad, la función y el número', () => {
    const code = '.card { border-radius: var(--radius-xl); gap: 0.75rem; }'
    expect(kindOf(code, '--radius-xl', 'css')).toBe('token')
    expect(kindOf(code, 'border-radius', 'css')).toBe('property')
    expect(kindOf(code, 'var', 'css')).toBe('fn')
    expect(kindOf(code, '0.75rem', 'css')).toBe('number')
  })
})
