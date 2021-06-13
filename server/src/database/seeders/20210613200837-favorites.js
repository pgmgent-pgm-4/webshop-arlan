// import/no-extraneous-dependencies
import 'babel-polyfill';
import { v4 as uuidv4 } from 'uuid';
import database from '../index';

database.connect();


const getFavorites = (users, products) => {
 const favorites = [];
 users.forEach(user => {
  let product = products[Math.floor(Math.random() * products.length)];
  favorites.push({
   createdAt: new Date(),
   updatedAt: new Date(),
   UserId: user.id,
   ProductId: product.id,
  });
 })
 
 return favorites;
};

export default {
 up: async (queryInterface, Sequelize) => {
  const users = await database.User.findAll();
  const usersJson = JSON.stringify(users, null, 2);
  const products = await database.Product.findAll();
  const productsJson = JSON.stringify(products, null, 2);
  await queryInterface.bulkInsert(
   database.Favorite.tableName,
   getFavorites(JSON.parse(usersJson), JSON.parse(productsJson)),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete(database.Favorite.tableName, null, {});
 },
};
