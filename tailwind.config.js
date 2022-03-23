module.exports = {
	purge: ['./src/**/*.{js,jsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: '#ff003f',
				secondary: '#7DF9FF'
			},
			fontFamily: {
				main: ['Quicksand'],
				loadingText: ['Road Rage']
			},
			height: {
				70: '70vh',
				80: '80vh',
				90: '90vh'
			},
			borderWidth: {
				1: '1px'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
