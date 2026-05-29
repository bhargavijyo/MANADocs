@echo off
title ManaDocs - Full Stack
echo.
echo ========================================
echo ManaDocs Development Environment
echo ========================================
echo.
echo Starting backend and frontend servers...
echo.

REM Start backend server in new window
echo Starting Backend Server (Port 5000)...
start "ManaDocs Backend" cmd /k "cd /d C:\Users\Bhargavi\MANA-Docs\server && npm run dev"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start frontend server in new window
echo Starting Frontend Server (Port 3000)...
start "ManaDocs Frontend" cmd /k "cd /d C:\Users\Bhargavi\MANA-Docs\client && npm start"

echo.
echo ========================================
echo Servers are starting...
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
pause
