import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  server: {
    host: true, // used to allow traffic when in a container
    watch: {
      usePolling: true // required for WSL/docker windows filesystem mount (CAUTION: CPU heavy)
    }
  },
  plugins: [sveltekit()]
});
