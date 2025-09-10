"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "Permissions",
      [
        {
          name: "user_create",
          description: "创建用户",
          action: "create",
          resource: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user_read",
          description: "读取用户",
          action: "read",
          resource: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user_update",
          description: "更新用户",
          action: "update",
          resource: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user_delete",
          description: "删除用户",
          action: "delete",
          resource: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "role_create",
          description: "创建角色",
          action: "create",
          resource: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "role_read",
          description: "读取角色",
          action: "read",
          resource: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "role_update",
          description: "更新角色",
          action: "update",
          resource: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "role_delete",
          description: "删除角色",
          action: "delete",
          resource: "role",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
