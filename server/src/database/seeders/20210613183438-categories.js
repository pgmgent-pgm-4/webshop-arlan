// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';
import database from '../index';
import { v4 as uuidv4 } from 'uuid';


database.connect();

const CATEGORIES = ['Payment', 'Infrastructure', 'Financial', 'Media & Entertainement'];

const getCategories = (n = 4) => {
 const categories = [];
 for (let i = 0; i < n; i++) {
  categories.push({
   category_id: uuidv4(),
   name: CATEGORIES[i],
   createdAt: new Date(),
   updatedAt: new Date(),
  });
 }
 return categories;
};

export default {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
   database.Category.tableName,
   getCategories(4),
   {},
  );
 },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete(database.Categories.tableName, null, {});
 },
};
