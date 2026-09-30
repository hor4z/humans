/** Las piezas del paquete: la base en `src/<pieza>` y los bloques en `src/blocks/<familia>/<pieza>`. La leen el build, los scripts y los guardianes, así ninguno cuenta distinto. */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const skip = new Set(['__tests__', 'lib', 'styles', 'assets', 'blocks'])

const dirs = (base) => readdirSync(base).filter(f => statSync(join(base, f)).isDirectory()).sort()

/** Cada pieza con su carpeta, su subpath y su entrada en el build. */
export function pieces(src) {
  const out = []
  const add = (dir, name, subpath, layer, family) => {
    const file = ['tsx', 'ts'].map(ext => join(dir, `${name}.${ext}`)).find(f => { try { return statSync(f).isFile() } catch { return false } })
    out.push({ name, dir, file, subpath, entry: `${subpath}/${name}`, layer, family })
  }
  for (const name of dirs(src)) if (!skip.has(name)) add(join(src, name), name, name, 'base')
  const blocks = join(src, 'blocks')
  for (const family of dirs(blocks)) {
    for (const name of dirs(join(blocks, family))) add(join(blocks, family, name), name, `blocks/${family}/${name}`, 'blocks', family)
  }
  return out
}

/** Las familias de bloques, en el orden de la carpeta. */
export function families(src) {
  return dirs(join(src, 'blocks'))
}

/** Las piezas del sitio que no son del paquete, en `kit/src/demo/<pieza>`. */
export function demos(kitSrc) {
  const base = join(kitSrc, 'demo')
  return dirs(base).map(name => ({ name, dir: join(base, name), file: join(base, name, `${name}.tsx`) }))
}
