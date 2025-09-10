// 数据库连接测试脚本

// 数据库配置 - 使用环境变量
const config = {
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306", 10),
  database: process.env.MYSQL_DATABASE || "ug",
  username: process.env.MYSQL_USERNAME || "ug",
  password: process.env.MYSQL_PASSWORD || "zcn231101",
};

// 使用更规范的日志输出方式替代console.log
function logInfo(...args) {
  process.stdout.write(
    `${new Date().toISOString()} [INFO] ${args.join(" ")}\n`
  );
}

function logError(...args) {
  process.stderr.write(
    `${new Date().toISOString()} [ERROR] ${args.join(" ")}\n`
  );
}

function logSuccess(...args) {
  process.stdout.write(
    `${new Date().toISOString()} [SUCCESS] ${args.join(" ")}\n`
  );
}

logInfo("正在测试数据库连接...");
logInfo("- 主机地址:", config.host);
logInfo("- 端口:", config.port);
logInfo("- 数据库名:", config.database);
logInfo("- 用户名:", config.username);
logInfo("- 密码: ***** (已隐藏)");
logInfo("");

// 使用 mysql2 直接测试连接（mysql2 是 egg-sequelize 的依赖）
const mysql = require("mysql2");

// 创建连接
const connection = mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database,
  timezone: "+08:00",
});

connection.connect((err) => {
  if (err) {
    logError("❌ 数据库连接失败:", err.message);

    // 提供一些常见的故障排除建议
    if (err.message.includes("ECONNREFUSED")) {
      logInfo("");
      logInfo("💡 故障排除建议:");
      logInfo("1. 请确保 MySQL 服务正在运行");
      logInfo("2. 检查 MySQL 是否监听在 3306 端口");
      logInfo("3. 检查防火墙设置是否阻止了连接");
    } else if (err.message.includes("Access denied")) {
      logInfo("");
      logInfo("💡 故障排除建议:");
      logInfo("1. 请检查数据库用户名和密码是否正确");
      logInfo("2. 确认用户具有访问指定数据库的权限");
    } else if (err.message.includes("Unknown database")) {
      logInfo("");
      logInfo("💡 故障排除建议:");
      logInfo("1. 数据库可能尚未创建");
      logInfo("2. 请运行数据库初始化脚本: scripts\\init-database.bat");
    }

    connection.end();
    return;
  }

  logSuccess("✅ 数据库连接成功！");

  // 获取 MySQL 版本
  connection.query("SELECT VERSION() as version", (err, results) => {
    if (err) {
      logError("查询版本信息失败:", err.message);
    } else {
      logInfo("- MySQL版本:", results[0].version);
    }

    // 检查数据库是否存在
    connection.query("SHOW DATABASES", (err, results) => {
      if (err) {
        logError("查询数据库列表失败:", err.message);
      } else {
        const databaseExists = results.some(
          (row) => row.Database === config.database
        );
        if (databaseExists) {
          logInfo(`- 数据库 "${config.database}" 存在`);
        } else {
          logInfo(`- 数据库 "${config.database}" 不存在`);
        }
      }

      connection.end();
    });
  });
});
