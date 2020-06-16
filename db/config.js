const config = require('config');
const url = config.get('database.connectionString');

const [dialect] = url.split(':');

const params = {
	logging: false,
	dialect,
	url,
};

module.exports = {
	development: params,
	production: params,
	testing: params
};
