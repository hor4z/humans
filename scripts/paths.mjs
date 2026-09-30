/** Escribe el `paths` de tsconfig.json con una entrada por pieza, y en el `exports` de package.json una por familia de bloques: TypeScript admite una sola estrella por sustitución, y un patrón con estrella no puede repetir la familia. Con `--check` falla si alguno quedó viejo. */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pieces, families } from './pieces.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'src')

const paths = {
  '@humans/ui/icons.meta': ['./src/icons.meta.ts'],
  '@humans/ui/icons': ['./src/icons.gen.ts'],
  '@humans/ui/props': ['./src/props.gen.ts'],
  '@humans/ui/lib/*': ['./src/lib/*'],
}
for (const p of pieces(src)) if (p.file) paths[`@humans/ui/${p.subpath}`] = [`./${relative(root, p.file)}`]

const tsconfigFile = join(root, 'tsconfig.json')
const tsconfig = JSON.parse(readFileSync(tsconfigFile, 'utf8'))
tsconfig.compilerOptions.paths = paths

const pkgFile = join(root, 'package.json')
const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'))
const { './*': rest, ...fixed } = pkg.exports
const kept = Object.fromEntries(Object.entries(fixed).filter(([k]) => !k.startsWith('./blocks/')))
const blocks = Object.fromEntries(families(src).map(f => [`./blocks/${f}/*`, {
  types: `./dist/blocks/${f}/*/*.d.ts`,
  import: `./dist/blocks/${f}/*/*.js`,
}]))
pkg.exports = { ...kept, ...blocks, './*': rest }

const files = [
  [tsconfigFile, JSON.stringify(tsconfig, null, 2) + '\n'],
  [pkgFile, JSON.stringify(pkg, null, 2) + '\n'],
]

if (process.argv.includes('--check')) {
  const stale = files.filter(([file, body]) => readFileSync(file, 'utf8') !== body).map(([file]) => relative(root, file))
  if (stale.length) {
    console.error(`✗ quedó viejo ${stale.join(' y ')}: corré \`npm run paths\``)
    process.exit(1)
  }
  console.log(`✓ paths y exports al día (${Object.keys(paths).length} entradas)`)
} else {
  for (const [file, body] of files) writeFileSync(file, body)
  console.log(`✓ ${Object.keys(paths).length} entradas en paths, ${Object.keys(blocks).length} familias en exports`)
}
