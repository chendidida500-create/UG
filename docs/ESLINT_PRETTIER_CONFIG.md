# ESLint 和 Prettier 配置规范

本文档详细说明了 UG 管理系统项目中 ESLint 和 Prettier 的配置要求和最佳实践。

## 版本要求

### ESLint
- **版本**: ^8.0.0
- **原因**: 与 UMI 4.x 框架兼容，避免版本冲突

### Prettier
- **版本**: ^3.0.0
- **原因**: 现代代码格式化工具，提供更好的性能和功能

## 配置文件位置

### ESLint 配置
- **文件**: [frontend/eslint.config.js](file:///e:/YSY/UG/frontend/eslint.config.js)
- **格式**: ESLint 8.x 扁平配置格式

### Prettier 配置
- **文件**: [frontend/.prettierrc.json](file:///e:/YSY/UG/frontend/.prettierrc.json)

## ESLint 配置详情

### 基础配置
```javascript
{
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
}
```

### TypeScript 配置
```javascript
{
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: {
    '@typescript-eslint': '@typescript-eslint/eslint-plugin',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
  },
}
```

### React 配置
```javascript
{
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    react: 'eslint-plugin-react',
    'react-hooks': 'eslint-plugin-react-hooks',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
}
```

### Prettier 集成配置
```javascript
{
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    prettier: 'eslint-plugin-prettier',
  },
  rules: {
    'prettier/prettier': 'error',
  },
}
```

## Prettier 配置详情

### 配置文件: [.prettierrc.json](file:///e:/YSY/UG/frontend/.prettierrc.json)
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 配置说明
- **semi**: 使用分号结尾
- **singleQuote**: 使用单引号
- **trailingComma**: 在多行对象和数组中使用尾随逗号
- **printWidth**: 每行最大字符数为80
- **tabWidth**: 缩进宽度为2个空格
- **useTabs**: 使用空格而不是制表符
- **bracketSpacing**: 对象字面量中的括号前后有空格
- **bracketSameLine**: 多行HTML元素的`>`符号放在最后一行的末尾
- **arrowParens**: 箭头函数单个参数时不使用括号
- **endOfLine**: 使用LF作为换行符

## 依赖配置

### 前端依赖 ([frontend/package.json](file:///e:/YSY/UG/frontend/package.json))
```json
"devDependencies": {
  "eslint": "^8.0.0",
  "@typescript-eslint/eslint-plugin": "^5.0.0",
  "@typescript-eslint/parser": "^5.0.0",
  "eslint-plugin-react": "^7.33.2",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-config-prettier": "^8.0.0",
  "eslint-plugin-prettier": "^4.0.0",
  "prettier": "^3.0.0"
}
```

### 后端依赖 ([backend/package.json](file:///e:/YSY/UG/backend/package.json))
```json
"devDependencies": {
  "eslint": "^8.0.0",
  "eslint-config-egg": "^14.1.0"
}
```

### 根目录依赖 ([package.json](file:///e:/YSY/UG/package.json))
```json
"resolutions": {
  "eslint": "^8.0.0"
},
"overrides": {
  "eslint": "^8.0.0"
}
```

## 使用方法

### 代码检查
```bash
# 前端代码检查
cd frontend
pnpm lint

# 后端代码检查
cd backend
pnpm lint

# 全项目代码检查
pnpm lint
```

### 自动修复
```bash
# 前端代码自动修复
cd frontend
pnpm lint:fix

# 后端代码自动修复
cd backend
pnpm lint:fix

# 全项目代码自动修复
pnpm lint:fix
```

### 代码格式化
```bash
# 格式化前端代码
cd frontend
pnpm format
```

## VS Code 集成

### 推荐配置 ([.vscode/settings.json](file:///e:/YSY/UG/.vscode/settings.json))
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## 最佳实践

1. **版本一致性**: 确保所有工作区使用相同的 ESLint 和 Prettier 版本
2. **配置同步**: 前端和后端的 ESLint 配置应保持一致性
3. **自动修复**: 利用编辑器集成在保存时自动修复和格式化代码
4. **规则定制**: 根据项目需求定制规则，但避免过度配置
5. **定期更新**: 定期检查并更新依赖版本，确保安全性和兼容性

## 常见问题

### 1. ESLint 版本冲突
**问题**: 出现版本冲突错误
**解决方案**: 
- 检查 [package.json](file:///e:/YSY/UG/package.json) 中的 resolutions 和 overrides 字段
- 清理 node_modules 并重新安装依赖
- 确保所有工作区使用相同版本

### 2. Prettier 格式化不生效
**问题**: 代码保存后未按预期格式化
**解决方案**:
- 检查 VS Code 设置中的 formatOnSave 是否启用
- 确认项目中安装了正确的 Prettier 版本
- 检查 [.prettierrc.json](file:///e:/YSY/UG/frontend/.prettierrc.json) 配置是否正确

### 3. ESLint 规则不生效
**问题**: 某些 ESLint 规则未按预期工作
**解决方案**:
- 检查 [eslint.config.js](file:///e:/YSY/UG/frontend/eslint.config.js) 配置文件
- 确认相关插件已正确安装
- 验证规则名称是否正确

## 维护指南

### 更新配置
1. 修改配置文件后，重启 VS Code 或重新加载窗口
2. 清理 ESLint 缓存: `pnpm eslint --cache --cache-location .eslintcache --ext .js,.jsx,.ts,.tsx ./src`
3. 验证配置有效性: `pnpm eslint --print-config src/index.ts`

### 添加新规则
1. 确定适用范围（全局/特定文件类型）
2. 在 [eslint.config.js](file:///e:/YSY/UG/frontend/eslint.config.js) 中添加相应配置
3. 测试规则效果
4. 更新本文档

## 相关文档

- [VERSION_REQUIREMENTS.md](VERSION_REQUIREMENTS.md) - 项目版本要求
- [AUTOMATION.md](AUTOMATION.md) - 自动化功能
- [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南