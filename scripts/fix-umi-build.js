/**
 * Umi 构建工具修复脚本
 * 解决由于依赖安装问题导致的 Umi 构建工具无法正常运行的问题
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('修复UMI构建工具配置...');

// 修复前端package.json中的scripts
const frontendDir = path.join(__dirname, '..', 'frontend');
const packageJsonPath = path.join(frontendDir, 'package.json');

if (fs.existsSync(packageJsonPath)) {
  console.log('✓ 找到 frontend/package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // 确保scripts使用max而不是umi
  if (packageJson.scripts) {
    let updated = false;

    // 检查并更新scripts
    Object.keys(packageJson.scripts).forEach(key => {
      if (typeof packageJson.scripts[key] === 'string') {
        const original = packageJson.scripts[key];
        // 将umi替换为max
        packageJson.scripts[key] = original.replace(/\bumi\b/g, 'max');
        if (original !== packageJson.scripts[key]) {
          console.log(`  更新脚本 ${key}: ${original} -> ${packageJson.scripts[key]}`);
          updated = true;
        }
      }
    });

    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log('✓ 更新 frontend/package.json 中的脚本命令');
    } else {
      console.log('✓ frontend/package.json 中的脚本命令已正确');
    }
  }
} else {
  console.log('✗ 未找到 frontend/package.json');
}

// 检查并修复.umirc.ts配置
const umircPath = path.join(frontendDir, '.umirc.ts');
if (fs.existsSync(umircPath)) {
  console.log('✓ 找到 .umirc.ts 配置文件');
  let umircContent = fs.readFileSync(umircPath, 'utf8');

  // 确保npmClient设置为pnpm
  if (!umircContent.includes("npmClient: 'pnpm'")) {
    // 如果存在其他npmClient配置，替换它
    if (umircContent.includes('npmClient:')) {
      umircContent = umircContent.replace(/npmClient:\s*['"][^'"]*['"]/g, "npmClient: 'pnpm'");
      console.log('✓ 更新 .umirc.ts 中的 npmClient 配置');
    } else {
      // 如果没有npmClient配置，添加它
      // 在export default defineConfig({之后添加
      umircContent = umircContent.replace(
        /(export\s+default\s+defineConfig\(\{)/,
        "$1\n  npmClient: 'pnpm',"
      );
      console.log('✓ 添加 .umirc.ts 中的 npmClient 配置');
    }
    fs.writeFileSync(umircPath, umircContent);
  } else {
    console.log('✓ .umirc.ts 中的 npmClient 配置已正确');
  }
} else {
  console.log('✗ 未找到 .umirc.ts 配置文件');
}

console.log('\nUMI构建工具配置修复完成。');

console.log('开始修复 Umi 构建工具问题...\n');

// 递归删除目录的函数
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        removeDir(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

try {
  // 1. 清理现有的 node_modules 和 lock 文件
  console.log('1. 清理现有的依赖文件...');

  // 清理根目录
  if (fs.existsSync(path.join(__dirname, '../node_modules'))) {
    console.log('  - 清理根目录 node_modules...');
    removeDir(path.join(__dirname, '../node_modules'));
  }

  if (fs.existsSync(path.join(__dirname, '../pnpm-lock.yaml'))) {
    console.log('  - 清理根目录 pnpm-lock.yaml...');
    fs.unlinkSync(path.join(__dirname, '../pnpm-lock.yaml'));
  }

  // 清理前端目录
  if (fs.existsSync(path.join(__dirname, '../frontend/node_modules'))) {
    console.log('  - 清理前端 node_modules...');
    removeDir(path.join(__dirname, '../frontend/node_modules'));
  }

  if (fs.existsSync(path.join(__dirname, '../frontend/pnpm-lock.yaml'))) {
    console.log('  - 清理前端 pnpm-lock.yaml...');
    fs.unlinkSync(path.join(__dirname, '../frontend/pnpm-lock.yaml'));
  }

  // 清理后端目录
  if (fs.existsSync(path.join(__dirname, '../backend/node_modules'))) {
    console.log('  - 清理后端 node_modules...');
    removeDir(path.join(__dirname, '../backend/node_modules'));
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