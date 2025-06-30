#!/bin/bash

echo "========================================"
echo "SpeedyIntervue AI Match - Quick Start"
echo "========================================"
echo

echo "Step 1: Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi

echo
echo "Step 2: Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi

echo
echo "Step 3: Installing Python dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error installing Python dependencies"
    exit 1
fi

echo
echo "Step 4: Installing concurrently..."
cd ..
npm install --save-dev concurrently

echo
echo "Step 5: Starting the application..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:5000"
echo
echo "Press Ctrl+C to stop the application"
echo

npm run dev:full 