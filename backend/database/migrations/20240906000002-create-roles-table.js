'use strict';

// 角色表迁移文件
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '角色唯一标识UUID',
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '角色名称',
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: '角色编码，唯一',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '角色描述',
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '角色状态：0-禁用，1-启用',
      },
      is_system: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '是否为系统角色：0-否，1-是（系统角色不可删除）',
      },
      sort: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '排序权重',
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
      comment: '角色信息表',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    // 创建索引
    await queryInterface.addIndex('roles', ['code'], {
      name: 'uk_code',
      unique: true,
    });

    await queryInterface.addIndex('roles', ['status', 'sort'], {
      name: 'idx_status_sort',
    });

    await queryInterface.addIndex('roles', ['is_system'], {
      name: 'idx_is_system',
    });

    await queryInterface.addIndex('roles', ['deleted_at'], {
      name: 'idx_deleted_at',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  },
};