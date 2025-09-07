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

async function checkPermissionStructure() {
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

    console.log('Checking permission structure...');
    const [permissions] = await sequelize.query(`
      SELECT 
        p.id,
        p.name,
        p.code,
        p.type,
        p.parent_id,
        parent.code as parent_code
      FROM permissions p
      LEFT JOIN permissions parent ON p.parent_id = parent.id
      ORDER BY p.code
    `);

    console.log('Permissions structure:');
    permissions.forEach((p) => {
      console.log(
        `- ${p.code} (${p.type}) ${p.parent_code ? '-> ' + p.parent_code : '(root)'}`
      );
    });

    console.log(`\nTotal permissions: ${permissions.length}`);

    // 检查是否有未设置父权限的子权限
    const [unlinkedPermissions] = await sequelize.query(`
      SELECT code, type FROM permissions 
      WHERE parent_id IS NULL 
      AND code LIKE '%:%' 
      AND code NOT IN ('api:permission', 'api:role', 'api:user')
    `);

    if (unlinkedPermissions.length > 0) {
      console.log('\nUnlinked sub-permissions (need parent assignment):');
      unlinkedPermissions.forEach((p) => {
        console.log(`- ${p.code} (${p.type})`);
      });
    } else {
      console.log('\nAll sub-permissions are properly linked!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkPermissionStructure();
