#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('Git 自动备份和更新脚本开始执行...');
console.log('===================================');

try {
  // 检查是否有远程仓库
  try {
    execSync('git remote get-url origin', { stdio: 'pipe' });
    console.log('✅ 远程仓库已配置');
  } catch (error) {
    console.error('❌ 未配置远程仓库，无法进行推送操作');
    console.error('请先配置远程仓库：git remote add origin <仓库地址>');
    process.exit(1);
  }

  // 检查当前分支
  const branch = execSync('git rev-parse --abbrev-ref HEAD', {
    encoding: 'utf-8',
  }).trim();
  console.log(`当前分支: ${branch}`);

  // 检查是否有未提交的更改
  try {
    execSync('git diff-index --quiet HEAD -- && git diff-files --quiet', {
      stdio: 'pipe',
    });
    console.log('没有发现未提交的更改');
  } catch (error) {
    console.log('发现未提交的更改，正在自动提交...');

    // 添加所有更改
    console.log('添加所有更改到暂存区...');
    execSync('git add .');

    // 获取当前时间作为提交信息
    const timestamp = new Date().toLocaleString('zh-CN');
    const commitMsg = `Auto backup: ${timestamp}`;

    // 提交更改
    console.log('提交更改...');
    execSync(`git commit -m "${commitMsg}"`);
    console.log('✅ 提交成功');
  }

  // 拉取远程更新
  console.log('拉取远程更新...');
  execSync(`git pull origin ${branch}`, { stdio: 'inherit' });
  console.log('✅ 拉取更新成功');

  // 推送更改到远程仓库
  console.log('推送更改到远程仓库...');
  execSync(`git push origin ${branch}`, { stdio: 'inherit' });
  console.log('✅ 推送成功');

  console.log('===================================');
  console.log('Git 自动备份和更新完成！');
} catch (error) {
  console.error('❌ 执行过程中出现错误:', error.message);
  process.exit(1);
}
