'use strict';

/**
 * 角色权限关联模型
 * 对应数据库 role_permissions 表
 */
module.exports = (app) => {
  const { STRING, DATE, Sequelize } = app.Sequelize;

  const RolePermission = app.model.define(
    'RolePermission',
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '关联唯一标识UUID',
      },
      role_id: {
        type: STRING(36),
        allowNull: false,
        comment: '角色ID',
      },
      permission_id: {
        type: STRING(36),
        allowNull: false,
        comment: '权限ID',
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
      tableName: 'role_permissions',
      comment: '角色权限关联表',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      underscored: true,
    }
  );

  // 定义关联关系
  RolePermission.associate = function () {
    // 角色权限关联表和角色表的关系
    app.model.RolePermission.belongsTo(app.model.Role, {
      foreignKey: 'role_id',
      as: 'role',
    });

    // 角色权限关联表和权限表的关系
    app.model.RolePermission.belongsTo(app.model.Permission, {
      foreignKey: 'permission_id',
      as: 'permission',
    });
  };

  return RolePermission;
};
