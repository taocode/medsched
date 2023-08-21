import { defineConfig, presetUno, presetIcons } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  extractors: [
    extractorSvelte(),
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
  ],
})