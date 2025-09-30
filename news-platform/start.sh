#!/bin/bash

# AI News Bias Analyzer - Start Script
# This script starts both frontend and backend services

echo "🚀 Starting AI News Bias Analyzer..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Function to start backend
start_backend() {
    echo "🔧 Starting Backend Server..."
    cd backend
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing backend dependencies..."
        npm install
    fi
    echo "🎯 Backend starting on port 5001..."
    npm run dev &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../backend.pid
    cd ..
    echo "✅ Backend started (PID: $BACKEND_PID)"
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting Frontend Application..."
    cd frontend
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install
    fi
    echo "🎯 Frontend starting on port 3000..."
    npm start &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > ../frontend.pid
    cd ..
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
}

# Start services
start_backend
sleep 3  # Give backend time to start
start_frontend

echo ""
echo "🎉 AI News Bias Analyzer is running!"
echo "=================================="
echo "📡 Backend API: http://localhost:5001"
echo "🌐 Frontend App: http://localhost:3000"
echo "🏥 Health Check: http://localhost:5001/health"
echo ""
echo "💡 To stop the services, run: ./stop.sh"
echo "📄 View logs: tail -f backend/logs/* (if logging enabled)"
echo ""
echo "⏳ Starting services... (this may take a moment)"

# Wait a bit for services to fully start
sleep 5
echo "✨ Services should be ready now!"
echo "🔗 Open http://localhost:3000 in your browser"
