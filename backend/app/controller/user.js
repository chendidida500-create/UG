'use strict';

const BaseController = require('./base');

/**
 * 用户管理控制器
 * 处理用户的CRUD操作、状态管理、密码重置等
 */
class UserController extends BaseController {
  /**
   * 获取用户列表
   * GET /api/users
   */
  async index() {
    const { ctx } = this;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:user:view');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    const pagination = this.getPagination();
    const { keyword, status, startTime, endTime } = ctx.query;

    try {
      const result = await ctx.service.user.findAll({
        ...pagination,
        keyword,
        status,
        startTime,
        endTime,
      });

      ctx.successWithPagination(result.list, result.pagination, '获取用户列表成功');
    } catch (error) {
      ctx.logger.error('Get users failed:', error);
      ctx.error(error.message, 'GET_USERS_FAILED', 500);
    }
  }

  /**
   * 获取单个用户详情
   * GET /api/users/:id
   */
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限（可以查看自己的信息或有查看权限）
    const canView = id === this.currentUserId ||
      await ctx.service.user.hasPermission(this.currentUserId, 'system:user:view');

    if (!canView) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    try {
      const user = await ctx.service.user.findById(id);

      if (!user) {
        ctx.error('用户不存在', 'USER_NOT_FOUND', 404);
        return;
      }

      // 移除敏感信息
      const userData = user.toJSON();
      delete userData.password;

      ctx.success(userData, '获取用户详情成功');
    } catch (error) {
      ctx.logger.error('Get user failed:', error);
      ctx.error(error.message, 'GET_USER_FAILED', 500);
    }
  }

  /**
   * 创建用户
   * POST /api/users
   */
  async create() {
    const { ctx } = this;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:user:create');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      username: { type: 'string', required: true, min: 3, max: 50 },
      email: { type: 'email', required: true },
      password: { type: 'string', required: true, min: 6, max: 100 },
      nickname: { type: 'string', required: false, max: 50 },
      phone: { type: 'string', required: false, max: 20 },
      roleIds: { type: 'array', required: false, itemType: 'string' },
    };
    this.validate(rules);

    try {
      const user = await ctx.service.user.create(ctx.request.body);
      ctx.success(user, '创建用户成功');
    } catch (error) {
      ctx.logger.error('Create user failed:', error);
      ctx.error(error.message, 'CREATE_USER_FAILED', 400);
    }
  }

  /**
   * 更新用户信息
   * PUT /api/users/:id
   */
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限（可以修改自己的基本信息或有更新权限）
    const canUpdate = id === this.currentUserId ||
      await ctx.service.user.hasPermission(this.currentUserId, 'system:user:update');

    if (!canUpdate) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      username: { type: 'string', required: false, min: 3, max: 50 },
      email: { type: 'email', required: false },
      nickname: { type: 'string', required: false, max: 50 },
      phone: { type: 'string', required: false, max: 20 },
      status: { type: 'enum', values: [0, 1], required: false },
      roleIds: { type: 'array', required: false, itemType: 'string' },
    };
    this.validate(rules);

    // 普通用户不能修改status和roleIds
    if (id === this.currentUserId) {
      delete ctx.request.body.status;
      delete ctx.request.body.roleIds;
    }

    try {
      const user = await ctx.service.user.update(id, ctx.request.body);
      ctx.success(user, '更新用户成功');
    } catch (error) {
      ctx.logger.error('Update user failed:', error);
      ctx.error(error.message, 'UPDATE_USER_FAILED', 400);
    }
  }

  /**
   * 删除用户（软删除）
   * DELETE /api/users/:id
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:user:delete');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 不能删除自己
    if (id === this.currentUserId) {
      ctx.error('不能删除自己', 'CANNOT_DELETE_SELF', 400);
      return;
    }

    try {
      await ctx.service.user.destroy(id);
      ctx.success(null, '删除用户成功');
    } catch (error) {
      ctx.logger.error('Delete user failed:', error);
      ctx.error(error.message, 'DELETE_USER_FAILED', 400);
    }
  }

  /**
   * 更新用户状态
   * PATCH /api/users/:id/status
   */
  async updateStatus() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:user:update');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 不能修改自己的状态
    if (id === this.currentUserId) {
      ctx.error('不能修改自己的状态', 'CANNOT_UPDATE_SELF_STATUS', 400);
      return;
    }

    // 验证请求参数
    const rules = {
      status: { type: 'enum', values: [0, 1], required: true },
    };
    this.validate(rules);

    try {
      await ctx.service.user.updateStatus(id, ctx.request.body.status);
      ctx.success(null, '更新用户状态成功');
    } catch (error) {
      ctx.logger.error('Update user status failed:', error);
      ctx.error(error.message, 'UPDATE_USER_STATUS_FAILED', 400);
    }
  }

  /**
   * 重置用户密码
   * PATCH /api/users/:id/password
   */
  async updatePassword() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:user:update');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      newPassword: { type: 'string', required: true, min: 6, max: 100 },
      confirmPassword: { type: 'string', required: true },
    };
    this.validate(rules);

    const { newPassword, confirmPassword } = ctx.request.body;

    // 验证密码确认
    if (newPassword !== confirmPassword) {
      ctx.error('两次输入的密码不一致', 'PASSWORD_MISMATCH', 400);
      return;
    }

    try {
      await ctx.service.user.updatePassword(id, newPassword);
      ctx.success(null, '重置密码成功');
    } catch (error) {
      ctx.logger.error('Reset password failed:', error);
      ctx.error(error.message, 'RESET_PASSWORD_FAILED', 400);
    }
  }

  /**
   * 获取当前用户信息
   * GET /api/me
   */
  async profile() {
    const { ctx } = this;

    try {
      const user = await ctx.service.user.findById(this.currentUserId);

      if (!user) {
        ctx.error('用户不存在', 'USER_NOT_FOUND', 404);
        return;
      }

      // 移除敏感信息
      const userData = user.toJSON();
      delete userData.password;

      ctx.success(userData, '获取个人信息成功');
    } catch (error) {
      ctx.logger.error('Get profile failed:', error);
      ctx.error(error.message, 'GET_PROFILE_FAILED', 500);
    }
  }

  /**
   * 更新个人信息
   * PUT /api/me
   */
  async updateProfile() {
    const { ctx } = this;

    // 验证请求参数
    const rules = {
      nickname: { type: 'string', required: false, max: 50 },
      email: { type: 'email', required: false },
      phone: { type: 'string', required: false, max: 20 },
      avatar: { type: 'string', required: false, max: 255 },
    };
    this.validate(rules);

    try {
      const user = await ctx.service.user.update(this.currentUserId, ctx.request.body);
      ctx.success(user, '更新个人信息成功');
    } catch (error) {
      ctx.logger.error('Update profile failed:', error);
      ctx.error(error.message, 'UPDATE_PROFILE_FAILED', 400);
    }
  }

  /**
   * 修改个人密码
   * PUT /api/me/password
   */
  async updateMyPassword() {
    const { ctx } = this;

    // 验证请求参数
    const rules = {
      oldPassword: { type: 'string', required: true },
      newPassword: { type: 'string', required: true, min: 6, max: 100 },
      confirmPassword: { type: 'string', required: true },
    };
    this.validate(rules);

    const { oldPassword, newPassword, confirmPassword } = ctx.request.body;

    // 验证密码确认
    if (newPassword !== confirmPassword) {
      ctx.error('两次输入的密码不一致', 'PASSWORD_MISMATCH', 400);
      return;
    }

    try {
      await ctx.service.user.updateMyPassword(this.currentUserId, oldPassword, newPassword);
      ctx.success(null, '修改密码成功');
    } catch (error) {
      ctx.logger.error('Update my password failed:', error);
      ctx.error(error.message, 'UPDATE_MY_PASSWORD_FAILED', 400);
    }
  }
}

module.exports = UserController;