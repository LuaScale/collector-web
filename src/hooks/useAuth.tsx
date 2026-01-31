"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { User } from "@/types/entities/user";
import { usersApi } from "@/lib/api/users";
import { ApiError } from "@/lib/api/client";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    pseudo: string;
    password: string;
    phoneNumber?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "collector_auth_user";

interface AuthProviderProps {
  readonly children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    // Since API doesn't have auth yet, we simulate by fetching users
    // and finding one with matching email
    // In production, this would be a POST to /api/login returning a JWT
    setIsLoading(true);
    try {
      const response = await usersApi.listClient({ itemsPerPage: 100 });
      const members = response["hydra:member"] ?? response["member"] ?? [];
      const foundUser = members.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!foundUser) {
        throw new Error("Email ou mot de passe incorrect");
      }

      // Note: In real implementation, password would be verified server-side
      // This is a placeholder until JWT auth is implemented
      setUser(foundUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: {
      email: string;
      pseudo: string;
      password: string;
      phoneNumber?: string;
    }) => {
      setIsLoading(true);
      try {
        const newUser = await usersApi.create({
          email: data.email,
          pseudo: data.pseudo,
          password: data.password,
          phoneNumber: data.phoneNumber || undefined,
        });
        setUser(newUser);
      } catch (error) {
        if (error instanceof ApiError) {
          const fieldErrors = error.getFieldErrors();
          if (fieldErrors.email) {
            throw new Error(fieldErrors.email);
          }
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
