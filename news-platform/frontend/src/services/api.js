import axios from 'axios';
import toast from 'react-hot-toast';

// Configure axios defaults
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    const message = error.response?.data?.message || error.message || 'An error occurred';
    
    // Don't show toast for certain error types
    if (!error.config?.skipErrorToast) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// News API methods
export const newsApi = {
  // Search for news articles
  searchNews: async (query, sources = '', limit = 10, userId = 'anonymous') => {
    const response = await api.get('/news/search', {
      params: { query, sources, limit, userId }
    });
    return response.data;
  },

  // Get trending news
  getTrendingNews: async (userId = 'anonymous', limit = 15) => {
    const response = await api.get('/news/trending', {
      params: { userId, limit }
    });
    return response.data;
  },

  // Analyze specific article
  analyzeArticle: async (title, content, source) => {
    const response = await api.post('/news/analyze', {
      title,
      content,
      source
    });
    return response.data;
  },

  // Get available news sources
  getSources: async () => {
    const response = await api.get('/news/sources');
    return response.data;
  }
};

// AI API methods
export const aiApi = {
  // Analyze bias of text
  analyzeBias: async (content, title, source) => {
    const response = await api.post('/ai/bias-analysis', {
      content,
      title,
      source
    });
    return response.data;
  },

  // Generate summary
  generateSummary: async (content, title) => {
    const response = await api.post('/ai/summarize', {
      content,
      title
    });
    return response.data;
  },

  // Process complete article
  processArticle: async (article) => {
    const response = await api.post('/ai/process-article', article);
    return response.data;
  },

  // Batch process articles
  batchProcess: async (articles) => {
    const response = await api.post('/ai/batch-process', {
      articles
    });
    return response.data;
  },

  // Get AI capabilities
  getCapabilities: async () => {
    const response = await api.get('/ai/capabilities');
    return response.data;
  }
};

// User API methods
export const userApi = {
  // Get user preferences
  getPreferences: async (userId) => {
    const response = await api.get(`/user/preferences/${userId}`);
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (userId, preferences) => {
    const response = await api.put(`/user/preferences/${userId}`, preferences);
    return response.data;
  },

  // Record user interaction
  recordInteraction: async (userId, article, action = 'read') => {
    const response = await api.post(`/user/interaction/${userId}`, {
      article,
      action
    });
    return response.data;
  },

  // Get user analytics
  getAnalytics: async (userId) => {
    const response = await api.get(`/user/analytics/${userId}`);
    return response.data;
  },

  // Get reading history
  getReadingHistory: async (userId, limit = 20, offset = 0) => {
    const response = await api.get(`/user/${userId}/reading-history`, {
      params: { limit, offset }
    });
    return response.data;
  },

  // Clear user data
  clearUserData: async (userId) => {
    const response = await api.delete(`/user/${userId}/data`);
    return response.data;
  },

  // Create demo user
  createDemoUser: async () => {
    const response = await api.get('/user/demo-user');
    return response.data;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    throw new Error('Backend service is not available');
  }
};

// Export the configured axios instance for custom requests
export { api };

// Export default
const apiService = {
  news: newsApi,
  ai: aiApi,
  user: userApi,
  health: healthCheck
};

export default apiService;
