import { Controller } from 'egg';

export default class PermissionController extends Controller {
  /**
   * 获取权限列表
   */
  public async index() {
    const { ctx } = this;
    const { page = 1, pageSize = 10, search } = ctx.query;

    try {
      const result = await ctx.service.permission.index(
        parseInt(page as string),
        parseInt(pageSize as string),
        search as string
      );
      ctx.body = {
        success: true,
        data: result.permissions,
        pagination: result.pagination,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 获取权限详情
   */
  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const permission = await ctx.service.permission.show(parseInt(id));
      ctx.body = {
        success: true,
        data: permission,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 创建权限
   */
  public async create() {
    const { ctx } = this;
    const { name, description, action, resource } = ctx.request.body;

    // 参数校验
    if (!name || !action || !resource) {
      ctx.body = {
        success: false,
        message: '权限名、操作和资源不能为空',
      };
      return;
    }

    try {
      const permission = await ctx.service.permission.create({ name, description, action, resource });
      ctx.body = {
        success: true,
        data: permission,
        message: '权限创建成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 更新权限
   */
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, description, action, resource } = ctx.request.body;

    try {
      const permission = await ctx.service.permission.update(parseInt(id), { name, description, action, resource });
      ctx.body = {
        success: true,
        data: permission,
        message: '权限更新成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 删除权限
   */
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      await ctx.service.permission.destroy(parseInt(id));
      ctx.body = {
        success: true,
        message: '权限删除成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }
}