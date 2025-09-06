'use strict';

// 角色权限关联表迁移文件
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permissions', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '关联唯一标识UUID',
      },
      role_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        comment: '角色ID',
      },
      permission_id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        comment: '权限ID',
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
    }, {
      comment: '角色权限关联表',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    });

    // 创建复合唯一索引，确保角色权限关联唯一性
    await queryInterface.addIndex('role_permissions', ['role_id', 'permission_id'], {
      name: 'uk_role_permission',
      unique: true,
    });

    await queryInterface.addIndex('role_permissions', ['role_id'], {
      name: 'idx_role_id',
    });

    await queryInterface.addIndex('role_permissions', ['permission_id'], {
      name: 'idx_permission_id',
    });

    // 添加外键约束
    await queryInterface.addConstraint('role_permissions', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_role_permissions_role',
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('role_permissions', {
      fields: ['permission_id'],
      type: 'foreign key',
      name: 'fk_role_permissions_permission',
      references: {
        table: 'permissions',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_permissions');
  },
};