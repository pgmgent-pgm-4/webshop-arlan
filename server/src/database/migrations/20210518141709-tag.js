import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.Tag.tableName, database.Tag.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.Tag.tableName);
  }
};