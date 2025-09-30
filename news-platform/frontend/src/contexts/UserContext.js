import React, { createContext, useContext, useState } from 'react';

// Create context
const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children, userId: initialUserId }) => {
  const [userId, setUserId] = useState(initialUserId);

  const value = {
    userId,
    setUserId
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
