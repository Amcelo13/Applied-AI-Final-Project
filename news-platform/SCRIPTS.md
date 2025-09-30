# 🚀 AI News Bias Analyzer - Control Scripts

Easy-to-use shell scripts for managing your AI News Bias Analyzer application.

## 📋 Available Scripts

### `./start.sh` - Start All Services
Starts both frontend and backend services automatically.

**Features:**
- ✅ Checks for Node.js and npm installation
- 📦 Auto-installs dependencies if missing
- 🔧 Starts backend on port 5001
- 🎨 Stats frontend on port 3000
- 💾 Saves process IDs for easy stopping
- ⏳ Provides status updates during startup

**Usage:**
```bash
./start.sh
```

### `./stop.sh` - Stop All Services
Safely stops all running frontend and backend services.

**Features:**
- 🛑 Gracefully stops services using PID files
- 🔍 Fallback process killing by name
- 🧹 Cleans up PID files
- 🔗 Force-kills processes using ports 3000/5001
- ✅ Confirms all processes are stopped

**Usage:**
```bash
./stop.sh
```

### `./status.sh` - Check Service Status
Provides detailed status information about your services.

**Features:**
- 📊 Port usage checking (3000, 5001)
- 🌐 URL accessibility testing
- 🔍 API functionality verification
- ⚙️ Running Node.js process listing
- 📄 PID file status checking

**Usage:**
```bash
./status.sh
```

## 🎯 Quick Start Guide

1. **Start the application:**
   ```bash
   ./start.sh
   ```

2. **Check if everything is running:**
   ```bash
   ./status.sh
   ```

3. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001/health

4. **Stop when done:**
   ```bash
   ./stop.sh
   ```

## 🔧 Troubleshooting

### Services won't start?
```bash
./stop.sh    # Stop any conflicting processes
./start.sh   # Try starting again
```

### Port conflicts?
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :5001

# Kill specific processes
kill -9 <PID>
```

### Dependencies missing?
```bash
# The start script will auto-install, but you can manually install:
cd backend && npm install
cd ../frontend && npm install
```

## 📁 What Gets Created

- `backend.pid` - Backend process ID
- `frontend.pid` - Frontend process ID
- These files are automatically cleaned up by `stop.sh`

## 🎓 Perfect for Academic Presentations

These scripts make it easy to:
- ✅ Quickly demo your project to professors
- ✅ Start everything with one command
- ✅ Clean shutdown after presentation
- ✅ Check status if something goes wrong
- ✅ Professional development workflow

## 💡 Pro Tips

- Run `./status.sh` if anything seems wrong
- Use `./stop.sh` before closing your laptop
- Keep terminal windows open to see logs
- Scripts work on macOS, Linux, and WSL
