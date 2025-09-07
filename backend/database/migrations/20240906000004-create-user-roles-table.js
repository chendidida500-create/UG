'use strict';

// 用户角色关联表迁移文件
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'user_roles',
      {
        id: {
          type: Sequelize.STRING(36),
          primaryKey: true,
          allowNull: false,
          comment: '关联唯一标识UUID',
        },
        user_id: {
          type: Sequelize.STRING(36),
          allowNull: false,
          comment: '用户ID',
        },
        role_id: {
          type: Sequelize.STRING(36),
          allowNull: false,
          comment: '角色ID',
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
      },
      {
        comment: '用户角色关联表',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );

    // 创建复合唯一索引，确保用户角色关联唯一性
    await queryInterface.addIndex('user_roles', ['user_id', 'role_id'], {
      name: 'uk_user_role',
      unique: true,
    });

    await queryInterface.addIndex('user_roles', ['user_id'], {
      name: 'idx_user_id',
    });

    await queryInterface.addIndex('user_roles', ['role_id'], {
      name: 'idx_role_id',
    });

    // 添加外键约束
    await queryInterface.addConstraint('user_roles', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_roles_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('user_roles', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_user_roles_role',
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles');
  },
};
