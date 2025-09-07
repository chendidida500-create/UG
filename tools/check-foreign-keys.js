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

async function checkForeignKeys() {
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

    console.log('Checking foreign key constraints...');
    const query = `SELECT 
      CONSTRAINT_NAME, 
      TABLE_NAME, 
      COLUMN_NAME, 
      REFERENCED_TABLE_NAME, 
      REFERENCED_COLUMN_NAME 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE REFERENCED_TABLE_NAME = 'permissions' 
    AND TABLE_SCHEMA = '${config.sequelize.database}'`;

    const [results] = await sequelize.query(query);
    console.log('Foreign key constraints:');
    results.forEach((r) => {
      console.log(
        `- ${r.CONSTRAINT_NAME}: ${r.TABLE_NAME}.${r.COLUMN_NAME} -> ${r.REFERENCED_TABLE_NAME}.${r.REFERENCED_COLUMN_NAME}`
      );
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkForeignKeys();
