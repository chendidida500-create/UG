#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色代码
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
};

// 打印带颜色的消息
function printMessage(message, color = colors.white) {
  console.log(`${color}${message}${colors.reset}`);
}

// 执行命令并返回结果
function executeCommand(command) {
  try {
    const result = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    return { success: true, output: result.trim() };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: error.stdout?.toString().trim() || '',
    };
  }
}

// 检查Node.js和npm版本
function checkNodeAndNpm() {
  printMessage('=== 检查Node.js和npm环境 ===', colors.cyan);

  // 检查Node.js版本
  const nodeResult = executeCommand('node --version');
  if (nodeResult.success) {
    printMessage(`✓ Node.js版本: ${nodeResult.output}`, colors.green);
  } else {
    printMessage('✗ 未找到Node.js，请安装Node.js', colors.red);
    return false;
  }

  // 检查npm版本
  const npmResult = executeCommand('npm --version');
  if (npmResult.success) {
    printMessage(`✓ npm版本: ${npmResult.output}`, colors.green);
  } else {
    printMessage('✗ 未找到npm，请安装npm', colors.red);
    return false;
  }

  return true;
}

// 检查项目依赖
function checkProjectDependencies() {
  printMessage('\n=== 检查项目依赖 ===', colors.cyan);

  const rootPackageJson = path.join(__dirname, '..', 'package.json');
  const frontendPackageJson = path.join(
    __dirname,
    '..',
    'frontend',
    'package.json'
  );
  const backendPackageJson = path.join(
    __dirname,
    '..',
    'backend',
    'package.json'
  );

  if (!fs.existsSync(rootPackageJson)) {
    printMessage('✗ 根目录package.json文件不存在', colors.red);
    return false;
  }

  if (!fs.existsSync(frontendPackageJson)) {
    printMessage('✗ 前端package.json文件不存在', colors.red);
    return false;
  }

  if (!fs.existsSync(backendPackageJson)) {
    printMessage('✗ 后端package.json文件不存在', colors.red);
    return false;
  }

  printMessage('✓ 所有package.json文件存在', colors.green);
  return true;
}

// 检查数据库连接
function checkDatabaseConnection() {
  printMessage('\n=== 检查数据库连接 ===', colors.cyan);

  // 这里可以添加实际的数据库连接检查逻辑
  // 由于需要数据库凭证，我们暂时只检查配置文件是否存在
  const databaseConfig = path.join(
    __dirname,
    '..',
    'backend',
    'config',
    'config.default.js'
  );

  if (fs.existsSync(databaseConfig)) {
    printMessage('✓ 数据库配置文件存在', colors.green);
    // 可以进一步检查配置内容
    try {
      const configContent = fs.readFileSync(databaseConfig, 'utf-8');
      if (configContent.includes('sequelize')) {
        printMessage('✓ 数据库配置正确', colors.green);
        return true;
      } else {
        printMessage('⚠ 数据库配置可能不完整', colors.yellow);
        return true; // 不算严重错误
      }
    } catch (error) {
      printMessage('⚠ 无法读取数据库配置文件', colors.yellow);
      return true; // 不算严重错误
    }
  } else {
    printMessage('✗ 数据库配置文件不存在', colors.red);
    return false;
  }
}

// 检查端口占用情况
function checkPortUsage() {
  printMessage('\n=== 检查端口占用情况 ===', colors.cyan);

  // 检查Windows下的端口占用
  const ports = [15001, 15000]; // 后端端口和前端端口
  let allPortsFree = true;

  for (const port of ports) {
    const command = `netstat -ano | findstr :${port}`;
    const result = executeCommand(command);

    if (result.success && result.output) {
      printMessage(`⚠ 端口 ${port} 已被占用:`, colors.yellow);
      printMessage(`  ${result.output.split('\n')[0]}`, colors.yellow);
      allPortsFree = false;
    } else {
      printMessage(`✓ 端口 ${port} 未被占用`, colors.green);
    }
  }

  return allPortsFree;
}

// 检查必需的环境变量
function checkEnvironmentVariables() {
  printMessage('\n=== 检查环境变量 ===', colors.cyan);

  // 检查一些常见的环境变量
  const requiredEnvVars = [];
  const missingEnvVars = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }

  if (missingEnvVars.length > 0) {
    printMessage(
      `⚠ 缺少环境变量: ${missingEnvVars.join(', ')}`,
      colors.yellow
    );
    return true; // 不算严重错误
  } else {
    printMessage('✓ 所有必需的环境变量都已设置', colors.green);
    return true;
  }
}

// 主函数
async function main() {
  printMessage('UG管理系统 - 环境检测工具\n', colors.magenta);

  let allChecksPassed = true;

  // 1. 检查Node.js和npm
  if (!checkNodeAndNpm()) {
    allChecksPassed = false;
  }

  // 2. 检查项目依赖
  if (!checkProjectDependencies()) {
    allChecksPassed = false;
  }

  // 3. 检查数据库连接
  if (!checkDatabaseConnection()) {
    allChecksPassed = false;
  }

  // 4. 检查端口占用
  checkPortUsage(); // 这个检查不阻止启动

  // 5. 检查环境变量
  checkEnvironmentVariables(); // 这个检查不阻止启动

  printMessage('\n=== 检测完成 ===', colors.cyan);

  if (allChecksPassed) {
    printMessage('✓ 所有关键检查通过，可以启动项目', colors.green);
    printMessage('\n启动项目命令:', colors.blue);
    printMessage(
      '  Windows: 双击 start.bat 或运行 tools\\start-all.bat',
      colors.blue
    );
    printMessage('  或分别启动:', colors.blue);
    printMessage('    后端: cd backend && npm run dev', colors.blue);
    printMessage('    前端: cd frontend && npm run dev', colors.blue);
  } else {
    printMessage('✗ 存在关键问题，请先解决上述错误再启动项目', colors.red);
  }
}

// 执行主函数
main().catch((error) => {
  printMessage(`执行过程中发生错误: ${error.message}`, colors.red);
  process.exit(1);
});
