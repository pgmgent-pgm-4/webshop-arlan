// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const getReviews = (n = 50) => {
  const reviews = [];
  for (let i = 0; i < n; i++) {
    reviews.push({
     message: faker.commerce.productAdjective() + " " + faker.lorem.sentence(),
     rating: Math.floor(Math.random() * 10),
     createdAt: new Date(),
     updatedAt: new Date(),
    });
  }
  return reviews;
};

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      database.Product_reviews.tableName,
      getReviews(5),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(database.Product_reviews.tableName, null, {});
  },
};
