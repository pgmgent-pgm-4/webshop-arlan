// tailwind.config.js
module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'site-primary': '#0045D3',
				'site-secondary': '#023191',
				'site-accent': '#D38E00',
				'site-bg': '#EFF3FF',
				'site-secondary-bg': '#EFF3FF'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}