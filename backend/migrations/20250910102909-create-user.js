"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: _Sequelize.INTEGER,
      },
      username: {
        type: _Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: _Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: _Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Users");
  },
};
