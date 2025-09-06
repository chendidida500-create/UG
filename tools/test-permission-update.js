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

async function testPermissionUpdate() {
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

    // 先检查是否有system权限
    const [systemPermissions] = await sequelize.query("SELECT id, code FROM permissions WHERE code = 'system'");
    console.log('System permissions:', systemPermissions);

    if (systemPermissions.length > 0) {
      const systemId = systemPermissions[0].id;
      console.log('Testing permission update...');

      // 更新system:user的parent_id
      await sequelize.query(
        "UPDATE permissions SET parent_id = ? WHERE code = 'system:user'",
        { replacements: [systemId] }
      );
      console.log('Permission update successful!');

      // 查询更新后的数据
      const [updatedPermissions] = await sequelize.query("SELECT * FROM permissions WHERE code = 'system:user'");
      console.log('Updated permission:', updatedPermissions[0]);
    } else {
      console.log('No system permission found');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

testPermissionUpdate();