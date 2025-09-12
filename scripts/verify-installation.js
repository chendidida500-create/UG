const fs = require('fs');
const path = require('path');

console.log('=== UG项目依赖安装验证 ===\n');

// 检查必要的目录和文件
const checks = [
  {
    name: '根目录node_modules',
    path: path.join(__dirname, '..', 'node_modules'),
    type: 'dir'
  },
  {
    name: '前端node_modules',
    path: path.join(__dirname, '..', 'frontend', 'node_modules'),
    type: 'dir'
  },
  {
    name: '后端node_modules',
    path: path.join(__dirname, '..', 'backend', 'node_modules'),
    type: 'dir'
  },
  {
    name: '@umijs/max',
    path: path.join(__dirname, '..', 'node_modules', '.pnpm', '@umijs+max@*'),
    type: 'pattern'
  },
  {
    name: 'egg',
    path: path.join(__dirname, '..', 'node_modules', '.pnpm', 'egg@*'),
    type: 'pattern'
  }
];

let allPassed = true;

for (const check of checks) {
  try {
    if (check.type === 'dir') {
      const exists = fs.existsSync(check.path);
      console.log(`${exists ? '✓' : '✗'} ${check.name}: ${exists ? '存在' : '不存在'}`);
      if (!exists) allPassed = false;
    } else if (check.type === 'pattern') {
      // 检查模式匹配的文件/目录
      const dir = path.dirname(check.path);
      if (fs.existsSync(dir)) {
        const pattern = path.basename(check.path).replace('*', '.*');
        const regex = new RegExp(pattern);
        const files = fs.readdirSync(dir);
        const match = files.some(file => regex.test(file));
        console.log(`${match ? '✓' : '✗'} ${check.name}: ${match ? '存在' : '不存在'}`);
        if (!match) allPassed = false;
      } else {
        console.log(`✗ ${check.name}: 目录不存在`);
        allPassed = false;
      }
    }
  } catch (error) {
    console.log(`✗ ${check.name}: 检查失败 - ${error.message}`);
    allPassed = false;
  }
}

console.log('\n=== 验证结果 ===');
if (allPassed) {
  console.log('✓ 所有依赖安装验证通过');
  console.log('\n建议下一步操作:');
  console.log('  1. 运行 "pnpm run dev" 启动开发服务器');
  console.log('  2. 访问 http://localhost:8000 查看应用');
} else {
  console.log('✗ 依赖安装存在问题');
  console.log('\n建议修复步骤:');
  console.log('  1. 删除所有node_modules目录和pnpm-lock.yaml文件');
  console.log('  2. 重新运行 "pnpm install"');
  console.log('  3. 如果问题仍然存在，检查网络连接和npm源设置');
}