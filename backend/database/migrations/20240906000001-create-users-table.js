'use strict';

// 用户表迁移文件，遵循数据库开发规范和命名规范
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '用户唯一标识UUID',
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: '用户名，唯一',
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: '邮箱地址，唯一',
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '密码（bcrypt加密）',
      },
      nickname: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: '用户昵称',
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '头像URL',
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
        comment: '手机号码',
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '用户状态：0-禁用，1-启用',
      },
      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: '最后登录时间',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: '创建时间',
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: '更新时间',
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: '删除时间（软删除）',
      },
    }, {
      comment: '用户信息表',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    // 创建索引，提高查询性能
    await queryInterface.addIndex('users', ['username'], {
      name: 'idx_username',
      unique: true,
    });

    await queryInterface.addIndex('users', ['email'], {
      name: 'idx_email',
      unique: true,
    });

    await queryInterface.addIndex('users', ['status', 'created_at'], {
      name: 'idx_status_created',
    });

    await queryInterface.addIndex('users', ['deleted_at'], {
      name: 'idx_deleted_at',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};