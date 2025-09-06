'use strict';

// 权限表迁移文件
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '权限唯一标识UUID',
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '权限名称',
      },
      code: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        comment: '权限编码，唯一',
      },
      type: {
        type: Sequelize.ENUM('menu', 'button', 'api'),
        allowNull: false,
        defaultValue: 'menu',
        comment: '权限类型：menu-菜单，button-按钮，api-接口',
      },
      parent_id: {
        type: Sequelize.STRING(36),
        allowNull: true,
        comment: '父权限ID',
      },
      path: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '路由路径（菜单权限使用）',
      },
      component: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '组件路径（菜单权限使用）',
      },
      icon: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: '图标名称',
      },
      sort: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '排序权重',
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '权限状态：0-禁用，1-启用',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '权限描述',
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
      comment: '权限信息表',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    // 创建索引
    await queryInterface.addIndex('permissions', ['code'], {
      name: 'uk_code',
      unique: true,
    });

    await queryInterface.addIndex('permissions', ['parent_id'], {
      name: 'idx_parent_id',
    });

    await queryInterface.addIndex('permissions', ['type', 'status'], {
      name: 'idx_type_status',
    });

    await queryInterface.addIndex('permissions', ['sort'], {
      name: 'idx_sort',
    });

    await queryInterface.addIndex('permissions', ['deleted_at'], {
      name: 'idx_deleted_at',
    });

    // 添加外键约束
    await queryInterface.addConstraint('permissions', {
      fields: ['parent_id'],
      type: 'foreign key',
      name: 'fk_permissions_parent',
      references: {
        table: 'permissions',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('permissions');
  },
};