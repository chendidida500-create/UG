@echo off
chcp 65001 >nul 2>&1
cls
echo ================================================
echo WrenAI数据分析工具设置脚本
echo ================================================
echo.

echo 正在检查Docker环境...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未检测到Docker环境，请先安装Docker Desktop
    echo 下载地址：https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker环境检查通过
echo.

echo 请确保已配置OpenAI API密钥
echo 如果没有API密钥，请在以下网站申请：
echo https://platform.openai.com/api-keys
echo.

set /p api_key=请输入您的OpenAI API密钥: 
if "%api_key%"=="" (
    echo 错误：必须提供OpenAI API密钥
    pause
    exit /b 1
)

echo.
echo 正在启动WrenAI服务...
cd /d "%~dp0.."
docker-compose stop wrenai >nul 2>&1
docker-compose rm -f wrenai >nul 2>&1

REM 更新docker-compose.yml中的API密钥
powershell -Command "(gc docker-compose.yml) -replace 'your_openai_api_key', '%api_key%' | Out-File -encoding UTF8 docker-compose.yml"

docker-compose up -d wrenai >nul 2>&1

if %errorlevel% neq 0 (
    echo 错误：启动WrenAI服务失败
    pause
    exit /b 1
)

echo WrenAI服务启动成功
echo.

echo 正在检查服务状态...
timeout /t 10 /nobreak >nul

echo.
echo ================================================
echo WrenAI服务信息
echo ================================================
echo 访问地址：http://localhost:3003
echo 数据库连接信息：
echo   主机：localhost
echo   端口：3306
echo   数据库名：ug_management
echo   用户名：ug_user
echo   密码：ug_password
echo   类型：MySQL
echo.

echo 使用说明：
echo 1. 打开浏览器访问 http://localhost:3003
echo 2. 在WrenAI界面中使用自然语言查询数据
echo 3. 例如输入："显示用户总数"
echo 4. 系统将自动生成SQL并显示结果
echo.

echo 如需停止WrenAI服务，请运行 stop-wrenai.bat 脚本
echo.

echo 按任意键退出...
pause >nul