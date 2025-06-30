@echo off
echo ========================================
echo SpeedyIntervue AI Match - Quick Start
echo ========================================
echo.

echo Step 1: Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Installing backend dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Step 3: Installing Python dependencies...
call pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing Python dependencies
    pause
    exit /b 1
)

echo.
echo Step 4: Installing concurrently...
cd ..
call npm install --save-dev concurrently

echo.
echo Step 5: Starting the application...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the application
echo.

call npm run dev:full

pause 