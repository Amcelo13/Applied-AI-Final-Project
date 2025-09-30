# AI-Powered News Platform - BiasGuard News

An advanced news platform that uses AI to detect political bias, generate neutral summaries, and provide personalized news recommendations while promoting diverse viewpoints.

## 🚀 Features

### Core Features
- **AI Bias Detection**: 0-100 political bias scoring using OpenAI GPT models
- **Neutral Summarization**: Fact-based article summaries removing biased language
- **Personalized Feed**: Smart recommendations balancing preferences with diversity
- **Multi-source Aggregation**: News from major outlets across the political spectrum
- **Real-time Analysis**: Live processing of news articles with AI insights
- **User Analytics**: Track reading patterns and bias exposure

### Technical Features
- **Frontend**: React.js with Tailwind CSS for modern, responsive UI
- **Backend**: Node.js/Express.js with integrated AI services
- **AI Integration**: OpenAI API for content analysis and news search
- **Caching**: Redis-like caching for improved performance
- **Real-time Updates**: Live news feed updates
- **Mobile Responsive**: Optimized for all device types

## 🏗️ Architecture

```
news-platform/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── services/        # API integration
│   │   ├── contexts/        # React context (state management)
│   │   └── utils/           # Helper functions
│   └── public/
└── backend/                 # Node.js API server
    ├── routes/              # API endpoints
    ├── services/            # Business logic
    │   ├── aiService.js     # OpenAI integration
    │   └── personalizationService.js # User personalization
    └── config/              # Configuration files
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notification system
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **OpenAI API** - AI/ML services
- **Axios** - HTTP client for external APIs
- **Node Cache** - In-memory caching
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (required for AI features)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd news-platform

# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install-all
```

### 2. Environment Setup

Create environment files:

```bash
# Backend environment
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configuration:

```env
# Environment
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=your_openai_api_key_here

# Security
JWT_SECRET=your_jwt_secret_here
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

### 3. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env` file

### 4. Start Development Servers

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
npm run server  # Backend only (port 5000)
npm run client  # Frontend only (port 3000)
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🔧 API Endpoints

### News Endpoints
- `GET /api/news/search` - Search for news articles
- `GET /api/news/trending` - Get trending news
- `POST /api/news/analyze` - Analyze specific article
- `GET /api/news/sources` - Get available news sources

### AI Endpoints
- `POST /api/ai/bias-analysis` - Analyze text bias
- `POST /api/ai/summarize` - Generate neutral summary
- `POST /api/ai/process-article` - Complete article processing
- `POST /api/ai/batch-process` - Process multiple articles
- `GET /api/ai/capabilities` - Get AI service capabilities

### User Endpoints
- `GET /api/user/preferences/:userId` - Get user preferences
- `PUT /api/user/preferences/:userId` - Update preferences
- `POST /api/user/interaction/:userId` - Record user interaction
- `GET /api/user/analytics/:userId` - Get user analytics
- `GET /api/user/:userId/reading-history` - Get reading history

## 🎯 Usage Examples

### Search for News
```javascript
// Frontend usage
import { newsApi } from './services/api';

const articles = await newsApi.searchNews('climate change', 'CNN,Reuters', 10, userId);
```

### Analyze Article Bias
```javascript
const biasAnalysis = await aiApi.analyzeBias(
  articleContent, 
  articleTitle, 
  'CNN'
);
console.log(`Bias Score: ${biasAnalysis.biasScore}/100`);
```

### Update User Preferences
```javascript
await userApi.updatePreferences(userId, {
  biasRange: { min: 20, max: 80 },
  diversityWeight: 0.8
});
```

## 🔒 Security Features

- **Rate Limiting**: API endpoints are rate-limited
- **CORS Protection**: Configured for frontend domain
- **Input Validation**: All user inputs are validated
- **Error Handling**: Comprehensive error handling
- **Security Headers**: Helmet.js for security headers

## 📊 Bias Scoring System

The platform uses a 0-100 bias scale:
- **0-20**: Highly Liberal
- **21-40**: Liberal  
- **41-60**: Neutral/Centrist
- **61-80**: Conservative
- **81-100**: Highly Conservative

Each analysis includes:
- Bias score with confidence rating
- Reasoning for the assessment
- Key indicators that influenced the score

## 🎨 UI Components

### BiasIndicator
Visual representation of article bias with interactive scale.

### NewsCard
Article display with bias scoring, summary, and source information.

### PersonalizationControls
User preference management for bias range and diversity settings.

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

## 📈 Performance Optimization

- **Caching**: AI responses cached for 30 minutes
- **Debounced Search**: Search requests debounced by 500ms
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized image loading
- **Code Splitting**: Dynamic imports for better performance

## 🚧 Development Roadmap

### Phase 1 (Current)
- ✅ Basic AI bias detection
- ✅ News search and display
- ✅ User preferences
- ✅ Responsive UI

### Phase 2 (Planned)
- 📊 Advanced analytics dashboard
- 🔄 Real-time news updates
- 💾 Database integration
- 📱 Mobile app

### Phase 3 (Future)
- 🤖 Custom AI model training
- 🌐 Multi-language support
- 📧 Email newsletters
- 👥 Social features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Group 7 - Applied AI Project**
- Advanced AI implementation
- Full-stack development
- UI/UX design
- System architecture

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting guide](#troubleshooting)
2. Search existing [issues](https://github.com/your-repo/issues)
3. Create a new issue with detailed information

## 🔧 Troubleshooting

### Common Issues

**OpenAI API Key Error**
```
Error: OpenAI API key not found
Solution: Add your OpenAI API key to backend/.env file
```

**Port Already in Use**
```
Error: Port 5000 already in use
Solution: Kill the process or change PORT in .env file
```

**Module Not Found**
```
Error: Cannot find module
Solution: Run npm install in both frontend and backend directories
```

---

Made with ❤️ by Group 7 for Applied AI Course
