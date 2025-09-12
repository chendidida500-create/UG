// 数据库验证脚本
const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

// 使用开发环境配置
const env = "development";
const dbConfig = config[env];

// 创建 Sequelize 实例
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    timezone: dbConfig.timezone,
    dialectOptions: dbConfig.dialectOptions,
    logging: false, // 禁用SQL日志
  }
);

// 验证数据库连接
async function validateDatabase() {
  try {
    // eslint-disable-next-line no-console
    console.log("正在验证数据库连接...");
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log("✓ 数据库连接成功");

    // 检查表是否存在
    // eslint-disable-next-line no-console
    console.log("\n正在检查表结构...");
    const tables = await sequelize.getQueryInterface().showAllTables();

    const expectedTables = [
      "Users",
      "Roles",
      "Permissions",
      "UserRoles",
      "RolePermissions",
    ];
    for (const table of expectedTables) {
      if (tables.includes(table)) {
        // eslint-disable-next-line no-console
        console.log(`✓ 表 ${table} 存在`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`✗ 表 ${table} 不存在`);
      }
    }

    // 检查数据
    // eslint-disable-next-line no-console
    console.log("\n正在检查初始数据...");
    try {
      const [{ count: userCount }] = await sequelize.query(
        "SELECT COUNT(*) as count FROM Users"
      );
      // eslint-disable-next-line no-console
      console.log(`✓ 用户表记录数: ${userCount}`);

      const [{ count: roleCount }] = await sequelize.query(
        "SELECT COUNT(*) as count FROM Roles"
      );
      // eslint-disable-next-line no-console
      console.log(`✓ 角色表记录数: ${roleCount}`);

      const [{ count: permissionCount }] = await sequelize.query(
        "SELECT COUNT(*) as count FROM Permissions"
      );
      // eslint-disable-next-line no-console
      console.log(`✓ 权限表记录数: ${permissionCount}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`✗ 检查数据时出错: ${error.message}`);
    }

    // eslint-disable-next-line no-console
    console.log("\n数据库验证完成！");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("✗ 数据库连接失败:", error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// 只有在直接运行此脚本时才执行验证
if (require.main === module) {
  validateDatabase();
}

// 导出函数供其他模块使用
module.exports = { validateDatabase };
