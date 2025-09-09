# Prettier配置问题解决方案

## 问题描述

在使用VS Code的Prettier扩展时，遇到以下错误：
```
["ERROR" - 03:13:33] Failed to load module. If you have prettier or plugins referenced in package.json, ensure you have run `npm install`
["ERROR" - 03:13:33] Cannot find module 'prettier' from 'e:\YSY\UG'
```

## 问题分析

1. **依赖缺失**：根目录的package.json中缺少prettier依赖
2. **路径问题**：Prettier扩展无法正确找到prettier模块
3. **工作区配置**：VS Code未正确配置prettier路径

## 解决方案

### 1. 添加Prettier依赖

在根目录package.json中添加prettier作为开发依赖：
```json
{
  "devDependencies": {
    "prettier": "^3.0.0"
  }
}
```

### 2. 更新VS Code配置

在[.vscode/settings.json](file:///e:/YSY/UG/.vscode/settings.json)中添加Prettier配置：
```json
{
  "prettier.configPath": "./.prettierrc.json",
  "prettier.prettierPath": "./node_modules/prettier"
}
```

### 3. 创建安装脚本

创建[scripts/install-prettier.bat](file:///e:/YSY/UG/scripts/install-prettier.bat)脚本，用于一键安装所有需要的依赖：
```batch
@echo off
chcp 65001 >nul 2>&1
cls
echo 正在安装Prettier依赖...
cd /d "%~dp0.."

echo 1. 在根目录安装Prettier...
pnpm add -D prettier@^3.0.0

echo 2. 在frontend目录安装依赖...
cd frontend
pnpm install

echo 3. 在backend目录安装依赖...
cd ..\backend
pnpm install
```

### 4. 更新格式化命令

在根目录package.json中添加format脚本：
```json
{
  "scripts": {
    "format": "cd frontend && pnpm format"
  }
}
```

## 验证步骤

1. 运行[scripts/install-prettier.bat](file:///e:/YSY/UG/scripts/install-prettier.bat)安装依赖
2. 重新加载VS Code窗口
3. 尝试格式化一个文件，确认Prettier正常工作

## 注意事项

1. 确保使用pnpm而不是npm或yarn
2. 在多包工作区中，需要在根目录和各子包中都正确配置依赖
3. 如果问题仍然存在，可以尝试重启VS Code和Prettier服务

## 相关文件

- [.prettierrc.json](file:///e:/YSY/UG/.prettierrc.json) - Prettier配置文件
- [package.json](file:///e:/YSY/UG/package.json) - 根目录包配置
- [frontend/package.json](file:///e:/YSY/UG/frontend/package.json) - 前端包配置
- [backend/package.json](file:///e:/YSY/UG/backend/package.json) - 后端包配置
- [.vscode/settings.json](file:///e:/YSY/UG/.vscode/settings.json) - VS Code配置
- [scripts/install-prettier.bat](file:///e:/YSY/UG/scripts/install-prettier.bat) - 安装脚本

---

_文档最后更新时间：2025-09-08_