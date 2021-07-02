// import/no-extraneous-dependencies
import 'babel-polyfill';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import database from '../index';

database.connect();

function randomDate(start, end) {
 return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const getProfiles = (users, orders) => {
 const profiles = [];
 users.forEach(user => {
  let order = orders[Math.floor(Math.random() * orders.length)];
  profiles.push({
   firstname: faker.name.firstName(),
   lastname: faker.name.lastName(),
   date_of_birth: faker.date.between(1950, 2005),
   orders: order.id,
   createdAt: new Date(),
   updatedAt: new Date(),
   UserId: user.id,
  });
 })
 
 return profiles;
};

export default {
 up: async (queryInterface, Sequelize) => {
  const users = await database.User.findAll();
  const usersJson = JSON.stringify(users, null, 2);
  const orders = await database.Order.findAll();
  const ordersJson = JSON.stringify(orders, null, 2);
  await queryInterface.bulkInsert(
   database.Profile.tableName,
   getProfiles(JSON.parse(usersJson), JSON.parse(ordersJson)),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete(database.Profiles.tableName, null, {});
 },
};
