'use strict';

/**
 * JWT认证中间件
 * 验证用户身份和权限
 */

module.exports = (options) => {
  return async function jwtAuth(ctx, next) {
    // 检查是否需要跳过认证
    if (
      options.ignore &&
      options.ignore.some((path) => ctx.path.startsWith(path))
    ) {
      await next();
      return;
    }

    // 获取token
    const token =
      ctx.get('Authorization')?.replace('Bearer ', '') ||
      ctx.query.token ||
      ctx.request.body.token;

    if (!token) {
      ctx.throw(401, 'Token不能为空', { code: 'UNAUTHORIZED' });
    }

    try {
      // 验证token
      const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);

      // 检查token是否过期
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        ctx.throw(401, 'Token已过期', { code: 'TOKEN_EXPIRED' });
      }

      // 获取用户信息
      const user = await ctx.service.user.findById(decoded.userId);
      if (!user) {
        ctx.throw(401, '用户不存在', { code: 'USER_NOT_FOUND' });
      }

      // 检查用户状态
      if (user.status !== 1) {
        ctx.throw(401, '用户已被禁用', { code: 'USER_DISABLED' });
      }

      // 将用户信息存储到上下文
      ctx.state.user = user;
      ctx.state.userId = user.id;

      await next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        ctx.throw(401, 'Token格式错误', { code: 'INVALID_TOKEN' });
      }
      if (err.name === 'TokenExpiredError') {
        ctx.throw(401, 'Token已过期', { code: 'TOKEN_EXPIRED' });
      }
      throw err;
    }
  };
};
