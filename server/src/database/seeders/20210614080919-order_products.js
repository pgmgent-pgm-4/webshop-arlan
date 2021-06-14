// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import database from '../index';

database.connect();

const getOrderProducts = (n = 50, products) => {
 const order_products = [];
 for (let i = 0; i < n; i++) {
  let product = products[Math.floor(Math.random() * products.length)];
  order_products.push({
   order_id: uuidv4(),
   price_per_item: faker.datatype.number(20000),
   amount: faker.datatype.number(10),
   createdAt: new Date(),
   updatedAt: new Date(),
   ProductId: product.id,
  });
 };
 
 return order_products;
};

export default {
 up: async (queryInterface, Sequelize) => {
  const products = await database.Product.findAll();
  const productsJson = JSON.stringify(products, null, 2);
  await queryInterface.bulkInsert(
   "Order_products", 
   getOrderProducts(200, JSON.parse(productsJson)),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete(OrderProduct, null, {});
 },
};
