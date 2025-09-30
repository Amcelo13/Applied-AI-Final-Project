#!/bin/bash

# AI News Bias Analyzer - Stop Script
# This script stops both frontend and backend services

echo "🛑 Stopping AI News Bias Analyzer..."
echo "=================================="

# Function to kill process by PID file
kill_by_pid_file() {
    local service_name=$1
    local pid_file=$2
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo "🔄 Stopping $service_name (PID: $pid)..."
            kill $pid
            sleep 2
            # Force kill if still running
            if ps -p $pid > /dev/null 2>&1; then
                echo "⚠️  Force stopping $service_name..."
                kill -9 $pid
            fi
            echo "✅ $service_name stopped"
        else
            echo "ℹ️  $service_name was not running"
        fi
        rm -f "$pid_file"
    else
        echo "ℹ️  No PID file found for $service_name"
    fi
}

# Function to kill processes by name (fallback)
kill_by_name() {
    echo "🔍 Searching for running Node.js processes..."
    
    # Kill backend processes
    backend_pids=$(ps aux | grep -E "node.*server\.js|nodemon.*server\.js" | grep -v grep | awk '{print $2}')
    if [ ! -z "$backend_pids" ]; then
        echo "🔄 Stopping backend processes: $backend_pids"
        echo $backend_pids | xargs kill -9 2>/dev/null
        echo "✅ Backend processes stopped"
    fi
    
    # Kill frontend processes (React scripts)
    frontend_pids=$(ps aux | grep -E "react-scripts.*start|npm.*start" | grep -v grep | awk '{print $2}')
    if [ ! -z "$frontend_pids" ]; then
        echo "🔄 Stopping frontend processes: $frontend_pids"
        echo $frontend_pids | xargs kill -9 2>/dev/null
        echo "✅ Frontend processes stopped"
    fi
    
    # Kill any remaining Node.js processes related to the project
    project_pids=$(ps aux | grep -E "news-platform" | grep -v grep | awk '{print $2}')
    if [ ! -z "$project_pids" ]; then
        echo "🔄 Stopping remaining project processes: $project_pids"
        echo $project_pids | xargs kill -9 2>/dev/null
    fi
}

# Stop services using PID files first
kill_by_pid_file "Backend" "backend.pid"
kill_by_pid_file "Frontend" "frontend.pid"

# Fallback: kill by process name
kill_by_name

# Clean up any remaining files
echo "🧹 Cleaning up..."
rm -f backend.pid frontend.pid

# Check if ports are still in use
echo "🔍 Checking if ports are free..."
if lsof -ti:5001 > /dev/null 2>&1; then
    echo "⚠️  Port 5001 still in use, force killing..."
    lsof -ti:5001 | xargs kill -9 2>/dev/null
fi

if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  Port 3000 still in use, force killing..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
fi

echo ""
echo "✅ AI News Bias Analyzer stopped successfully!"
echo "=================================="
echo "💡 To start again, run: ./start.sh"
echo "🔍 All Node.js processes related to the project have been terminated"
