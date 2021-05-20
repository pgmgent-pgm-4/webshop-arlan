// import/no-extraneous-dependencies
import 'babel-polyfill';

import database from '..';

export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			database.Category.tableName,
			[
				{
					name: 'John Doe',
					description: '',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(database.Category.tableName, null, {});
	},
};
