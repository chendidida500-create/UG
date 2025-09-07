'use strict';

// 为role_permissions表添加deleted_at字段
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('role_permissions', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: '删除时间（软删除）',
    });

    // 添加索引
    await queryInterface.addIndex('role_permissions', ['deleted_at'], {
      name: 'idx_deleted_at',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('role_permissions', 'idx_deleted_at');
    await queryInterface.removeColumn('role_permissions', 'deleted_at');
  },
};
