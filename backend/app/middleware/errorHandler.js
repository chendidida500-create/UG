'use strict';

/**
 * 错误处理中间件
 * 统一处理API错误响应
 */

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 记录错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      const code = err.code || 'INTERNAL_ERROR';
      let message = err.message || 'Internal Server Error';

      // 生产环境隐藏详细错误信息
      if (status === 500 && ctx.app.config.env === 'prod') {
        message = 'Internal Server Error';
      }

      // 参数验证错误
      if (err.code === 'invalid_param') {
        ctx.status = 400;
        ctx.body = {
          success: false,
          code: 'VALIDATION_ERROR',
          message: '参数验证失败',
          data: err.errors || [],
        };
        return;
      }

      // JWT认证错误
      if (
        err.name === 'JsonWebTokenError' ||
        err.name === 'TokenExpiredError'
      ) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          code: 'UNAUTHORIZED',
          message: '认证失败，请重新登录',
          data: null,
        };
        return;
      }

      // 权限不足错误
      if (code === 'FORBIDDEN') {
        ctx.status = 403;
        ctx.body = {
          success: false,
          code: 'FORBIDDEN',
          message: '权限不足',
          data: null,
        };
        return;
      }

      // 资源未找到错误
      if (status === 404) {
        ctx.status = 404;
        ctx.body = {
          success: false,
          code: 'NOT_FOUND',
          message: '请求的资源不存在',
          data: null,
        };
        return;
      }

      // 其他错误
      ctx.status = status;
      ctx.body = {
        success: false,
        code,
        message,
        data: null,
        ...(ctx.app.config.env !== 'prod' && { stack: err.stack }),
      };
    }
  };
};
