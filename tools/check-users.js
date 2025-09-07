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

async function checkUsers() {
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

    // 查询用户数据
    const [users] = await sequelize.query(
      'SELECT id, username, email, status FROM users'
    );
    console.log('Users in database:');
    users.forEach((u) => {
      console.log(`- ${u.username} (${u.email}) - Status: ${u.status}`);
    });

    // 查询角色数据
    const [roles] = await sequelize.query(
      'SELECT id, name, code, status FROM roles'
    );
    console.log('\nRoles in database:');
    roles.forEach((r) => {
      console.log(`- ${r.name} (${r.code}) - Status: ${r.status}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkUsers();
