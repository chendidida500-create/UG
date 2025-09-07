#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 检查 Node.js 版本
const targetNodeVersion = '20.14.0';
const currentNodeVersion = process.version.replace('v', '');

console.log('Node.js 版本检查脚本');
console.log('====================');
console.log(`当前 Node.js 版本: ${currentNodeVersion}`);
console.log(`目标 Node.js 版本: ${targetNodeVersion}`);

// 检查版本是否匹配
if (currentNodeVersion === targetNodeVersion) {
  console.log('✅ Node.js 版本正确');
} else {
  console.log('❌ Node.js 版本不匹配');
  console.log(`请将 Node.js 版本切换到 ${targetNodeVersion}`);

  // 检查是否安装了 nvm
  const nvmPath = process.env.NVM_DIR || process.env.NVM_HOME;
  if (nvmPath) {
    console.log(`建议使用 nvm 切换版本:`);
    console.log(`  nvm install ${targetNodeVersion}`);
    console.log(`  nvm use ${targetNodeVersion}`);
  } else {
    console.log('建议安装 nvm 来管理 Node.js 版本');
  }
}

// 检查各项目中的配置
const projectDirs = [
  { name: '根项目', path: path.resolve(__dirname, '..') },
  { name: '前端项目', path: path.resolve(__dirname, '../frontend') },
  { name: '后端项目', path: path.resolve(__dirname, '../backend') },
];

console.log('\n各项目中的 Node.js 版本配置:');
console.log('============================');

projectDirs.forEach((project) => {
  const packageJsonPath = path.join(project.path, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const engineVersion = packageJson.engines && packageJson.engines.node;

      console.log(`${project.name}:`);
      console.log(`  package.json 中的版本要求: ${engineVersion || '未指定'}`);

      if (engineVersion === targetNodeVersion) {
        console.log('  ✅ 配置正确');
      } else {
        console.log(`  ❌ 配置不正确，应为: ${targetNodeVersion}`);
      }
    } catch (error) {
      console.log(`${project.name}: 读取 package.json 失败 - ${error.message}`);
    }
  } else {
    console.log(`${project.name}: 未找到 package.json`);
  }
});

// 检查 .nvmrc 文件
const nvmrcPath = path.resolve(__dirname, '../.nvmrc');
if (fs.existsSync(nvmrcPath)) {
  const nvmrcVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();
  console.log(`\n.nvmrc 文件中的版本: ${nvmrcVersion}`);

  if (nvmrcVersion === targetNodeVersion) {
    console.log('✅ .nvmrc 配置正确');
  } else {
    console.log(`❌ .nvmrc 配置不正确，应为: ${targetNodeVersion}`);
  }
} else {
  console.log('\n❌ 未找到 .nvmrc 文件');
}
