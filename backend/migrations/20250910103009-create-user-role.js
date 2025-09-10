"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.createTable("UserRoles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: _Sequelize.INTEGER,
      },
      userId: {
        type: _Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      roleId: {
        type: _Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
        onDelete: "CASCADE",
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

    // 添加复合唯一索引
    await queryInterface.addIndex("UserRoles", ["userId", "roleId"], {
      unique: true,
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("UserRoles");
  },
};
