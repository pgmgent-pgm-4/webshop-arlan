// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const getCategoryRelations = (n = 50, categories, products) => {
 const orders = [];
 products.forEach(product => {
  let category = categories[Math.floor(Math.random() * categories.length)];
  orders.push({
   createdAt: new Date(),
   updatedAt: new Date(),
   ProductId: product.id,
   CategoryId: category.id,
  });
 })
 
 return orders;
};

export default {
 up: async (queryInterface, Sequelize) => {
  const categories = await database.Category.findAll();
  const categoriesJson = JSON.stringify(categories, null, 2);
  const products = await database.Product.findAll();
  const productsJson = JSON.stringify(products, null, 2);
  await queryInterface.bulkInsert("Product_has_categories", 
   getCategoryRelations(JSON.parse(categoriesJson), JSON.parse(productsJson)),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete("Product_has_categories", null, {});
 },
};
