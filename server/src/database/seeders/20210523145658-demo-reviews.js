'use strict';

import faker from 'faker';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product_reviews', [{
      message: faker.commerce.productAdjective(),
      rating: Math.floor(Math.random() * 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product_reviews', null, {});
  }
};
