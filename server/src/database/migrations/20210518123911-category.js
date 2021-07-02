import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Category.tableName, database.Category.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Category.tableName);
  }
};