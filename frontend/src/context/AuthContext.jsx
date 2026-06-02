import { createContext, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/appConstants';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get(STORAGE_KEYS.AUTH_USER));
  const [token, setToken] = useState(() => storage.get(STORAGE_KEYS.AUTH_TOKEN));

  const login = (authData) => {
    const nextToken = authData?.token;
    const nextUser = authData?.user;

    if (nextToken) {
      storage.set(STORAGE_KEYS.AUTH_TOKEN, nextToken);
      setToken(nextToken);
    }

    if (nextUser) {
      storage.set(STORAGE_KEYS.AUTH_USER, nextUser);
      setUser(nextUser);
    }
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.AUTH_USER);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
