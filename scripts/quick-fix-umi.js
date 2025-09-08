/**
 * 快速修复 Umi 构建工具脚本
 * 快速修复最常见的 Umi 构建工具问题
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('开始快速修复 Umi 构建工具...\n');

// 项目路径
const rootPath = path.join(__dirname, '..');
const frontendPath = path.join(rootPath, 'frontend');
const backendPath = path.join(rootPath, 'backend');

try {
  // 1. 确保 pnpm 可用
  console.log('1. 检查 pnpm...');
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    console.log('  ✓ pnpm 可用\n');
  } catch (error) {
    console.log('  ✗ pnpm 不可用，请先安装 pnpm\n');
    process.exit(1);
  }

  // 2. 重新安装前端依赖
  console.log('2. 重新安装前端依赖...');
  try {
    execSync('pnpm install', {
      cwd: frontendPath,
      stdio: 'inherit'
    });
    console.log('  ✓ 前端依赖安装完成\n');
  } catch (error) {
    console.log('  ✗ 前端依赖安装失败:', error.message);
  }

  // 3. 运行 Umi 设置
  console.log('3. 运行 Umi 设置...');
  try {
    execSync('pnpm run setup', {
      cwd: frontendPath,
      stdio: 'inherit'
    });
    console.log('  ✓ Umi 设置完成\n');
  } catch (error) {
    console.log('  ✗ Umi 设置失败:', error.message);
  }

  // 4. 验证 Umi 是否可用
  console.log('4. 验证 Umi 是否可用...');
  try {
    execSync('npx umi --version', {
      cwd: frontendPath,
      stdio: 'inherit'
    });
    console.log('  ✓ Umi 可用\n');
  } catch (error) {
    console.log('  ✗ Umi 不可用:', error.message);
  }

  console.log('==========================================');
  console.log('快速修复完成！');
  console.log('==========================================');
  console.log('现在可以尝试运行以下命令：');
  console.log('- cd frontend && pnpm dev    # 启动开发服务器');
  console.log('- cd frontend && pnpm build  # 构建项目');
  console.log('==========================================');

} catch (error) {
  console.error('修复过程中出现错误：', error.message);
}