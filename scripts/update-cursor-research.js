/**
 * CURSOR AI 编辑器技术调研文档更新脚本
 * 用于更新 CURSOR AI 编辑器技术调研文档的最后更新时间
 */

const fs = require('fs');
const path = require('path');

// CURSOR AI 编辑器技术调研文档路径
const cursorResearchPath = path.join(__dirname, '../docs/CURSOR_AI_EDITOR_RESEARCH.md');

console.log('正在更新 CURSOR AI 编辑器技术调研文档...\n');

try {
  // 检查文件是否存在
  if (!fs.existsSync(cursorResearchPath)) {
    console.log('✗ CURSOR AI 编辑器技术调研文档不存在');
    process.exit(1);
  }

  // 读取文档内容
  let content = fs.readFileSync(cursorResearchPath, 'utf8');

  // 更新最后更新时间
  const now = new Date();
  const updateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  content = content.replace(
    /_本文档最后更新时间：\d{4}-\d{2}-\d{2}_/,
    `_本文档最后更新时间：${updateTime}_`
  );

  // 写入更新后的内容
  fs.writeFileSync(cursorResearchPath, content, 'utf8');

  console.log('✓ CURSOR AI 编辑器技术调研文档更新成功！');
  console.log(`更新时间：${updateTime}`);
} catch (error) {
  console.error('✗ 更新 CURSOR AI 编辑器技术调研文档失败：', error.message);
}