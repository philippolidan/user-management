'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        address: faker.address.city(),
        post_code: faker.address.zipCode(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      });
    }
    console.log(users);
    return queryInterface.bulkInsert('Users', users);
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