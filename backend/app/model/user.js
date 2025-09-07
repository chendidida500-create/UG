'use strict';

/**
 * 用户模型
 * 对应数据库 users 表
 */
module.exports = (app) => {
  const { STRING, TEXT, TINYINT, DATE, Sequelize } = app.Sequelize;

  const User = app.model.define(
    'User',
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        comment: '用户唯一标识UUID',
      },
      username: {
        type: STRING(50),
        allowNull: false,
        unique: true,
        comment: '用户名，唯一',
      },
      email: {
        type: STRING(100),
        allowNull: false,
        unique: true,
        comment: '邮箱地址，唯一',
      },
      password: {
        type: STRING(255),
        allowNull: false,
        comment: '密码（bcrypt加密）',
      },
      nickname: {
        type: STRING(50),
        allowNull: true,
        comment: '用户昵称',
      },
      avatar: {
        type: STRING(255),
        allowNull: true,
        comment: '头像URL',
      },
      phone: {
        type: STRING(20),
        allowNull: true,
        comment: '手机号码',
      },
      status: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        comment: '用户状态：0-禁用，1-启用',
      },
      last_login_at: {
        type: DATE,
        allowNull: true,
        comment: '最后登录时间',
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
      tableName: 'users',
      comment: '用户信息表',
      paranoid: true, // 启用软删除
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
    }
  );

  // 定义关联关系
  User.associate = function () {
    // 用户和角色多对多关系
    app.model.User.belongsToMany(app.model.Role, {
      through: app.model.UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'roles',
    });

    // 用户和用户角色一对多关系
    app.model.User.hasMany(app.model.UserRole, {
      foreignKey: 'user_id',
      as: 'userRoles',
    });
  };

  // 实例方法
  User.prototype.toSafeObject = function () {
    const obj = this.toJSON();
    delete obj.password;
    return obj;
  };

  // 类方法
  User.findByUsernameOrEmail = async function (identifier) {
    return await this.findOne({
      where: {
        [Sequelize.Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });
  };

  return User;
};
