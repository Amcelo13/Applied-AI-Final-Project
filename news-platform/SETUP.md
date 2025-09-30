# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start Application
```bash
# Start everything (from project root)
./start.sh

# Stop everything  
./stop.sh

# Check status
./status.sh
```

### 3. Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5001/health

## Folder Structure

```
news-platform/
├── start.sh                 # Start both services
├── stop.sh                  # Stop all services  
├── status.sh                # Check service status
├── frontend/                # React app (port 3000)
│   ├── src/components/      # UI components
│   ├── src/pages/           # Page components
│   └── package.json
└── backend/                 # API server (port 5001)
    ├── routes/news.js       # News endpoints
    ├── services/aiService.js # AI bias analysis
    ├── .env                 # API keys
    └── package.json
```

## Environment Setup
```

## Troubleshooting

- **Port busy**: Run `./stop.sh` first
- **Dependencies**: Run `npm install` in both folders
- **API errors**: Check `.env` file has correct API keys
