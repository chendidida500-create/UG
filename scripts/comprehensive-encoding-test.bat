@echo off
:: 设置UTF-8编码并隐藏输出
chcp 65001 >nul 2>&1

:: 清屏并显示测试标题
cls
echo ================================
echo 终端编码综合测试
echo ================================
echo.

echo 1. 基本中文显示测试
echo ------------------------
echo 这是一段中文测试文本
echo 包含特殊字符：【】（）......——+=^|、'"";
echo.

echo 2. 中英文混合测试
echo ------------------------
echo English text with 中文字符
echo 中文字符 with English text
echo 变量显示：PATH=%PATH:~0,50%...
echo.

echo 3. 特殊符号测试
echo ------------------------
echo 标点符号：。，！？；：""''（）【】《》
echo 数学符号：+-*-=≠≤≥∑∏∫∞√
echo.

echo 4. 项目相关术语测试
echo ------------------------
echo ESLint配置检查完成
echo Prettier格式化成功
echo TypeScript编译无错误
echo 依赖安装已完成
echo.

echo ================================
echo 测试完成，如果以上文字均正常显示则编码设置正确
echo ================================
echo.
echo 按任意键退出...
pause >nul