'use strict';

const BaseController = require('./base');

/**
 * 权限管理控制器
 * 处理权限的CRUD操作、树形结构等
 */
class PermissionController extends BaseController {
  /**
   * 获取权限列表
   * GET /api/permissions
   */
  async index() {
    const { ctx } = this;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(
      this.currentUserId,
      'system:permission:view'
    );
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    const pagination = this.getPagination();
    const { keyword, status, type, startTime, endTime } = ctx.query;

    try {
      const result = await ctx.service.permission.findAll({
        ...pagination,
        keyword,
        status,
        type,
        startTime,
        endTime,
      });

      ctx.successWithPagination(
        result.list,
        result.pagination,
        '获取权限列表成功'
      );
    } catch (error) {
      ctx.logger.error('Get permissions failed:', error);
      ctx.error(error.message, 'GET_PERMISSIONS_FAILED', 500);
    }
  }

  /**
   * 获取权限树形结构
   * GET /api/permissions/tree
   */
  async tree() {
    const { ctx } = this;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(
      this.currentUserId,
      'system:permission:view'
    );
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    try {
      const tree = await ctx.service.permission.getTree();
      ctx.success(tree, '获取权限树成功');
    } catch (error) {
      ctx.logger.error('Get permission tree failed:', error);
      ctx.error(error.message, 'GET_PERMISSION_TREE_FAILED', 500);
    }
  }

  /**
   * 获取单个权限详情
   * GET /api/permissions/:id
   */
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(
      this.currentUserId,
      'system:permission:view'
    );
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    try {
      const permission = await ctx.service.permission.findById(id);

      if (!permission) {
        ctx.error('权限不存在', 'PERMISSION_NOT_FOUND', 404);
        return;
      }

      ctx.success(permission, '获取权限详情成功');
    } catch (error) {
      ctx.logger.error('Get permission failed:', error);
      ctx.error(error.message, 'GET_PERMISSION_FAILED', 500);
    }
  }

  /**
   * 创建权限
   * POST /api/permissions
   */
  async create() {
    const { ctx } = this;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(
      this.currentUserId,
      'system:permission:create'
    );
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      name: { type: 'string', required: true, min: 2, max: 50 },
      code: { type: 'string', required: true, min: 2, max: 100 },
      type: { type: 'enum', values: ['menu', 'button', 'api'], required: true },
      parent_id: { type: 'string', required: false },
      path: { type: 'string', required: false, max: 255 },
      component: { type: 'string', required: false, max: 255 },
      icon: { type: 'string', required: false, max: 50 },
      sort: { type: 'number', required: false },
      description: { type: 'string', required: false, max: 200 },
    };
    this.validate(rules);

    try {
      const permission = await ctx.service.permission.create(ctx.request.body);
      ctx.success(permission, '创建权限成功');
    } catch (error) {
      ctx.logger.error('Create permission failed:', error);
      ctx.error(error.message, 'CREATE_PERMISSION_FAILED', 400);
    }
  }

  /**
   * 更新权限信息
   * PUT /api/permissions/:id
   */
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(
      this.currentUserId,
      'system:permission:update'
    );
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    // 验证请求参数
    const rules = {
      name: { type: 'string', required: false, min: 2, max: 50 },
      code: { type: 'string', required: false, min: 2, max: 100 },
      type: {
        type: 'enum',
        values: ['menu', 'button', 'api'],
        required: false,
      },
      parent_id: { type: 'string', required: false },
      path: { type: 'string', required: false, max: 255 },
      component: { type: 'string', required: false, max: 255 },
      icon: { type: 'string', required: false, max: 50 },
      sort: { type: 'number', required: false },
      status: { type: 'enum', values: [0, 1], required: false },
      description: { type: 'string', required: false, max: 200 },
    };
    this.validate(rules);

    try {
      const permission = await ctx.service.permission.update(
        id,
        ctx.request.body
      );
      ctx.success(permission, '更新权限成功');
    } catch (error) {
      ctx.logger.error('Update permission failed:', error);
      ctx.error(error.message, 'UPDATE_PERMISSION_FAILED', 400);
    }
  }

  /**
   * 删除权限（软删除）
   * DELETE /api/permissions/:id
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    // 验证权限
    const hasPermission = await ctx.service.user.hasPermission(
      this.currentUserId,
      'system:permission:delete'
    );
    if (!hasPermission) {
      ctx.error('权限不足', 'FORBIDDEN', 403);
      return;
    }

    try {
      await ctx.service.permission.destroy(id);
      ctx.success(null, '删除权限成功');
    } catch (error) {
      ctx.logger.error('Delete permission failed:', error);
      ctx.error(error.message, 'DELETE_PERMISSION_FAILED', 400);
    }
  }
}

module.exports = PermissionController;
