/**
 * Umi 构建工具修复脚本
 * 解决由于依赖安装问题导致的 Umi 构建工具无法正常运行的问题
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('开始修复 Umi 构建工具问题...\n');

// 检查是否在 Windows 环境下
const isWindows = process.platform === 'win32';

try {
  // 1. 清理现有的 node_modules 和 lock 文件
  console.log('1. 清理现有的依赖文件...');

  // 清理根目录
  if (fs.existsSync(path.join(__dirname, '../node_modules'))) {
    console.log('  - 清理根目录 node_modules...');
    execSync('rimraf node_modules', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  }

  if (fs.existsSync(path.join(__dirname, '../pnpm-lock.yaml'))) {
    console.log('  - 清理根目录 pnpm-lock.yaml...');
    fs.unlinkSync(path.join(__dirname, '../pnpm-lock.yaml'));
  }

  // 清理前端目录
  if (fs.existsSync(path.join(__dirname, '../frontend/node_modules'))) {
    console.log('  - 清理前端 node_modules...');
    execSync('rimraf node_modules', { cwd: path.join(__dirname, '../frontend'), stdio: 'inherit' });
  }

  if (fs.existsSync(path.join(__dirname, '../frontend/pnpm-lock.yaml'))) {
    console.log('  - 清理前端 pnpm-lock.yaml...');
    fs.unlinkSync(path.join(__dirname, '../frontend/pnpm-lock.yaml'));
  }

  // 清理后端目录
  if (fs.existsSync(path.join(__dirname, '../backend/node_modules'))) {
    console.log('  - 清理后端 node_modules...');
    execSync('rimraf node_modules', { cwd: path.join(__dirname, '../backend'), stdio: 'inherit' });
  }

  if (fs.existsSync(path.join(__dirname, '../backend/pnpm-lock.yaml'))) {
    console.log('  - 清理后端 pnpm-lock.yaml...');
    fs.unlinkSync(path.join(__dirname, '../backend/pnpm-lock.yaml'));
  }

  console.log('✓ 依赖文件清理完成\n');

  // 2. 重新安装依赖
  console.log('2. 重新安装依赖...');

  // 安装根目录依赖
  console.log('  - 安装根目录依赖...');
  execSync('pnpm install', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

  // 安装前端依赖
  console.log('  - 安装前端依赖...');
  execSync('pnpm install', { cwd: path.join(__dirname, '../frontend'), stdio: 'inherit' });

  // 安装后端依赖
  console.log('  - 安装后端依赖...');
  execSync('pnpm install', { cwd: path.join(__dirname, '../backend'), stdio: 'inherit' });

  console.log('✓ 依赖安装完成\n');

  // 3. 执行 Umi 设置
  console.log('3. 执行 Umi 设置...');
  execSync('pnpm run setup', { cwd: path.join(__dirname, '../frontend'), stdio: 'inherit' });
  console.log('✓ Umi 设置完成\n');

  // 4. 验证安装
  console.log('4. 验证安装...');

  // 检查关键依赖是否存在
  const checkDependencies = [
    { name: '@umijs/max', path: '../frontend/node_modules/@umijs/max' },
    { name: 'umi', path: '../frontend/node_modules/umi' },
    { name: 'react', path: '../frontend/node_modules/react' },
    { name: 'antd', path: '../frontend/node_modules/antd' },
    { name: 'egg', path: '../backend/node_modules/egg' }
  ];

  let allDependenciesExist = true;
  checkDependencies.forEach(dep => {
    if (!fs.existsSync(path.join(__dirname, dep.path))) {
      console.log(`  ✗ 缺少依赖: ${dep.name}`);
      allDependenciesExist = false;
    } else {
      console.log(`  ✓ 依赖存在: ${dep.name}`);
    }
  });

  if (allDependenciesExist) {
    console.log('✓ 所有关键依赖均已安装\n');

    // 5. 测试 Umi 构建
    console.log('5. 测试 Umi 构建...');
    try {
      execSync('pnpm run build -- --dry-run', {
        cwd: path.join(__dirname, '../frontend'),
        stdio: 'inherit'
      });
      console.log('✓ Umi 构建测试通过\n');

      console.log('==========================================');
      console.log('🎉 Umi 构建工具修复完成！');
      console.log('==========================================');
      console.log('现在可以正常运行以下命令：');
      console.log('- pnpm dev          # 启动开发服务器');
      console.log('- pnpm build        # 构建项目');
      console.log('- pnpm start        # 启动生产环境');
      console.log('==========================================');
    } catch (buildError) {
      console.log('⚠ Umi 构建测试失败，但依赖安装已完成');
      console.log('请手动运行 "pnpm dev" 测试开发服务器');
    }
  } else {
    console.log('✗ 部分依赖安装失败，请检查网络连接后重试');
  }

} catch (error) {
  console.error('✗ 修复过程中出现错误：', error.message);
  console.log('\n建议手动执行以下步骤：');
  console.log('1. 删除所有 node_modules 文件夹和 pnpm-lock.yaml 文件');
  console.log('2. 运行 "pnpm install" 安装根目录依赖');
  console.log('3. 进入 frontend 目录，运行 "pnpm install"');
  console.log('4. 进入 backend 目录，运行 "pnpm install"');
  console.log('5. 在 frontend 目录下运行 "pnpm run setup"');
}