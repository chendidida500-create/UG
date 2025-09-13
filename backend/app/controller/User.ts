import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 获取用户列表
   */
  public async index() {
    const { ctx } = this;
    const { page = 1, pageSize = 10, search } = ctx.query;

    try {
      const result = await ctx.service.user.index(
        parseInt(page as string),
        parseInt(pageSize as string),
        search as string
      );
      ctx.body = {
        success: true,
        data: result.users,
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
   * 获取用户详情
   */
  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const user = await ctx.service.user.show(parseInt(id));
      ctx.body = {
        success: true,
        data: user,
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 创建用户
   */
  public async create() {
    const { ctx } = this;
    const { username, email, password } = ctx.request.body;

    // 参数校验
    if (!username || !email || !password) {
      ctx.body = {
        success: false,
        message: '用户名、邮箱和密码不能为空',
      };
      return;
    }

    try {
      const user = await ctx.service.user.create({ username, email, password });
      ctx.body = {
        success: true,
        data: user,
        message: '用户创建成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 更新用户
   */
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { username, email, password } = ctx.request.body;

    try {
      const user = await ctx.service.user.update(parseInt(id), { username, email, password });
      ctx.body = {
        success: true,
        data: user,
        message: '用户更新成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 删除用户
   */
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      await ctx.service.user.destroy(parseInt(id));
      ctx.body = {
        success: true,
        message: '用户删除成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 为用户分配角色
   */
  public async assignRoles() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { roleIds } = ctx.request.body;

    try {
      await ctx.service.user.assignRoles(parseInt(id), roleIds);
      ctx.body = {
        success: true,
        message: '角色分配成功',
      };
    } catch (error: any) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }
}