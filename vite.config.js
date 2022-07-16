import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // this is where our test scripts are located
    coverage: {
			reporter: ['text', 'json', 'html'],
    }
  }
})