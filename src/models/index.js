const { readdirSync } = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../db/config.js');

const env = process.env.NODE_ENV || 'development';
const models = {
	Sequelize,
	sequelize: new Sequelize(config[env].url, config[env]),
};

readdirSync(__dirname).forEach(fileName => {
	if (
		fileName === 'index.js' ||
		!fileName.endsWith('.js') ||
		fileName.startsWith('.')
	) {
		return;
	}

	const model = models.sequelize.import(path.join(__dirname, fileName));
	models[model.name] = model;
});

Object.keys(models).forEach(modelName => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

module.exports = models;
