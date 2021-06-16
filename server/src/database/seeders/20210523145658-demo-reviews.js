// import/no-extraneous-dependencies
import 'babel-polyfill';
import faker from 'faker';

import database from '../index';

database.connect();

const getReviews = (n = 50, userList, productList) => {
  const reviews = [];
  productList.forEach((item) => {
    let user = userList[Math.floor(Math.random() * userList.length)];
    let product = productList[Math.floor(Math.random() * productList.length)];
    reviews.push({
     message: faker.commerce.productAdjective() + " " + faker.lorem.sentence(),
     rating: Math.floor(Math.random() * 10),
     createdAt: new Date(),
     updatedAt: new Date(),
     UserId: user.id,
     ProductId: product.id,
    });
  });
  return reviews;
};

export default {
  up: async (queryInterface, Sequelize) => {
    const users = await database.User.findAll();
    const usersJson = JSON.stringify(users, null, 2);
    const products = await database.Product.findAll();
    const productsJson = JSON.stringify(products, null, 2);
    await queryInterface.bulkInsert(
      database.Product_reviews.tableName,
      getReviews(100, JSON.parse(usersJson), JSON.parse(productsJson)),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(database.Product_review.tableName, null, {});
  },
};
