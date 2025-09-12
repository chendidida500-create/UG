const fs = require('fs');
const path = require('path');

// 读取各项目的package.json
const rootPackagePath = path.join(__dirname, '..', 'package.json');
const frontendPackagePath = path.join(
  __dirname,
  '..',
  'frontend',
  'package.json'
);
const backendPackagePath = path.join(
  __dirname,
  '..',
  'backend',
  'package.json'
);

let rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
let frontendPackage = JSON.parse(fs.readFileSync(frontendPackagePath, 'utf8'));
let backendPackage = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));

console.log('=== 依赖修复脚本 ===\n');

// 将共享依赖移到根package.json
const sharedDependencies = {
  prettier: '^3.3.0',
  '@typescript-eslint/eslint-plugin': '^7.7.0',
  '@typescript-eslint/parser': '^7.7.0',
  cspell: '^8.0.0',
  eslint: '^8.57.0',
  typescript: '^5.9.2',
};

// 添加到根package.json的devDependencies
if (!rootPackage.devDependencies) {
  rootPackage.devDependencies = {};
}
Object.assign(rootPackage.devDependencies, sharedDependencies);

console.log('1. 已将共享依赖添加到根package.json:');

// 从frontend和backend中移除共享依赖
for (const [dep, version] of Object.entries(sharedDependencies)) {
  // 从前端移除
  if (frontendPackage.dependencies && frontendPackage.dependencies[dep]) {
    delete frontendPackage.dependencies[dep];
    console.log(`   从前端dependencies移除: ${dep}`);
  }
  if (frontendPackage.devDependencies && frontendPackage.devDependencies[dep]) {
    delete frontendPackage.devDependencies[dep];
    console.log(`   从前端devDependencies移除: ${dep}`);
  }

  // 从后端移除
  if (backendPackage.dependencies && backendPackage.dependencies[dep]) {
    delete backendPackage.dependencies[dep];
    console.log(`   从后端dependencies移除: ${dep}`);
  }
  if (backendPackage.devDependencies && backendPackage.devDependencies[dep]) {
    delete backendPackage.devDependencies[dep];
    console.log(`   从后端devDependencies移除: ${dep}`);
  }
}

console.log('\n2. 更新package.json文件...');

// 写回文件
fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2) + '\n');
fs.writeFileSync(
  frontendPackagePath,
  JSON.stringify(frontendPackage, null, 2) + '\n'
);
fs.writeFileSync(
  backendPackagePath,
  JSON.stringify(backendPackage, null, 2) + '\n'
);

console.log('3. 依赖修复完成！');
console.log('\n建议执行以下操作：');
console.log('   1. 删除node_modules目录和pnpm-lock.yaml文件');
console.log('   2. 运行 pnpm install 重新安装依赖');
console.log('   3. 测试项目是否正常运行');
