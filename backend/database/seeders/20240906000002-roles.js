'use strict';

const { v4: uuidv4 } = require('uuid');

// 角色数据种子文件
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      {
        id: uuidv4(),
        name: '超级管理员',
        code: 'super_admin',
        description: '系统超级管理员，拥有所有权限',
        status: 1,
        is_system: 1,
        sort: 1,
      },
      {
        id: uuidv4(),
        name: '管理员',
        code: 'admin',
        description: '系统管理员，拥有大部分管理权限',
        status: 1,
        is_system: 1,
        sort: 2,
      },
      {
        id: uuidv4(),
        name: '普通用户',
        code: 'user',
        description: '普通用户，拥有基础功能权限',
        status: 1,
        is_system: 1,
        sort: 3,
      },
    ];

    await queryInterface.bulkInsert(
      'roles',
      roles.map((role) => ({
        ...role,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
