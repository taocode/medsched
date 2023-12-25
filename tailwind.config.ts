import { join } from 'path'
import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/tw-plugin'
import { mtlCustomTheme } from './mtl-custom-theme'

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		),
	],
	theme: {
		extend: {
		},
	},
	plugins: [
		skeleton({
			themes: {
				custom: [
					mtlCustomTheme
				],
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config