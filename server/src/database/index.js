import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import { databaseConfig, EnvironmentVariables } from '../config';

const basename = path.basename(__filename);
const sequelize = new Sequelize({
	...databaseConfig[EnvironmentVariables.NODE_ENV],
	logging: EnvironmentVariables.NODE_ENV === 'development' ? console.log : false,
});
const database = {};

database.connect = async () => {
	database.sequelize = sequelize;
	database.Sequelize = Sequelize;

	fs.readdirSync(path.join(__dirname, '..', 'models'))
		.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
		.forEach((file) => {
			// eslint-disable-next-line global-require,import/no-dynamic-require
			const model = require(path.join(__dirname, '..', 'models', file)).default(sequelize, Sequelize.DataTypes);
			database[model.name] = model;
		});

	Object.keys(database).forEach((modelName) => {
		if (database[modelName].associate) {
			database[modelName].associate(database);
		}
	});

	// Sync all models with the database
	await database.sequelize.sync();
};

export default database;
