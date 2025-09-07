@echo off
echo Checking frontend spelling...
cd frontend
pnpm spellcheck
if %errorlevel% neq 0 (
    echo Frontend spellcheck failed!
    cd ..
    exit /b %errorlevel%
)
cd ..

echo Checking backend spelling...
cd backend
pnpm spellcheck
if %errorlevel% neq 0 (
    echo Backend spellcheck failed!
    cd ..
    exit /b %errorlevel%
)
cd ..

echo All spell checks passed!