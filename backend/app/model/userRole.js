'use strict';

/**
 * 用户角色关联模型
 * 对应数据库 user_roles 表
 */
module.exports = (app) => {
  const { STRING, DATE, Sequelize } = app.Sequelize;

  const UserRole = app.model.define(
    'UserRole',
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '关联唯一标识UUID',
      },
      user_id: {
        type: STRING(36),
        allowNull: false,
        comment: '用户ID',
      },
      role_id: {
        type: STRING(36),
        allowNull: false,
        comment: '角色ID',
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: '更新时间',
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
        comment: '删除时间（软删除）',
      },
    },
    {
      tableName: 'user_roles',
      comment: '用户角色关联表',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      underscored: true,
    }
  );

  // 定义关联关系
  UserRole.associate = function () {
    // 用户角色关联表和用户表的关系
    app.model.UserRole.belongsTo(app.model.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // 用户角色关联表和角色表的关系
    app.model.UserRole.belongsTo(app.model.Role, {
      foreignKey: 'role_id',
      as: 'role',
    });
  };

  return UserRole;
};
