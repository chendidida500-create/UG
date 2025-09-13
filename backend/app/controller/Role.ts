import { Controller } from 'egg';

export default class RoleController extends Controller {
  /**
   * 获取角色列表
   */
  public async index() {
    const { ctx } = this;
    const { page = 1, pageSize = 10, search } = ctx.query;

    try {
      const result = await ctx.service.role.index(
        parseInt(page as string),
        parseInt(pageSize as string),
        search as string
      );
      ctx.body = {
        success: true,
        data: result.roles,
        pagination: result.pagination,
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 获取角色详情
   */
  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const role = await ctx.service.role.show(parseInt(id));
      ctx.body = {
        success: true,
        data: role,
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 创建角色
   */
  public async create() {
    const { ctx } = this;
    const { name, description } = ctx.request.body;

    // 参数校验
    if (!name) {
      ctx.body = {
        success: false,
        message: '角色名不能为空',
      };
      return;
    }

    try {
      const role = await ctx.service.role.create({ name, description });
      ctx.body = {
        success: true,
        data: role,
        message: '角色创建成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 更新角色
   */
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, description } = ctx.request.body;

    try {
      const role = await ctx.service.role.update(parseInt(id), { name, description });
      ctx.body = {
        success: true,
        data: role,
        message: '角色更新成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 删除角色
   */
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      await ctx.service.role.destroy(parseInt(id));
      ctx.body = {
        success: true,
        message: '角色删除成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 为角色分配权限
   */
  public async assignPermissions() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { permissionIds } = ctx.request.body;

    try {
      await ctx.service.role.assignPermissions(parseInt(id), permissionIds);
      ctx.body = {
        success: true,
        message: '权限分配成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }
}