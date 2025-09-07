'use strict';

const BaseService = require('./base');

/**
 * 用户服务
 * 处理用户相关的业务逻辑
 */
class UserService extends BaseService {
  /**
   * 根据ID查找用户
   * @param {string} id 用户ID
   * @returns {Object|null} 用户信息
   */
  async findById(id) {
    const user = await this.app.model.User.findByPk(id, {
      include: [
        {
          model: this.app.model.Role,
          as: 'roles',
          through: { attributes: [] },
          include: [
            {
              model: this.app.model.Permission,
              as: 'permissions',
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    return user;
  }

  /**
   * 根据用户名或邮箱查找用户
   * @param {string} identifier 用户名或邮箱
   * @returns {Object|null} 用户信息
   */
  async findByUsernameOrEmail(identifier) {
    const user = await this.app.model.User.findByUsernameOrEmail(identifier);
    return user;
  }

  /**
   * 更新用户最后登录时间
   * @param {string} userId 用户ID
   */
  async updateLastLoginTime(userId) {
    await this.app.model.User.update(
      { last_login_at: new Date() },
      { where: { id: userId } }
    );
  }

  /**
   * 检查用户权限
   * @param {string} userId 用户ID
   * @param {string} permissionCode 权限编码
   * @returns {boolean} 是否有权限
   */
  async hasPermission(userId, permissionCode) {
    const user = await this.findById(userId);
    if (!user || !user.roles) {
      return false;
    }

    // 超级管理员拥有所有权限
    if (user.roles.some((role) => role.code === 'super_admin')) {
      return true;
    }

    // 检查用户角色是否包含指定权限
    return user.roles.some((role) =>
      role.permissions?.some(
        (permission) =>
          permission.code === permissionCode && permission.status === 1
      )
    );
  }

  /**
   * 检查用户角色
   * @param {string} userId 用户ID
   * @param {string} roleCode 角色编码
   * @returns {boolean} 是否有角色
   */
  async hasRole(userId, roleCode) {
    const user = await this.findById(userId);
    if (!user || !user.roles) {
      return false;
    }

    return user.roles.some(
      (role) => role.code === roleCode && role.status === 1
    );
  }

  /**
   * 获取用户菜单权限
   * @param {string} userId 用户ID
   * @returns {Array} 菜单权限列表
   */
  async getUserMenuPermissions(userId) {
    const user = await this.findById(userId);
    if (!user || !user.roles) {
      return [];
    }

    const menuPermissions = [];

    user.roles.forEach((role) => {
      if (role.permissions && role.status === 1) {
        role.permissions.forEach((permission) => {
          if (permission.type === 'menu' && permission.status === 1) {
            // 避免重复添加
            if (!menuPermissions.find((p) => p.id === permission.id)) {
              menuPermissions.push(permission);
            }
          }
        });
      }
    });

    return menuPermissions;
  }

  /**
   * 获取用户按钮权限
   * @param {string} userId 用户ID
   * @returns {Array} 按钮权限编码列表
   */
  async getUserButtonPermissions(userId) {
    const user = await this.findById(userId);
    if (!user || !user.roles) {
      return [];
    }

    const buttonPermissions = [];

    user.roles.forEach((role) => {
      if (role.permissions && role.status === 1) {
        role.permissions.forEach((permission) => {
          if (permission.type === 'button' && permission.status === 1) {
            buttonPermissions.push(permission.code);
          }
        });
      }
    });

    return [...new Set(buttonPermissions)]; // 去重
  }

  /**
   * 创建用户
   * @param {Object} userData 用户数据
   * @returns {Object} 创建的用户信息
   */
  async create(userData) {
    const {
      username,
      email,
      password,
      nickname,
      phone,
      roleIds = [],
    } = userData;

    // 检查用户名是否已存在
    const existingUsername = await this.app.model.User.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new Error('用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.app.model.User.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new Error('邮箱已被注册');
    }

    // 加密密码
    const hashedPassword = await this.hashPassword(password);

    // 开启事务
    const transaction = await this.app.model.transaction();

    try {
      // 创建用户
      const user = await this.app.model.User.create(
        {
          id: this.generateUuid(),
          username,
          email,
          password: hashedPassword,
          nickname: nickname || username,
          phone,
          status: 1,
        },
        { transaction }
      );

      // 分配角色
      if (roleIds.length > 0) {
        const userRoles = roleIds.map((roleId) => ({
          id: this.generateUuid(),
          user_id: user.id,
          role_id: roleId,
        }));

        await this.app.model.UserRole.bulkCreate(userRoles, { transaction });
      }

      await transaction.commit();

      // 记录操作日志
      await this.logOperation('create', 'user', { userId: user.id, username });

      // 移除敏感信息
      const result = user.toJSON();
      delete result.password;

      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * 更新用户信息
   * @param {string} id 用户ID
   * @param {Object} userData 更新的用户数据
   * @returns {Object} 更新后的用户信息
   */
  async update(id, userData) {
    const user = await this.app.model.User.findByPk(id);
    if (!user) {
      throw new Error('用户不存在');
    }

    const { username, email, nickname, phone, status, roleIds } = userData;

    // 检查用户名唯一性（如果有更新）
    if (username && username !== user.username) {
      const existingUsername = await this.app.model.User.findOne({
        where: { username },
      });
      if (existingUsername) {
        throw new Error('用户名已存在');
      }
    }

    // 检查邮箱唯一性（如果有更新）
    if (email && email !== user.email) {
      const existingEmail = await this.app.model.User.findOne({
        where: { email },
      });
      if (existingEmail) {
        throw new Error('邮箱已被注册');
      }
    }

    // 开启事务
    const transaction = await this.app.model.transaction();

    try {
      // 更新用户基本信息
      const updateData = {};
      if (username !== undefined) updateData.username = username;
      if (email !== undefined) updateData.email = email;
      if (nickname !== undefined) updateData.nickname = nickname;
      if (phone !== undefined) updateData.phone = phone;
      if (status !== undefined) updateData.status = status;

      await user.update(updateData, { transaction });

      // 更新用户角色（如果提供了roleIds）
      if (roleIds !== undefined) {
        // 删除现有角色关联
        await this.app.model.UserRole.destroy({
          where: { user_id: id },
          transaction,
        });

        // 创建新的角色关联
        if (roleIds.length > 0) {
          const userRoles = roleIds.map((roleId) => ({
            id: this.generateUuid(),
            user_id: id,
            role_id: roleId,
          }));

          await this.app.model.UserRole.bulkCreate(userRoles, { transaction });
        }
      }

      await transaction.commit();

      // 记录操作日志
      await this.logOperation('update', 'user', { userId: id, updateData });

      // 获取更新后的用户信息
      const updatedUser = await this.findById(id);
      const result = updatedUser.toJSON();
      delete result.password;

      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * 更新用户密码
   * @param {string} id 用户ID
   * @param {string} newPassword 新密码
   */
  async updatePassword(id, newPassword) {
    const user = await this.app.model.User.findByPk(id);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 加密新密码
    const hashedPassword = await this.hashPassword(newPassword);

    await user.update({ password: hashedPassword });

    // 记录操作日志
    await this.logOperation('update_password', 'user', { userId: id });
  }

  /**
   * 获取用户列表（分页）
   * @param {Object} params 查询参数
   * @returns {Object} 分页结果
   */
  async findAll(params) {
    const {
      current,
      pageSize,
      offset,
      limit,
      keyword,
      status,
      startTime,
      endTime,
    } = params;

    // 构建查询条件
    const whereCondition = this.buildWhereCondition(
      { keyword, status, startTime, endTime },
      ['username', 'email', 'nickname']
    );

    const result = await this.app.model.User.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: this.app.model.Role,
          as: 'roles',
          through: { attributes: [] },
          attributes: ['id', 'name', 'code'],
        },
      ],
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });

    return this.formatPaginationResult(result, { current, pageSize });
  }

  /**
   * 软删除用户
   * @param {string} id 用户ID
   */
  async destroy(id) {
    const user = await this.app.model.User.findByPk(id);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 检查是否为系统用户
    const isSuperAdmin = await this.hasRole(id, 'super_admin');
    if (isSuperAdmin) {
      throw new Error('不能删除超级管理员');
    }

    await user.destroy();

    // 记录操作日志
    await this.logOperation('delete', 'user', {
      userId: id,
      username: user.username,
    });
  }

  /**
   * 更新用户状态
   * @param {string} id 用户ID
   * @param {number} status 状态
   */
  async updateStatus(id, status) {
    const user = await this.app.model.User.findByPk(id);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 检查是否为系统用户
    const isSuperAdmin = await this.hasRole(id, 'super_admin');
    if (isSuperAdmin && status === 0) {
      throw new Error('不能禁用超级管理员');
    }

    await user.update({ status });

    // 记录操作日志
    await this.logOperation('update_status', 'user', { userId: id, status });
  }

  /**
   * 修改个人密码
   * @param {string} userId 用户ID
   * @param {string} oldPassword 旧密码
   * @param {string} newPassword 新密码
   */
  async updateMyPassword(userId, oldPassword, newPassword) {
    const user = await this.app.model.User.findByPk(userId);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 验证旧密码
    const isOldPasswordValid = await this.comparePassword(
      oldPassword,
      user.password
    );
    if (!isOldPasswordValid) {
      throw new Error('旧密码错误');
    }

    // 检查新密码是否与旧密码相同
    const isSamePassword = await this.comparePassword(
      newPassword,
      user.password
    );
    if (isSamePassword) {
      throw new Error('新密码不能与旧密码相同');
    }

    // 加密新密码
    const hashedPassword = await this.hashPassword(newPassword);

    await user.update({ password: hashedPassword });

    // 记录操作日志
    await this.logOperation('update_my_password', 'user', { userId });
  }
}

module.exports = UserService;
