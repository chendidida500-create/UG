'use strict';

/**
 * 角色模型
 * 对应数据库 roles 表
 */
module.exports = (app) => {
  const { STRING, TEXT, TINYINT, INTEGER, DATE, Sequelize } = app.Sequelize;

  const Role = app.model.define(
    'Role',
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '角色唯一标识UUID',
      },
      name: {
        type: STRING(50),
        allowNull: false,
        comment: '角色名称',
      },
      code: {
        type: STRING(50),
        allowNull: false,
        unique: true,
        comment: '角色编码，唯一',
      },
      description: {
        type: TEXT,
        allowNull: true,
        comment: '角色描述',
      },
      status: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '角色状态：0-禁用，1-启用',
      },
      is_system: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '是否为系统角色：0-否，1-是（系统角色不可删除）',
      },
      sort: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '排序权重',
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
      tableName: 'roles',
      comment: '角色信息表',
      paranoid: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
    }
  );

  // 定义关联关系
  Role.associate = function () {
    // 角色和用户多对多关系
    app.model.Role.belongsToMany(app.model.User, {
      through: app.model.UserRole,
      foreignKey: 'role_id',
      otherKey: 'user_id',
      as: 'users',
    });

    // 角色和权限多对多关系
    app.model.Role.belongsToMany(app.model.Permission, {
      through: app.model.RolePermission,
      foreignKey: 'role_id',
      otherKey: 'permission_id',
      as: 'permissions',
    });

    // 角色和用户角色一对多关系
    app.model.Role.hasMany(app.model.UserRole, {
      foreignKey: 'role_id',
      as: 'userRoles',
    });

    // 角色和角色权限一对多关系
    app.model.Role.hasMany(app.model.RolePermission, {
      foreignKey: 'role_id',
      as: 'rolePermissions',
    });
  };

  return Role;
};
