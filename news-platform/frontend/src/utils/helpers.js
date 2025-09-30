/**
 * Generate a unique user ID
 * @returns {string} Unique user identifier
 */
export const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format date to readable string
 * @param {string|Date} dateInput - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return 'Unknown date';
  
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  const now = new Date();
  const diffInHours = (now - date) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInHours * 60);
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

/**
 * Get bias category from score
 * @param {number} biasScore - Bias score (0-100)
 * @returns {Object} Bias category info
 */
export const getBiasCategory = (biasScore) => {
  if (biasScore < 20) {
    return {
      label: 'Highly Liberal',
      shortLabel: 'Liberal',
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    };
  } else if (biasScore < 40) {
    return {
      label: 'Liberal',
      shortLabel: 'Liberal',
      color: 'cyan',
      bgColor: 'bg-cyan-100',
      textColor: 'text-cyan-800',
      borderColor: 'border-cyan-200'
    };
  } else if (biasScore < 60) {
    return {
      label: 'Neutral',
      shortLabel: 'Center',
      color: 'gray',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200'
    };
  } else if (biasScore < 80) {
    return {
      label: 'Conservative',
      shortLabel: 'Conservative',
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200'
    };
  } else {
    return {
      label: 'Highly Conservative',
      shortLabel: 'Conservative',
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    };
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Calculate reading time estimate
 * @param {string} text - Text to analyze
 * @returns {number} Reading time in minutes
 */
export const calculateReadingTime = (text) => {
  if (!text) return 0;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Get contrast text color for given background color
 * @param {string} backgroundColor - Background color hex
 * @returns {string} Contrast text color
 */
export const getContrastColor = (backgroundColor) => {
  // Simple implementation - in production, use a more sophisticated algorithm
  const lightColors = ['cyan', 'yellow', 'lime', 'pink'];
  return lightColors.some(color => backgroundColor.includes(color)) ? 'text-gray-900' : 'text-white';
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Convert bias score to progress percentage
 * @param {number} biasScore - Bias score (0-100)
 * @returns {Object} Progress info
 */
export const getBiasProgress = (biasScore) => {
  const normalizedScore = Math.max(0, Math.min(100, biasScore));
  
  return {
    percentage: normalizedScore,
    leftPercentage: Math.max(0, 50 - normalizedScore) * 2,
    rightPercentage: Math.max(0, normalizedScore - 50) * 2,
    centerDistance: Math.abs(normalizedScore - 50)
  };
};

/**
 * Group articles by date
 * @param {Array} articles - Articles to group
 * @returns {Object} Grouped articles
 */
export const groupArticlesByDate = (articles) => {
  if (!articles || !Array.isArray(articles)) return {};
  
  return articles.reduce((groups, article) => {
    const date = new Date(article.publishedAt || article.timestamp);
    const dateKey = date.toDateString();
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    
    groups[dateKey].push(article);
    return groups;
  }, {});
};

/**
 * Filter articles by bias range
 * @param {Array} articles - Articles to filter
 * @param {Object} biasRange - Range object with min and max
 * @returns {Array} Filtered articles
 */
export const filterArticlesByBias = (articles, biasRange) => {
  if (!articles || !biasRange) return articles;
  
  return articles.filter(article => {
    const biasScore = article.bias?.biasScore;
    if (biasScore === undefined) return true;
    
    return biasScore >= biasRange.min && biasScore <= biasRange.max;
  });
};

/**
 * Calculate diversity score for a set of articles
 * @param {Array} articles - Articles to analyze
 * @returns {number} Diversity score (0-100)
 */
export const calculateDiversityScore = (articles) => {
  if (!articles || articles.length < 2) return 50;
  
  const biasScores = articles
    .map(article => article.bias?.biasScore)
    .filter(score => score !== undefined);
  
  if (biasScores.length < 2) return 50;
  
  // Calculate standard deviation
  const mean = biasScores.reduce((sum, score) => sum + score, 0) / biasScores.length;
  const variance = biasScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / biasScores.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Convert to 0-100 scale (higher standard deviation = more diversity)
  return Math.min(100, Math.round((standardDeviation / 25) * 100));
};

/**
 * Extract domain from URL
 * @param {string} url - URL to extract domain from
 * @returns {string} Domain name
 */
export const extractDomain = (url) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

/**
 * Format large numbers with abbreviations
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Generate random color from predefined palette
 * @returns {string} Random color class
 */
export const getRandomColor = () => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Check if user prefers dark mode
 * @returns {boolean} Prefers dark mode
 */
export const prefersDarkMode = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Save data to localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} data - Data to store
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

/**
 * Load data from localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Stored data or default value
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
};
