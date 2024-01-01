import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'

export default defineConfig({
	plugins: [UnoCSS(), sveltekit(), purgeCss()],
})
