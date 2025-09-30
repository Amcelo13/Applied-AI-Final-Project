import React, { useState, useEffect } from 'react';

// Components
import LoadingScreen from './components/LoadingScreen';

// Pages
import NewsPage from './pages/NewsPage';

// Services
import { generateUserId } from './utils/helpers';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Initialize user session
    const initializeUser = () => {
      let storedUserId = localStorage.getItem('biasguard_user_id');
      
      if (!storedUserId) {
        storedUserId = generateUserId();
        localStorage.setItem('biasguard_user_id', storedUserId);
      }
      
      setUserId(storedUserId);
      setIsLoading(false);
    };

    // Simulate loading time for better UX
    const timer = setTimeout(initializeUser, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <UserProvider userId={userId}>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI News Bias Analyzer
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time news with AI-powered bias detection and ranking
            </p>
          </div>
          <NewsPage />
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
