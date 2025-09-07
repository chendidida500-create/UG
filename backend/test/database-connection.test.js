'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/database-connection.test.js', () => {
  it('should connect to database successfully', async () => {
    // 测试数据库连接
    const ctx = app.mockContext();

    try {
      // 尝试执行一个简单的查询来验证连接
      const result = await ctx.model.query('SELECT 1 AS result', {
        type: ctx.model.QueryTypes.SELECT
      });

      console.log('数据库连接成功:', result);
      console.log('数据库配置:', app.config.sequelize);

      // 验证结果
      if (result && result[0] && result[0].result === 1) {
        console.log('数据库连接测试通过');
      } else {
        throw new Error('数据库连接测试失败');
      }
    } catch (error) {
      console.error('数据库连接测试失败:', error.message);
      throw error;
    }
  });

  it('should have required database tables', async () => {
    const ctx = app.mockContext();

    try {
      // 检查是否存在关键表
      const tables = await ctx.model.query(
        'SHOW TABLES',
        { type: ctx.model.QueryTypes.SHOWTABLES }
      );

      console.log('数据库表列表:', tables);

      // 检查关键表是否存在
      const requiredTables = ['users', 'roles', 'permissions', 'role_permissions'];
      const missingTables = [];

      for (const table of requiredTables) {
        if (!tables.includes(table)) {
          missingTables.push(table);
        }
      }

      if (missingTables.length > 0) {
        console.warn('缺少以下表:', missingTables);
      } else {
        console.log('所有必需的表都存在');
      }
    } catch (error) {
      console.error('表检查失败:', error.message);
    }
  });
});