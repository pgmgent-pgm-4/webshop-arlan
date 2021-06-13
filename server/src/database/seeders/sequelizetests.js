// import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const getUsers = async (n = 20) => {
  const users = await database.User.findAll()
  console.log(users.every(user => user instanceof database.User));
  console.log("All users:", JSON.stringify(users, null, 2));
};

export default {
  up: async (queryInterface, Sequelize) => {
    await getUsers();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(database.User.tableName, null, {});
  },
};
