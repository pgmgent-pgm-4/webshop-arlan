// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const status = ['pending', 'processing', 'completed'];

const getOrders = (n = 50) => {
  const orders = [];
  for (let i = 0; i < n; i++) {
    orders.push({
     date: new Date(),
      price: Math.floor(Math.random() * 5000),
      order_value: Math.floor(Math.random() * 100),
      status: status[Math.floor(Math.random() * 3)],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return orders;
};

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      database.Order.tableName,
      getOrders(50),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(database.Order.tableName, null, {});
  },
};
