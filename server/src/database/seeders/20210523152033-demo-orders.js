'use strict';

import faker from 'faker';

const status = ['pending', 'processing', 'completed'];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [{
      date: new Date(),
      price: Math.floor(Math.random() * 5000),
      order_value: Math.floor(Math.random() * 100),
      status: status[Math.floor(Math.random() * 3)],
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
