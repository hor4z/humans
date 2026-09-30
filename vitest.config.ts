import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const src = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@humans\/ui\/icons\.meta$/, replacement: `${src}/icons.meta.ts` },
      { find: /^@humans\/ui\/icons$/, replacement: `${src}/icons.gen.ts` },
      { find: /^@humans\/ui\/props$/, replacement: `${src}/props.gen.ts` },
      { find: /^@humans\/ui\/theme\.css$/, replacement: `${src}/theme.css` },
      { find: /^@humans\/ui\/lib\/(.+)$/, replacement: `${src}/lib/$1` },
      { find: /^@humans\/ui\/blocks\/([^/]+)\/([^/]+)$/, replacement: `${src}/blocks/$1/$2/$2` },
      { find: /^@humans\/ui\/([^/]+)$/, replacement: `${src}/$1/$1` },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'kit/**/*.test.{ts,tsx}'],
    css: false,
  },
})
