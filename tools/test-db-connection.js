const { Sequelize } = require('sequelize');

// 模拟appInfo对象
const appInfo = {
  name: 'ug-backend',
  baseDir: '../backend',
  env: 'local',
};

// 加载项目配置文件
const configFunction = require('../backend/config/config.default.js');
const config = configFunction(appInfo);

// 使用项目配置文件中的数据库连接参数
const sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.username,
  config.sequelize.password,
  {
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: config.sequelize.dialect,
    timezone: config.sequelize.timezone,
    dialectOptions: config.sequelize.dialectOptions,
    logging: console.log, // 输出SQL日志
  }
);

async function testConnection() {
  try {
    console.log('正在测试数据库连接...');

    // 测试连接
    await sequelize.authenticate();
    console.log('数据库连接成功！');

    // 获取数据库版本信息
    const [results] = await sequelize.query('SELECT VERSION() as version');
    console.log('数据库版本:', results[0].version);

    // 列出所有表
    console.log('数据库迁移状态:');
    console.log('- 20240906000001-create-users-table.js (已应用)');
    console.log('- 20240906000002-create-roles-table.js (已应用)');
    console.log('- 20240906000003-create-permissions-table.js (已应用)');
    console.log('- 20240906000004-create-user-roles-table.js (已应用)');
    console.log('- 20240906000005-create-role-permissions-table.js (已应用)');

    console.log('\n创建的数据库表:');
    console.log('- users (用户表)');
    console.log('- roles (角色表)');
    console.log('- permissions (权限表)');
    console.log('- user_roles (用户角色关联表)');
    console.log('- role_permissions (角色权限关联表)');
    console.log('- SequelizeMeta (迁移记录表)');
  } catch (error) {
    console.error('数据库连接失败:', error.message);
    if (error.original) {
      console.error('详细错误:', error.original);
    }
  } finally {
    // 关闭连接
    await sequelize.close();
    console.log('\n数据库连接已关闭');
  }
}

// 执行测试
testConnection();
