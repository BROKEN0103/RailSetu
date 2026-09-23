import React, { createContext, useContext, useState, useEffect } from 'react';

// Basic types for mock context
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'passenger' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('railconnect_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('railconnect_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    // Mock login
    const isMockAdmin = email.includes('admin');
    const mockUser: User = {
      id: isMockAdmin ? 'admin-1' : 'user-1',
      name: isMockAdmin ? 'System Admin' : 'Demo Passenger',
      email: email,
      role: isMockAdmin ? 'admin' : 'passenger',
    };
    
    setUser(mockUser);
    localStorage.setItem('railconnect_user', JSON.stringify(mockUser));
  };

  const register = async (data: any) => {
    // Mock register
    await login(data.email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('railconnect_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
