// 数据库数据测试脚本

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

logInfo("正在测试数据库数据...");
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

  // 测试用户表数据
  connection.query("SELECT COUNT(*) as count FROM users", (err, results) => {
    if (err) {
      logError("查询用户表数据失败:", err.message);
    } else {
      const userCount = results[0].count;
      logInfo(`\n👥 用户表数据: ${userCount} 条记录`);
      if (userCount > 0) {
        logInfo("  ✅ 用户数据已填充");
        // 显示一个示例用户（不显示密码）
        connection.query(
          "SELECT id, username, email, createdAt FROM users LIMIT 1",
          (err, results) => {
            if (!err && results.length > 0) {
              logInfo("  示例用户:", JSON.stringify(results[0], null, 2));
            }
          }
        );
      } else {
        logInfo("  ⚠️ 用户数据未填充");
      }
    }

    // 测试角色表数据
    connection.query("SELECT COUNT(*) as count FROM roles", (err, results) => {
      if (err) {
        logError("查询角色表数据失败:", err.message);
      } else {
        const roleCount = results[0].count;
        logInfo(`\n🎭 角色表数据: ${roleCount} 条记录`);
        if (roleCount > 0) {
          logInfo("  ✅ 角色数据已填充");
          // 显示角色数据
          connection.query(
            "SELECT id, name, description, createdAt FROM roles",
            (err, results) => {
              if (!err && results.length > 0) {
                logInfo("  角色列表:");
                results.forEach((role) => {
                  logInfo(`    - ${role.name}: ${role.description}`);
                });
              }
            }
          );
        } else {
          logInfo("  ⚠️ 角色数据未填充");
        }
      }

      // 测试权限表数据
      connection.query(
        "SELECT COUNT(*) as count FROM permissions",
        (err, results) => {
          if (err) {
            logError("查询权限表数据失败:", err.message);
          } else {
            const permissionCount = results[0].count;
            logInfo(`\n🔑 权限表数据: ${permissionCount} 条记录`);
            if (permissionCount > 0) {
              logInfo("  ✅ 权限数据已填充");
              // 显示权限数据
              connection.query(
                "SELECT id, name, description, createdAt FROM permissions LIMIT 5",
                (err, results) => {
                  if (!err && results.length > 0) {
                    logInfo("  示例权限:");
                    results.forEach((permission) => {
                      logInfo(
                        `    - ${permission.name}: ${permission.description}`
                      );
                    });
                  }
                }
              );
            } else {
              logInfo("  ⚠️ 权限数据未填充");
            }
          }

          // 测试用户角色关联表数据
          connection.query(
            "SELECT COUNT(*) as count FROM userroles",
            (err, results) => {
              if (err) {
                logError("查询用户角色关联表数据失败:", err.message);
              } else {
                const userRoleCount = results[0].count;
                logInfo(`\n👤 用户角色关联: ${userRoleCount} 条记录`);
                if (userRoleCount > 0) {
                  logInfo("  ✅ 用户角色关联数据已填充");
                } else {
                  logInfo("  ⚠️ 用户角色关联数据未填充");
                }
              }

              // 测试角色权限关联表数据
              connection.query(
                "SELECT COUNT(*) as count FROM rolepermissions",
                (err, results) => {
                  if (err) {
                    logError("查询角色权限关联表数据失败:", err.message);
                  } else {
                    const rolePermissionCount = results[0].count;
                    logInfo(`\n🔑 角色权限关联: ${rolePermissionCount} 条记录`);
                    if (rolePermissionCount > 0) {
                      logInfo("  ✅ 角色权限关联数据已填充");
                    } else {
                      logInfo("  ⚠️ 角色权限关联数据未填充");
                    }
                  }

                  connection.end();
                }
              );
            }
          );
        }
      );
    });
  });
});
