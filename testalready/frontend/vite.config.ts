/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite' // opcional p/ testes; pode remover se quiser
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),   // lê "paths" do seu tsconfig (ex.: "@/*": ["src/*"])
    tailwindcss(),     // opcional
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // Adiciona o alias @
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'], // troque p/ .ts se o seu setup não usa JSX
    globals: true,            // habilita describe/it/test/expect/vi sem import
    css: true,               // permite importar CSS sem erro
    include: ['src/test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    allowOnly: false,        // falha se houver .only perdido
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['src/setupTests.ts', 'src/setupTests.tsx']
    }
  }
})

// Se ainda quiser alias manual além do tsconfigPaths, pode manter:
// resolve: {
//   alias: {
//     '@': new URL('./src', import.meta.url).pathname
//   }
// }