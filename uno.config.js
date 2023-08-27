import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  extractors: [
    extractorSvelte(),
  ],
  theme: {
    colors: {
      'primary': 'var(--color-theme-1,purple)',
      'primary-light': 'var(--color-theme-1-light,purple)',
      'primary-dark': 'var(--color-theme-1-dark,purple)',
    },
  },
  shortcuts: [
    { 'btn': 'uppercase py-1 px-2 rounded transition duration-200'},
    { 'btn-primary': 'bg-primary text-white hover:decoration-none hover:bg-primary-dark'}
  ],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        // these will extend the default theme
        // sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
        sans: [
          {
            name: 'Kanit',
            weights: ['400', '700'],
            italic: true,
          },
        ],
      },
      // mono: ['Fira Code', 'Fira Mono:400,700'],
    })
  ],
})