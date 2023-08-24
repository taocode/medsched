import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite'

export default defineConfig({
	plugins: [
		UnoCSS(),
		sveltekit(),
	],
	ssr: {
		external: ['firebase','firebase-admin'],
	},
	// experimental: {
	// 	esmExternals: false
	// }
});
