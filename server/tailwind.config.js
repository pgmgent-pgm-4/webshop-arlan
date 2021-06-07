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
				'site-bg': '#F7F8FC',
				'site-secondary-bg': '#EFF3FF'
			},
			minWidth: {
    '18': '18rem',
				'1/4': '25%',
				'1/2': '50%'
			},
			boxShadow: {
				card: '0 20px 25px -5px rgb(38 137 251 / 15%)'
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}