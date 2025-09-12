"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "admin",
          description: "系统管理员",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user",
          description: "普通用户",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
