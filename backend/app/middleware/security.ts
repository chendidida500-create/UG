import { Context, Next } from 'egg';

export default function securityMiddleware(): any {
  return async (ctx: Context, next: Next) => {
    // 添加安全头
    ctx.set('X-Content-Type-Options', 'nosniff');
    ctx.set('X-Frame-Options', 'DENY');
    ctx.set('X-XSS-Protection', '1; mode=block');
    
    // 限制请求频率 (简单实现，生产环境建议使用专业方案)
    const clientIP = ctx.ip;
    const rateLimitKey = `rate_limit:${clientIP}`;
    
    try {
      // 获取请求计数
      let requestCount = await ctx.app.redis.get(rateLimitKey);
      requestCount = requestCount ? parseInt(requestCount, 10) : 0;
      
      // 如果超过限制，拒绝请求
      if (requestCount > 100) { // 每分钟最多100次请求
        ctx.status = 429;
        ctx.body = {
          success: false,
          message: '请求过于频繁，请稍后再试',
        };
        return;
      }
      
      // 增加请求计数
      if (requestCount === 0) {
        await ctx.app.redis.setex(rateLimitKey, 60, '1'); // 60秒过期
      } else {
        await ctx.app.redis.incr(rateLimitKey);
      }
    } catch (error) {
      // Redis错误不影响主流程
      console.error('Rate limit error:', error);
    }
    
    await next();
  };
}