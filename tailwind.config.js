const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const myColors = {
	white: 'white',
	black: 'black',
	offwhite: "#F7F5F0",
  red: {
    [10]: "#fce1e1",
    [20]: "#fac4c4",
    [30]: "#f58c8c",
    [40]: "#f15656",
    [50]: "#d63d3d",
    [60]: "#ae3232",
    [70]: "#802424",
    [80]: "#5b1a1a",
    [90]: "#3e1212",
	},
  gray: {
    [10]: "#e8e7e6",
    [20]: "#d3d1cf",
    [30]: "#ada9a6",
    [40]: "#908a86",
    [50]: "#7b7470",
    [60]: "#645e5a",
    [70]: "#494542",
    [80]: "#33302e",
    [90]: "#22201f",
	},
  blue: {
    [10]: "#dbe8fd",
    [20]: "#bad3fc",
    [30]: "#7babf9",
    [40]: "#4789f7",
    [50]: "#3473d9",
    [60]: "#2a5db0",
    [70]: "#1f4481",
    [80]: "#16305a",
    [90]: "#0f203d",
	},
}

module.exports = {
	darkMode: 'class',
	important: true,
	mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
	safelist: [
		'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'
	],
	theme: {
		screens: {
			'xs': '375px',
			'sm': '660px',
			'md': '880px',
		},
		colors: {
			...myColors,
			neutral: colors.neutral,
			slate: colors.slate,
			ink: {
				DEFAULT: `var(--col-ink-base, ${myColors.gray[80]})`,
				bold: `var(--col-ink-bold, ${myColors.black})`,
				medium: `var(--col-ink-medium, ${myColors.gray[60]})`,
				light: `var(--col-ink-light, ${myColors.gray[30]})`
			},
			accent: {
				DEFAULT: `var(--col-accent, ${myColors.red[50]})`,
				bold: `var(--col-accent-bold, ${myColors.red[60]})`,
				light: `var(--col-accent-light, ${myColors.red[30]})`
			},
			primary: {
				DEFAULT: `var(--col-primary, ${myColors.red[50]})`,
				light: `var(--col-primary-light, ${myColors.red[30]})`,
			},
			secondary: {
				DEFAULT: `var(--col-secondary, ${myColors.blue[50]})`,
				light: `var(--col-secondary-light, ${myColors.blue[30]})`
			},
			surface: {
				DEFAULT: `var(--col-surface, ${myColors.white})`
			}
		},
		fontFamily: {
			sans: ['soehne-web', ...defaultTheme.fontFamily.sans],
			'sans-display': ['soehne-breit-web', 'soehne-web', ...defaultTheme.fontFamily.sans],
			serif: ['ivar-text', ...defaultTheme.fontFamily.serif],
			'ivar-text': ['ivar-text', ...defaultTheme.fontFamily.serif],
			signifier: ['signifier', ...defaultTheme.fontFamily.serif],
			'epicene-text': ['epicene-text', ...defaultTheme.fontFamily.serif],
			mono: ['soehne-mono', ...defaultTheme.fontFamily.mono],
			'vulf-mono': 'vulf-mono'
		},
		gridTemplateRows: {
			...defaultTheme.gridTemplateRows,
			'base': 'auto 1fr auto'
		},
		extend: {
			width: {
				['full-inset']: `calc(100% - (2 * var(--inset-x, ${defaultTheme.spacing[6]})))`,
				'hc': `min(calc(100vw - 3rem), 20rem)`
			},
			maxWidth: {
				'prose-narrow': '35ch',
				'content': '44rem',
				'wide': '62rem'
			},
			minHeight: {
				['screen-inset']: `calc(100vh - var(--header-height, ${defaultTheme.spacing[20]}))`
			},
		},
	},
};