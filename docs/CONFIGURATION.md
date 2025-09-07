# 项目配置文件统一管理说明

本文档说明了如何统一管理项目中的配置文件，以提高维护效率和一致性。

## 配置文件结构

项目现在采用统一的配置文件管理结构：

```
config/
├── eslint/
│   ├── base.json          # 基础 ESLint 配置
│   ├── frontend.json      # 前端 ESLint 配置
│   └── backend.json       # 后端 ESLint 配置
├── prettier/
│   ├── base.json          # 基础 Prettier 配置
│   └── frontend.json      # 前端 Prettier 配置
├── tsconfig/
│   ├── base.json          # 基础 TypeScript 配置
│   ├── frontend.json      # 前端 TypeScript 配置
│   └── backend.json       # 后端 TypeScript 配置
└── cspell/
    ├── base.json          # 基础 cspell 配置
    ├── frontend.json      # 前端 cspell 配置
    └── backend.json       # 后端 cspell 配置
```

## 配置文件继承关系

### ESLint 配置继承

- 根目录 `.eslintrc.json` 继承 `config/eslint/base.json`
- 前端 `frontend/.eslintrc.json` 继承 `config/eslint/frontend.json`
- 后端 `backend/.eslintrc` 继承 `config/eslint/backend.json`

### Prettier 配置继承

- 根目录 `.prettierrc.json` 继承 `config/prettier/base.json`
- 前端 `frontend/.prettierrc.json` 继承 `config/prettier/frontend.json`

### TypeScript 配置继承

- 根目录 `tsconfig.json` 继承 `config/tsconfig/base.json`
- 前端 `frontend/tsconfig.json` 继承 `config/tsconfig/frontend.json`
- 后端 `backend/tsconfig.json` 继承 `config/tsconfig/backend.json`

### cspell 配置继承

- 根目录 `cspell.json` 继承 `config/cspell/base.json`
- 前端 `frontend/cspell.json` 继承 `config/cspell/frontend.json`
- 后端 `backend/cspell.json` 继承 `config/cspell/backend.json`

## 配置更新流程

当需要更新配置时，请按照以下步骤操作：

1. 更新 `config/` 目录下的相应配置文件
2. 如果需要，更新各项目目录下的继承文件
3. 运行测试确保配置更改不会破坏现有功能

## 优势

1. **统一管理**：所有配置文件集中管理，便于维护
2. **减少重复**：避免在多个地方重复相同的配置
3. **易于更新**：只需更新一处配置，所有继承该配置的项目都会自动更新
4. **一致性**：确保整个项目使用一致的代码规范和工具配置

## 注意事项

1. 修改配置文件后，建议运行相关工具（如 ESLint、Prettier）检查是否正常工作
2. 在团队协作中，配置文件的更改需要通知所有团队成员
3. 避免在各项目目录下直接修改配置文件，应通过继承机制进行配置
