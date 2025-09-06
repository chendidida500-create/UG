#!/bin/bash

# Git 自动备份和更新脚本
# 该脚本会自动提交更改、推送到远程仓库并拉取更新

echo "Git 自动备份和更新脚本开始执行..."
echo "==================================="

# 获取当前时间作为提交信息
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto backup: $TIMESTAMP"

# 检查是否有远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 未配置远程仓库，无法进行推送操作"
    echo "请先配置远程仓库：git remote add origin <仓库地址>"
    exit 1
fi

# 检查当前分支
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "当前分支: $BRANCH"

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD -- || ! git diff-files --quiet; then
    echo "发现未提交的更改，正在自动提交..."
    
    # 添加所有更改
    echo "添加所有更改到暂存区..."
    git add .
    
    # 提交更改
    echo "提交更改..."
    git commit -m "$COMMIT_MSG"
    
    if [ $? -eq 0 ]; then
        echo "✅ 提交成功"
    else
        echo "❌ 提交失败"
        exit 1
    fi
else
    echo "没有发现未提交的更改"
fi

# 拉取远程更新
echo "拉取远程更新..."
git pull origin $BRANCH

if [ $? -eq 0 ]; then
    echo "✅ 拉取更新成功"
else
    echo "❌ 拉取更新失败"
    exit 1
fi

# 推送更改到远程仓库
echo "推送更改到远程仓库..."
git push origin $BRANCH

if [ $? -eq 0 ]; then
    echo "✅ 推送成功"
else
    echo "❌ 推送失败"
    exit 1
fi

echo "==================================="
echo "Git 自动备份和更新完成！"