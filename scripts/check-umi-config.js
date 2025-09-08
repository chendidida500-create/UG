/**
 * Umi 构建工具配置检查脚本
 * 检查和修复 Umi 构建工具的配置问题
 */

const fs = require('fs');
const path = require('path');

console.log('开始检查 Umi 构建工具配置...\n');

// 项目路径
const rootPath = path.join(__dirname, '..');
const frontendPath = path.join(rootPath, 'frontend');
const configPath = path.join(rootPath, 'config');

// 配置检查结果
let configIssues = [];
let configSuggestions = [];

try {
  // 1. 检查 .umirc.ts 配置
  console.log('1. 检查 .umirc.ts 配置...');

  const umircPath = path.join(frontendPath, '.umirc.ts');
  if (fs.existsSync(umircPath)) {
    const umircContent = fs.readFileSync(umircPath, 'utf8');

    // 检查 npmClient 配置
    if (umircContent.includes("npmClient: 'npm'")) {
      configIssues.push('.umirc.ts 中的 npmClient 配置为 npm，但项目使用 pnpm');
      configSuggestions.push('将 npmClient 修改为 "pnpm"');
    } else if (!umircContent.includes("npmClient: 'pnpm'")) {
      configIssues.push('.umirc.ts 中缺少 npmClient 配置');
      configSuggestions.push('添加 npmClient: "pnpm" 配置');
    }

    console.log('  ✓ .umirc.ts 配置检查完成');
  } else {
    configIssues.push('缺少 .umirc.ts 配置文件');
    configSuggestions.push('创建 .umirc.ts 配置文件');
  }

  console.log('✓ .umirc.ts 配置检查完成\n');

  // 2. 检查 package.json 配置
  console.log('2. 检查 package.json 配置...');

  // 检查前端 package.json
  const frontendPkgPath = path.join(frontendPath, 'package.json');
  if (fs.existsSync(frontendPkgPath)) {
    const frontendPkg = JSON.parse(fs.readFileSync(frontendPkgPath, 'utf8'));

    // 检查 packageManager
    if (frontendPkg.packageManager !== 'pnpm@8.15.8') {
      configIssues.push('前端 package.json 中的 packageManager 配置不正确');
      configSuggestions.push('将 packageManager 设置为 "pnpm@8.15.8"');
    }

    // 检查 scripts
    const requiredScripts = ['dev', 'build', 'setup'];
    requiredScripts.forEach(script => {
      if (!frontendPkg.scripts || !frontendPkg.scripts[script]) {
        configIssues.push(`前端 package.json 中缺少 ${script} 脚本`);
        configSuggestions.push(`添加 ${script} 脚本`);
      }
    });

    console.log('  ✓ 前端 package.json 配置检查完成');
  }

  // 检查根目录 package.json
  const rootPkgPath = path.join(rootPath, 'package.json');
  if (fs.existsSync(rootPkgPath)) {
    const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));

    // 检查 workspaces
    if (!rootPkg.workspaces || !Array.isArray(rootPkg.workspaces.packages)) {
      configIssues.push('根目录 package.json 中缺少 workspaces 配置');
      configSuggestions.push('添加 workspaces.packages 配置');
    } else {
      const requiredPackages = ['frontend', 'backend'];
      const missingPackages = requiredPackages.filter(pkg =>
        !rootPkg.workspaces.packages.includes(pkg)
      );

      if (missingPackages.length > 0) {
        configIssues.push(`根目录 package.json 中 workspaces 配置缺少包: ${missingPackages.join(', ')}`);
        configSuggestions.push(`在 workspaces.packages 中添加: ${missingPackages.join(', ')}`);
      }
    }

    console.log('  ✓ 根目录 package.json 配置检查完成');
  }

  console.log('✓ package.json 配置检查完成\n');

  // 3. 检查 TypeScript 配置
  console.log('3. 检查 TypeScript 配置...');

  // 检查前端 tsconfig.json
  const frontendTsconfigPath = path.join(frontendPath, 'tsconfig.json');
  if (fs.existsSync(frontendTsconfigPath)) {
    const frontendTsconfig = JSON.parse(fs.readFileSync(frontendTsconfigPath, 'utf8'));

    // 检查 extends
    if (frontendTsconfig.extends !== '../config/tsconfig/frontend.json') {
      configIssues.push('前端 tsconfig.json 中的 extends 配置不正确');
      configSuggestions.push('将 extends 设置为 "../config/tsconfig/frontend.json"');
    }

    // 检查 jsx 配置
    if (!frontendTsconfig.compilerOptions || frontendTsconfig.compilerOptions.jsx !== 'react-jsx') {
      configIssues.push('前端 tsconfig.json 中缺少或错误的 jsx 配置');
      configSuggestions.push('在 compilerOptions 中添加 "jsx": "react-jsx"');
    }

    console.log('  ✓ 前端 tsconfig.json 配置检查完成');
  }

  // 检查配置文件继承链
  const configFiles = [
    { name: 'config/tsconfig/base.json', path: path.join(configPath, 'tsconfig', 'base.json') },
    { name: 'config/tsconfig/frontend.json', path: path.join(configPath, 'tsconfig', 'frontend.json') }
  ];

  configFiles.forEach(configFile => {
    if (!fs.existsSync(configFile.path)) {
      configIssues.push(`缺少配置文件: ${configFile.name}`);
      configSuggestions.push(`创建配置文件: ${configFile.name}`);
    }
  });

  console.log('✓ TypeScript 配置检查完成\n');

  // 4. 检查 ESLint 配置
  console.log('4. 检查 ESLint 配置...');

  // 检查前端 .eslintrc.json
  const frontendEslintPath = path.join(frontendPath, '.eslintrc.json');
  if (fs.existsSync(frontendEslintPath)) {
    const frontendEslint = JSON.parse(fs.readFileSync(frontendEslintPath, 'utf8'));

    // 检查 extends
    if (frontendEslint.extends !== '../config/eslint/frontend.json') {
      configIssues.push('前端 .eslintrc.json 中的 extends 配置不正确');
      configSuggestions.push('将 extends 设置为 "../config/eslint/frontend.json"');
    }

    console.log('  ✓ 前端 .eslintrc.json 配置检查完成');
  }

  // 检查配置文件继承链
  const eslintConfigFiles = [
    { name: 'config/eslint/base.json', path: path.join(configPath, 'eslint', 'base.json') },
    { name: 'config/eslint/frontend.json', path: path.join(configPath, 'eslint', 'frontend.json') }
  ];

  eslintConfigFiles.forEach(configFile => {
    if (!fs.existsSync(configFile.path)) {
      configIssues.push(`缺少配置文件: ${configFile.name}`);
      configSuggestions.push(`创建配置文件: ${configFile.name}`);
    }
  });

  console.log('✓ ESLint 配置检查完成\n');

  // 5. 检查 Prettier 配置
  console.log('5. 检查 Prettier 配置...');

  // 检查前端 .prettierrc.json
  const frontendPrettierPath = path.join(frontendPath, '.prettierrc.json');
  if (!fs.existsSync(frontendPrettierPath)) {
    configIssues.push('缺少前端 .prettierrc.json 配置文件');
    configSuggestions.push('创建 .prettierrc.json 配置文件');
  }

  console.log('✓ Prettier 配置检查完成\n');

  // 输出检查结果
  console.log('==========================================');
  console.log('Umi 构建工具配置检查结果:');
  console.log('==========================================');

  if (configIssues.length === 0) {
    console.log('✓ 所有配置均正确');
    console.log('\n建议:');
    console.log('- 如果构建工具仍无法正常运行，请运行 scripts/fix-umi-build.bat 脚本');
  } else {
    console.log(`发现 ${configIssues.length} 个配置问题:`);
    configIssues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });

    console.log('\n建议解决方案:');
    configSuggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion}`);
    });

    console.log('\n快速修复:');
    console.log('- 运行 scripts/fix-umi-config.bat 脚本自动修复配置问题');
  }

  console.log('==========================================');

} catch (error) {
  console.error('配置检查过程中出现错误：', error.message);
}