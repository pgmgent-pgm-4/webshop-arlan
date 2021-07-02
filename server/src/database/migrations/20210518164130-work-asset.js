import 'babel-polyfill';

import database from '../index';
database.connect();

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(database.WorkAsset.tableName, database.Work.attributes);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable(database.WorkAsset.tableName);
  }
};