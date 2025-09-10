// 数据库表结构测试脚本

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

logInfo("正在测试数据库表结构...");
logInfo("- 数据库:", config.database);
logInfo("");

// 使用 mysql2 测试连接
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
    connection.end();
    return;
  }

  logSuccess("✅ 数据库连接成功！");

  // 查询所有表
  connection.query("SHOW TABLES", (err, results) => {
    if (err) {
      logError("查询表列表失败:", err.message);
      connection.end();
      return;
    }

    const tables = results.map((row) => Object.values(row)[0]);
    logInfo(`\n📊 数据库中有 ${tables.length} 个表:`);
    tables.forEach((table) => logInfo(`  - ${table}`));

    // 检查必要的表是否存在（使用实际的表名）
    const requiredTables = [
      "users",
      "roles",
      "permissions",
      "userroles",
      "rolepermissions",
    ];
    logInfo("\n📋 必要表检查:");

    requiredTables.forEach((table) => {
      if (tables.includes(table)) {
        logInfo(`  ✅ ${table} 表存在`);
      } else {
        logInfo(`  ❌ ${table} 表不存在`);
      }
    });

    // 如果表存在，查询表结构
    if (tables.includes("users")) {
      logInfo("\n🔍 users 表结构:");
      connection.query("DESCRIBE users", (err, results) => {
        if (err) {
          logError("查询 users 表结构失败:", err.message);
        } else {
          results.forEach((column) => {
            logInfo(
              `  ${column.Field}: ${column.Type} ${column.Null === "YES" ? "NULL" : "NOT NULL"} ${column.Key} ${column.Default ? `DEFAULT ${column.Default}` : ""}`
            );
          });
        }

        connection.end();
      });
    } else {
      connection.end();
    }
  });
});
