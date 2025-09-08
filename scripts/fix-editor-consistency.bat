@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ================================================
echo 修复编辑器状态一致性问题
echo ================================================

cd /d "%~dp0.."

echo.
echo 1. 检查并修复 TypeScript 配置...
echo ================================

echo 正在验证 TypeScript 配置...
pnpm tsc --noEmit --project frontend/tsconfig.json > nul 2>&1
if !errorlevel! equ 0 (
    echo ✓ 前端 TypeScript 配置正确
) else (
    echo × 前端 TypeScript 配置存在问题，正在修复...
    call scripts\fix-tsconfig.bat
)

pnpm tsc --noEmit --project backend/tsconfig.json > nul 2>&1
if !errorlevel! equ 0 (
    echo ✓ 后端 TypeScript 配置正确
) else (
    echo × 后端 TypeScript 配置存在问题，正在修复...
    call scripts\fix-tsconfig.bat
)

echo.
echo 2. 修复 ESLint 和 Prettier 配置...
echo ================================

echo 正在检查 ESLint 配置...
if exist frontend\.eslintrc.json (
    echo ✓ 前端 ESLint 配置文件存在
) else (
    echo × 前端 ESLint 配置文件不存在，正在创建...
    echo {"extends": "../config/eslint/frontend.json"} > frontend\.eslintrc.json
    echo ✓ 已创建前端 ESLint 配置文件
)

echo 正在检查 Prettier 配置...
if exist config\prettier\base.json (
    echo ✓ Prettier 配置文件存在
) else (
    echo × Prettier 配置文件不存在，正在创建...
    (
        echo {
        echo   "semi": true,
        echo   "singleQuote": true,
        echo   "trailingComma": "es5",
        echo   "printWidth": 80,
        echo   "tabWidth": 2,
        echo   "useTabs": false,
        echo   "bracketSpacing": true,
        echo   "bracketSameLine": false,
        echo   "arrowParens": "always",
        echo   "endOfLine": "lf"
        echo }
    ) > config\prettier\base.json
    echo ✓ 已创建 Prettier 配置文件
)

echo.
echo 3. 优化 VS Code 配置...
echo ================================

echo 正在检查 .vscode 目录...
if not exist frontend\.vscode (
    echo 正在创建前端 .vscode 目录...
    mkdir frontend\.vscode
)

