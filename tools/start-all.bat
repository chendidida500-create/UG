@echo off
echo Starting UG Management System...

start "UG Backend" /D "E:\YSY\UG\backend" npm run dev
timeout /t 10 /nobreak >nul
start "UG Frontend" /D "E:\YSY\UG\frontend" npm run dev

echo UG Management System started successfully!
echo Frontend: http://localhost:8000
echo Backend: http://localhost:7001