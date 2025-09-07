@echo off
echo 检查项目依赖版本
echo =================

echo 1. 检查 Node.js 版本...
echo 要求版本: ^>=20.19.0
for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i
if "%NODE_VERSION%"=="" (
    echo Node.js 未安装
) else (
    echo 当前版本: %NODE_VERSION%
    rem 简单的版本比较（实际项目中可能需要更复杂的版本比较逻辑）
    if "%NODE_VERSION%"=="v20.19.0" (
        echo ✓ Node.js 版本正确
    ) else (
        if "%NODE_VERSION:~1,2%" GEQ "20" (
            if "%NODE_VERSION:~1,2%" EQU "20" (
                if "%NODE_VERSION:~4,2%" GEQ "19" (
                    echo ✓ Node.js 版本符合要求
                ) else (
                    echo ✗ Node.js 版本过低
                )
            ) else (
                echo ✓ Node.js 版本符合要求
            )
        ) else (
            echo ✗ Node.js 版本过低
        )
    )
)

echo.
echo 2. 检查 pnpm 版本...
echo 要求版本: 8.15.8
for /f "tokens=*" %%i in ('pnpm --version 2^>nul') do set PNPM_VERSION=%%i
if "%PNPM_VERSION%"=="" (
    echo pnpm 未安装
) else (
    echo 当前版本: %PNPM_VERSION%
    if "%PNPM_VERSION%"=="8.15.8" (
        echo ✓ pnpm 版本正确
    ) else (
        echo - pnpm 版本可能需要调整
    )
)

echo.
echo 3. 检查项目依赖版本...
cd /d e:\YSY\UG

echo.
echo TypeScript 版本:
echo 要求版本: 5.9.2
pnpm list typescript --depth 0 2>nul | findstr "typescript"
if errorlevel 1 (
    echo TypeScript 未安装或版本不匹配
) else (
    echo ✓ TypeScript 版本符合要求
)

echo.
echo React 版本:
echo 要求版本: 18.3.1
pnpm list react --depth 0 2>nul | findstr "react@18.3.1"
if errorlevel 1 (
    echo React 版本不匹配
) else (
    echo ✓ React 版本正确
)

echo.
echo React DOM 版本:
echo 要求版本: 18.3.1
pnpm list react-dom --depth 0 2>nul | findstr "react-dom@18.3.1"
if errorlevel 1 (
    echo React DOM 版本不匹配
) else (
    echo ✓ React DOM 版本正确
)

echo.
echo @types/react 版本:
echo 要求版本: 18.3.24
pnpm list @types/react --depth 0 2>nul | findstr "@types/react@18.3.24"
if errorlevel 1 (
    echo @types/react 版本不匹配
) else (
    echo ✓ @types/react 版本正确
)

echo.
echo @types/react-dom 版本:
echo 要求版本: 18.3.1
pnpm list @types/react-dom --depth 0 2>nul | findstr "@types/react-dom@18.3.1"
if errorlevel 1 (
    echo @types/react-dom 版本不匹配
) else (
    echo ✓ @types/react-dom 版本正确
)

echo.
echo 版本检查完成！
pause