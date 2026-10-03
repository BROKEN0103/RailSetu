import React, { createContext, useContext, useState, useEffect } from "react";
import authFetch from "../utils/authFetch";

const API_URL = "http://localhost:5000/api/v1/auth";

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "passenger" | "admin";
}

// AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  getProfile: () => Promise<any>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("railconnect_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("railconnect_user");
      }
    }

    setLoading(false);
  }, []);

  // LOGIN
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

    // Save JWT token
    localStorage.setItem("railsetu_token", result.token);

    // Save user in React state
    setUser(loggedInUser);

    // Save user in localStorage
    localStorage.setItem(
      "railconnect_user",
      JSON.stringify(loggedInUser)
    );
  };

  // REGISTER
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

    const registeredUser: User = {
      id: String(result.data.id),
      name: result.data.name,
      email: result.data.email,
      role: result.data.role || "passenger",
    };

    setUser(registeredUser);

    localStorage.setItem(
      "railconnect_user",
      JSON.stringify(registeredUser)
    );
  };

  // GET PROTECTED PROFILE
  const getProfile = async () => {
    const response = await authFetch(
      "http://localhost:5000/api/v1/users/profile"
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to get profile"
      );
    }

    return result;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);

    localStorage.removeItem("railconnect_user");
    localStorage.removeItem("railsetu_token");
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    getProfile,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};