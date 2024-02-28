import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/galaxia',
  outDir: '../../dist',
  lang: 'en-US',
  title: 'Galaxia Docs',
  description: 'Galaxia Framework Documentation',
  cleanUrls: true,
  lastUpdated: false,
  vite: {
    build: {
      target: 'esnext',
      minify: 'esbuild'
    },
    resolve: {
      alias: {
        paintor: 'galaxia/v1/bundle.js'
      }
    }
  },
  themeConfig: {
    nav: [
      {
        text: 'View on GitHub',
        link: 'https://github.com/AseasRoa/galaxia'
      }
    ],
    /*
     * target: "_self" makes it so the page is actually reloaded,
     * which is needed for pages with live scripts
     */
    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          {
            text: 'What is Galaxia?',
            link: '/introduction/what-is-galaxia',
            target: "_self"
          }
        ]
      }
    ]
  }
})
