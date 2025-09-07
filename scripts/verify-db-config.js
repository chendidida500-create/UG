/**
 * 数据库配置验证脚本
 * 验证数据库配置是否已正确统一
 */

const fs = require('fs');
const path = require('path');

// 数据库配置文件路径
const dbConfigPath = path.join(__dirname, '../backend/database/config.js');
const defaultConfigPath = path.join(__dirname, '../backend/config/config.default.js');

console.log('正在验证数据库配置文件...\n');

let hasError = false;

// 验证 database/config.js 文件
try {
  const dbConfigContent = fs.readFileSync(dbConfigPath, 'utf8');

  // 检查开发环境配置
  if (!dbConfigContent.includes("database: 'ug'") ||
    !dbConfigContent.includes("username: 'ug'")) {
    console.log('✗ backend/database/config.js 中开发环境配置不正确');
    hasError = true;
  } else {
    console.log('✓ backend/database/config.js 中开发环境配置正确');
  }

  // 检查测试环境配置
  const testEnvMatch = dbConfigContent.match(/test:\s*{[^}]*?}/s);
  if (testEnvMatch &&
    (testEnvMatch[0].includes("database: 'ug'") &&
      testEnvMatch[0].includes("username: 'ug'"))) {
    console.log('✓ backend/database/config.js 中测试环境配置正确');
  } else {
    console.log('✗ backend/database/config.js 中测试环境配置不正确');
    hasError = true;
  }

  // 检查生产环境配置
  const prodEnvMatch = dbConfigContent.match(/production:\s*{[^}]*?}/s);
  if (prodEnvMatch &&
    (prodEnvMatch[0].includes("database: process.env.DB_DATABASE || 'ug'") &&
      prodEnvMatch[0].includes("username: process.env.DB_USERNAME || 'ug'"))) {
    console.log('✓ backend/database/config.js 中生产环境配置正确');
  } else {
    console.log('✗ backend/database/config.js 中生产环境配置不正确');
    hasError = true;
  }
} catch (error) {
  console.error('✗ 读取 backend/database/config.js 文件失败:', error.message);
  hasError = true;
}

// 验证 config/config.default.js 文件
try {
  const defaultConfigContent = fs.readFileSync(defaultConfigPath, 'utf8');

  // 检查默认配置
  if (defaultConfigContent.includes("database: 'ug'") &&
    defaultConfigContent.includes("username: 'ug'")) {
    console.log('✓ backend/config/config.default.js 配置正确');
  } else {
    console.log('✗ backend/config/config.default.js 配置不正确');
    hasError = true;
  }
} catch (error) {
  console.error('✗ 读取 backend/config/config.default.js 文件失败:', error.message);
  hasError = true;
}

console.log('\n' + '='.repeat(50));
if (hasError) {
  console.log('验证结果：数据库配置存在错误，请检查并修正！');
  process.exit(1);
} else {
  console.log('验证结果：所有数据库配置均已正确统一！');
  console.log('数据库名：ug');
  console.log('用户名：ug');
  console.log('密码：zcn231101');
}
console.log('='.repeat(50));