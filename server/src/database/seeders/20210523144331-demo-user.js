'use strict';

import faker from 'faker';
import bcrypt from 'bcrypt';

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
		username: faker.internet.userName(),
		password: bcrypt.hashSync(faker.internet.password(), 10),
		email: faker.internet.email(),
		createdAt: new Date(),
		updatedAt: new Date(),
	}]),
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
