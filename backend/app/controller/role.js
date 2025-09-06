'use strict';

const BaseController = require('./base');

/**
 * 角色管理控制器
 * 处理角色的CRUD操作、权限分配等
 */
class RoleController extends BaseController {
  /**
   * 获取角色列表
   * GET /api/roles
   */
  async index() {
    const { ctx } = this;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:role:view');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    const pagination = this.getPagination();
    const { keyword, status, startTime, endTime } = ctx.query;

    try {
      const result = await ctx.service.role.findAll({
        ...pagination,
        keyword,
        status,
        startTime,
        endTime,
      });

      ctx.successWithPagination(result.list, result.pagination, '获取角色列表成功');
    } catch (error) {
      ctx.logger.error('Get roles failed:', error);
      ctx.error(error.message, 'GET_ROLES_FAILED', 500);
    }
  }

  /**
   * 获取单个角色详情
   * GET /api/roles/:id
   */
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:role:view');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    try {
      const role = await ctx.service.role.findById(id);

      if (!role) {
        ctx.error('角色不存在', 'ROLE_NOT_FOUND', 404);
        return;
      }

      ctx.success(role, '获取角色详情成功');
    } catch (error) {
      ctx.logger.error('Get role failed:', error);
      ctx.error(error.message, 'GET_ROLE_FAILED', 500);
    }
  }

  /**
   * 创建角色
   * POST /api/roles
   */
  async create() {
    const { ctx } = this;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:role:create');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      name: { type: 'string', required: true, min: 2, max: 50 },
      code: { type: 'string', required: true, min: 2, max: 50 },
      description: { type: 'string', required: false, max: 200 },
      permissionIds: { type: 'array', required: false, itemType: 'string' },
    };
    this.validate(rules);

    try {
      const role = await ctx.service.role.create(ctx.request.body);
      ctx.success(role, '创建角色成功');
    } catch (error) {
      ctx.logger.error('Create role failed:', error);
      ctx.error(error.message, 'CREATE_ROLE_FAILED', 400);
    }
  }

  /**
   * 更新角色信息
   * PUT /api/roles/:id
   */
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:role:update');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      name: { type: 'string', required: false, min: 2, max: 50 },
      code: { type: 'string', required: false, min: 2, max: 50 },
      description: { type: 'string', required: false, max: 200 },
      status: { type: 'enum', values: [0, 1], required: false },
      permissionIds: { type: 'array', required: false, itemType: 'string' },
    };
    this.validate(rules);

    try {
      const role = await ctx.service.role.update(id, ctx.request.body);
      ctx.success(role, '更新角色成功');
    } catch (error) {
      ctx.logger.error('Update role failed:', error);
      ctx.error(error.message, 'UPDATE_ROLE_FAILED', 400);
    }
  }

  /**
   * 删除角色（软删除）
   * DELETE /api/roles/:id
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:role:delete');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    try {
      await ctx.service.role.destroy(id);
      ctx.success(null, '删除角色成功');
    } catch (error) {
      ctx.logger.error('Delete role failed:', error);
      ctx.error(error.message, 'DELETE_ROLE_FAILED', 400);
    }
  }

  /**
   * 获取角色权限列表
   * GET /api/roles/:id/permissions
   */
  async permissions() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:role:view');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    try {
      const permissions = await ctx.service.role.getPermissions(id);
      ctx.success(permissions, '获取角色权限成功');
    } catch (error) {
      ctx.logger.error('Get role permissions failed:', error);
      ctx.error(error.message, 'GET_ROLE_PERMISSIONS_FAILED', 500);
    }
  }

  /**
   * 更新角色权限
   * PUT /api/roles/:id/permissions
   */
  async updatePermissions() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(this.currentUserId, 'system:role:update');
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      permissionIds: { type: 'array', required: true, itemType: 'string' },
    };
    this.validate(rules);

    try {
      await ctx.service.role.updatePermissions(id, ctx.request.body.permissionIds);
      ctx.success(null, '更新角色权限成功');
    } catch (error) {
      ctx.logger.error('Update role permissions failed:', error);
      ctx.error(error.message, 'UPDATE_ROLE_PERMISSIONS_FAILED', 400);
    }
  }
}

module.exports = RoleController;