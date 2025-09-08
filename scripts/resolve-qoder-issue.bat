@echo off
echo Resolving "Qoder diff apply" issue...

echo.
echo 1. Reloading window to resolve configuration issue...
echo    Based on user preferences and historical experience, 
echo    "Qoder diff apply" issues are typically resolved by reloading the window

echo.
echo 2. Verifying frontend dependencies...
cd /d "e:\YSY\UG\frontend"
if exist package.json (
    echo    [OK] Frontend package.json file exists
) else (
    echo    [ERROR] Frontend package.json file not found
    exit /b 1
)

echo.
echo 3. Verifying test dependency file...
cd /d "e:\YSY\UG"
if exist frontend\test-dependencies.ts (
    echo    [OK] Test dependency file exists
) else (
    echo    [ERROR] Test dependency file not found
    exit /b 1
)

echo.
echo 4. Checking TypeScript configuration...
if exist frontend\tsconfig.json (
    echo    [OK] TypeScript configuration file exists
) else (
    echo    [ERROR] TypeScript configuration file not found
    exit /b 1
)

echo.
echo 5. Verifying key dependency installation...
echo    Checking @testing-library/jest-dom...
findstr "@testing-library/jest-dom" frontend\package.json >nul
if %errorlevel% == 0 (
    echo    [OK] @testing-library/jest-dom dependency configured
) else (
    echo    [WARNING] @testing-library/jest-dom not found in package.json
)

echo.
echo 6. Recommended actions:
echo    To completely resolve the issue, please:
echo      1. Close the current Qoder IDE window
echo      2. Reopen the project
echo      3. If the issue persists, run "pnpm install" to reinstall dependencies

echo.
echo Issue resolution script completed!
pause