'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      address: faker.address.city(),
      post_code: faker.address.zipCode(),
      phone_number: faker.phone.number(),
      email: faker.internet.email(),
      username: 'admin',
      password: bcrypt.hashSync('password', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};