// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import icon from 'astro-icon';

import expressiveCode from 'astro-expressive-code';
import remarkBreaks from 'remark-breaks';


// https://astro.build/config
export default defineConfig({
  site: "https://blog.minittu.net",
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkBreaks]
  },

  integrations: [icon(), expressiveCode({
    themes: ["catppuccin-macchiato"]
  }), react()]
});