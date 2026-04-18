// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import expressiveCode from 'astro-expressive-code';
import remarkBreaks from 'remark-breaks';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkBreaks]
  },

  integrations: [icon(), expressiveCode({
    themes: ["catppuccin-macchiato"]
  })]
});