// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';
import database from '../index';

database.connect();

let cryptoList = require('./cryptolist.json');

var getName = function (obj, index) {
 var keys = Object.keys(obj);
 return obj[keys[index]];
};

let pastCoinNames = [];

const getProducts = (n = 50, cryptoList) => {
 const products = [];
 for (let i = 0; i < n; i++) {
  let name = getName(cryptoList, i).replace(/ /g,'');
  if (!pastCoinNames.includes(name)) {
   products.push({
    id: name,
    createdAt: new Date(),
    updatedAt: new Date(),
   });
  }
  pastCoinNames.push(name);
  console.log('pushed product', i);
 }
 return products;
};

export default {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
   database.Product.tableName,
   getProducts(3700, cryptoList),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete(database.Product.tableName, null, {});
 },
};
