const config = {
	development: {
		dialect: 'sqlite',
		storage: './data/webshop.sqlite3',
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory',
	},
	production: {
		dialect: 'sqlite',
		storage: './data/webshop.sqlite3',
	},
};

export default config;
