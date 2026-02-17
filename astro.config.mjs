// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  //adapter: node({
  //mode: 'standalone',
  //}),
  adapter: cloudflare(), // Remplace node() par cloudflare()
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
});