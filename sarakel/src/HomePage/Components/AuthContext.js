// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

  const logout = () => {
    // Clear token from sessionStorage and state on logout
    sessionStorage.removeItem('token');
    setToken(null);
  };

  // Effect to update token state when sessionStorage changes
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
