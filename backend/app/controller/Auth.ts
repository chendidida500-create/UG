import { Controller } from 'egg';

export default class AuthController extends Controller {
  /**
   * 用户登录
   */
  public async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    // 参数校验
    if (!username || !password) {
      ctx.body = {
        success: false,
        message: '用户名和密码不能为空',
      };
      return;
    }

    try {
      const result = await ctx.service.auth.login({ username, password });
      ctx.body = {
        success: true,
        data: result,
        message: '登录成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 用户登出
   */
  public async logout() {
    try {
      await ctx.service.auth.logout();
      ctx.body = {
        success: true,
        message: '登出成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * 获取当前用户信息
   */
  public async profile() {
    const { ctx } = this;
    
    try {
      // 从JWT token中获取用户ID
      const userId = ctx.state.user.id;
      const user = await ctx.service.auth.profile(userId);
      ctx.body = {
        success: true,
        data: user,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.message,
      };
    }
  }
}