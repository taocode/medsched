import {
	defineConfig,
	presetUno,
	presetIcons,
	presetWebFonts,
} from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
	extractors: [extractorSvelte()],
	theme: {
		colors: {
			primary: 'var(--color-theme-1,purple)',
			'primary-light': 'var(--color-theme-1-light,purple)',
			'primary-dark': 'var(--color-theme-1-dark,purple)',
		},
	},
	presets: [
		// presetUno(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
				// ...
			},
		}),
		presetWebFonts({
			provider: 'google',
			fonts: {
				sans: [
					{
						name: 'Kanit',
						weights: ['400', '700'],
						italic: true,
					},
				],
			},
		}),
	],
})
