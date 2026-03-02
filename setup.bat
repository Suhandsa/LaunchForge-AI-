@echo off
REM LaunchForge AI - Complete Setup Script (Windows)
REM This script sets up the entire project (backend + frontend)

echo ================================================
echo 🚀 LaunchForge AI - Project Setup (Windows)
echo ================================================

REM Check if .env files exist
if not exist "launchforge-backend\.env" (
    echo ⚠️  .env file not found in backend
    echo    Copying from .env.example...
    copy launchforge-backend\.env.example launchforge-backend\.env
)

if not exist "frontend\.env" (
    echo ⚠️  .env file not found in frontend
    echo    Copying from .env.example...
    copy frontend\.env.example frontend\.env
)

echo ✅ Environment files configured

REM Setup Backend
echo.
echo Setting up Backend...
cd launchforge-backend

if not exist "node_modules" (
    echo   Installing backend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Backend npm install failed
        exit /b 1
    )
    echo ✅ Backend dependencies installed
) else (
    echo ✅ Backend dependencies already installed
)

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo   Installing frontend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Frontend npm install failed
        exit /b 1
    )
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)

cd ..

echo.
echo ================================================
echo ✅ Setup Complete!
echo ================================================
echo.
echo 📋 Next Steps:
echo   1. Make sure PostgreSQL is running on your system
echo   2. Create database: createdb launchforge_db
echo   3. Initialize schema: psql -U postgres launchforge_db ^< launchforge-backend\docs\init-db.sql
echo   4. Start backend: npm run dev (from launchforge-backend folder)
echo   5. Start frontend: npm run dev (from frontend folder)
echo.
echo Or use the run commands provided in the README
echo.
