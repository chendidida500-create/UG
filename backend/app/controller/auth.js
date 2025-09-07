'use strict';

const BaseController = require('./base');

/**
 * 认证控制器
 * 处理用户登录、注册、Token刷新等认证相关操作
 */
class AuthController extends BaseController {
  /**
   * 用户登录
   * POST /api/auth/login
   */
  async login() {
    const { ctx } = this;

    // 验证请求参数
    const rules = {
      username: { type: 'string', required: true, min: 3, max: 50 },
      password: { type: 'string', required: true, min: 6, max: 100 },
      remember: { type: 'boolean', required: false },
    };
    this.validate(rules);

    const { username, password, remember = false } = ctx.request.body;

    try {
      // 调用认证服务进行登录
      const loginResult = await ctx.service.auth.login(username, password, remember);

      // 更新用户最后登录时间
      await ctx.service.user.updateLastLoginTime(loginResult.user.id);

      ctx.success(loginResult, '登录成功');
    } catch (error) {
      ctx.logger.error('Login failed:', error);
      ctx.error(error.message, 'LOGIN_FAILED', 401);
    }
  }

  /**
   * 用户注册
   * POST /api/auth/register
   */
  async register() {
    const { ctx } = this;

    // 验证请求参数
    const rules = {
      username: { type: 'string', required: true, min: 3, max: 50 },
      email: { type: 'email', required: true },
      password: { type: 'string', required: true, min: 6, max: 100 },
      confirmPassword: { type: 'string', required: true },
      nickname: { type: 'string', required: false, max: 50 },
    };
    this.validate(rules);

    const { username, email, password, confirmPassword, nickname } =
      ctx.request.body;

    // 验证密码确认
    if (password !== confirmPassword) {
      ctx.error('两次输入的密码不一致', 'PASSWORD_MISMATCH', 400);
      return;
    }

    try {
      // 调用认证服务进行注册
      const user = await ctx.service.auth.register({
        username,
        email,
        password,
        nickname,
      });

      ctx.success(user, '注册成功');
    } catch (error) {
      ctx.logger.error('Register failed:', error);
      ctx.error(error.message, 'REGISTER_FAILED', 400);
    }
  }

  /**
   * 刷新Token
   * POST /api/auth/refresh
   */
  async refresh() {
    const { ctx } = this;

    // 验证请求参数
    const rules = {
      refreshToken: { type: 'string', required: true },
    };
    this.validate(rules);

    const { refreshToken } = ctx.request.body;

    try {
      // 调用认证服务刷新Token
      const refreshTokenResult = await ctx.service.auth.refreshToken(refreshToken);

      ctx.success(refreshTokenResult, 'Token刷新成功');
    } catch (error) {
      ctx.logger.error('Token refresh failed:', error);
      ctx.error(error.message, 'TOKEN_REFRESH_FAILED', 401);
    }
  }

  /**
   * 用户退出登录
   * POST /api/auth/logout
   */
  async logout() {
    const { ctx } = this;

    try {
      // 可以在这里添加注销Token的逻辑（如黑名单机制）
      // await ctx.service.auth.logout(ctx.state.userId);

      ctx.success(null, '退出登录成功');
    } catch (error) {
      ctx.logger.error('Logout failed:', error);
      ctx.error(error.message, 'LOGOUT_FAILED', 400);
    }
  }
}

module.exports = AuthController;
