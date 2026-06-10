import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { tokenStorage } from '../utils/tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => tokenStorage.getUser());
  const [token, setToken] = useState(() => tokenStorage.getToken());

  const login = useCallback((authData) => {
    const nextToken = authData?.token;
    const nextUser = authData?.user;

    if (nextToken) {
      tokenStorage.setToken(nextToken);
      setToken(nextToken);
    }

    if (nextUser) {
      tokenStorage.setUser(nextUser);
      setUser(nextUser);
    }
  }, []);

  const updateUser = useCallback((nextUser) => {
    tokenStorage.setUser(nextUser);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
      updateUser,
    }),
    [login, logout, token, updateUser, user],
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
