// 数据库配置验证脚本
// eslint-disable-next-line no-console
console.log("数据库配置验证:");
// eslint-disable-next-line no-console
console.log("- 主机地址:", process.env.MYSQL_HOST || "localhost");
// eslint-disable-next-line no-console
console.log("- 端口:", process.env.MYSQL_PORT || "3306");
// eslint-disable-next-line no-console
console.log("- 数据库名:", process.env.MYSQL_DATABASE || "ug");
// eslint-disable-next-line no-console
console.log("- 用户名:", process.env.MYSQL_USERNAME || "ug");
// eslint-disable-next-line no-console
console.log("- 密码: ***** (已隐藏)");
// eslint-disable-next-line no-console
console.log("- 时区: +08:00");
// eslint-disable-next-line no-console
console.log("- 字符集: utf8mb4");
// eslint-disable-next-line no-console
console.log("- 下划线命名: true");
// eslint-disable-next-line no-console
console.log("- 时间戳: true");

// eslint-disable-next-line no-console
console.log("\n配置说明:");
// eslint-disable-next-line no-console
console.log("- 数据库类型: mysql");
// eslint-disable-next-line no-console
console.log("- 时区设置: +08:00");
// eslint-disable-next-line no-console
console.log("- 字符集: utf8mb4");
// eslint-disable-next-line no-console
console.log("- 下划线命名: 使用下划线命名");
// eslint-disable-next-line no-console
console.log("- 时间戳: 启用时间戳");
