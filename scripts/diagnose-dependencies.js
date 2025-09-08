/**
 * 依赖问题诊断脚本
 * 诊断和解决项目依赖相关问题
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('开始诊断项目依赖问题...\n');

// 检查是否在 Windows 环境下
const isWindows = process.platform === 'win32';

// 项目路径
const rootPath = path.join(__dirname, '..');
const frontendPath = path.join(rootPath, 'frontend');
const backendPath = path.join(rootPath, 'backend');

// 诊断结果
let diagnosis = {
  issues: [],
  suggestions: []
};

try {
  // 1. 检查 Node.js 和 pnpm 版本
  console.log('1. 检查 Node.js 和 pnpm 版本...');

  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    console.log(`  Node.js 版本: ${nodeVersion}`);

    // 检查是否符合项目要求 (20.19.0)
    const versionMatch = nodeVersion.match(/v(\d+\.\d+\.\d+)/);
    if (versionMatch) {
      const version = versionMatch[1];
      if (version < '20.19.0') {
        diagnosis.issues.push(`Node.js 版本过低 (${version})，项目要求 20.19.0 或更高版本`);
        diagnosis.suggestions.push('请升级 Node.js 到 20.19.0 或更高版本');
      }
    }
  } catch (error) {
    diagnosis.issues.push('无法检测 Node.js 版本');
    diagnosis.suggestions.push('请确保已安装 Node.js');
  }

  try {
    const pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
    console.log(`  pnpm 版本: ${pnpmVersion}`);

    // 检查是否符合项目要求 (8.15.8)
    const versionMatch = pnpmVersion.match(/(\d+\.\d+\.\d+)/);
    if (versionMatch) {
      const version = versionMatch[1];
      if (version < '8.15.8') {
        diagnosis.issues.push(`pnpm 版本过低 (${version})，项目要求 8.15.8`);
        diagnosis.suggestions.push('请升级 pnpm 到 8.15.8 版本');
      }
    }
  } catch (error) {
    diagnosis.issues.push('无法检测 pnpm 版本');
    diagnosis.suggestions.push('请确保已安装 pnpm');
  }

  console.log('✓ 版本检查完成\n');

  // 2. 检查依赖文件存在性
  console.log('2. 检查依赖文件存在性...');

  const checkPaths = [
    { name: '根目录 node_modules', path: path.join(rootPath, 'node_modules') },
    { name: '根目录 pnpm-lock.yaml', path: path.join(rootPath, 'pnpm-lock.yaml') },
    { name: '前端 node_modules', path: path.join(frontendPath, 'node_modules') },
    { name: '前端 pnpm-lock.yaml', path: path.join(frontendPath, 'pnpm-lock.yaml') },
    { name: '后端 node_modules', path: path.join(backendPath, 'node_modules') },
    { name: '后端 pnpm-lock.yaml', path: path.join(backendPath, 'pnpm-lock.yaml') }
  ];

  checkPaths.forEach(item => {
    const exists = fs.existsSync(item.path);
    console.log(`  ${item.name}: ${exists ? '✓ 存在' : '✗ 不存在'}`);

    if (!exists && (item.name.includes('pnpm-lock.yaml') || item.name.includes('node_modules'))) {
      diagnosis.issues.push(`${item.name} 不存在`);
    }
  });

  console.log('✓ 依赖文件检查完成\n');

  // 3. 检查关键依赖
  console.log('3. 检查关键依赖...');

  const criticalDependencies = [
    { name: '@umijs/max', path: path.join(frontendPath, 'node_modules', '@umijs', 'max') },
    { name: 'umi', path: path.join(frontendPath, 'node_modules', 'umi') },
    { name: 'react', path: path.join(frontendPath, 'node_modules', 'react') },
    { name: 'antd', path: path.join(frontendPath, 'node_modules', 'antd') },
    { name: 'egg', path: path.join(backendPath, 'node_modules', 'egg') }
  ];

  criticalDependencies.forEach(dep => {
    const exists = fs.existsSync(dep.path);
    console.log(`  ${dep.name}: ${exists ? '✓ 存在' : '✗ 不存在'}`);

    if (!exists) {
      diagnosis.issues.push(`关键依赖 ${dep.name} 不存在`);
      diagnosis.suggestions.push(`请重新安装依赖以确保 ${dep.name} 被正确安装`);
    }
  });

  console.log('✓ 关键依赖检查完成\n');

  // 4. 检查 package.json 配置
  console.log('4. 检查 package.json 配置...');

  try {
    const rootPkg = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));
    const frontendPkg = JSON.parse(fs.readFileSync(path.join(frontendPath, 'package.json'), 'utf8'));
    const backendPkg = JSON.parse(fs.readFileSync(path.join(backendPath, 'package.json'), 'utf8'));

    // 检查包管理器版本
    if (rootPkg.packageManager !== 'pnpm@8.15.8') {
      diagnosis.issues.push('根目录 package.json 中的 packageManager 配置不正确');
      diagnosis.suggestions.push('请将 packageManager 设置为 "pnpm@8.15.8"');
    }

    if (frontendPkg.packageManager !== 'pnpm@8.15.8') {
      diagnosis.issues.push('前端 package.json 中的 packageManager 配置不正确');
      diagnosis.suggestions.push('请将 packageManager 设置为 "pnpm@8.15.8"');
    }

    if (backendPkg.packageManager !== 'pnpm@8.15.8') {
      diagnosis.issues.push('后端 package.json 中的 packageManager 配置不正确');
      diagnosis.suggestions.push('请将 packageManager 设置为 "pnpm@8.15.8"');
    }

    // 检查 Node.js 版本要求
    if (!rootPkg.engines || rootPkg.engines.node !== '^20.19.0') {
      diagnosis.issues.push('根目录 package.json 中的 Node.js 版本要求配置不正确');
      diagnosis.suggestions.push('请将 engines.node 设置为 "^20.19.0"');
    }

    if (!frontendPkg.engines || frontendPkg.engines.node !== '^20.19.0') {
      diagnosis.issues.push('前端 package.json 中的 Node.js 版本要求配置不正确');
      diagnosis.suggestions.push('请将 engines.node 设置为 "^20.19.0"');
    }

    if (!backendPkg.engines || backendPkg.engines.node !== '^20.19.0') {
      diagnosis.issues.push('后端 package.json 中的 Node.js 版本要求配置不正确');
      diagnosis.suggestions.push('请将 engines.node 设置为 "^20.19.0"');
    }

    console.log('✓ package.json 配置检查完成');
  } catch (error) {
    diagnosis.issues.push('无法解析 package.json 文件');
    diagnosis.suggestions.push('请检查 package.json 文件格式是否正确');
  }

  console.log('✓ package.json 检查完成\n');

  // 5. 检查工作区配置
  console.log('5. 检查工作区配置...');

  try {
    const rootPkg = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));

    if (!rootPkg.workspaces || !Array.isArray(rootPkg.workspaces.packages)) {
      diagnosis.issues.push('根目录 package.json 中缺少工作区配置');
      diagnosis.suggestions.push('请在 package.json 中添加 workspaces.packages 配置');
    } else {
      const requiredPackages = ['frontend', 'backend'];
      const missingPackages = requiredPackages.filter(pkg =>
        !rootPkg.workspaces.packages.includes(pkg)
      );

      if (missingPackages.length > 0) {
        diagnosis.issues.push(`工作区配置中缺少包: ${missingPackages.join(', ')}`);
        diagnosis.suggestions.push(`请在 workspaces.packages 中添加: ${missingPackages.join(', ')}`);
      }
    }

    console.log('✓ 工作区配置检查完成');
  } catch (error) {
    diagnosis.issues.push('无法检查工作区配置');
    diagnosis.suggestions.push('请检查根目录 package.json 中的工作区配置');
  }

  console.log('✓ 工作区配置检查完成\n');

  // 输出诊断结果
  console.log('==========================================');
  console.log('诊断结果:');
  console.log('==========================================');

  if (diagnosis.issues.length === 0) {
    console.log('✓ 未发现明显问题');
    console.log('\n建议:');
    console.log('- 如果 Umi 构建工具仍无法正常运行，请运行 fix-umi-build.bat 脚本');
  } else {
    console.log(`发现 ${diagnosis.issues.length} 个问题:`);
    diagnosis.issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });

    console.log('\n建议解决方案:');
    diagnosis.suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion}`);
    });

    console.log('\n快速修复:');
    console.log('- 运行 scripts/fix-umi-build.bat 脚本自动修复');
  }

  console.log('==========================================');

} catch (error) {
  console.error('诊断过程中出现错误：', error.message);
}