echo 正在优化 VS Code 设置...
(
    echo {
    echo   // 编辑器配置
    echo   "editor.fontSize": 14,
    echo   "editor.tabSize": 2,
    echo   "editor.insertSpaces": true,
    echo   "editor.wordWrap": "on",
    echo   "editor.minimap.enabled": true,
    echo   "editor.suggestSelection": "first",
    echo   "editor.codeActionsOnSave": {
    echo     "source.fixAll.eslint": "explicit",
    echo     "source.organizeImports": "explicit"
    echo   },
    echo   "editor.formatOnSave": true,
    echo   "editor.defaultFormatter": "vscode.typescript-language-features",
    echo   // 自动保存配置
    echo   "files.autoSave": "onFocusChange",
    echo   "files.autoSaveDelay": 1000,
    echo   // 文件编码配置
    echo   "files.encoding": "utf8",
    echo   "files.autoGuessEncoding": false,
    echo   // TypeScript配置
    echo   "typescript.updateImportsOnFileMove.enabled": "always",
    echo   "typescript.suggest.autoImports": true,
    echo   "typescript.preferences.importModuleSpecifier": "relative",
    echo   "typescript.preferences.quoteStyle": "single",
    echo   "typescript.suggestionActions.enabled": true,
    echo   "typescript.tsdk": "./node_modules/typescript/lib",
    echo   "typescript.useWorkspaceTsdk": true,
    echo   "typescript.tsserver.enableTracing": true,
    echo   "typescript.tsserver.experimental.enableProjectDiagnostics": true,
    echo   // JavaScript配置
    echo   "javascript.updateImportsOnFileMove.enabled": "always",
    echo   "javascript.suggest.autoImports": true,
    echo   // ESLint配置
    echo   "eslint.validate": [
    echo     "javascript",
    echo     "javascriptreact",
    echo     "typescript",
    echo     "typescriptreact"
    echo   ],
    echo   "eslint.alwaysShowStatus": true,
    echo   "eslint.codeAction.showDocumentation": {
    echo     "enable": true
    echo   },
    echo   "eslint.run": "onType",
    echo   // Prettier配置
    echo   "prettier.semi": true,
    echo   "prettier.singleQuote": true,
    echo   "prettier.trailingComma": "es5",
    echo   "prettier.printWidth": 80,
    echo   "prettier.tabWidth": 2,
    echo   // 文件关联
    echo   "files.associations": {
    echo     "*.json": "jsonc",
    echo     "*.env": "properties"
    echo   },
    echo   // 搜索配置
    echo   "search.exclude": {
    echo     "**/node_modules": true,
    echo     "**/dist": true,
    echo     "**/.umi": true,
    echo     "**/coverage": true
    echo   },
    echo   // 文件监控
    echo   "files.watcherExclude": {
    echo     "**/node_modules/**": true,
    echo     "**/.git/objects/**": true,
    echo     "**/dist/**": true,
    echo     "**/.umi/**": true
    echo   },
    echo   // Git配置
    echo   "git.autofetch": true,
    echo   "git.confirmSync": false,
    echo   // 终端配置 - 根据用户偏好使用CMD而不是PowerShell
    echo   "terminal.integrated.defaultProfile.windows": "Command Prompt",
    echo   "terminal.integrated.fontSize": 12,
    echo   "terminal.integrated.profiles.windows": {
    echo     "PowerShell": {
    echo       "source": "PowerShell",
    echo       "icon": "terminal-powershell"
    echo     },
    echo     "Command Prompt": {
    echo       "path": [
    echo         "${env:windir}\\Sysnative\\cmd.exe",
    echo         "${env:windir}\\System32\\cmd.exe"
    echo       ],
    echo       "args": [],
    echo       "icon": "terminal-cmd"
    echo     },
    echo     "Git Bash": {
    echo       "source": "Git Bash"
    echo     }
    echo   },
    echo   // 问题面板配置
    echo   "problems.showCurrentInStatus": true,
    echo   "problems.autoReveal": true,
    echo   // 输出面板配置
    echo   "output.smartScrolling": true,
    echo   // 调试配置
    echo   "debug.openDebug": "openOnSessionStart",
    echo   "debug.toolBarLocation": "docked",
    echo   "debug.console.closeOnEnd": true,
    echo   // 语言特定配置
    echo   "[typescript]": {
    echo     "editor.defaultFormatter": "vscode.typescript-language-features"
    echo   },
    echo   "[typescriptreact]": {
    echo     "editor.defaultFormatter": "vscode.typescript-language-features"
    echo   },
    echo   "[javascript]": {
    echo     "editor.defaultFormatter": "vscode.typescript-language-features"
    echo   },
    echo   "[javascriptreact]": {
    echo     "editor.defaultFormatter": "vscode.typescript-language-features"
    echo   },
    echo   "[json]": {
    echo     "editor.defaultFormatter": "vscode.json-language-features"
    echo   },
    echo   "[jsonc]": {
    echo     "editor.defaultFormatter": "vscode.json-language-features"
    echo   },
    echo   "[css]": {
    echo     "editor.defaultFormatter": "vscode.css-language-features"
    echo   },
    echo   "[less]": {
    echo     "editor.defaultFormatter": "vscode.css-language-features"
    echo   },
    echo   "[scss]": {
    echo     "editor.defaultFormatter": "vscode.css-language-features"
    echo   },
    echo   "[sql]": {
    echo     "editor.defaultFormatter": "mtxr.sqltools"
    echo   },
    echo   "[dockerfile]": {
    echo     "editor.defaultFormatter": "ms-azuretools.vscode-containers"
    echo   }
    echo }
) > frontend\.vscode\settings.json

echo ✓ 已优化 VS Code 配置

echo.
echo 4. 重启 TypeScript 服务器...
echo ================================

echo 正在重启 TypeScript 服务器...
taskkill /f /im node.exe > nul 2>&1
echo ✓ 已重启 TypeScript 服务器

echo.
echo 5. 清理缓存并重新构建...
echo ================================

echo 正在清理缓存...
if exist "frontend\node_modules\.cache" (
    rd /s /q "frontend\node_modules\.cache"
    echo ✓ 已清理前端缓存
) else (
    echo - 前端缓存不存在
)

if exist "backend\node_modules\.cache" (
    rd /s /q "backend\node_modules\.cache"
    echo ✓ 已清理后端缓存
) else (
    echo - 后端缓存不存在
)

echo 正在重新安装依赖...
cd frontend
call pnpm install
cd ..

cd backend
call pnpm install
cd ..

echo.
echo ================================================
echo 编辑器状态一致性问题修复完成！
echo ================================================
echo.
echo 建议操作：
echo 1. 重新加载 VS Code 窗口 (Ctrl+Shift+P ^> Developer: Reload Window)
echo 2. 如果仍有问题，请运行：scripts\auto-fix-errors.bat
echo.
pause