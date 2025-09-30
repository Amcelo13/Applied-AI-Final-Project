const express = require('express');
const aiService = require('../services/aiService');

const router = express.Router();

/**
 * GET /api/news/search
 * Search for news articles with bias analysis
 */
router.get('/search', async (req, res) => {
  try {
    const { 
      query = 'latest news', 
      limit = 10
    } = req.query;

    // Validate inputs
    if (limit > 20) {
      return res.status(400).json({ error: 'Limit cannot exceed 20 articles' });
    }

    console.log(`🔍 Searching news: "${query}"`);

    // Search for news articles
    const newsData = await aiService.searchNews(query, '', parseInt(limit));
    
    if (!newsData.articles || newsData.articles.length === 0) {
      return res.json({ 
        articles: [], 
        message: 'No articles found for your search query',
        query,
        total: 0
      });
    }

    // Process articles with AI bias analysis
    const processedArticles = await Promise.all(
      newsData.articles.map(article => aiService.processArticle(article))
    );

    res.json({
      articles: processedArticles,
      query,
      total: processedArticles.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in news search:', error);
    res.status(500).json({ 
      error: 'Failed to search news articles',
      message: error.message 
    });
  }
});

module.exports = router;
