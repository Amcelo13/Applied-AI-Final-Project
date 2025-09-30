# Development Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **OpenAI API Key**
   - Sign up at [OpenAI Platform](https://platform.openai.com)
   - Create an API key in the API section
   - Note your API key for environment setup

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Navigate to project root
cd news-platform

# Install root dependencies (concurrently for running both servers)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to project root
cd ..
```

### 2. Environment Configuration

```bash
# Copy environment template
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Replace with your actual OpenAI API key
OPENAI_API_KEY=sk-your-openai-api-key-here

JWT_SECRET=your-secure-jwt-secret-here
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

### 3. Start Development Servers

Option 1: Start both servers simultaneously
```bash
npm run dev
```

Option 2: Start servers separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

### 4. Verify Setup

1. **Backend Health Check**: Visit http://localhost:5000/health
2. **Frontend**: Visit http://localhost:3000
3. **Test API**: Try searching for news in the frontend

## Project Structure

```
news-platform/
├── package.json              # Root package.json for scripts
├── README.md                 # Main documentation
├── frontend/                 # React application
│   ├── package.json
│   ├── src/
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # React entry point
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── contexts/        # React contexts
│   │   └── utils/           # Utility functions
│   ├── public/
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
└── backend/                 # Node.js API server
    ├── package.json
    ├── server.js            # Express server entry point
    ├── routes/              # API route handlers
    │   ├── news.js          # News-related endpoints
    │   ├── ai.js            # AI service endpoints
    │   └── user.js          # User-related endpoints
    ├── services/            # Business logic services
    │   ├── aiService.js     # OpenAI integration
    │   └── personalizationService.js # User personalization
    └── .env.example         # Environment template
```

## Key Features Implemented

### Backend Services

1. **AI Service** (`backend/services/aiService.js`)
   - News search using OpenAI
   - Bias analysis (0-100 scale)
   - Neutral summarization
   - Article processing

2. **Personalization Service** (`backend/services/personalizationService.js`)
   - User preference management
   - Reading history tracking
   - Personalized recommendations
   - Diversity algorithms

3. **API Routes**
   - News endpoints for search and trending
   - AI endpoints for analysis
   - User endpoints for preferences

### Frontend Components

1. **Core Components**
   - Header with navigation
   - BiasIndicator for visual bias display
   - LoadingScreen for app initialization
   - Footer with project information

2. **Pages**
   - HomePage: Landing page with trending news
   - NewsPage: Full news feed with search and filtering
   - AboutPage: Project information and methodology
   - AnalyticsPage: User reading analytics (basic)
   - PreferencesPage: User preference management

3. **Services**
   - API service for backend communication
   - User context for state management
   - Utility functions for common operations

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### Frontend  
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development|production
PORT=5000
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

### Frontend (optional .env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## Testing the Application

1. **Start the servers**: `npm run dev`
2. **Visit frontend**: http://localhost:3000
3. **Search for news**: Try searching for topics like "politics", "technology"
4. **Check bias detection**: Articles should show bias scores and indicators
5. **Test personalization**: Visit preferences to adjust settings
6. **View analytics**: Check the analytics page for reading stats

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   ```bash
   # Find and kill the process
   lsof -ti:5000 | xargs kill -9
   # Or change PORT in backend/.env
   ```

2. **OpenAI API errors**
   - Verify your API key in `.env`
   - Check your OpenAI account has credits
   - Ensure the key has proper permissions

3. **Module not found errors**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Tailwind CSS not working**
   - Ensure postcss.config.js exists in frontend
   - Check tailwind.config.js configuration
   - Restart the frontend server

### Development Tips

1. **API Testing**: Use tools like Postman or curl to test backend endpoints
2. **Console Logs**: Check browser console and terminal for errors
3. **Network Tab**: Monitor API calls in browser dev tools
4. **Cache Issues**: Clear browser cache if seeing old data

## Next Steps

1. **Add more news sources**: Integrate additional news APIs
2. **Improve AI accuracy**: Fine-tune bias detection prompts
3. **Add database**: Implement persistent storage
4. **Real-time updates**: Add WebSocket for live news updates
5. **Mobile optimization**: Enhance mobile experience
6. **User authentication**: Add proper user accounts

## Getting Help

- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- Test API endpoints using the health check endpoint
- Monitor console outputs for debugging information
