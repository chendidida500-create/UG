# 代码质量工具配置总结

## 项目结构概览

### 核心配置文件
- **ESLint配置**: 
  - 前端: [frontend/eslint.config.js](file:///e:/YSY/UG/frontend/eslint.config.js)
  - 后端: [backend/eslint.config.js](file:///e:/YSY/UG/backend/eslint.config.js)
- **Prettier配置**: [frontend/.prettierrc.json](file:///e:/YSY/UG/frontend/.prettierrc.json)
- **TypeScript配置**: 
  - 前端: [frontend/tsconfig.json](file:///e:/YSY/UG/frontend/tsconfig.json)
  - 后端: [backend/tsconfig.json](file:///e:/YSY/UG/backend/tsconfig.json)
  - 根目录: [tsconfig.json](file:///e:/YSY/UG/tsconfig.json)

## ESLint配置规范

### 配置文件结构
项目采用ESLint 8.x扁平配置格式：
- 前端使用ES模块格式 (`export default`)
- 后端使用CommonJS格式 (`module.exports`)

### 核心规则
1. **基础规则**:
   - `no-console`: 警告级别，允许在开发中使用
   - `prefer-const`: 错误级别，优先使用const声明
   - `no-var`: 错误级别，禁用var声明

2. **TypeScript规则**:
   - `@typescript-eslint/no-unused-vars`: 错误级别，忽略以`_`开头的参数
   - `@typescript-eslint/no-explicit-any`: 错误级别，禁用any类型
   - `@typescript-eslint/no-floating-promises`: 错误级别，必须处理Promise返回值

3. **React规则**:
   - `react/react-in-jsx-scope`: 关闭，React 17+不需要显式导入React
   - `react/prop-types`: 关闭，使用TypeScript类型检查

### 配置最佳实践
- 使用`files`属性精确匹配文件类型
- 合理配置`ignores`忽略不需要检查的目录
- 与Prettier集成避免规则冲突

## Prettier配置规范

### 核心格式化规则
- **semi**: true (使用分号)
- **singleQuote**: true (使用单引号)
- **trailingComma**: "es5" (ES5兼容的尾随逗号)
- **printWidth**: 80 (每行最大字符数)
- **tabWidth**: 2 (缩进空格数)
- **arrowParens**: "avoid" (单参数箭头函数省略括号)

### 配置文件位置
- [frontend/.prettierrc.json](file:///e:/YSY/UG/frontend/.prettierrc.json): Prettier配置文件
- [frontend/.prettierignore](file:///e:/YSY/UG/frontend/.prettierignore): Prettier忽略文件

## VS Code集成配置

### 推荐设置
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

### 终端编码配置
为解决Windows系统上终端输出中文乱码问题，已配置：
```json
"terminal.integrated.profiles.windows": {
  "Command Prompt": {
    "path": [
      "${env:windir}\\Sysnative\\cmd.exe",
      "${env:windir}\\System32\\cmd.exe"
    ],
    "args": ["/K", "chcp 65001 >nul && cls"],
    "icon": "terminal-cmd"
  }
}
```

所有批处理脚本均已添加UTF-8编码支持：
```batch
@echo off
chcp 65001 >nul 2>&1
```

## 自动化脚本

### 核心脚本
- [scripts/auto-format-and-lint.bat](file:///e:/YSY/UG/scripts/auto-format-and-lint.bat): 自动格式化和检查代码质量
- [scripts/auto-type-check.bat](file:///e:/YSY/UG/scripts/auto-type-check.bat): TypeScript类型检查
- [scripts/auto-build.bat](file:///e:/YSY/UG/scripts/auto-build.bat): 项目构建
- [scripts/auto-fix-errors.bat](file:///e:/YSY/UG/scripts/auto-fix-errors.bat): 自动修复常见错误

### 脚本编码规范
所有批处理脚本均遵循以下规范：
1. 使用UTF-8编码保存文件
2. 在脚本开头添加`chcp 65001 >nul 2>&1`命令
3. 避免使用可能导致编码问题的特殊字符
4. 使用`pause >nul`隐藏按任意键继续的提示文字

## 常见问题解决

### ESLint与Prettier冲突
确保Prettier规则与ESLint规则一致，通过eslint-plugin-prettier插件集成。

### TypeScript版本兼容性
使用TypeScript 5.1.6版本，与@typescript-eslint包兼容。

### 终端输出乱码
1. 确保批处理脚本包含编码设置命令
2. 验证VS Code终端配置
3. 使用[scripts/comprehensive-encoding-test.bat](file:///e:/YSY/UG/scripts/comprehensive-encoding-test.bat)测试编码设置