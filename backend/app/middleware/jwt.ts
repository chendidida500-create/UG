import { Context, Next } from 'egg';

export default function jwtMiddleware(): any {
  return async (ctx: Context, next: Next) => {
    // 对于某些路径跳过JWT验证
    const publicPaths = [
      '/api/health',
      '/api/auth/login',
      '/api/auth/logout',
    ];

    if (publicPaths.includes(ctx.path) || ctx.path.startsWith('/api/public')) {
      await next();
      return;
    }

    try {
      // 从请求头获取token
      const token = ctx.header.authorization?.replace('Bearer ', '');
      if (!token) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          message: '未提供认证令牌',
        };
        return;
      }

      // 验证token
      const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      ctx.state.user = decoded;
      
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '无效的认证令牌',
      };
    }
  };
}