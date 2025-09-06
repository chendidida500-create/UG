'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// 用户数据种子文件
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 创建默认密码的哈希值
    const hashedPassword = await bcrypt.hash('admin123456', 10);

    const users = [
      {
        id: uuidv4(),
        username: 'admin',
        email: 'admin@ug-system.com',
        password: hashedPassword,
        nickname: '系统管理员',
        status: 1,
      },
      {
        id: uuidv4(),
        username: 'demo',
        email: 'demo@ug-system.com',
        password: hashedPassword,
        nickname: '演示用户',
        status: 1,
      },
    ];

    await queryInterface.bulkInsert('users', users.map(user => ({
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    })));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};