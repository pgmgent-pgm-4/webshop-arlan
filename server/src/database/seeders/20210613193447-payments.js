// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const getPayments = (n = 50, userList, orderList) => {
 const payments = [];
 for (let i = 0; i < n; i++) {
  let user = userList[Math.floor(Math.random() * userList.length)];
  let order = orderList[Math.floor(Math.random() * orderList.length)]
  payments.push({
   date_of_payment: new Date(),
   createdAt: new Date(),
   updatedAt: new Date(),
   UserId: user.id,
   OrderId: order.id,
  });
 }
 return payments;
};

export default {
 up: async (queryInterface, Sequelize) => {
  const users = await database.User.findAll();
  const usersJson = JSON.stringify(users, null, 2);
  const orders = await database.Order.findAll();
  const ordersJson = JSON.stringify(orders, null, 2);
  await queryInterface.bulkInsert(
   database.Payment.tableName,
   getPayments(100, JSON.parse(usersJson), JSON.parse(ordersJson)),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete(database.Payment.tableName, null, {});
 },
};
