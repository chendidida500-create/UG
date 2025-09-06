'use strict';

// 为user_roles表添加deleted_at字段
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_roles', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: '删除时间（软删除）',
    });

    // 添加索引
    await queryInterface.addIndex('user_roles', ['deleted_at'], {
      name: 'idx_deleted_at',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('user_roles', 'idx_deleted_at');
    await queryInterface.removeColumn('user_roles', 'deleted_at');
  },
};