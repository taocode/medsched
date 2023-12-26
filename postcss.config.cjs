// const postcssNesting = require('postcss-nesting')

// postcss.config.cjs
module.exports = {
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': 'postcss-nesting',
		tailwindcss: {},
		autoprefixer: {},
	},
}