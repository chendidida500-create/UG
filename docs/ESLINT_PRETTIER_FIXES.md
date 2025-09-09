# ESLint 和 Prettier 配置修复文档

## 问题描述

原始错误信息：
```
Replace `·'**/*.{js,mjs,cjs,ts,jsx,tsx}'·` with `'**/*.{js,mjs,cjs,ts,jsx,tsx}'` eslint(prettier/prettier)
```

经过检查，项目配置文件中并没有这种错误的写法。问题可能源于依赖未正确安装或缓存问题。

## 修复措施

### 1. 依赖版本更新

#### TypeScript 版本兼容性
- 将 TypeScript 从 5.9.2 降级到 5.1.6，以确保与 @typescript-eslint 包兼容
- 更新了前后端的 @typescript-eslint/eslint-plugin 和 @typescript-eslint/parser 版本到 6.0.0

#### 文件修改
- `package.json`: 更新 TypeScript 版本
- `frontend/package.json`: 更新 @typescript-eslint 包版本
- `backend/package.json`: 更新 @typescript-eslint 包版本

### 2. ESLint 配置修复

#### 前端配置修复
- 修复了 ES 模块中使用 `__dirname` 的问题
- 添加了 `parserOptions.project` 和 `parserOptions.tsconfigRootDir` 配置以支持 TypeScript 规则

#### 文件修改
- `frontend/eslint.config.js`: 修复 ES 模块兼容性问题并添加 TypeScript 配置

### 3. VS Code 配置更新

#### Prettier 配置同步
- 更新了 VS Code 设置中的 Prettier 配置，使其与项目中的 `.prettierrc.json` 保持一致

#### 文件修改
- `.vscode/settings.json`: 添加缺失的 Prettier 配置项

### 4. 自动化脚本更新

#### 包管理器统一
- 更新了自动化脚本以使用 pnpm 而不是 npm

#### 文件修改
- `scripts/auto-format-and-lint.bat`: 使用 pnpm 替代 npm
- `scripts/auto-type-check.bat`: 使用 pnpm 替代 npm

## 验证结果

1. Prettier 能够正常检测和格式化代码
2. ESLint 配置已修复，不再出现模块兼容性问题
3. VS Code 配置与项目配置保持一致

## 后续建议

1. 重启 VS Code 以刷新所有缓存和配置
2. 运行 `pnpm install` 确保所有依赖正确安装
3. 如果在编辑器中仍然看到原始错误，请检查是否需要进一步调整 ESLint 配置

## 相关文件

- `frontend/eslint.config.js`
- `backend/eslint.config.js`
- `frontend/package.json`
- `backend/package.json`
- `package.json`
- `.vscode/settings.json`
- `scripts/auto-format-and-lint.bat`
- `scripts/auto-type-check.bat`