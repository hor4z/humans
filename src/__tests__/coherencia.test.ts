import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { demos, pieces } from '../../scripts/pieces.mjs'

const dir = join(import.meta.dirname, '..')
type Source = { name: string; text: string }

function walk(base: string, prefix = ''): string[] {
  return readdirSync(base).flatMap((f: string) => {
    const path = join(base, f)
    if (statSync(path).isDirectory()) return f === '__tests__' ? [] : walk(path, `${prefix}${f}/`)
    return /\.tsx?$/.test(f) && !f.endsWith('.test.tsx') && !f.endsWith('.gen.ts') && !f.startsWith('icons.') ? [`${prefix}${f}`] : []
  })
}

const sources: Source[] = walk(dir).map((f): Source => ({ name: f, text: readFileSync(join(dir, f), 'utf8') }))

const folders = [
  ...pieces(dir).map(p => ({ name: p.name, dir: p.dir })),
  ...demos(join(dir, '../kit/src')).map(d => ({ name: d.name, dir: d.dir })),
]

describe('coherencia del sistema', () => {
  it('ningún componente escribe un color a mano', () => {
    const offenders = sources
      .filter(f => /#[0-9a-fA-F]{3,8}\b/.test(f.text.replace(/^\s*\/\/.*$/gm, '')))
      .map(f => f.name)
    expect(offenders).toEqual([])
  })

  it('una pieza con escalera de tamaños arranca en md', () => {
    const offenders: string[] = []
    for (const f of sources) {
      if (!/\bsize\?:\s*(?:'\w+'\s*\|\s*)*'md'/.test(f.text)) continue
      for (const m of f.text.matchAll(/\bsize\s*=\s*'(\w+)'/g)) {
        if (m[1] !== 'md') offenders.push(`${f.name}: size = '${m[1]}'`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('un panel anclado a un disparador usa la receta de cierre', () => {
    const anchored = sources.filter(f =>
      /getBoundingClientRect\(\)/.test(f.text) && /<Portal[\s>]/.test(f.text))
    const withoutRecipe = anchored.filter(f => !/from '\.\.\/lib\/dismiss'/.test(f.text)).map(f => f.name)
    expect(anchored.length, 'no se encontró ningún panel anclado: el guardián dejó de mirar').toBeGreaterThan(0)
    expect(
      withoutRecipe,
      'mide a su disparador y flota en un portal, así que al scrollear la página se le despega: va useDismiss',
    ).toEqual([])
  })

  it('nada suena solo', () => {
    const offenders = sources
      .filter(f => /\bautoplay\b/i.test(f.text))
      .map(f => f.name)
    expect(offenders, 'nada arranca sin que alguien lo pida').toEqual([])
  })

  it('nadie escribe un reloj ni un relativo a mano', () => {
    const clock = /(?<![\w:/-])\d{1,2}:\d{2}(?![\w:/-])/
    const relative = /\bhace \d+ ?(min\b|h\b|hs\b|d\b|mins\b)/
    const offenders: string[] = []
    for (const f of sources) {
      if (f.name.startsWith('lib/time')) continue
      const text = f.text.replace(/^import .*$/gm, '')
      if (clock.test(text)) offenders.push(`${f.name}: un reloj escrito a mano`)
      if (relative.test(text)) offenders.push(`${f.name}: un relativo con la unidad abreviada`)
    }
    expect(offenders).toEqual([])
  })

  it('los iconos salen de la escala, también cuando el número llega por una tabla', () => {
    const scale = new Set([12, 14, 16, 18, 20, 22, 24])
    const offenders: string[] = []
    for (const f of sources) {
      for (const m of f.text.matchAll(/<Icon\b[^>]*?size=\{([^}]+)\}/gs)) {
        const raw = m[1].trim()
        if (/^\d+$/.test(raw)) {
          if (!scale.has(Number(raw))) offenders.push(`${f.name}: ${raw}`)
          continue
        }
        const key = raw.split('.').pop()!
        if (!/^\w+$/.test(key)) continue
        for (const t of f.text.matchAll(new RegExp(`(?:^|[{,])\\s*${key}:\\s*(\\d+)\\s*,`, 'gm'))) {
          if (!scale.has(Number(t[1]))) offenders.push(`${f.name}: ${key} vale ${t[1]}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  it('ningún var() nombra una custom property que nadie declara', () => {
    const root = join(import.meta.dirname, '../..')
    const css: { name: string; text: string }[] = []
    const tsx: string[] = []
    const walkDir = (base: string, prefix = '') => {
      for (const e of readdirSync(base, { withFileTypes: true })) {
        if (e.isDirectory()) {
          if (!['node_modules', '.git', 'dist', '.vite'].includes(e.name)) walkDir(join(base, e.name), `${prefix}${e.name}/`)
        } else if (e.name.endsWith('.css')) {
          css.push({ name: `${prefix}${e.name}`, text: readFileSync(join(base, e.name), 'utf8') })
        } else if (/\.tsx?$/.test(e.name)) {
          tsx.push(readFileSync(join(base, e.name), 'utf8'))
        }
      }
    }
    walkDir(join(root, 'src'))
    walkDir(join(root, 'kit/src'))

    const declaredProps = new Set<string>()
    for (const f of css) for (const m of f.text.matchAll(/(--[\w-]+)\s*:/g)) declaredProps.add(m[1])
    for (const t of tsx) for (const m of t.matchAll(/['"](--[\w-]+)['"]\s*:/g)) declaredProps.add(m[1])

    const orphans: string[] = []
    for (const f of css) {
      for (const m of f.text.matchAll(/var\(\s*(--[\w-]+)\s*(\)|,)/g)) {
        if (m[2] === ',') continue
        if (declaredProps.has(m[1])) continue
        const line = f.text.slice(0, m.index).split('\n').length
        orphans.push(`${f.name}:${line} ${m[1]}`)
      }
    }
    expect(
      orphans,
      'un var() sin valor ni fallback invalida la declaración entera, sin error y sin que nadie se entere',
    ).toEqual([])
  })

  it('todo lo público se alcanza por su subpath', () => {
    const exports = JSON.parse(readFileSync(join(dir, '../package.json'), 'utf8')).exports as Record<string, unknown>
    const loose = new Set(Object.keys(exports).filter(k => !k.includes('*')).map(k => k.replace(/^\.\//, '')))

    const unreachable: string[] = []
    for (const f of sources) {
      const exported = [...f.text.matchAll(/^export (?:function|const) (\w+)/gm)]
        .map(m => m[1])
        .filter(n => /^[A-Z]/.test(n) || n.startsWith('use'))
      if (!exported.length) continue

      const parts = f.name.split('/')
      const who = `${f.name} (${exported.join(', ')})`

      if (parts.length === 1) { if (!loose.has(parts[0].replace(/\.tsx?$/, ''))) unreachable.push(who); continue }
      if (parts[0] === 'lib') { if (!exports['./lib/*']) unreachable.push(who); continue }
      const [folder, file] = parts.slice(-2)
      const family = parts[0] === 'blocks' && parts.length === 4 ? parts[1] : undefined
      if (parts[0] === 'blocks' && (!family || !exports[`./blocks/${family}/*`])) { unreachable.push(who); continue }
      if (file.replace(/\.tsx?$/, '') !== folder) unreachable.push(who)
    }

    expect(
      unreachable,
      'sin barril, un export se alcanza solo desde pieza/pieza.tsx, lib/x.ts o un subpath nombrado a mano',
    ).toEqual([])
  })

  it('ningún archivo ni carpeta lleva una mayúscula', () => {
    const root = join(dir, '..')
    const withCapital: string[] = []
    const walkDir = (base: string, prefix: string) => {
      for (const e of readdirSync(base, { withFileTypes: true })) {
        if (/[A-Z]/.test(e.name)) withCapital.push(`${prefix}${e.name}`)
        if (e.isDirectory()) walkDir(join(base, e.name), `${prefix}${e.name}/`)
      }
    }
    walkDir(join(root, 'src'), 'src/')
    walkDir(join(root, 'kit/src'), 'kit/src/')
    expect(
      withCapital,
      'el nombre del archivo es el nombre del import: va en kebab aunque el export sea IconButton',
    ).toEqual([])
  })

  it('cada carpeta tiene el componente que le da nombre', () => {
    const missing = folders.filter(c => !readdirSync(c.dir).includes(`${c.name}.tsx`)).map(c => c.name)
    expect(missing).toEqual([])
  })

  it('la base no importa un bloque', () => {
    const offenders = sources
      .filter(f => !f.name.startsWith('blocks/'))
      .filter(f => /from '[^']*\/blocks\/|from '@milo\/ui\/blocks\//.test(f.text))
      .map(f => f.name)
    expect(offenders, 'un bloque se arma con la base; si la base lo necesita, no es un bloque').toEqual([])
  })

  it('un bloque no declara tokens del sistema', () => {
    const offenders: string[] = []
    const walkDir = (base: string, prefix: string) => {
      for (const e of readdirSync(base, { withFileTypes: true })) {
        if (e.isDirectory()) { walkDir(join(base, e.name), `${prefix}${e.name}/`); continue }
        if (!e.name.endsWith('.css')) continue
        const text = readFileSync(join(base, e.name), 'utf8')
        for (const m of text.matchAll(/(?:^|[;{\s])(:root|html|body)\b[^{]*\{/g)) offenders.push(`${prefix}${e.name}: ${m[1]}`)
      }
    }
    walkDir(join(dir, 'blocks'), 'blocks/')
    expect(offenders, 'un bloque usa los tokens de la base: si le falta un rol, el rol es de la base').toEqual([])
  })

  it('ningún botón se olvida el type, que adentro de un form manda el form', () => {
    const offenders: string[] = []
    for (const f of sources) {
      const code = f.text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(?<!:)\/\/.*$/gm, ' ')
      for (const m of code.matchAll(/<button\b[^>]*?>/gs)) {
        if (!m[0].includes('type=')) offenders.push(f.name)
      }
    }
    expect([...new Set(offenders)]).toEqual([])
  })

  it('el código no lleva comentarios: solo el docblock de una línea', () => {
    const offenders: string[] = []
    const walkDir = (base: string, prefix: string) => {
      for (const e of readdirSync(base, { withFileTypes: true })) {
        if (e.isDirectory()) { walkDir(join(base, e.name), `${prefix}${e.name}/`); continue }
        if (!/\.(tsx?|css)$/.test(e.name) || /\.gen\.ts$|^icons\./.test(e.name)) continue
        const text = readFileSync(join(base, e.name), 'utf8')
          .replace(/'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g, '""')
          .replace(/\/(?![*/])(?:[^/\\\n[]|\\.|\[(?:[^\]\\\n]|\\.)*\])+\/[gimsuy]*/g, '""')
        text.split('\n').forEach((line, i) => {
          if (/(^|[^:])\/\/(?!\s*@ts-)/.test(line)) offenders.push(`${prefix}${e.name}:${i + 1}`)
          else if (/\/\*(?!\*)/.test(line)) offenders.push(`${prefix}${e.name}:${i + 1}`)
        })
      }
    }
    walkDir(dir, 'src/')
    walkDir(join(dir, '../kit/src'), 'kit/src/')
    expect(offenders, 'el porqué vive en CLAUDE.md y en las notas del kit, que se leen; un comentario se despega sin que nada lo verifique').toEqual([])
  })

  it('cada componente tiene su test al lado', () => {
    const missing = folders.filter(c => !readdirSync(c.dir).includes(`${c.name}.test.tsx`)).map(c => c.name)
    expect(missing).toEqual([])
  })
})
