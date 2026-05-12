import { createContext, useContext, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';
import type { AuthUser, Role } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readUser = (): AuthUser | null => {
  const value = localStorage.getItem('sraws_user');
  return value ? (JSON.parse(value) as AuthUser) : null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readUser);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sraws_token'));

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    async login(email: string, password: string) {
      const response = await authApi.login(email, password);
      localStorage.setItem('sraws_token', response.accessToken);
      localStorage.setItem('sraws_user', JSON.stringify(response.user));
      setToken(response.accessToken);
      setUser(response.user);
    },
    logout() {
      localStorage.removeItem('sraws_token');
      localStorage.removeItem('sraws_user');
      setToken(null);
      setUser(null);
    },
    hasRole(...roles: Role[]) {
      return Boolean(user && roles.includes(user.role));
    }
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
