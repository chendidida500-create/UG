const { Sequelize } = require('sequelize');

// 模拟appInfo对象
const appInfo = {
  name: 'ug-backend',
  baseDir: '../backend',
  env: 'local'
};

// 加载项目配置文件
const configFunction = require('../backend/config/config.default.js');
const config = configFunction(appInfo);

async function testPermissionInsert() {
  // 使用项目配置文件中的数据库连接参数
  const sequelize = new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    {
      host: config.sequelize.host,
      port: config.sequelize.port,
      dialect: config.sequelize.dialect,
    }
  );

  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('Database connection successful!');

    console.log('Testing permission insert...');
    const query = `INSERT INTO permissions 
      (id, name, code, type, sort, status, created_at, updated_at) 
      VALUES 
      ('test-id-1', '测试权限1', 'test:permission:1', 'menu', 1, 1, NOW(), NOW()),
      ('test-id-2', '测试权限2', 'test:permission:2', 'button', 2, 1, NOW(), NOW())`;

    await sequelize.query(query);
    console.log('Permission insert successful!');

    // 查询插入的数据
    const [results] = await sequelize.query('SELECT * FROM permissions WHERE code LIKE "test:%"');
    console.log('Inserted permissions:', results);

    // 清理测试数据
    await sequelize.query("DELETE FROM permissions WHERE code LIKE 'test:%'");
    console.log('Test data cleaned up');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

testPermissionInsert();