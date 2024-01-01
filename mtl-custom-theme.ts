import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin'

export const mtlCustomTheme: CustomThemeConfig = {
	name: 'mtl-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #035c11
		'--color-primary-50': '217 231 219', // #d9e7db
		'--color-primary-100': '205 222 207', // #cddecf
		'--color-primary-200': '192 214 196', // #c0d6c4
		'--color-primary-300': '154 190 160', // #9abea0
		'--color-primary-400': '79 141 88', // #4f8d58
		'--color-primary-500': '3 92 17', // #035c11
		'--color-primary-600': '3 83 15', // #03530f
		'--color-primary-700': '2 69 13', // #02450d
		'--color-primary-800': '2 55 10', // #02370a
		'--color-primary-900': '1 45 8', // #012d08
		// secondary | #4d37b9
		'--color-secondary-50': '228 225 245', // #e4e1f5
		'--color-secondary-100': '219 215 241', // #dbd7f1
		'--color-secondary-200': '211 205 238', // #d3cdee
		'--color-secondary-300': '184 175 227', // #b8afe3
		'--color-secondary-400': '130 115 206', // #8273ce
		'--color-secondary-500': '77 55 185', // #4d37b9
		'--color-secondary-600': '69 50 167', // #4532a7
		'--color-secondary-700': '58 41 139', // #3a298b
		'--color-secondary-800': '46 33 111', // #2e216f
		'--color-secondary-900': '38 27 91', // #261b5b
		// tertiary | #0a83f5
		'--color-tertiary-50': '218 236 254', // #daecfe
		'--color-tertiary-100': '206 230 253', // #cee6fd
		'--color-tertiary-200': '194 224 253', // #c2e0fd
		'--color-tertiary-300': '157 205 251', // #9dcdfb
		'--color-tertiary-400': '84 168 248', // #54a8f8
		'--color-tertiary-500': '10 131 245', // #0a83f5
		'--color-tertiary-600': '9 118 221', // #0976dd
		'--color-tertiary-700': '8 98 184', // #0862b8
		'--color-tertiary-800': '6 79 147', // #064f93
		'--color-tertiary-900': '5 64 120', // #054078
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #9a0e3f
		'--color-error-50': '240 219 226', // #f0dbe2
		'--color-error-100': '235 207 217', // #ebcfd9
		'--color-error-200': '230 195 207', // #e6c3cf
		'--color-error-300': '215 159 178', // #d79fb2
		'--color-error-400': '184 86 121', // #b85679
		'--color-error-500': '154 14 63', // #9a0e3f
		'--color-error-600': '139 13 57', // #8b0d39
		'--color-error-700': '116 11 47', // #740b2f
		'--color-error-800': '92 8 38', // #5c0826
		'--color-error-900': '75 7 31', // #4b071f
		// surface | #495a8f
		'--color-surface-50': '228 230 238', // #e4e6ee
		'--color-surface-100': '219 222 233', // #dbdee9
		'--color-surface-200': '210 214 227', // #d2d6e3
		'--color-surface-300': '182 189 210', // #b6bdd2
		'--color-surface-400': '128 140 177', // #808cb1
		'--color-surface-500': '73 90 143', // #495a8f
		'--color-surface-600': '66 81 129', // #425181
		'--color-surface-700': '55 68 107', // #37446b
		'--color-surface-800': '44 54 86', // #2c3656
		'--color-surface-900': '36 44 70', // #242c46
	},
}
