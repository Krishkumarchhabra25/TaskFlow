"use client"

import { githubOAuthLogin, googleOAuthLogin, loginUser, registerUser } from "@/lib/api/auth";
import { User } from "@/types";
import { createContext, useEffect, useState } from "react";

interface AuthContextValue {
    user: User | null;
    token: string | null;
    register: (username: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    googleLogin: (code: string) => Promise<void>;
    githubLogin: (code: string) => Promise<void>;
    logout: () => void;
  }
  
  // ✅ Context
  export const AuthContext = createContext<AuthContextValue>({
    user: null,
    token: null,
    register: async () => {},
    login: async () => {},
    googleLogin: async () => {},
    githubLogin: async () => {},
    logout: () => {},
  });
  
  // ✅ Provider
  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
  
    useEffect(() => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
  
      if (savedToken) setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
    }, []);
  
    useEffect(() => {
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
  
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    }, [token, user]);
  
    const register = async (username: string, email: string, password: string) => {
      const { user, token } = await registerUser({ username, email, password });
      setUser(user);
      setToken(token);
    };
  
    const login = async (email: string, password: string) => {
      const { user, token } = await loginUser(email, password);
      setUser(user);
      setToken(token);
    };
  
    const googleLogin = async (code: string) => {
      const { user, token } = await googleOAuthLogin(code);
      setUser(user);
      setToken(token);
    };
  
    const githubLogin = async (code: string) => {
      const { user, token } = await githubOAuthLogin(code);
      setUser(user);
      setToken(token);
    };
  
    const logout = () => {
      setUser(null);
      setToken(null);
    };
 
    return (
      <AuthContext.Provider value={{ user, token, register, login, googleLogin, githubLogin, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };