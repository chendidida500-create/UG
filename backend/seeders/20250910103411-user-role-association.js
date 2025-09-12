"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "UserRoles",
      [
        {
          userId: 1, // admin user
          roleId: 1, // admin role
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2, // user1
          roleId: 2, // user role
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("UserRoles", null, {});
  },
};
