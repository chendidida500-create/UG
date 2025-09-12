@echo off
echo Testing Prettier in frontend...
cd /d e:\YSY\UG\frontend
npx prettier --check "src/**/*.{ts,tsx,js,jsx,json}"

echo.
echo Testing Prettier in backend...
cd /d e:\YSY\UG\backend
npx prettier --check "app/**/*.{ts,js,json}"

echo.
echo Prettier test completed.
pause
