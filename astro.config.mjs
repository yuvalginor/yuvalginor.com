import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://yuvalginor.com',
  integrations: [
    mdx({
      shikiConfig: { theme: 'github-dark' },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});


