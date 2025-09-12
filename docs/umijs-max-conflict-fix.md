# UmiJS Max 与 Umi 冲突问题修复文档

## 问题描述

在启动 UmiJS 开发服务器时，遇到以下错误：

```
Error: You are using @umijs/max, please remove umi from your dependencies in package.json.
```

## 问题分析

经过分析，发现项目中同时安装了 `@umijs/max` 和 `umi` 两个包，这两个包存在冲突：

1. `@umijs/max` 是 `umi` 的增强版本，包含了更多的功能和插件
2. 同时安装这两个包会导致依赖冲突和运行时错误
3. 根据 UmiJS 官方文档，使用 `@umijs/max` 时不应该同时安装 `umi`

## 解决方案

### 1. 移除冲突的依赖

在 `frontend/package.json` 中移除 `umi` 依赖：

```diff
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^14.3.0",
    "@types/lodash-es": "^4.17.12",
    "@types/node": "^20.12.7",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@umijs/plugins": "4.4.12",
    "@umijs/utils": "4.4.12",
    "call-bind": "^1.0.8",
    "eslint-plugin-prettier": "^5.5.4",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "function-bind": "^1.1.2",
    "jest": "^29.7.0",
    "object.fromentries": "^2.0.8",
-   "umi": "^4.4.12"
  }
}
```

### 2. 更新依赖

```bash
# 进入前端目录
cd frontend

# 移除 umi 依赖
pnpm remove umi

# 或者直接重新安装所有依赖
pnpm install
```

### 3. 验证修复

完成上述更改后，尝试启动开发服务器：

```bash
# 在项目根目录运行
pnpm dev
```

如果一切正常，您现在应该能够成功启动 UmiJS 开发服务器，而不会遇到 "You are using @umijs/max, please remove umi from your dependencies" 错误。

## 验证结果

开发服务器成功启动，监听在 http://localhost:8000，并且代理已正确配置将 /api 请求转发到 http://localhost:7001。

## 额外建议

1. 确保项目中只使用 `@umijs/max` 而不是 `umi`：
   - 在配置文件中从 `@umijs/max` 导入相关函数
   - 避免直接使用 `umi` 包中的功能

2. 检查依赖版本兼容性：
   - 确保 `@umijs/max`、`@umijs/plugins` 和 `@umijs/utils` 版本保持一致
   - 建议使用相同版本号以避免兼容性问题

3. 定期检查依赖冲突：
   - 使用 `pnpm list` 命令检查依赖树
   - 注意避免安装功能重复的包

## 相关文档

- [UmiJS 官方文档](https://umijs.org/)
- [UmiJS Max 介绍](https://umijs.org/docs/max/introduce)
