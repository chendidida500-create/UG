/**
 * Umi 构建工具配置修复脚本
 * 自动修复 Umi 构建工具的配置问题
 */

const fs = require('fs');
const path = require('path');

console.log('开始修复 Umi 构建工具配置...\n');

// 项目路径
const rootPath = path.join(__dirname, '..');
const frontendPath = path.join(rootPath, 'frontend');
const configPath = path.join(rootPath, 'config');

try {
  // 1. 修复 .umirc.ts 配置
  console.log('1. 修复 .umirc.ts 配置...');

  const umircPath = path.join(frontendPath, '.umirc.ts');
  if (fs.existsSync(umircPath)) {
    let umircContent = fs.readFileSync(umircPath, 'utf8');

    // 修复 npmClient 配置
    if (umircContent.includes("npmClient: 'npm'")) {
      umircContent = umircContent.replace("npmClient: 'npm'", "npmClient: 'pnpm'");
      fs.writeFileSync(umircPath, umircContent, 'utf8');
      console.log('  ✓ 已将 npmClient 从 "npm" 修改为 "pnpm"');
    } else if (!umircContent.includes("npmClient: 'pnpm'")) {
      // 在合适的位置添加 npmClient 配置
      const lines = umircContent.split('\n');
      const pluginsIndex = lines.findIndex(line => line.includes('plugins: ['));

      if (pluginsIndex !== -1) {
        lines.splice(pluginsIndex, 0, "  npmClient: 'pnpm',");
        fs.writeFileSync(umircPath, lines.join('\n'), 'utf8');
        console.log('  ✓ 已添加 npmClient: "pnpm" 配置');
      }
    }

    console.log('✓ .umirc.ts 配置修复完成\n');
  } else {
    console.log('  ✗ 缺少 .umirc.ts 配置文件，无法修复');
  }

  // 2. 修复 package.json 配置
  console.log('2. 修复 package.json 配置...');

  // 修复前端 package.json
  const frontendPkgPath = path.join(frontendPath, 'package.json');
  if (fs.existsSync(frontendPkgPath)) {
    const frontendPkg = JSON.parse(fs.readFileSync(frontendPkgPath, 'utf8'));

    // 修复 packageManager
    if (frontendPkg.packageManager !== 'pnpm@8.15.8') {
      frontendPkg.packageManager = 'pnpm@8.15.8';
      fs.writeFileSync(frontendPkgPath, JSON.stringify(frontendPkg, null, 2) + '\n', 'utf8');
      console.log('  ✓ 已修复前端 package.json 中的 packageManager 配置');
    }

    console.log('✓ 前端 package.json 配置修复完成\n');
  }

  // 修复根目录 package.json
  const rootPkgPath = path.join(rootPath, 'package.json');
  if (fs.existsSync(rootPkgPath)) {
    const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));

    // 修复 workspaces
    if (!rootPkg.workspaces) {
      rootPkg.workspaces = { packages: [] };
    }

    if (!Array.isArray(rootPkg.workspaces.packages)) {
      rootPkg.workspaces.packages = [];
    }

    const requiredPackages = ['frontend', 'backend'];
    let updated = false;

    requiredPackages.forEach(pkg => {
      if (!rootPkg.workspaces.packages.includes(pkg)) {
        rootPkg.workspaces.packages.push(pkg);
        updated = true;
      }
    });

    if (updated) {
      fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n', 'utf8');
      console.log('  ✓ 已修复根目录 package.json 中的 workspaces 配置');
    }

    console.log('✓ 根目录 package.json 配置修复完成\n');
  }

  // 3. 修复 TypeScript 配置
  console.log('3. 修复 TypeScript 配置...');

  // 修复前端 tsconfig.json
  const frontendTsconfigPath = path.join(frontendPath, 'tsconfig.json');
  if (fs.existsSync(frontendTsconfigPath)) {
    const frontendTsconfig = JSON.parse(fs.readFileSync(frontendTsconfigPath, 'utf8'));

    // 修复 extends
    if (frontendTsconfig.extends !== '../config/tsconfig/frontend.json') {
      frontendTsconfig.extends = '../config/tsconfig/frontend.json';
      fs.writeFileSync(frontendTsconfigPath, JSON.stringify(frontendTsconfig, null, 2) + '\n', 'utf8');
      console.log('  ✓ 已修复前端 tsconfig.json 中的 extends 配置');
    }

    // 修复 jsx 配置
    if (!frontendTsconfig.compilerOptions) {
      frontendTsconfig.compilerOptions = {};
    }

    if (frontendTsconfig.compilerOptions.jsx !== 'react-jsx') {
      frontendTsconfig.compilerOptions.jsx = 'react-jsx';
      fs.writeFileSync(frontendTsconfigPath, JSON.stringify(frontendTsconfig, null, 2) + '\n', 'utf8');
      console.log('  ✓ 已修复前端 tsconfig.json 中的 jsx 配置');
    }

    console.log('✓ 前端 tsconfig.json 配置修复完成\n');
  }

  // 4. 修复 ESLint 配置
  console.log('4. 修复 ESLint 配置...');

  // 修复前端 .eslintrc.json
  const frontendEslintPath = path.join(frontendPath, '.eslintrc.json');
  if (fs.existsSync(frontendEslintPath)) {
    const frontendEslint = JSON.parse(fs.readFileSync(frontendEslintPath, 'utf8'));

    // 修复 extends
    if (frontendEslint.extends !== '../config/eslint/frontend.json') {
      frontendEslint.extends = '../config/eslint/frontend.json';
      fs.writeFileSync(frontendEslintPath, JSON.stringify(frontendEslint, null, 2) + '\n', 'utf8');
      console.log('  ✓ 已修复前端 .eslintrc.json 中的 extends 配置');
    }

    console.log('✓ 前端 .eslintrc.json 配置修复完成\n');
  }

  console.log('==========================================');
  console.log('🎉 Umi 构建工具配置修复完成！');
  console.log('==========================================');
  console.log('建议执行以下操作以确保配置生效：');
  console.log('1. 重新安装依赖：pnpm install');
  console.log('2. 运行 Umi 设置：cd frontend && pnpm run setup');
  console.log('3. 测试构建工具：pnpm dev');
  console.log('==========================================');

} catch (error) {
  console.error('配置修复过程中出现错误：', error.message);
}