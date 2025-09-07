'use strict';

/**
 * 权限模型
 * 对应数据库 permissions 表
 */
module.exports = (app) => {
  const { STRING, TEXT, ENUM, TINYINT, INTEGER, DATE, Sequelize } =
    app.Sequelize;

  const Permission = app.model.define(
    'Permission',
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '权限唯一标识UUID',
      },
      name: {
        type: STRING(50),
        allowNull: false,
        comment: '权限名称',
      },
      code: {
        type: STRING(100),
        allowNull: false,
        unique: true,
        comment: '权限编码，唯一',
      },
      type: {
        type: ENUM('menu', 'button', 'api'),
        allowNull: false,
        defaultValue: 'menu',
        comment: '权限类型：menu-菜单，button-按钮，api-接口',
      },
      parent_id: {
        type: STRING(36),
        allowNull: true,
        comment: '父权限ID',
      },
      path: {
        type: STRING(255),
        allowNull: true,
        comment: '路由路径（菜单权限使用）',
      },
      component: {
        type: STRING(255),
        allowNull: true,
        comment: '组件路径（菜单权限使用）',
      },
      icon: {
        type: STRING(50),
        allowNull: true,
        comment: '图标名称',
      },
      sort: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '排序权重',
      },
      status: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '权限状态：0-禁用，1-启用',
      },
      description: {
        type: TEXT,
        allowNull: true,
        comment: '权限描述',
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
      tableName: 'permissions',
      comment: '权限信息表',
      paranoid: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
    }
  );

  // 定义关联关系
  Permission.associate = function () {
    // 权限和角色多对多关系
    app.model.Permission.belongsToMany(app.model.Role, {
      through: app.model.RolePermission,
      foreignKey: 'permission_id',
      otherKey: 'role_id',
      as: 'roles',
    });

    // 权限自关联（父子关系）
    app.model.Permission.belongsTo(app.model.Permission, {
      foreignKey: 'parent_id',
      as: 'parent',
    });

    app.model.Permission.hasMany(app.model.Permission, {
      foreignKey: 'parent_id',
      as: 'children',
    });

    // 权限和角色权限一对多关系
    app.model.Permission.hasMany(app.model.RolePermission, {
      foreignKey: 'permission_id',
      as: 'rolePermissions',
    });
  };

  return Permission;
};
