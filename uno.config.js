import { defineConfig } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  extractors: [
    extractorSvelte(),
  ],
  shortcuts: [
    { logo: 'i-logos:svelte-icon w-6em h-6em transform transition-800 hover:rotate-180' },
  ],
  presets: [
    presetUno(),
    presetIcons(),
  ],
})