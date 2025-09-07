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

async function checkUserRolesTable() {
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

    // 检查user_roles表结构
    const [columns] = await sequelize.query('SHOW COLUMNS FROM user_roles');
    console.log('user_roles table structure:');
    columns.forEach((c) => {
      console.log(
        `- ${c.Field}: ${c.Type} ${c.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${c.Key} ${c.Default ? 'DEFAULT ' + c.Default : ''}`
      );
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkUserRolesTable();
