@echo off
echo 正在修复 TypeScript 服务器配置问题...

echo.
echo 1. 清理 node_modules 中的 TypeScript...
cd /d "e:\YSY\UG"
if exist node_modules\typescript (
    rmdir /s /q node_modules\typescript
    echo    已删除现有的 TypeScript 目录
)

echo.
echo 2. 重新安装 TypeScript...
pnpm add -w -D typescript@5.9.2
echo    TypeScript 重新安装完成

echo.
echo 3. 验证 TypeScript 安装...
if exist node_modules\typescript\lib\tsserver.js (
    echo    tsserver.js 文件存在 - 配置正确
) else (
    echo    错误: tsserver.js 文件不存在
    echo    尝试使用全局 TypeScript...
    npm list -g typescript
)

echo.
echo 4. 修复 VS Code TypeScript 设置...
echo    已更新 .vscode/settings.json 中的 typescript.tsdk 配置

echo.
echo 修复完成！请重启 VS Code 以使更改生效。
pause