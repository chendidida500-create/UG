@echo off
echo Testing spell check functionality...

echo Checking a single frontend file...
npx cspell "frontend/src/app.ts" --exclude "node_modules"

echo Checking a single backend file...
npx cspell "backend/app/controller/auth.js" --exclude "node_modules"

echo Test completed!