import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pieces } from './scripts/pieces.mjs'

/** Una entrada por pieza y por utilidad: sin barril, el consumidor importa lo que usa. */
function entries() {
  const out: Record<string, string> = {
    'icons.gen': 'src/icons.gen.ts',
    'icons.meta': 'src/icons.meta.ts',
    'props.gen': 'src/props.gen.ts',
  }
  for (const file of readdirSync('src/lib')) {
    if (file.endsWith('.ts') && !file.endsWith('.test.ts')) out[`lib/${file.slice(0, -3)}`] = join('src/lib', file)
  }
  for (const p of pieces('src')) if (p.file) out[p.entry] = p.file
  return out
}

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: entries(), formats: ['es'] },
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client'],
      output: { assetFileNames: 'style.css' },
    },
  },
})
