#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 定义统一的 TypeScript 版本
const TARGET_TYPESCRIPT_VERSION = '^5.2.2';

// 获取项目根目录
const rootDir = path.resolve(__dirname, '..');

// 需要更新的项目目录
const projectDirs = [
  rootDir,
  path.join(rootDir, 'frontend'),
  path.join(rootDir, 'backend'),
];

console.log('统一 TypeScript 版本脚本开始执行...');
console.log(`目标 TypeScript 版本: ${TARGET_TYPESCRIPT_VERSION}`);

projectDirs.forEach((projectDir) => {
  const packageJsonPath = path.join(projectDir, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    console.log(`\n处理项目: ${path.relative(rootDir, projectDir) || 'root'}`);

    try {
      // 读取 package.json
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      // 更新 devDependencies 中的 TypeScript 版本
      if (
        packageJson.devDependencies &&
        packageJson.devDependencies.typescript
      ) {
        const oldVersion = packageJson.devDependencies.typescript;
        packageJson.devDependencies.typescript = TARGET_TYPESCRIPT_VERSION;
        console.log(
          `  更新 TypeScript 版本: ${oldVersion} -> ${TARGET_TYPESCRIPT_VERSION}`
        );
      } else if (packageJson.devDependencies) {
        // 如果没有 TypeScript 依赖，则添加
        packageJson.devDependencies.typescript = TARGET_TYPESCRIPT_VERSION;
        console.log(`  添加 TypeScript 依赖: ${TARGET_TYPESCRIPT_VERSION}`);
      }

      // 写回 package.json
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n'
      );
      console.log('  package.json 更新完成');

      // 删除 package-lock.json 和 node_modules（如果存在）
      const lockFilePath = path.join(projectDir, 'package-lock.json');
      const nodeModulesPath = path.join(projectDir, 'node_modules');

      if (fs.existsSync(lockFilePath)) {
        fs.unlinkSync(lockFilePath);
        console.log('  删除 package-lock.json');
      }

      // 注意：这里不删除 node_modules，因为这会增加执行时间
      // 如果需要完全重新安装，用户可以手动删除 node_modules
    } catch (error) {
      console.error(`  处理失败: ${error.message}`);
    }
  } else {
    console.log(
      `\n跳过项目: ${path.relative(rootDir, projectDir) || 'root'} (缺少 package.json)`
    );
  }
});

console.log('\n统一 TypeScript 版本脚本执行完成！');
console.log('\n建议执行以下操作以确保更改生效：');
console.log('1. 在每个项目目录中运行: npm install');
console.log('2. 或者删除所有 node_modules 目录后重新安装依赖');
