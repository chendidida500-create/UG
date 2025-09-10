"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: _Sequelize.INTEGER,
      },
      name: {
        type: _Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: _Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: _Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: _Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Roles");
  },
};
