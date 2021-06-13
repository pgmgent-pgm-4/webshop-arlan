// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const status = ['pending', 'processing', 'completed'];

const getOrders = (n = 50, users) => {
 const orders = [];
 for (let i = 0; i < n; i++) {
  orders.push({
   date: new Date(),
   price: Math.floor(Math.random() * 5000),
   order_value: Math.floor(Math.random() * 100),
   status: status[Math.floor(Math.random() * 3)],
   createdAt: new Date(),
   updatedAt: new Date(),
   userId: users[Math.floor(Math.random() * users.length)].id,
  });
 }
 return orders;
};

export default {
 up: async (queryInterface, Sequelize) => {
  const users = await database.User.findAll()
  const usersJson = JSON.stringify(users, null, 2);
  await queryInterface.bulkInsert(
   database.Order.tableName,
   getOrders(100, JSON.parse(usersJson)),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete(database.Order.tableName, null, {});
 },
};
