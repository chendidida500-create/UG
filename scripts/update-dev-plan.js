/**
 * 开发计划文档更新脚本
 * 用于更新开发进度计划文档的状态
 */

const fs = require('fs');
const path = require('path');

// 开发计划文档路径
const devPlanPath = path.join(__dirname, '../docs/DEVELOPMENT_PLAN.md');

console.log('正在更新开发进度计划文档...\n');

try {
  // 读取文档内容
  let content = fs.readFileSync(devPlanPath, 'utf8');

  // 更新最后更新时间
  const now = new Date();
  const updateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  content = content.replace(
    /_本文档最后更新时间：\d{4}-\d{2}-\d{2}_/,
    `_本文档最后更新时间：${updateTime}_`
  );

  // 写入更新后的内容
  fs.writeFileSync(devPlanPath, content, 'utf8');

  console.log('✓ 开发进度计划文档更新成功！');
  console.log(`更新时间：${updateTime}`);
} catch (error) {
  console.error('✗ 更新开发进度计划文档失败：', error.message);
}