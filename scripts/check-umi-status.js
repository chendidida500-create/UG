const fs = require('fs');
const path = require('path');

console.log('检查UMI构建工具状态...');

// 检查前端目录
const frontendDir = path.join(__dirname, '..', 'frontend');
console.log(`前端目录: ${frontendDir}`);

// 检查package.json
const packageJsonPath = path.join(frontendDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('✓ frontend/package.json 存在');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // 检查依赖
  if (packageJson.dependencies && packageJson.dependencies['@umijs/max']) {
    console.log(`✓ @umijs/max 版本: ${packageJson.dependencies['@umijs/max']}`);
  } else {
    console.log('✗ @umijs/max 未在依赖中找到');
  }

  if (packageJson.dependencies && packageJson.dependencies['umi']) {
    console.log(`✓ umi 版本: ${packageJson.dependencies['umi']}`);
  } else {
    console.log('✗ umi 未在依赖中找到');
  }
} else {
  console.log('✗ frontend/package.json 不存在');
}

// 检查node_modules
const nodeModulesPath = path.join(frontendDir, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✓ frontend/node_modules 目录存在');

  // 检查@umijs目录
  const umijsPath = path.join(nodeModulesPath, '@umijs');
  if (fs.existsSync(umijsPath)) {
    console.log('✓ node_modules/@umijs 目录存在');
    const umijsItems = fs.readdirSync(umijsPath);
    console.log(`  包含: ${umijsItems.join(', ')}`);
  } else {
    console.log('✗ node_modules/@umijs 目录不存在');
  }

  // 检查umi可执行文件
  const umiBinPath = path.join(nodeModulesPath, '.bin', 'umi');
  const maxBinPath = path.join(nodeModulesPath, '.bin', 'max');
  if (fs.existsSync(umiBinPath)) {
    console.log('✓ umi 可执行文件存在');
  } else {
    console.log('✗ umi 可执行文件不存在');
  }

  if (fs.existsSync(maxBinPath)) {
    console.log('✓ max 可执行文件存在');
  } else {
    console.log('✗ max 可执行文件不存在');
  }
} else {
  console.log('✗ frontend/node_modules 目录不存在');
}

// 检查配置文件
const umircPath = path.join(frontendDir, '.umirc.ts');
if (fs.existsSync(umircPath)) {
  console.log('✓ .umirc.ts 配置文件存在');
  const umircContent = fs.readFileSync(umircPath, 'utf8');
  if (umircContent.includes("npmClient: 'pnpm'")) {
    console.log('✓ npmClient 正确设置为 pnpm');
  } else {
    console.log('✗ npmClient 未正确设置');
  }
} else {
  console.log('✗ .umirc.ts 配置文件不存在');
}

console.log('\n检查完成。');