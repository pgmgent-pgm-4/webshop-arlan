// import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const getUsers = (n = 20) => {
  const users = [];
  for (let i = 0; i < n; i++) {
    users.push({
     username: faker.internet.userName(),
     password: bcrypt.hashSync(faker.internet.password(), 10),
     email: faker.internet.email(),
     createdAt: new Date(),
     updatedAt: new Date(),
    });
  }
  return users;
};

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      database.User.tableName,
      getUsers(15),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(database.User.tableName, null, {});
  },
};
