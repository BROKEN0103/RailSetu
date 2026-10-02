import React, { createContext, useContext, useState, useEffect } from 'react';
const API_URL = "http://localhost:5000/api/v1/auth";

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
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  const loggedInUser: User = {
    id: String(result.data.id),
    name: result.data.name,
    email: result.data.email,
    role: result.data.role || "passenger",
  };

  setUser(loggedInUser);

  localStorage.setItem(
    "railconnect_user",
    JSON.stringify(loggedInUser)
  );
};

  const register = async (data: any) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  setUser({
    id: String(result.data.id),
    name: result.data.name,
    email: result.data.email,
    role: result.data.role || "passenger",
  });

  localStorage.setItem(
    "railconnect_user",
    JSON.stringify({
      id: String(result.data.id),
      name: result.data.name,
      email: result.data.email,
      role: result.data.role || "passenger",
    })
  );
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
