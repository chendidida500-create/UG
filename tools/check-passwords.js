const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

// 模拟appInfo对象
const appInfo = {
  name: 'ug-backend',
  baseDir: '../backend',
  env: 'local',
};

// 加载项目配置文件
const configFunction = require('../backend/config/config.default.js');
const config = configFunction(appInfo);

async function checkUserPasswords() {
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

    // 查询用户密码数据
    const [users] = await sequelize.query(
      'SELECT username, password FROM users'
    );
    console.log('User passwords (hashed):');
    users.forEach((u) => {
      console.log(`- ${u.username}: ${u.password}`);
    });

    console.log('\nTesting password verification:');
    const testPassword = '123456';
    const adminUser = users.find((u) => u.username === 'admin');
    if (adminUser) {
      const isMatch = await bcrypt.compare(testPassword, adminUser.password);
      console.log(`Password '123456' matches for admin: ${isMatch}`);
    }

    const testPassword2 = 'admin123456';
    if (adminUser) {
      const isMatch = await bcrypt.compare(testPassword2, adminUser.password);
      console.log(`Password 'admin123456' matches for admin: ${isMatch}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkUserPasswords();
