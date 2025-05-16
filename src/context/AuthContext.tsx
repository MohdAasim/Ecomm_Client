import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: number | null;
  login: (token: string, userId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get('token') || null,
  );
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  const login = (newToken: string, newUserId: number) => {
    Cookies.set('token', newToken, { expires: 2 });
    setToken(newToken);
    console.log(newUserId);
    setUserId(newUserId);
    navigate(from, { replace: true });
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUserId(null);
    navigate('/signin');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
