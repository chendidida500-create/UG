"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    // Admin role gets all permissions
    const adminPermissions = [];
    for (let i = 1; i <= 8; i++) {
      adminPermissions.push({
        roleId: 1, // admin role
        permissionId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // User role gets read-only permissions
    const userPermissions = [
      {
        roleId: 2, // user role
        permissionId: 2, // user_read
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2, // user role
        permissionId: 6, // role_read
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "RolePermissions",
      [...adminPermissions, ...userPermissions],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("RolePermissions", null, {});
  },
};
