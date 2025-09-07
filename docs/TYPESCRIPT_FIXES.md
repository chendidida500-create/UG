# TypeScript 配置问题修复指南

## 问题描述

在项目中遇到了以下 TypeScript 错误：

```
找不到"node"的类型定义文件
找不到"react"的类型定义文件
找不到"react-dom"的类型定义文件
```

## 问题原因

1. 根目录的 [tsconfig.json](file:///e:/YSY/UG/tsconfig.json) 中配置了 "types" 数组，明确指定了需要包含的类型定义
2. pnpm 工作区结构导致依赖解析问题
3. 前端项目中缺少必要的类型定义依赖

## 解决方案

### 1. 修改前端项目的 TypeScript 配置

在 [frontend/tsconfig.json](file:///e:/YSY/UG/frontend/tsconfig.json) 中添加以下配置：

```json
{
  "extends": "../config/tsconfig/frontend.json",
  "compilerOptions": {
    // 覆盖 baseUrl 为当前目录
    "baseUrl": ".",
    // 配置类型定义路径
    "typeRoots": ["./node_modules/@types", "../node_modules/@types"],
    // 覆盖 types 配置，让 TypeScript 自动解析类型
    "types": []
  },
  "include": ["src/**/*", ".umirc.ts"]
}
```

关键修改：

- 添加了 `typeRoots` 配置，确保能解析根目录和当前项目的类型定义
- 将 `types` 数组设置为空，让 TypeScript 自动解析所需的类型定义

### 2. 确保依赖正确安装

确保前端项目的 [package.json](file:///e:/YSY/UG/frontend/package.json) 中包含以下依赖：

```json
"devDependencies": {
  "@types/node": "^20.14.0",
  "@types/react": "18.3.24",
  "@types/react-dom": "18.3.1"
}
```

### 3. pnpm 工作区依赖安装

在 pnpm 工作区项目中，可以使用以下命令在根目录安装依赖：

```bash
# 在根目录安装依赖到工作区
pnpm add -D @types/node @types/react @types/react-dom -w
```

## 验证修复

运行以下命令验证 TypeScript 配置是否正确：

```bash
cd frontend
pnpm tsc
```

如果只看到代码本身的类型错误而不是"找不到类型定义文件"的错误，说明问题已解决。

## 注意事项

1. 在 pnpm 工作区项目中，依赖解析可能与普通项目不同
2. TypeScript 的 "types" 配置会严格限制只能使用明确指定的类型定义
3. 清空 "types" 数组可以让 TypeScript 自动解析项目中实际使用的类型定义
