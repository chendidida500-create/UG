// 数据检查脚本
const { exec } = require("child_process");

// 执行SQL查询命令
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    const command = `mysql -u ug -pzcn231101 -D ug -e "${query}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout);
      }
    });
  });
}

async function checkData() {
  try {
    // eslint-disable-next-line no-console
    console.log("检查数据库中的数据...");

    // 检查用户表
    // eslint-disable-next-line no-console
    console.log("\n1. 检查用户表:");
    const userResult = await executeQuery(
      "SELECT COUNT(*) as count FROM Users;"
    );
    // eslint-disable-next-line no-console
    console.log(userResult);

    // 检查角色表
    // eslint-disable-next-line no-console
    console.log("\n2. 检查角色表:");
    const roleResult = await executeQuery(
      "SELECT COUNT(*) as count FROM Roles;"
    );
    // eslint-disable-next-line no-console
    console.log(roleResult);

    // 检查权限表
    // eslint-disable-next-line no-console
    console.log("\n3. 检查权限表:");
    const permissionResult = await executeQuery(
      "SELECT COUNT(*) as count FROM Permissions;"
    );
    // eslint-disable-next-line no-console
    console.log(permissionResult);

    // 检查用户角色关联表
    // eslint-disable-next-line no-console
    console.log("\n4. 检查用户角色关联表:");
    const userRoleResult = await executeQuery(
      "SELECT COUNT(*) as count FROM UserRoles;"
    );
    // eslint-disable-next-line no-console
    console.log(userRoleResult);

    // 检查角色权限关联表
    // eslint-disable-next-line no-console
    console.log("\n5. 检查角色权限关联表:");
    const rolePermissionResult = await executeQuery(
      "SELECT COUNT(*) as count FROM RolePermissions;"
    );
    // eslint-disable-next-line no-console
    console.log(rolePermissionResult);

    // eslint-disable-next-line no-console
    console.log("\n数据检查完成！");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("检查数据时出错:", error.message);
    process.exit(1);
  }
}

checkData();
